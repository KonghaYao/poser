import { Control } from './Control';
import { Head, Joint, Mannequin, Wrist, config } from '..';
import * as THREE from 'three';
const EPS = 0.00001;
const cbBiologicalConstraints = { checked: true };
let oldParentAngle: number;
function relativeTurn(
    joint: Joint | Mannequin,
    rotationalAngle: RotationalAngle,
    angle: number,
    control: Control
) {
    if (control.moveBody) {
        // it is translation, not rotation
        joint.position[rotationalAngle] += angle;
        return;
    }

    if (joint.biologicallyImpossibleLevel) {
        if (cbBiologicalConstraints.checked) {
            // there is a dedicated function to check biological possibility of joint
            let oldImpossibility = joint.biologicallyImpossibleLevel();

            joint[rotationalAngle] += angle;
            joint.updateMatrix();
            joint.updateWorldMatrix(true); // ! important, otherwise get's stuck

            let newImpossibility = joint.biologicallyImpossibleLevel();

            if (newImpossibility > EPS && newImpossibility >= oldImpossibility - EPS) {
                // undo rotation
                joint[rotationalAngle] -= angle;
                return;
            }
        } else {
            joint.biologicallyImpossibleLevel();
            joint[rotationalAngle] += angle;
        }
        // keep the rotation, it is either possible, or improves impossible situation
    } else {
        // there is no dedicated function, test with individual rotation range

        let val = joint[rotationalAngle] + angle,
            min = joint.minRot[rotationalAngle],
            max = joint.maxRot[rotationalAngle];

        if (cbBiologicalConstraints.checked || min == max) {
            if (val < min - EPS && angle < 0) return;
            if (val > max + EPS && angle > 0) return;
            if (min == max) return;
        }

        joint[rotationalAngle] = val;
    }
    joint.updateMatrix();
} // relativeTurn
type RotationalAngle = 'x' | 'y' | 'z' | '';
function kinematic2D(
    joint: Joint | Mannequin,
    rotationalAngle: RotationalAngle,
    angle: number,
    ignoreIfPositive: true | undefined,
    control: Control
) {
    const { obj, mouse, dragPoint } = control;
    // returns >0 if this turn gets closer

    // swap Z<->X for wrist
    if (joint instanceof Wrist) {
        if (rotationalAngle == 'x') rotationalAngle = 'z';
        else if (rotationalAngle == 'z') rotationalAngle = 'x';
    }

    let screenPoint = new THREE.Vector3().copy(dragPoint.position);
    screenPoint = obj!.localToWorld(screenPoint).project(config.camera);

    let distOriginal = mouse.distanceTo(screenPoint),
        oldAngle = joint[rotationalAngle];

    if (joint instanceof Head) {
        // head and neck
        oldParentAngle = joint.parentJoint[rotationalAngle];
        relativeTurn(joint, rotationalAngle, angle / 2, control);
        relativeTurn(joint.parentJoint, rotationalAngle, angle / 2, control);
        joint.parentJoint.updateMatrixWorld(true);
    } else {
        relativeTurn(joint, rotationalAngle, angle, control);
    }
    joint.updateMatrixWorld(true);

    screenPoint.copy(dragPoint.position);
    screenPoint = obj!.localToWorld(screenPoint).project(config.camera);

    let distProposed = mouse.distanceTo(screenPoint),
        dist = distOriginal - distProposed;

    if (ignoreIfPositive && dist > 0) return dist;

    joint[rotationalAngle] = oldAngle;
    if (joint instanceof Head) {
        // head and neck
        joint.parentJoint[rotationalAngle] = oldParentAngle;
    }
    joint.updateMatrixWorld(true);

    return dist;
}

export function inverseKinematics(
    joint: Joint | Mannequin,
    rotationalAngle: RotationalAngle,
    step: number,
    control: Control
) {
    // try going in postive or negative direction
    let kPos = kinematic2D(joint, rotationalAngle, 0.001, undefined, control),
        kNeg = kinematic2D(joint, rotationalAngle, -0.001, undefined, control);

    // if any of them improves closeness, then turn in this direction
    if (kPos > 0 || kNeg > 0) {
        if (kPos < kNeg) step = -step;
        kinematic2D(joint, rotationalAngle, step, true, control);
    }
}

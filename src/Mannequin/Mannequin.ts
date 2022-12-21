import * as THREE from 'three';
import {
    Ankle,
    Arm,
    Body,
    Elbow,
    Fingers,
    Head,
    Knee,
    Leg,
    Neck,
    Pelvis,
    Toes,
    Torso,
    Wrist,
} from '../Parts/index';
import { config } from '../config';
import { MannequinPostureVersionError } from './MannequinPostureVersionError';
export { MannequinPostureVersionError };
export const MANNEQUIN_VERSION = 4.41;
export const MANNEQUIN_POSTURE_VERSION = 6;
export const AXIS = {
    x: new THREE.Vector3(1, 0, 0),
    y: new THREE.Vector3(0, 1, 0),
    z: new THREE.Vector3(0, 0, 1),
};
export class Mannequin extends THREE.Group {
    feminine: boolean;
    body: Body;
    pelvis: Pelvis;
    torso: Torso;
    neck: Neck;
    head: Head;
    l_leg: Leg;
    l_knee: Knee;
    l_ankle: Ankle;
    l_toes!: Toes;
    r_leg: Leg;
    r_knee: Knee;
    r_ankle: Ankle;
    r_toes!: Toes;
    l_arm: Arm;
    l_elbow: Elbow;
    l_wrist: Wrist;
    l_fingers: Fingers;
    l_fingers2!: Fingers;
    l_fingers3!: Fingers;
    l_fingers4!: Fingers;
    l_fingers5!: Fingers;
    r_arm: Arm;
    r_elbow: Elbow;
    r_wrist: Wrist;
    r_fingers: Fingers;
    r_fingers2!: Fingers;
    r_fingers3!: Fingers;
    r_fingers4!: Fingers;
    r_fingers5!: Fingers;
    constructor(feminine: boolean, height = 1) {
        super();
        const { detailedModel: detailedmodel } = config;
        const LEFT = -1;
        const RIGHT = 1;
        this.scale.set(height, height, height);
        this.feminine = feminine;
        this.body = new Body(feminine);
        this.pelvis = new Pelvis(this.body);
        this.torso = new Torso(this.pelvis);
        this.neck = new Neck(this.torso);
        this.head = new Head(this.neck);
        this.l_leg = new Leg(this.pelvis, LEFT);
        this.l_knee = new Knee(this.l_leg);
        this.l_ankle = new Ankle(this.l_knee, LEFT);
        if (detailedmodel) {
            this.l_toes = new Toes(this.l_ankle);
        }
        this.r_leg = new Leg(this.pelvis, RIGHT);
        this.r_knee = new Knee(this.r_leg);
        this.r_ankle = new Ankle(this.r_knee, RIGHT);
        if (detailedmodel) {
            this.r_toes = new Toes(this.r_ankle);
        }
        this.l_arm = new Arm(this.torso, LEFT);
        this.l_elbow = new Elbow(this.l_arm);
        this.l_wrist = new Wrist(this.l_elbow);
        if (detailedmodel) {
            config.fingerCount = 0;
            this.l_fingers = new Fingers(this.l_wrist);
            this.l_fingers2 = new Fingers(this.l_wrist);
            this.l_fingers3 = new Fingers(this.l_wrist);
            this.l_fingers4 = new Fingers(this.l_wrist);
            this.l_fingers5 = new Fingers(this.l_wrist);
            this.l_fingers2.position.set(0, 2, -0.9);
            this.l_fingers.position.set(0.1, 2, -0.25);
            this.l_fingers3.position.set(0.07, 2, 0.35);
            this.l_fingers4.position.set(0, 2, 0.9);
            this.l_fingers5.position.set(-0.15, 1, -1);
            this.l_fingers5.rotation.x = -2.1;
            this.l_fingers5.rotation.y = 1;
            this.l_fingers5.rotation.z = -2.5;
        } else {
            this.l_fingers = new Fingers(this.l_wrist);
        }
        this.r_arm = new Arm(this.torso, RIGHT);
        this.r_elbow = new Elbow(this.r_arm);
        this.r_wrist = new Wrist(this.r_elbow);
        if (detailedmodel) {
            config.fingerCount = 0;
            this.r_fingers = new Fingers(this.r_wrist);
            this.r_fingers2 = new Fingers(this.r_wrist);
            this.r_fingers3 = new Fingers(this.r_wrist);
            this.r_fingers4 = new Fingers(this.r_wrist);
            this.r_fingers5 = new Fingers(this.r_wrist);
            this.r_fingers2.position.set(0, 2, 0.9);
            this.r_fingers.position.set(0.1, 2, 0.25);
            this.r_fingers3.position.set(0.07, 2, -0.35);
            this.r_fingers4.position.set(0, 2, -0.9);
            this.r_fingers5.position.set(-0.15, 1, 1);
            this.r_fingers5.rotation.x = 2.1;
            this.r_fingers5.rotation.y = -1;
            this.r_fingers5.rotation.z = 2.5;
        } else {
            this.r_fingers = new Fingers(this.r_wrist);
        }
        this.add(this.body as unknown as THREE.Object3D);
        const s = 1.5 / (0.5 + height);
        this.head.scale.set(s, s, s);
        this.castShadow = true;
        this.receiveShadow = true;
        config.scene.add(this);
        this.updateMatrix();
        this.updateWorldMatrix(false, false);
        this.body.turn = -90;
        this.torso.bend = 2;
        this.head.nod = -10;
        this.l_arm.raise = -5;
        this.r_arm.raise = -5;
        this.l_arm.straddle = 7;
        this.r_arm.straddle = 7;
        this.l_elbow.bend = 15;
        this.r_elbow.bend = 15;
        this.l_wrist.bend = -15;
        this.r_wrist.bend = -15;
        if (detailedmodel) {
            this.l_fingers.bend = 10;
            this.l_fingers2.bend = 10;
            this.l_fingers3.bend = 10;
            this.l_fingers4.bend = 10;
            this.l_fingers5.bend = 5;
            this.r_fingers.bend = 10;
            this.r_fingers2.bend = 10;
            this.r_fingers3.bend = 10;
            this.r_fingers4.bend = 10;
            this.r_fingers5.bend = 5;
        } else {
            this.l_fingers.bend = 10;
            this.r_fingers.bend = 10;
        }
    }
    get bend() {
        return -this.body.z;
    }
    set bend(angle) {
        this.body.z = -angle;
    }
    get tilt() {
        return this.body.x;
    }
    set tilt(angle) {
        this.body.x = angle;
    }
    get turn() {
        return this.body.y;
    }
    set turn(angle) {
        this.body.y = angle;
    }
    get posture() {
        const posture = [
            [
                Number(this.body.position.x.toFixed(1)),
                Number(this.body.position.y.toFixed(1)),
                Number(this.body.position.z.toFixed(1)),
            ],
            this.body.posture,
            this.torso.posture,
            this.head.posture,
            this.l_leg.posture,
            this.l_knee.posture,
            this.l_ankle.posture,
            this.r_leg.posture,
            this.r_knee.posture,
            this.r_ankle.posture,
            this.l_arm.posture,
            this.l_elbow.posture,
            this.l_wrist.posture,
            this.l_fingers.posture,
            this.r_arm.posture,
            this.r_elbow.posture,
            this.r_wrist.posture,
            this.r_fingers.posture,
        ];
        return {
            version: MANNEQUIN_POSTURE_VERSION,
            data: posture,
        };
    }
    set posture(posture) {
        this.changePosture(posture);
    }
    get postureString() {
        return JSON.stringify(this.posture);
    }
    set postureString(string) {
        this.posture = JSON.parse(string);
    }
    changePosture(posture, resetPosition = true) {
        if (posture.version != MANNEQUIN_POSTURE_VERSION)
            throw new MannequinPostureVersionError(posture.version);
        let i = 0;
        const posdata = posture.data[i++];
        // 唯独 body 是全局相对坐标

        if (posdata.length > 1) {
            this.body.position.set(...(posdata as [number, number, number]));
        } else if (typeof posdata === 'number') {
            this.body.position.set(0, posdata, 0);
        } else {
            this.body.position.set(0, posdata[0], 0);
        }

        this.body.posture = posture.data[i++];
        this.torso.posture = posture.data[i++];
        this.head.posture = posture.data[i++];
        this.l_leg.posture = posture.data[i++];
        this.l_knee.posture = posture.data[i++];
        this.l_ankle.posture = posture.data[i++];
        this.r_leg.posture = posture.data[i++];
        this.r_knee.posture = posture.data[i++];
        this.r_ankle.posture = posture.data[i++];
        this.l_arm.posture = posture.data[i++];
        this.l_elbow.posture = posture.data[i++];
        this.l_wrist.posture = posture.data[i++];
        this.l_fingers.posture = posture.data[i++];
        this.r_arm.posture = posture.data[i++];
        this.r_elbow.posture = posture.data[i++];
        this.r_wrist.posture = posture.data[i++];
        this.r_fingers.posture = posture.data[i++];
        if (config.detailedModel) {
            this.l_fingers2.posture =
                this.l_fingers3.posture =
                this.l_fingers4.posture =
                    this.l_fingers.posture;
            this.r_fingers2.posture =
                this.r_fingers3.posture =
                this.r_fingers4.posture =
                    this.r_fingers.posture;
        }
    }
    static colors = ['white', 'white', 'white', 'white', 'white', 'white'];
    static texHead = new THREE.TextureLoader().load(
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAFiUAABYlAUlSJPAAAAB9SURBVHhe7dCxAQAgDICw6v8/Vwe+gCzsnP1G7FKtBlCtBlCtBlCtBlCtBlCtBlCtBlCtBlCtBlCtBlCtBlCtBlCtBlCtBlCtBlCtBlCtBlCtBlCtBlCtBlCtBlCtBlCtBlCtBlCtBlCtBlCtBlCtBlCtBlCtBlCtBlCpmQdVOgR8MR1eowAAAABJRU5ErkJggg=='
    );
    static texLimb = new THREE.TextureLoader().load(
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAFiUAABYlAUlSJPAAAAB9SURBVHhe7dCxAQAgDICw6v8/Vwe+gCzsnP1G7FKtBlCtBlCtBlCtBlCtBlCtBlCtBlCtBlCtBlCtBlCtBlCtBlCtBlCtBlCtBlCtBlCtBlCtBlCtBlCtBlCtBlCtBlCtBlCtBlCtBlCtBlCtBlCtBlCtBlCtBlCtBlCpmQdVOgR8MR1eowAAAABJRU5ErkJggg=='
    );
    static sphereTemplate = new THREE.Mesh(
        new THREE.SphereGeometry(1, 16, 8),
        new THREE.MeshPhongMaterial({
            color: config.modelColor,
            shininess: 1,
            precision: 'mediump',
        })
    );
    static cossers(u: number, v: number, params: number[][]) {
        function cosser(t: number, min: number, max: number) {
            if (t < min) t++;
            if (t > max) t--;
            if (min <= t && t <= max)
                return 0.5 + 0.5 * Math.cos(((t - min) / (max - min)) * 2 * Math.PI - Math.PI);
            return 0;
        }
        for (var i = 0, r = 1; i < params.length; i++)
            r +=
                (cosser(u, params[i][0], params[i][1]) * cosser(v, params[i][2], params[i][3])) /
                params[i][4];
        return r;
    }

    static blend(
        posture0: { version: number; data: (number | number[])[] },
        posture1: { version: number; data: (number | number[])[] },
        k: number,
        timeScale = (a: number, b: number, percent: number) => {
            return a * (1 - percent) + percent * b;
        }
    ) {
        // console.log(posture0, posture1);
        if (posture0.version != posture1.version) throw 'Incompatibe posture blending.';

        const blendPos = (pos1: number[], pos2: number[]) => {
            [...pos1, ...pos2].some((i) => isNaN(i)) && console.error('NaN cause Error');
            const result = [];
            for (let index = 0; index < pos1.length; index++) {
                const data0 = pos1[index];
                const data1 = pos2[index];
                result.push(timeScale(data0, data1, k));
            }
            return result;
        };
        const FillPos = (i: number | number[]) => {
            if (typeof i === 'number') {
                return [0, i, 0];
            } else if (i.length > 3) {
                return i.slice(0, 3);
            } else {
                i.length = 3;
                for (let index = 0; index < i.length; index++) {
                    const element = i[index];
                    i[index] = typeof element === 'number' ? element : 0;
                }
                return i;
            }
        };
        const final = {
            version: posture1.version,
            data: posture0.data.map((i, index) => {
                return blendPos(FillPos(i), FillPos(posture1.data[index]));
            }),
        };
        return final;
    }
}
Mannequin.sphereTemplate.castShadow = true;
Mannequin.sphereTemplate.receiveShadow = true;

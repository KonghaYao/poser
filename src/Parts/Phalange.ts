import * as THREE from "three";
import { LimbShape } from "./LimbShape";
import { Joint } from "./Joint";

export class Phalange extends Joint {
    constructor(parentJoint: Joint, params: unknown[]) {
        super(parentJoint, null, params, LimbShape);
        this.minRot = new THREE.Vector3(0, 0, -10);
        this.maxRot = new THREE.Vector3(0, 0, 100);
    }
    get bend() {
        return this.z;
    }
    set bend(angle) {
        this.z = angle;
    }
}

import * as THREE from "three";
import { ToePhalange } from "./ToePhalange";

export class Toes extends ToePhalange {
    constructor(parentJoint) {
        if (detailedmodel) {
            super(parentJoint, [0, 0, 0, 45, 20, 0.3, 0.4, 0]);
            this.position.set(4.2, 2.2, 0);
            this.rotation.z = -1.5;
            this.minRot = new THREE.Vector3(0, 0, -180);
            this.maxRot = new THREE.Vector3(0, 0, 40);
        }
    }
    get bend() {
        return this.z;
    }
    set bend(angle) {
        this.z = angle;
    }
}

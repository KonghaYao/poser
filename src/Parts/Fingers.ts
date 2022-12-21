import * as THREE from "three";
import { grad, rad } from "./utils";
import { Phalange } from "./Phalange";
import { Joint } from "./Joint";
import { config } from "../config";

export class Fingers extends Phalange {
    tips: Phalange;
    constructor(parentJoint: Joint) {
        const {
            animeModel: animemodel,
            animeModel2: animemodel2,
            bodyBuilder: bodybuilder,
            detailedModel: detailedmodel,
        } = config;
        if (detailedmodel) {
            config.fingerCount++;
            var fingerwidth = 0.8;
            var fingertiplength = 1.2;
            var fingerbottomlength = 1.3;
            switch (config.fingerCount) {
                case 1:
                    fingertiplength = 1.3;
                    fingerbottomlength = 1.45;
                    break;
                case 2:
                    break;
                case 3:
                    break;
                case 4:
                    fingerwidth = 0.64;
                    fingertiplength = 0.9;
                    fingerbottomlength = 0.9;
                    break;
                case 5:
                    fingertiplength = 0.8;
                    fingerbottomlength = 0.8;
                    break;
                default:
            }
            super(parentJoint, [
                fingerwidth,
                fingerbottomlength,
                fingerwidth,
                0,
                45,
                0.3,
                0.4,
                0.2,
            ]);
            this.tips = new Phalange(this, [
                fingerwidth,
                fingertiplength,
                fingerwidth,
                45,
                45,
                0.3,
                0.4,
                0.2,
            ]);
            this.minRot = new THREE.Vector3(-180, 180, -180);
            this.maxRot = new THREE.Vector3(180, 180, 180);
        } else {
            super(parentJoint, [1.2, 1.5, 3.5, 0, 45, 0.3, 0.4, 0.2]);
            this.tips = new Phalange(
                this,
                [1.2, 1, 3.5, 45, 45, 0.3, 0.4, 0.2]
            );
            this.minRot = new THREE.Vector3(0, 0, -10);
            this.maxRot = new THREE.Vector3(0, 0, 120);
        }
    }
    get bend() {
        return this.z;
    }
    set bend(angle) {
        this.z = this.tips.z = angle;
    }
    get turn() {
        return 2 * this.y;
    }
    set turn(angle) {
        this.y = angle / 2;
        this.tips.y = angle / 2;
    }
    get posture() {
        this.rotation.reorder("XYZ");
        this.tips.rotation.reorder("XYZ");
        return [grad(this.rotation.z), grad(this.tips.rotation.z)];
    }
    set posture(pos) {
        this.rotation.set(0, 0, rad(pos[0]), "XYZ");
        this.tips.rotation.set(0, 0, rad(pos[1]), "XYZ");
    }
}

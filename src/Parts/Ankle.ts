import * as THREE from "three";
import { Mannequin } from "../Mannequin/Mannequin";
import { config } from "../config";
import { ShoeShape } from "./ShoeShape";
import { Joint } from "./Joint";

export class Ankle extends Joint {
    leftOrRight: -1 | 1;
    constructor(parentJoint: Joint, leftOrRight: -1 | 1) {
        const {
            animeModel: animemodel,
            animeModel2: animemodel2,
            bodyBuilder: bodybuilder,
            detailedModel: detailedmodel,
            drawingGuide: drawingguide,
            drawingGuideColor: drawingguidecolor,
        } = config;
        super(parentJoint, null, [1, 4, 2], ShoeShape);
        this.leftOrRight = parentJoint.parentJoint.leftOrRight;
        if (animemodel || animemodel2 || detailedmodel || bodybuilder) {
            if (this.leftOrRight == -1) {
                const scale = new THREE.Vector3(1, 1, 1);
                scale.z *= -1;
                this.scale.multiply(scale);
                this.position.set(
                    this.position.x,
                    this.position.y,
                    this.position.z * -1
                );
            }
        }
        if (drawingguide) {
            var s = Mannequin.sphereTemplate.clone();
            s.material = new THREE.MeshPhongMaterial({
                color: drawingguidecolor,
                shininess: 1,
                precision: "mediump",
            });
            s.scale.set(1, 1, 1);
            s.position.set(0, 0.5, 0);
            this.add(s);
        }
        this.minRot = new THREE.Vector3(-25, -30, -70);
        this.maxRot = new THREE.Vector3(25, 30, 80);
    }
    get bend() {
        return -this.z;
    }
    set bend(angle) {
        this.z = -angle;
    }
    get tilt() {
        return this.leftOrRight * this.x;
    }
    set tilt(angle) {
        this.x = this.leftOrRight * angle;
    }
    get turn() {
        return this.leftOrRight * this.y;
    }
    set turn(angle) {
        this.y = this.leftOrRight * angle;
    }
}

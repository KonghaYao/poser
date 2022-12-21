import * as THREE from "three";
import { grad, rad } from "./utils";
import { config } from "../config";
import { LimbShape } from "./LimbShape";
import { Joint } from "./Joint";

export class Elbow extends Joint {
    constructor(parentJoint: Joint) {
        const {
             bodyBuilder,
            drawingGuide,
            drawingGuideColor,
        } = config;
        if (bodyBuilder) {
            super(
                parentJoint,
                null,
                [3, 11, 3, -45, 160, 0.5, 0.45, 1.1],
                LimbShape
            );
        } else {
            super(
                parentJoint,
                null,
                [2.5, 11, 2, -40, 150, 0.5, 0.45, 1.1],
                LimbShape
            );
        }
        this.minRot = new THREE.Vector3(0, 0, 0);
        this.maxRot = new THREE.Vector3(0, 0, 150);
        if (drawingGuide) {
            var dgline = new THREE.Mesh(
                new THREE.CylinderGeometry(
                    0.25,
                    0.25,
                    10.5,
                    8,
                    1,
                    false,
                    0,
                    6.28
                ),
                new THREE.MeshPhongMaterial({
                    color: drawingGuideColor,
                    shininess: 1,
                    precision: "mediump",
                })
            );
            dgline.position.set(0, 5.5, -this.parentJoint.leftOrRight * -0);
            this.children[0].add(dgline);
        }
    }
    get bend() {
        return this.z;
    }
    set bend(angle) {
        this.z = angle;
    }
    get posture() {
        this.rotation.reorder("XYZ");
        return [grad(this.rotation.z)];
    }
    set posture(pos) {
        this.rotation.set(0, 0, rad(pos[0]), "XYZ");
    }
}

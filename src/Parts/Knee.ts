import * as THREE from "three";
import { grad, rad } from "./utils";
import { config } from "../config";
import { LimbShape } from "./LimbShape";
import { Joint } from "./Joint";

export class Knee extends Joint {
    constructor(parentJoint: Joint) {
        const {
            animeModel: animemodel,
            animeModel2: animemodel2,
            bodyBuilder: bodybuilder,
            detailedModel: detailedmodel,
            detailedModel2: detailedmodel2,
            drawingGuide: drawingguide,
            modelColor: modelcolor,
            transparentModel: transparantmodel,
            drawingGuideColor: drawingguidecolor,
        } = config;
        if (detailedmodel) {
            super(
                parentJoint,
                null,
                [4, 14, 4, -40, 290, 0.65, 0.25, 1.5],
                LimbShape
            );
            if (!drawingguide) {
                var shin = new THREE.Mesh(
                    new THREE.CylinderGeometry(
                        0.5,
                        0.9,
                        10,
                        8,
                        1,
                        false,
                        0,
                        6.28
                    ),
                    new THREE.MeshPhongMaterial({
                        color: modelcolor,
                        shininess: 1,
                        precision: "mediump",
                    })
                );
                shin.position.set(
                    0.65,
                    8.2,
                    -this.parentJoint.leftOrRight * -0
                );
                shin.rotation.set(
                    -this.parentJoint.leftOrRight * 0.008,
                    0,
                    0.045
                );
                shin.scale.set(1, 1, 1);
                if (transparantmodel) {
                    shin.material.transparent = true;
                    shin.material.opacity = 0.6;
                }
                this.children[0].add(shin);
                var kneepoints = [
                    new THREE.Vector2(0.58, 0.04),
                    new THREE.Vector2(0.54, -0.06),
                    new THREE.Vector2(0.4, -0.16),
                    new THREE.Vector2(0, -0.17),
                ];
                var knee = new THREE.Mesh(
                    new THREE.LatheGeometry(
                        kneepoints,
                        16,
                        0,
                        6.283185307179586
                    ),
                    new THREE.MeshPhongMaterial({
                        color: modelcolor,
                        shininess: 1,
                        side: 2,
                        precision: "mediump",
                    })
                );
                knee.position.set(1, 0, 0);
                knee.rotation.set(0, 0, Math.PI / 2);
                knee.scale.set(2.3, 4, 1.8);
                if (transparantmodel) {
                    knee.material.transparent = true;
                    knee.material.opacity = 0.6;
                }
                this.children[0].add(knee);
            }
        } else if (bodybuilder) {
            super(
                parentJoint,
                null,
                [4.3, 14, 4.3, -80, 290, 0.65, 0.25, 1.5],
                LimbShape
            );
        } else {
            super(
                parentJoint,
                null,
                [4, 14, 4, -40, 290, 0.65, 0.25, 1.5],
                LimbShape
            );
        }
        if (drawingguide) {
            var dgline = new THREE.Mesh(
                new THREE.CylinderGeometry(
                    0.25,
                    0.25,
                    13,
                    8,
                    1,
                    false,
                    0,
                    6.28
                ),
                new THREE.MeshPhongMaterial({
                    color: drawingguidecolor,
                    shininess: 1,
                    precision: "mediump",
                })
            );
            dgline.position.set(0, 7.5, -this.parentJoint.leftOrRight * -0);
            this.children[0].add(dgline);
        }
        this.minRot = new THREE.Vector3(0, 0, 0);
        this.maxRot = new THREE.Vector3(0, 0, 150);
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

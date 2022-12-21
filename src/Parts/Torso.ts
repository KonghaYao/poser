import * as THREE from "three";
import { config } from "../config";
import { CustomTorsoShape } from "./CustomTorsoShape";
import { TorsoShape } from "./TorsoShape";
import { Joint } from "./Joint";

export class Torso extends Joint {
    constructor(parentJoint) {
        const {
            animeModel: animemodel,
            animeModel2: animemodel2,
            bodyBuilder: bodybuilder,
            detailedModel: detailedmodel,
            detailedModel2: detailedmodel2,
            drawingGuide: drawingguide,
            drawingGuideColor: drawingguidecolor,
        } = config;
        if (animemodel || animemodel2 || detailedmodel || bodybuilder) {
            super(parentJoint, [-2, 4, 0], [0, 0, 0], CustomTorsoShape);
        } else {
            super(
                parentJoint,
                [-2, 4, 0],
                [
                    5,
                    17,
                    10,
                    parentJoint.feminine ? 10 : 80,
                    parentJoint.feminine ? 520 : 380,
                    parentJoint.feminine ? 0.8 : 0.9,
                    parentJoint.feminine ? 0.25 : 0.2,
                ],
                TorsoShape
            );
        }
        if (drawingguide) {
            var dgline = new THREE.Mesh(
                new THREE.CylinderGeometry(
                    0.25,
                    0.25,
                    10,
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
            dgline.position.set(0, 14, 0);
            dgline.rotation.set(Math.PI / 2, 0, 0);
            this.add(dgline);
            var dgline2 = new THREE.Mesh(
                new THREE.CylinderGeometry(
                    0.25,
                    0.25,
                    16,
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
            dgline2.position.set(0, 6, 2.4);
            dgline2.rotation.set(0.38, 0, 0);
            this.add(dgline2);
            var dgline3 = new THREE.Mesh(
                new THREE.CylinderGeometry(
                    0.25,
                    0.25,
                    16,
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
            dgline3.position.set(0, 6, -2.4);
            dgline3.rotation.set(-0.38, 0, 0);
            this.add(dgline3);
        }
        this.minRot = new THREE.Vector3(-25, -50, -60);
        this.maxRot = new THREE.Vector3(25, 50, 25);
    }
    get bend() {
        return -this.z;
    }
    set bend(angle) {
        this.z = -angle;
    }
    get tilt() {
        return -this.x;
    }
    set tilt(angle) {
        this.x = -angle;
    }
    get turn() {
        return this.y;
    }
    set turn(angle) {
        this.y = angle;
    }
}

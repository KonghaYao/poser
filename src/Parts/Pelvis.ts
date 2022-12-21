import * as THREE from "three";
import { config } from "../config";
import { PelvisShape } from "./PelvisShape";
import { Joint } from "./Joint";

export class Pelvis extends Joint {
    constructor(parentJoint: Joint) {
        const {
            animeModel: animemodel,
            animeModel2: animemodel2,
            drawingGuide: drawingguide,
            drawingGuideColor: drawingguidecolor,
        } = config;
        if (animemodel || animemodel2) {
            super(
                parentJoint,
                null,
                [3, 4, parentJoint.feminine ? 5.5 : 5],
                PelvisShape
            );
        } else {
            super(
                parentJoint,
                null,
                [3, 4, parentJoint.feminine ? 5.5 : 5],
                PelvisShape
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
            dgline.position.set(-1, -3, 0);
            dgline.rotation.set(Math.PI / 2, 0, 0);
            this.add(dgline);
            var dgline2 = new THREE.Mesh(
                new THREE.CylinderGeometry(0.25, 0.25, 6, 8, 1, false, 0, 6.28),
                new THREE.MeshPhongMaterial({
                    color: drawingguidecolor,
                    shininess: 1,
                    precision: "mediump",
                })
            );
            dgline2.position.set(-1.5, 0, 2.15);
            dgline2.rotation.set(2.6, 0, -0.15);
            this.add(dgline2);
            var dgline3 = new THREE.Mesh(
                new THREE.CylinderGeometry(0.25, 0.25, 6, 8, 1, false, 0, 6.28),
                new THREE.MeshPhongMaterial({
                    color: drawingguidecolor,
                    shininess: 1,
                    precision: "mediump",
                })
            );
            dgline3.position.set(-1.5, 0, -2.15);
            dgline3.rotation.set(-2.6, 0, -0.15);
            this.add(dgline3);
        }
        this.minRot = new THREE.Vector3(
            Number.NEGATIVE_INFINITY,
            Number.NEGATIVE_INFINITY,
            Number.NEGATIVE_INFINITY
        );
        this.maxRot = new THREE.Vector3(
            Number.POSITIVE_INFINITY,
            Number.POSITIVE_INFINITY,
            Number.POSITIVE_INFINITY
        );
    }
}

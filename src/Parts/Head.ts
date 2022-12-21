import * as THREE from "three";
import { grad, rad } from "./utils";
import { CustomHeadShape } from "./CustomHeadShape";
import { HeadShape } from "./HeadShape";
import { config } from "../config";
import { Joint } from "./Joint";

export class Head extends Joint {
    constructor(parentJoint: Joint) {
        const {
            animeModel: animemodel,
            animeModel2: animemodel2,
            bodyBuilder: bodybuilder,
            detailedModel: detailedmodel,
            detailedModel2: detailedmodel2,
            drawingGuide: drawingguide,
            drawingGuideColor: drawingguidecolor,
        } = config;
        if (animemodel || animemodel2 || detailedmodel) {
            super(parentJoint, [0, 4, 0], [1, 5, 2], CustomHeadShape);
        } else {
            super(parentJoint, [1, 3, 0], [3, 4, 2.5], HeadShape);
        }
        this.minRot = new THREE.Vector3(-45 / 2, -90 / 2, -60 / 2);
        this.maxRot = new THREE.Vector3(45 / 2, 90 / 2, 50 / 2);
    }
    get nod() {
        return -2 * this.z;
    }
    set nod(angle) {
        this.z = -angle / 2;
        this.parentJoint.z = -angle / 2;
    }
    get tilt() {
        return -2 * this.x;
    }
    set tilt(angle) {
        this.x = -angle / 2;
        this.parentJoint.x = -angle / 2;
    }
    get turn() {
        return 2 * this.y;
    }
    set turn(angle) {
        this.y = angle / 2;
        this.parentJoint.y = angle / 2;
    }
    get posture() {
        this.rotation.reorder("XYZ");
        return [
            grad(this.rotation.x),
            grad(this.rotation.y),
            grad(this.rotation.z),
        ];
    }
    set posture(pos) {
        this.rotation.set(rad(pos[0]), rad(pos[1]), rad(pos[2]), "XYZ");
        this.parentJoint.rotation.set(
            rad(pos[0]),
            rad(pos[1]),
            rad(pos[2]),
            "XYZ"
        );
    }
}

import * as THREE from "three";
import { config } from "../config";
import { LimbShape } from "./LimbShape";
import { Joint } from "./Joint";

export class Neck extends Joint {
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
            super(
                parentJoint,
                [0, 15, 0],
                [2.7, parentJoint.feminine ? 5 : 4, 2.7, 45, 60, 1, 0.2, 0],
                LimbShape
            );
        } else if (bodybuilder) {
            super(
                parentJoint,
                [0, 15, 0],
                [2.7, 7.5, 2.7, 45, 60, 1, 0.2, 0],
                LimbShape
            );
        } else {
            super(
                parentJoint,
                [0, 15, 0],
                [2, parentJoint.feminine ? 5 : 4, 2, 45, 60, 1, 0.2, 0],
                LimbShape
            );
        }
        this.minRot = new THREE.Vector3(-45 / 2, -90 / 2, -60);
        this.maxRot = new THREE.Vector3(45 / 2, 90 / 2, 50 / 2);
    }
}

import * as THREE from "three";
import { config } from "../config";
import { LimbShape } from "./LimbShape";
import { Joint } from "./Joint";

export class Leg extends Joint {
    leftOrRight: -1 | 1;
    constructor(parentJoint: Joint, leftOrRight: -1 | 1) {
        const {
            animeModel: animemodel,
            animeModel2: animemodel2,
            bodyBuilder: bodybuilder,
            detailedModel: detailedmodel,
            detailedModel2: detailedmodel2,
            drawingGuide: drawingguide,
            drawingGuideColor: drawingguidecolor,
        } = config;
        if (detailedmodel) {
            super(
                parentJoint,
                [-1, -3, 3.5 * leftOrRight],
                [4, 15, 4, -70, 220, 1, 0.4, 2],
                LimbShape
            );
        } else if (animemodel || animemodel2) {
            super(
                parentJoint,
                [-1, -3, 3.5 * leftOrRight],
                [4, 15, 4, -70, 220, 1, 0.4, 2],
                LimbShape
            );
        } else if (bodybuilder) {
            super(
                parentJoint,
                [-1, -3, 3 * leftOrRight],
                [4.7, 15, 4.7, -70, 220, 1, 0.4, 2],
                LimbShape
            );
        } else {
            super(
                parentJoint,
                [-1, -3, 3.5 * leftOrRight],
                [4, 15, 4, -70, 220, 1, 0.4, 2],
                LimbShape
            );
        }
        this.leftOrRight = leftOrRight;
        this.imageWrapper.rotation.set(Math.PI, 0, 0);
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
            dgline.position.set(0, 8, 0);
            this.children[0].add(dgline);
        }
    }
    biologicallyImpossibleLevel() {
        var result = 0;
        this.image.updateWorldMatrix(true);
        var p = this.getBumper(5, 0, 0);
        if (p.x < 0) result += -p.x;
        this.rotation.reorder("ZXY");
        var y = this.y;
        if (y > +60) result += y - 60;
        if (y < -60) result += -60 - y;
        return result;
    }
    get raise() {
        return this.z;
    }
    set raise(angle) {
        this.z = angle;
    }
    get straddle() {
        return -this.leftOrRight * this.x;
    }
    set straddle(angle) {
        this.x = -this.leftOrRight * angle;
    }
    get turn() {
        return -this.leftOrRight * this.y;
    }
    set turn(angle) {
        this.y = -this.leftOrRight * angle;
    }
}

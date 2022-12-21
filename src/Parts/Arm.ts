import * as THREE from "three";
import { config } from "../config";
import { LimbShape } from "./LimbShape";
import { Joint } from "./Joint";

export class Arm extends Joint {
    leftOrRight: -1 | 1;
    constructor(parentJoint: Joint, leftOrRight: -1 | 1) {
        const {
            bodyBuilder: bodybuilder,
            drawingGuide: drawingguide,
            drawingGuideColor: drawingguidecolor,
        } = config;
        if (bodybuilder) {
            super(
                parentJoint,
                [0, 14, leftOrRight * 7.5],
                [4, 11, 3.2, -140, 360, 0.9, 0.25, 1.7],
                LimbShape
            );
        } else {
            super(
                parentJoint,
                [0, 14, leftOrRight * (parentJoint.feminine ? 5 : 6)],
                [3.5, 11, 2.5, -90, 360, 0.9, 0.2, 1.5],
                LimbShape
            );
        }
        this.leftOrRight = leftOrRight;
        this.imageWrapper.rotation.set(Math.PI, Math.PI, 0);
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
            dgline.position.set(0, -5, 0);
            this.add(dgline);
        }
    }
    biologicallyImpossibleLevel() {
        var result = 0;
        this.image.updateWorldMatrix(true);
        var p = this.getBumper(0, 15, -0 * 5 * this.leftOrRight);
        if (p.z * this.leftOrRight < -3) result += -3 - p.z * this.leftOrRight;
        if (p.x < -7 && p.y > 0) result = p.y;
        this.rotation.reorder("ZXY");
        var r = (this.rotation.y * 180) / Math.PI;
        var min = -90;
        var max = 90;
        if (r > max) result += r - max;
        if (r < min) result += min - r;
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

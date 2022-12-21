import * as THREE from "three";
import { sin, cos } from "./utils";
import { Mannequin } from "../Mannequin/Mannequin";
import { ParametricShape } from "./ParametricShape";
import { config } from "../config";

export class LimbShape extends ParametricShape {
    constructor(feminine: boolean, params: number[], nU = 24, nV = 32) {
        const [x, y, z, alpha, dAlpha, offset, scale, rad] = params;
        super(
            Mannequin.texLimb,
            config.modelColor,
            function (u, v, target) {
                v = 360 * v;
                var r = offset + scale * cos(alpha + dAlpha * u);
                target.set((x * r * cos(v)) / 2, y * u, (z * r * sin(v)) / 2);
                var w = new THREE.Vector3(
                    (x * cos(v) * cos(170 * u - 85)) / 2,
                    y * (1 / 2 + sin(180 * u - 90) / 2),
                    (z * sin(v) * cos(180 * u - 90)) / 2
                );
                target = target.lerp(w, Math.pow(Math.abs(2 * u - 1), 16));
            },
            nU,
            nV
        );
        this.children[0].position.set(0, -y / 2, 0);
        if (rad) this.addSphere(rad ? rad : z / 2, -y / 2);
    }
}

import * as THREE from "three";
import { sin, cos } from "./utils";
import { Mannequin } from "../Mannequin/Mannequin";
import { ParametricShape } from "./ParametricShape";
import { config } from "../config";

export class PelvisShape extends ParametricShape {
    constructor(feminine: boolean, params) {
        super(
            Mannequin.texLimb,
            config.modelColor,
            function (u, v, target) {
                var r = Mannequin.cossers(u, v, [
                    [0.6, 0.95, 0, 1, 4],
                    [0.7, 1.0, 0.475, 0.525, -13],
                    [-0.2, 0.3, 0, 0.3, -4],
                    [-0.2, 0.3, -0.3, 0, -4],
                ]);
                u = 360 * u - 90;
                v = 180 * v - 90;
                target.set(
                    -1.5 + r * params[0] * cos(u) * Math.pow(cos(v), 0.6),
                    r * params[1] * sin(u) * Math.pow(cos(v), 0.6),
                    r * params[2] * sin(v)
                );
            },
            32,
            32
        );
    }
}

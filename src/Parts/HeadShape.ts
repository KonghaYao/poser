import * as THREE from "three";
import { sin, cos } from "./utils";
import { Mannequin } from "../Mannequin/Mannequin";
import { ParametricShape } from "./ParametricShape";
import { config } from "../config";

export class HeadShape extends ParametricShape {
    constructor(feminine: boolean, params) {
        const { modelColor: modelcolor } = config;
        super(
            Mannequin.texHead,
            modelcolor,
            function (u, v, target) {
                var r = Mannequin.cossers(u, v, [[0.4, 0.9, 0, 1, -3]]);
                u = 360 * u;
                v = 180 * v - 90;
                var k = (1 + (feminine ? 1 : 2) * sin(u) * cos(v)) / 10;
                target.set(
                    r * params[0] * cos(u) * cos(v),
                    r * params[1] * sin(u) * cos(v),
                    (r + k) * params[2] * sin(v)
                );
            },
            32,
            32
        );
    }
}

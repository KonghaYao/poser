import * as THREE from "three";
import { sin, cos } from "./utils";
import { Mannequin } from "../Mannequin/Mannequin";
import { ParametricShape } from "./ParametricShape";
import { config } from "../config";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

export class ShoeShape extends THREE.Group {
    constructor(feminine: boolean, params: number[]) {
        const {
            detailedModel: detailedmodel,
            transparentModel: transparantmodel,
            animeModel: animemodel,
            animeModel2: animemodel2,
            bodyBuilder: bodybuilder,
            modelColor: modelcolor,
        } = config;
        if (detailedmodel) {
            super();
            const loader = new OBJLoader();
            var footObj = this;
            var footModel;
            loader.load("./props/foot-heel.obj", function (object) {
                footModel = object.children[0];
                footModel.material = new THREE.MeshPhongMaterial({
                    color: modelcolor,
                    shininess: 1,
                    precision: "mediump",
                });
                if (transparantmodel) {
                    footModel.material.transparent = true;
                    footModel.material.opacity = 0.6;
                }
                footModel.receiveShadow = true;
                footModel.castShadow = true;
                footModel.position.set(2, 1.65, -0.1);
                footModel.scale.set(0.4, 0.4, 0.4);
                footModel.rotation.set(0, Math.PI / -2, 0);
                footModel.name = "";
                footObj.add(footModel);
                config.ReRender();
            });
        } else if (animemodel || animemodel2 || bodybuilder) {
            super();
            const loader = new OBJLoader();
            var footObj = this;
            var footModel;
            loader.load("./props/animefoot.obj", function (object) {
                footModel = object.children[0];
                footModel.material = new THREE.MeshPhongMaterial({
                    color: modelcolor,
                    shininess: 1,
                    precision: "mediump",
                });
                if (transparantmodel) {
                    footModel.material.transparent = true;
                    footModel.material.opacity = 0.6;
                }
                footModel.receiveShadow = true;
                footModel.castShadow = true;
                footModel.position.set(2, 1.65, -0.1);
                footModel.scale.set(0.4, 0.4, 0.4);
                footModel.rotation.set(0, Math.PI / -2, 0);
                footModel.name = "";
                footObj.add(footModel);
                config.ReRender();
            });
        } else {
            super();
            this.add(
                new ParametricShape(
                    Mannequin.texLimb,
                    modelcolor,
                    function (u, v, target) {
                        var r = Mannequin.cossers(u, v, [
                            [0.6, 1.1, 0.05, 0.95, 1],
                            [0.6, 0.68, 0.35, 0.65, feminine ? 1.2 : 1000],
                        ]);
                        u = 360 * u;
                        v = 180 * v - 90;
                        target.set(
                            (3 * r - 2) *
                                params[0] *
                                (cos(u) * cos(v) +
                                    (feminine
                                        ? Math.pow(sin(u + 180), 2) * cos(v) - 1
                                        : 0)) -
                                (feminine ? 0 : 2),
                            params[1] * sin(u) * cos(v) + 2,
                            params[2] * sin(v)
                        );
                    },
                    24,
                    12
                )
            );
            if (feminine) {
                this.add(
                    new ParametricShape(
                        Mannequin.texLimb,
                        modelcolor,
                        function (u, v, target) {
                            var r = Mannequin.cossers(u, v, [
                                [0.6, 1.1, 0.05, 0.95, 1 / 2],
                            ]);
                            u = 360 * u;
                            v = 180 * v - 90;
                            target.set(
                                0.3 *
                                    (3 * r - 2) *
                                    params[0] *
                                    (cos(u) * cos(v)),
                                0.8 * params[1] * sin(u) * cos(v) + 2,
                                0.6 * params[2] * sin(v)
                            );
                        },
                        12,
                        12
                    )
                );
                this.children[0].rotation.set(0, 0, 0.4);
                this.children[1].rotation.set(0, 0, 0.4);
            }
            this.rotation.z = -Math.PI / 2;
        }
    }
}

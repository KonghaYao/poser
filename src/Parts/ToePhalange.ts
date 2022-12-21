import * as THREE from "three";
import { config } from "../config";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { LimbShape } from "./LimbShape";
import { Joint } from "./Joint";

export class ToePhalange extends Joint {
    constructor(parentJoint: Joint, params: unknown[]) {
        super(parentJoint, null, params, LimbShape);
        const loader = new OBJLoader();
        var footobj = this;
        var footmodel;
        const {
            animeModel: animemodel,
            animeModel2: animemodel2,
            bodyBuilder: bodybuilder,
            detailedModel: detailedmodel,
            detailedModel2: detailedmodel2,
            drawingGuide: drawingguide,
            modelColor: modelcolor,
            transparentModel: transparantmodel,
            drawingGuideColor: drawingguidecolor,
        } = config;
        loader.load("./props/foot-toes.obj", function (object) {
            footmodel = object.children[0];
            footmodel.material = new THREE.MeshPhongMaterial({
                color: modelcolor,
                shininess: 1,
                precision: "mediump",
            });
            if (transparantmodel) {
                footmodel.material.transparent = true;
                footmodel.material.opacity = 0.6;
            }
            footmodel.receiveShadow = true;
            footmodel.castShadow = true;
            footmodel.position.set(0, 0.7, 0);
            footmodel.scale.set(0.4, 0.4, 0.4);
            footmodel.rotation.set(Math.PI / 2, 0, Math.PI / 2);
            if (parentJoint.leftOrRight == 1) {
                footmodel.name = "r_toes";
            } else {
                footmodel.name = "l_toes";
            }
            footobj.add(footmodel);
            config.ReRender();
        });
        this.minRot = new THREE.Vector3(0, 0, -70);
        this.maxRot = new THREE.Vector3(0, 0, 100);
    }
    get bend() {
        return this.z;
    }
    set bend(angle) {
        this.z = angle;
    }
}

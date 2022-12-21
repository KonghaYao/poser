import * as THREE from "three";
import { Mannequin } from "../Mannequin/Mannequin";
import { config } from "../config";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

export class CustomTorsoShape extends THREE.Group {
    constructor() {
        const {
            animeModel2: animemodel2,
            bodyBuilder: bodybuilder,
            detailedModel: detailedmodel,
            detailedModel2: detailedmodel2,
            modelColor: modelcolor,
            transparentModel: transparantmodel,
            drawingGuide: drawingguide,
            drawingGuideColor: drawingguidecolor,
        } = config;
        super();
        const loader = new OBJLoader();
        var torsoobj = this;
        var loadurl = "./props/animetorso.obj";
        if (animemodel2) {
            loadurl = "./props/animetorsom.obj";
        } else if (bodybuilder) {
            loadurl = "./props/bodybuildertorsom.obj";
        } else if (detailedmodel) {
            if (detailedmodel2) {
                loadurl = "./props/animetorso.obj";
            } else {
                loadurl = "./props/animetorsom.obj";
            }
        }
        loader.load(loadurl, function (object) {
            var torsomodel = object.children[0];
            torsomodel.material = new THREE.MeshPhongMaterial({
                color: modelcolor,
                shininess: 1,
                precision: "mediump",
            });
            if (transparantmodel) {
                torsomodel.material.transparent = true;
                torsomodel.material.opacity = 0.6;
            }
            torsomodel.receiveShadow = true;
            torsomodel.castShadow = true;
            torsomodel.position.set(0, 8.7, 0);
            torsomodel.scale.set(0.6, 0.6, 0.6);
            if (bodybuilder) {
                torsomodel.position.set(0, 8, 0);
                torsomodel.scale.set(0.67, 0.67, 0.67);
            }
            torsomodel.rotation.set(0, 0, 0);
            torsomodel.name = "torso";
            torsoobj.add(torsomodel);
            var s = Mannequin.sphereTemplate.clone();
            if (drawingguide) {
                s.material = new THREE.MeshPhongMaterial({
                    color: drawingguidecolor,
                    shininess: 1,
                    precision: "mediump",
                });
            } else {
                s.material = new THREE.MeshPhongMaterial({
                    color: modelcolor,
                    shininess: 1,
                    precision: "mediump",
                });
            }
            s.scale.set(2, 2, 2);
            s.position.set(0, 0, 0);
            torsoobj.add(s);
            config.ReRender();
        });
    }
}

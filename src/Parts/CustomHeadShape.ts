import * as THREE from "three";
import { config } from "../config";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

export class CustomHeadShape extends THREE.Group {
    constructor() {
        super();
        const {
            animeModel: animemodel,
            animeModel2: animemodel2,
            detailedModel: detailedmodel,
            detailedModel2: detailedmodel2,
            modelColor: modelcolor,
            transparentModel: transparantmodel,
        } = config;
        const loader = new OBJLoader();
        let loadUrl: string = "";
        var headObj = this;
        if (animemodel2) {
            loadUrl = "./props/animeheadm.obj";
        } else if (animemodel) {
            loadUrl = "./props/animehead.obj";
        } else if (detailedmodel) {
            if (detailedmodel2) {
                loadUrl = "./props/realistic-head2.obj";
            } else {
                loadUrl = "./props/realistic-head.obj";
            }
        }
        loader.load(loadUrl, function (object) {
            const headModel = object.children[0];
            const material = new THREE.MeshPhongMaterial({
                color: modelcolor,
                shininess: 1,
                precision: "mediump",
            });
            if (transparantmodel) {
                material.transparent = true;
                material.opacity = 0.6;
            }
            /** @ts-ignore */
            headModel.material = material;
            headModel.receiveShadow = true;
            headModel.castShadow = true;
            headObj.add(headModel);
            headModel.rotation.set(-Math.PI / 2, 0, Math.PI / 2);
            headModel.name = "head";
            config.ReRender();
        });
    }
}

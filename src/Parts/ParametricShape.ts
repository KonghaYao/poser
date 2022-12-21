import * as THREE from "three";
import { config } from "../config";
import { Mannequin } from "../Mannequin/Mannequin";
import { ParametricGeometry } from "three/examples/jsm/geometries/ParametricGeometry";
export class ParametricShape extends THREE.Group {
    constructor(
        tex: THREE.Texture,
        color: THREE.ColorRepresentation,
        func:
            | ((u: number, v: number, target: THREE.Vector3) => void)
            | undefined,
        nU = 3,
        nV = 3
    ) {
        super();

        var obj = new THREE.Mesh(
            new ParametricGeometry(func, nU, nV),
            new THREE.MeshPhongMaterial({
                color,
                shininess: 1,
                map: tex,
                precision: "mediump",
            })
        );
        if (config.transparentModel) {
            obj.material.transparent = true;
            obj.material.opacity = 0.6;
        }
        obj.receiveShadow = true;
        obj.castShadow = true;
        this.add(obj);
    }
    addSphere(r: number, y: number, x = 0, z = 0) {
        var s = Mannequin.sphereTemplate.clone();
        if (config.drawingGuide) {
            s.material = new THREE.MeshPhongMaterial({
                color: config.drawingGuideColor,
                shininess: 1,
                precision: "mediump",
            });
        } else {
            s.material = new THREE.MeshPhongMaterial({
                color: config.modelColor,
                shininess: 1,
                precision: "mediump",
            });
        }
        if (config.transparentModel && !config.drawingGuide) {
            s.material.transparent = true;
            s.material.opacity = 0.6;
        }
        s.scale.set(r, r, r);
        s.position.set(x, y, z);
        this.add(s);
        return s;
    }
}

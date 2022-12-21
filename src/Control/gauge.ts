import { gaugeTexture } from "./gaugeTexture.js";
import * as THREE from "three";
// create gauge indicator
export const createGauge = () => {
    const gauge = new THREE.Mesh(
        new THREE.CircleGeometry(10, 32, (9 / 4) * Math.PI, Math.PI / 2),
        new THREE.MeshPhongMaterial({
            side: THREE.DoubleSide,
            color: "blue",
            transparent: true,
            opacity: 0.75,
            alphaMap: gaugeTexture(),
        })
    );
    const gaugeMaterial = new THREE.MeshBasicMaterial({
        color: "navy",
    });
    gauge.add(
        new THREE.Mesh(
            new THREE.TorusGeometry(10, 0.1, 8, 32, Math.PI / 2).rotateZ(
                Math.PI / 4
            ),
            gaugeMaterial
        )
    );
    gauge.add(
        new THREE.Mesh(
            new THREE.ConeGeometry(0.7, 3, 6)
                .translate(-10, 0, 0)
                .rotateZ((5 * Math.PI) / 4),
            gaugeMaterial
        )
    );
    gauge.add(
        new THREE.Mesh(
            new THREE.ConeGeometry(0.7, 3, 6)
                .translate(10, 0, 0)
                .rotateZ((3 * Math.PI) / 4),
            gaugeMaterial
        )
    );
    return gauge;
};

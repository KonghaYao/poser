import * as THREE from "three";
import { config } from "../config";
export function gaugeTexture(size = 256) {
    const canvas = document.createElement("canvas");

    canvas.width = size;
    canvas.height = size;
    const r = size / 2;

    const ctx = canvas.getContext("2d")!;
    console.log(ctx);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, size, size);

    const grd = ctx.createRadialGradient(r, r, r / 2, r, r, r);
    grd.addColorStop(0, "black");
    grd.addColorStop(1, "gray");

    // Fill with gradient
    ctx.fillStyle = grd;
    ctx.fillRect(1, 1, size - 2, size - 2);

    const start = Math.PI,
        end = 2 * Math.PI;

    ctx.strokeStyle = "white";
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let rr = r; rr > 0; rr -= 25)
        ctx.arc(size / 2, size / 2, rr, start, end);

    for (let i = 0; i <= 12; i++) {
        ctx.moveTo(r, r);
        const a = start + (i / 12) * (end - start);
        ctx.lineTo(r + r * Math.cos(a), r + r * Math.sin(a));
    }
    ctx.stroke();

    const texture = new THREE.CanvasTexture(canvas, THREE.UVMapping);
    texture.anisotropy = config.renderer.capabilities.getMaxAnisotropy();
    texture.repeat.set(1, 1);

    return texture;
}

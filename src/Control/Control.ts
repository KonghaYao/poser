import { Ankle, Joint, Mannequin, Pelvis, Torso, config } from '../index';
import { createGauge } from './gauge';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { inverseKinematics } from './in';
import { givePartsToModel } from './giveParts';
export const rotateMap = {
    X: 'YZX' as THREE.EulerOrder,
    Z: 'XYZ' as THREE.EulerOrder,
    Y: 'ZXY' as THREE.EulerOrder,
};
export class Control {
    gauge!: ReturnType<typeof createGauge>;
    mouse = new THREE.Vector2(); // mouse 3D position
    mouseButton = undefined; // pressed mouse buttons
    rayCaster = new THREE.Raycaster(); // raycaster to grab body part
    dragPoint = new THREE.Mesh(); // point of grabbing
    obj?: Joint; // currently selected body part
    controls!: OrbitControls;
    model!: Mannequin;
    moveBody = true; // 是否为移动整个躯体
    constructor() {}
    focusingMode(model: Mannequin) {
        givePartsToModel(model);
        this.model = model;
    }
    rotateMode: 'X' | 'Y' | 'Z' = 'X';
    changeRotate(mode: 'X' | 'Y' | 'Z') {
        this.rotateMode = mode;
        this.obj!.rotation.reorder(rotateMap[mode]);
    }
    bindControl() {
        const { camera, renderer } = config;
        const dom = renderer.domElement;
        // set up event handlers
        dom.addEventListener('mousedown', this.onMouseDown.bind(this));
        dom.addEventListener('mouseup', this.onMouseUp.bind(this));
        dom.addEventListener('mousemove', this.onMouseMove.bind(this));

        dom.addEventListener('touchstart', this.onMouseDown.bind(this));
        dom.addEventListener('touchend', this.onMouseUp.bind(this));
        dom.addEventListener('touchcancel', this.onMouseUp.bind(this));
        dom.addEventListener('touchmove', this.onMouseMove.bind(this));
        const controls = new OrbitControls(camera, renderer.domElement);
        this.controls = controls;
        controls.addEventListener('start', function () {
            renderer.setAnimationLoop(config.drawFrame.bind(config));
        });

        controls.addEventListener('end', function () {
            renderer.setAnimationLoop(null);
            config.ReRender();
        });
        this.gauge = createGauge();
        config.animate = this.animate.bind(this);
    }
    animate(time: number) {
        const { obj, gauge } = this;
        const X = this.rotateMode === 'X';
        const Y = this.rotateMode === 'Y';
        const Z = this.rotateMode === 'Z';
        // no selected object
        // console.log(this.rotateMode);
        if (!obj) return;

        const spinA = obj instanceof Ankle ? Math.PI / 2 : 0;

        gauge.rotation.set(0, 0, -spinA);
        if (X) gauge.rotation.set(0, Math.PI / 2, 2 * spinA);
        if (Y) gauge.rotation.set(Math.PI / 2, 0, -Math.PI / 2);

        let joint = this.moveBody ? this.model : obj;

        do {
            for (var step = 5; step > 0.1; step *= 0.75) {
                if (Z) inverseKinematics(joint, 'z', step, this);
                if (X) inverseKinematics(joint, 'x', step, this);
                if (Y) inverseKinematics(joint, 'y', step, this);
            }

            joint = joint.parentJoint;
        } while (
            joint &&
            !(joint instanceof Mannequin) &&
            !(joint instanceof Pelvis) &&
            !(joint instanceof Torso) &&
            config.cbInverseKinematics
        );
    }
    onMouseUp() {
        this.controls.enabled = true;
        this.mouseButton = undefined;
        this.deselect();
        config.renderer.setAnimationLoop(null);
        config.ReRender();
    }

    select(object: Joint) {
        this.deselect();
        this.obj = object;
        object.select(true);
    }
    onMouseMove(event) {
        if (this.obj) this.userInput(event);
    }
    deselect() {
        this.gauge.parent?.remove(this.gauge);
        this.obj?.select(false);
        this.obj = undefined;
    }
    mouseInterface = false;
    touchInterface = false;
    userInput(event) {
        if (event instanceof MouseEvent) {
            event.preventDefault();

            this.mouseInterface = true;

            this.mouse.set(
                (event.clientX / window.innerWidth) * 2 - 1,
                (-event.clientY / window.innerHeight) * 2 + 1
            );
        }

        if (window.TouchEvent && event instanceof TouchEvent && event.touches.length == 1) {
            this.touchInterface = true;
            this.mouse.set(
                (event.touches[0].clientX / window.innerWidth) * 2 - 1,
                (-event.touches[0].clientY / window.innerHeight) * 2 + 1
            );
        }
    }

    onMouseDown(event) {
        const { gauge, dragPoint, mouse, rayCaster, model, controls } = this;
        this.userInput(event);
        gauge.parent?.remove(gauge);
        dragPoint.parent?.remove(dragPoint);

        rayCaster.setFromCamera(mouse, config.camera);
        if (!this.model) return;
        const intersects = rayCaster.intersectObject(this.model, true);
        let name =
            intersects.length && (intersects[0].object.name || intersects[0].object.parent?.name);
        if (name) {
            const rotateMode = event.ctrlKey
                ? 'Y'
                : event.altKey
                ? 'Z'
                : event.shiftKey
                ? 'X'
                : this.rotateMode;

            controls.enabled = false;

            if (name == 'neck') name = 'head';
            if (name == 'pelvis') name = 'body';

            this.select(model[name]);
            const obj = this.obj!;
            if (!this.moveBody) {
                dragPoint.position.copy(obj.worldToLocal(intersects[0].point));
                obj.imageWrapper.add(dragPoint);

                obj.imageWrapper.add(gauge);
                gauge.position.y = obj instanceof Ankle ? 2 : 0;
            }
            this.changeRotate(rotateMode);
        }
        config.renderer.setAnimationLoop(config.drawFrame.bind(config));
    }
}

import * as THREE from "three";
import { grad, rad } from "./utils";
import { ShoeShape } from "./ShoeShape";
import { PelvisShape } from "./PelvisShape";
import { ParametricShape } from "./ParametricShape";
import { LimbShape } from "./LimbShape";

export class Joint extends THREE.Group {
    minRot!: THREE.Vector3;
    maxRot!: THREE.Vector3;
    image!: THREE.Group;
    imageWrapper!: THREE.Group;
    yVal: number;
    parentJoint: any;
    feminine!: boolean;
    constructor(
        parentJoint: Joint | null,
        pos: [number, number, number] | null,
        params: number[],
        Shape: typeof ShoeShape | typeof LimbShape
    ) {
        super();
        const yVal = params[1] as number;
        this.image = new Shape(
            parentJoint ? parentJoint.feminine : false,
            params
        );
        this.image.castShadow = true;
        if (Shape != PelvisShape && Shape != ShoeShape)
            this.image.position.set(0, yVal / 2, 0);
        this.imageWrapper = new THREE.Group();
        this.imageWrapper.add(this.image);
        this.imageWrapper.castShadow = true;
        this.add(this.imageWrapper);
        this.castShadow = true;
        this.yVal = yVal;
        this.parentJoint = parentJoint;
        if (parentJoint) {
            this.position.set(0, parentJoint.yVal, 0);
            parentJoint.imageWrapper.add(this);
            this.feminine = parentJoint.feminine;
        }
        if (pos) {
            this.position.set(...pos);
        }
        this.minRot = new THREE.Vector3();
        this.maxRot = new THREE.Vector3();
    }
    get z() {
        this.rotation.reorder("YXZ");
        return (this.rotation.z * 180) / Math.PI;
    }
    set z(angle) {
        this.rotation.reorder("YXZ");
        this.rotation.z = (angle * Math.PI) / 180;
    }
    get x() {
        this.rotation.reorder("YZX");
        return (this.rotation.x * 180) / Math.PI;
    }
    set x(angle) {
        this.rotation.reorder("YZX");
        this.rotation.x = (angle * Math.PI) / 180;
    }
    get y() {
        this.rotation.reorder("ZXY");
        return (this.rotation.y * 180) / Math.PI;
    }
    set y(angle) {
        this.rotation.reorder("ZXY");
        this.rotation.y = (angle * Math.PI) / 180;
    }
    reset() {
        this.rotation.set(0, 0, 0);
    }
    get posture() {
        this.rotation.reorder("XYZ");
        return [
            grad(this.rotation.x),
            grad(this.rotation.y),
            grad(this.rotation.z),
        ];
    }
    set posture(pos) {
        this.rotation.set(rad(pos[0]), rad(pos[1]), rad(pos[2]), "XYZ");
    }
    getBumper(x: number, y: number, z: number) {
        var bumper = new THREE.Vector3(x, y, z);
        this.image.localToWorld(bumper);
        this.parentJoint.image.worldToLocal(bumper);
        return bumper;
    }
    hide() {
        this.image.visible = false;
    }
    attach(image: THREE.Group) {
        this.imageWrapper.add(image);
    }
    point(x: number, y: number, z: number) {
        return scene.worldToLocal(
            this.localToWorld(new THREE.Vector3(x, y, z))
        );
    }
    recolor(color: string | THREE.Color, secondaryColor = color) {
        var joint = this.image;
        if (typeof color === "string") color = new THREE.Color(color);
        if (typeof secondaryColor === "string")
            secondaryColor = new THREE.Color(secondaryColor);
        joint.children[0].material.color = color;
        if (joint.children.length > 1) {
            joint.children[1].material.color = secondaryColor;
        }
    }
    select(state: boolean) {
        this.traverse(function (o) {
            if (o.material && o.material.emissive)
                o.material.emissive.setRGB(
                    state ? 0 : 0,
                    state ? -0.35 : 0,
                    state ? -0.35 : 0
                );
        });
    }
}

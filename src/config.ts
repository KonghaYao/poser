import * as THREE from "three";
class Config {
    animeModel = false;
    animeModel2 = false;
    transparentModel = false;
    drawingGuide = true;
    detailedModel = false;
    detailedModel2 = false;
    bodyBuilder = false;
    drawingGuideColor = "rgb(61, 61, 61)";
    modelColor = "white";
    fingerCount = 0;
    cbInverseKinematics = false;
    drawFrame() {
        const { clock, renderer, scene, camera } = this;
        this.animate(100 * clock.getElapsedTime());
        renderer.render(scene, camera);
    }
    animate(ms: number) {}
    renderer!: THREE.WebGLRenderer;
    scene!: THREE.Scene;
    light!: THREE.PointLight;
    light2!: THREE.PointLight;
    camera!: THREE.Camera;
    createScene(container = document.body) {
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            preserveDrawingBuffer: true,
        });

        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);

        /**@ts-ignore */
        renderer.domElement.style =
            "width:100%; height:100%; position:fixed; top:0; left:0;";
        renderer.shadowMap.enabled = true;
        renderer.setAnimationLoop(this.drawFrame.bind(this));
        container.appendChild(renderer.domElement);
        const scene = new THREE.Scene();
        scene.background = new THREE.Color("#212121");
        const camera = new THREE.PerspectiveCamera(
            30,
            window.innerWidth / window.innerHeight,
            0.1,
            2000
        );
        camera.position.set(0, 0, 150);
        const light = new THREE.PointLight("white", 0.25);
        light.position.set(0, 100, 50);
        light.shadow.mapSize.width = Math.min(
            2 * 1024,
            renderer.capabilities.maxTextureSize / 2
        );
        light.shadow.mapSize.height = light.shadow.mapSize.width;
        light.shadow.radius = 8;
        light.castShadow = true;
        const light2 = new THREE.PointLight("white", 0.25);
        light2.position.set(0, 100, -150);
        light2.shadow.mapSize.width = Math.min(
            2 * 1024,
            renderer.capabilities.maxTextureSize / 2
        );
        light2.shadow.mapSize.height = light2.shadow.mapSize.width;
        light2.shadow.radius = 8;
        light2.castShadow = false;
        scene.add(light, light2, new THREE.AmbientLight("white", 0.5));

        this.renderer = renderer;
        this.scene = scene;
        this.light = light;
        this.light2 = light2;
        this.camera = camera;

        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight, true);
            config.ReRender();
        }
        window.addEventListener("resize", onWindowResize, false);
        onWindowResize();
        this.clock = new THREE.Clock();
    }
    clock!: THREE.Clock;
    ReRender() {
        this.renderer.render(this.scene, this.camera);
    }
}
export const config = new Config();

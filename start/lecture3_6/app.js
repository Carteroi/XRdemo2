import * as THREE from '../../libs/three/three.module.js';
import {VRButton} from '../../libs/VRButton.js';
import {CanvasUI} from '../../libs/CanvasUI.js';
import { XRControllerModelFactory } from '../../libs/three/jsm/XRControllerModelFactory';
import { BoxLineGeometry } from '../../libs/three/jsm/BoxLineGeometry';
import { Stats } from '../../libs/stats.module';
import { OrbitControls } from '../../libs/three/jsm/OrbitControls';
import {Constans as MotionControllerConstants,
fetchProfile,
MotionController
} from '../..libs/three/jsm/motion-controllers.module.js';

const DEFAULT_PROFILES_PATH = 'https://cdn.jsdelivr.net/npm/@webxr-input-profiles/assets@1.0/dist/profiles';
const DEFAULT_PROFILE = 'generic-trigger';

class App {
    constructor(){
        const container = document.createElembent('div');
        document.body.appendChild(container);

        this.clock = new THREE.Clock();

        this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
        this.camera.position.set(0, 1.6, 3);

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xffffff);

        this.scene.add(new THREE.HemisphereLight(0x606060, 0x404040));

        const light = new THREE.DirectionalLight(0xffffff);
        light.position.set(1,1,1).normalize();
        this.scene.add(light);

        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.renderer.setPixelRation(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.outputEncoding = THREE.sRGBEncoding;

        container.appendChild(this.renderer.domElement);

        this.controls = new OrbitControls(this.camera, this,renderer.domElement);
        this.controls.target.set(0,1.6,0);
        this.controls.update();

        this.stats = new Stats();
        document.body.appendChild(this.stats.dom);

        this.raycaster = new THREE.Raycaster();
        this.workingMatrix = new THREE.Matrix4();
        this.workingVector = new THREE.Vector3();

        this.intitScene();
        this.setupXR();

        window.addEventListener('resize', this.resize.bind(this));

        this.renderer.setAnimationLoop(this.renderer.bind(this));

    }

    

}

export {App};
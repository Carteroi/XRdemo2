import * as THREE from '../../libs/three/three.module.js';
import { OrbitControls } from '../../libs/three/jsm/OrbitControls.js';

// secure server with 'secure server for chrome'

class App{
	constructor(){
		const container = document.createElement( 'div' );
		document.body.appendChild( container );

		this.camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 100);
		this.camera.position.set(0, 0, 4);

		this.scene = new THREE.Scene(); // initialize scene
		this.scene.background = new THREE.Color(0x000000); //black

		const ambient = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 0.8); // create hemisphere light
		this.scene.add(ambient); // add hemisphere light to scene

		const light = new THREE.DirectionalLight(); // create directional light
		light.position.set(0.2, 1, 1); // position directional light
		this.scene.add(light); // add directional light to scene

		

		this.renderer = new THREE.WebGLRenderer({antialias: true}); // no jagged edges
		this.renderer.setPixelRatio(window.devicePixelRatio); // no blurring
		this.renderer.setSize(window.innerWidth, window.innerHeight); // size of render = size of window
		container.appendChild(this.renderer.domElement); // ensure render DOM element is visible

		this.renderer.setAnimationLoop(this.render.bind(this)); // continuous rendering

		const geometry = new THREE.BoxBufferGeometry(); // create box, default 1unit X 1unit
		const material = new THREE.MeshStandardMaterial({color:0xffffff}); // white material

		this.mesh = new THREE.Mesh(geometry, material);

		this.scene.add(this.mesh); // add box to scene

		const controls = new OrbitControls(this.camera, this.renderer.domElement); // add orbit controls to move object
    
        
        window.addEventListener('resize', this.resize.bind(this) );
	}	
    
    resize(){
       this.camera.aspect = window.innerWidth/window.innerHeight;
	   this.camera.updateProjectionMatrix();
	   this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
	render( ) {  
		this.mesh.rotateY(.01);
		this.renderer.render(this.scene, this.camera);
    }
}

export { App };
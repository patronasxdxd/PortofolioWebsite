import * as THREE from "three";
import Experience from "./Experience";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";


export default class Camera{
    constructor(){
        this.experience = new Experience;
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;



        this.createPerspectiveCamera();
        this.createOrthographicCamera();
        this.setOrbitControls();
    }

   

    createPerspectiveCamera(){
        this.perspectiveCamera = new THREE.PerspectiveCamera(
            35,
            this.sizes.aspect,
            0.1,
            1000
        );

    
    
        this.scene.add(this.perspectiveCamera);
                     this.perspectiveCamera.position.x = -10;
                    this.perspectiveCamera.position.y = 5;
                    this.perspectiveCamera.position.z = 36;
    }

    

    setOrbitControls() {
        this.controls = new OrbitControls(this.perspectiveCamera, this.canvas);
        this.controls.enableDamping = true;
        this.controls.enableZoom = true;
        this.controls.minDistance = 10; // Set minimum 
        this.controls.maxDistance = 55; // Set maximum 
    }


    createOrthographicCamera() {
        this.orthographicCamera = new THREE.OrthographicCamera(
            (-this.sizes.aspect * this.sizes.frustrum) / 2,
            (this.sizes.aspect * this.sizes.frustrum) / 2,
            this.sizes.frustrum / 2,
            -this.sizes.frustrum / 2,
            -100,
            100
        );


        this.scene.add(this.orthographicCamera);



        const size = 10;
        const divisions = 10;



    }


    resize() {
        // Updating Perspective Camera on Resize
        this.perspectiveCamera.aspect = this.sizes.aspect;
        this.perspectiveCamera.updateProjectionMatrix();

        // Updating Orthographic Camera on Resize
        this.orthographicCamera.left =
            (-this.sizes.aspect * this.sizes.frustrum) / 2;
        this.orthographicCamera.right =
            (this.sizes.aspect * this.sizes.frustrum) / 2;
        this.orthographicCamera.top = this.sizes.frustrum / 2;
        this.orthographicCamera.bottom = -this.sizes.frustrum / 2;
        this.orthographicCamera.updateProjectionMatrix();
    }
    
    update() {
        this.controls.update();

        this.perspectiveCamera.position.y = Math.max(this.perspectiveCamera.position.y, 0); 
        this.resize();    
    }
}
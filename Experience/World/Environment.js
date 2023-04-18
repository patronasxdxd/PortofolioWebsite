import * as THREE from "three";
import Experience from "../Experience.js";

export default class Environment {
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

      

        console.log(this.resources,"here!");
        this.setSunlight();

    }


    setSunlight(){
        this.sunLight = new THREE.DirectionalLight("#ffffff", 2);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.camera.far = 20;
        this.sunLight.shadow.mapSize.set(2024, 2024);
        this.sunLight.shadow.normalBias = 0.05;
        // const helper = new THREE.CameraHelper(this.sunLight.shadow.camera);
        // this.scene.add(helper);


       
        this.ambientLight = new THREE.AmbientLight("#ffffff", 1);



        //maybe here
        var directionalLight = new THREE.DirectionalLight( 0xffffff, 3 );
        // directionalLight.position.set(-9,2,0);
        this.scene.add(directionalLight);
    

        this.scene.add(this.ambientLight);

        this.sunLight.position.set(1.5, 7, 3);
        // this.scene.add(this.sunLight);
        
        


    }
}
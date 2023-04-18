import * as THREE from "three";
import Sizes from "./Utils/Sizes.js"
import Time from "./Utils/Time.js"
import Resources from "./Utils/Resources.js"
import assets from "./Utils/assets.js";

import Camera from "./Camera.js"
import Renderer from "./Renderer.js"
import World from "./World/World.js";




export default class Experience{
    static instance;
    constructor(canvas){
        if (Experience.instance){
            return Experience.instance
        }
        
        Experience.instance = this;
        this.canvas = canvas;
        this.scene = new THREE.Scene();

        const loader = new THREE.TextureLoader();
        const starTexture = loader.load('https://media.istockphoto.com/photos/blue-sky-and-white-clouds-background-picture-id825778252?b=1&k=20&m=825778252&s=612x612&w=0&h=C2j1HeXd5swrFsvrBqN9GIUmewXPSERRg9quVii3prM=');
        this.scene.background = starTexture;
        this.time = new Time();
        this.sizes = new Sizes();
        this.camera = new Camera();
        this.renderer = new Renderer();
        this.resources = new Resources(assets);
        this.world = new World;

        this.time.on("resize",()=> {
            this.resize();
        })
        this.time.on("update", () => {
            this.update();
        });
       
       
    }



   
    update(){
    
        this.camera.update();
        this.world.update();
        this.renderer.update();
      
        if (this.controls) {
            this.controls.update();
        }
    }

    resize(){
        this.camera.update();
        this.world.update();
        this.renderer.resize();
  
    }
}
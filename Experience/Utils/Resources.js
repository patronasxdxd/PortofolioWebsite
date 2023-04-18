import * as THREE from "three";
import Experience from "../Experience";
import EventEmitter from "events";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";


export default class Sizes extends EventEmitter{
   constructor(assets){
       super();
       this.experience = new Experience();
       this.renderer = this.experience.renderer;
       this.assets = assets;
       this.items = {}
       this.queue = this.assets.length;
       this.loaded = 0;

       this.setLoaders();
       this.startLoading();

   }


   setLoaders() {
    const percentage = document.querySelector('#progress-percentage');
    const progresbar = document.getElementById('progress-bar');
    const Loadingmanagerr = new THREE.LoadingManager();



    Loadingmanagerr.onProgress = function(url,loaded,total){
        progresbar.value = (loaded / total) * 100;
        percentage.textContent = `${Math.floor(progresbar.value)}%`;

    }

    const progresbarContainer = document.querySelector('.progress-bar-container')
    const  messageBar = document.querySelector('.message-bar');


    Loadingmanagerr.onLoad = function(){



        progresbarContainer.style.display = 'none';

        
        
            messageBar.style.top = '-20%'; 
            setTimeout(function() {
              messageBar.style.top = '2.5%';
              setTimeout(function() {
                messageBar.style.top = '-20%'; 
              }, 5000);
            }, 1000); 
          
        
        
        
    }



    this.loaders = {};
    this.loaders.gltfLoader = new GLTFLoader(Loadingmanagerr);
    this.loaders.dracoLoader = new DRACOLoader();
    this.loaders.dracoLoader.setDecoderPath("/draco/");
    this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader);


}
startLoading() {
    for (const asset of this.assets) {
        if (asset.type === "glbModel") {
            this.loaders.gltfLoader.load(asset.path, (file) => {
                this.singleAssetLoaded(asset, file);
            });
        } else if (asset.type === "videoTexture") {
            this.video = {};
            this.videoTexture = {};

            this.video[asset.name] = document.createElement("video");
            this.video[asset.name].src = asset.path;
            this.video[asset.name].muted = true;
            this.video[asset.name].playsInline = true;
            this.video[asset.name].autoplay = true;
            this.video[asset.name].loop = true;
            this.video[asset.name].play();

            this.videoTexture[asset.name] = new THREE.VideoTexture(
                this.video[asset.name]
            );
            // this.videoTexture[asset.name].flipY = false;
            this.videoTexture[asset.name].minFilter = THREE.NearestFilter;
            this.videoTexture[asset.name].magFilter = THREE.NearestFilter;
            this.videoTexture[asset.name].generateMipmaps = false;
            this.videoTexture[asset.name].encoding = THREE.sRGBEncoding;

            this.singleAssetLoaded(asset, this.videoTexture[asset.name]);
        } 
    }
}
singleAssetLoaded(asset, file) {
    this.items[asset.name] = file;
    this.loaded++;

    if (this.loaded === this.queue) {
        this.emit("ready");
    }
}
    
}
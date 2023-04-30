import * as THREE from "three";
import Experience from "../Experience";
import EventEmitter from "events";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

export default class Sizes extends EventEmitter {
  constructor(assets) {
    super();
    this.experience = new Experience();
    this.renderer = this.experience.renderer;
    this.assets = assets;
    this.items = {};
    this.queue = this.assets.length;
    console.log(this.assets.length)
    this.loaded = 0;

    this.setLoaders();
    this.startLoading();
  }

  setLoaders() {
   
    const Loadingmanagerr = new THREE.LoadingManager();
    const messageBar = document.querySelector(".message-bar");

   
    Loadingmanagerr.onLoad = function () {
    

      messageBar.style.top = "-20%";
      setTimeout(function () {
        messageBar.style.top = "2.5%";
        setTimeout(function () {
          messageBar.style.top = "-20%";
        }, 5000);
      }, 1000);
    };

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

    if (asset.type === "glbModel") {
        const model = file.scene; // access the loaded model's scene
        const modelContainer = new THREE.Object3D(); // create a container for the model
        modelContainer.add(model); // add the model to the container
        this.experience.scene.add(modelContainer); // add the container to the scene
      }

    if (this.loaded === this.queue) {
      this.emit("ready");
    }
  }
}

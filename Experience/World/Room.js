import * as THREE from "three";
import Experience from "../Experience.js";
import * as TWEEN from 'tween.js';
// import GSAP from "gsap";
// import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";

export default class Room {



    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.room = this.resources.items.room;
        this.monster = this.resources.items.monster;
        this.dragon = this.resources.items.dragon
        this.raycaster = new THREE.Raycaster()
    
        console.log(this.room);
        this.debug = this.experience.debug
        this.actualRoom = this.room.scene;
        this.actualmonster = this.monster.scene;
        this.actualDragon = this.dragon.scene;

        this.tween = new TWEEN.Tween();
        this.sizes = this.experience.sizes;
        this.camera= this.experience.camera;
        console.log("acgi");
        console.log(this.actualRoom);
        this.cursor = new THREE.Vector2()
        console.log(this.experience,"dawdw")
     
        
        this.textureSocial = new THREE.TextureLoader().load('/textures/phonebg.webp');
        // this.projectMenu = new THREE.TextureLoader().load('/textures/project1.png');
        // this.projectMenu.wrapS = THREE.RepeatWrapping;
        // this.projectMenu.repeat.x = -1;
        // this.project11 = new THREE.TextureLoader().load('/textures/project2.png');
        // this.project11.wrapS = THREE.RepeatWrapping;
        // this.project11.repeat.x = -1;
        // this.project22 = new THREE.TextureLoader().load('/textures/project3.png');
        // this.project22.wrapS = THREE.RepeatWrapping;
        // this.project22.repeat.x = -1;
        // this.project33 = new THREE.TextureLoader().load('/textures/project4.png');
        // this.project33.wrapS = THREE.RepeatWrapping;
        // this.project33.repeat.x = -1;
        // this.project44 = new THREE.TextureLoader().load('/textures/project5.png');
        // this.project44.wrapS = THREE.RepeatWrapping;
        // this.project44.repeat.x = -1;
            this.setLogic()
            this.setModel();
            this.setAnimation();
    }




    sleep(ms) 
    {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    bigScreenTransition(material,newTexture, duration, toDefault)
    {
        material.uniforms.uTexture2IsDefault.value = toDefault ? 1 : 0

        material.uniforms.uTexture2.value = newTexture
        gsap.to(material.uniforms.uProgress, {value:1,
            duration: duration,
            ease: "power1.inOut",
            onComplete: () => {
                material.uniforms.uTexture1IsDefault.value = toDefault ? 1 : 0 
                material.uniforms.uTexture1.value = newTexture
                material.uniforms.uProgress.value = 0
                
            }
        })
    }

    setLogic()
    {
        this.logic = {}
        this.logic.buttonsLocked = false
        this.logic.mode = 'menu'

        this.logic.lockButtons = async (lockDuration) =>
        {
            this.logic.buttonsLocked = true
            await this.sleep(lockDuration)
            this.logic.buttonsLocked = false
        }
    }



  




    onMouseMove() {
        window.addEventListener("mousemove", (e) => {
            this.rotation =
                ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
            this.lerp.target = this.rotation * 0.05;
        });
    }

    click(cursor,camera)
    {

        this.objectsToTest = [


            // this.projectsHitBox,
            // this.socialsHitBox,
            // this.skillsHitBox,
            this.mediabuttonsHitBoxes,
            this.project1,
            // this.project2,  
            // this.project3,
            // this.project4,
            // this.project5,
            this.media1,
            this.media2,
            this.media3,
            this.media4,
            this.media5,
            this.media6,
            
        ]
        
     
       
        this.raycaster.setFromCamera(cursor, camera.perspectiveCamera)    
        this.intersectsObjects = this.raycaster.intersectObjects(this.objectsToTest)


        if(this.intersectsObjects.length)
        {

          console.log(123);

          this.selectedModel = this.intersectsObjects[ 0 ].object

          console.log(this.intersectsObjects);
            switch (this.selectedModel){
             

            
                    case 
                    this.project1: 
                    window.open(
                      "https://www.linkedin.com/in/gilleszwijsen/", "_blank");
                    break;
                    case 
                    this.media1: console.log("camera")
                    window.open(
                      "https://www.linkedin.com/in/gilleszwijsen/", "_blank");
                    break;
                    case this.media2: console.log("insta")
                
                    window.open(
                        "https://www.instagram.com/patronasxd/", "_blank");
                    break;
                    case this.media3: console.log("email")
                    window.open(
                        "mailto:gilleszwijsen@gmail.com", "_blank");                    
                    break;
                    case this.media4: console.log("twitter")

                    window.open(
                        "https://twitter.com/z_gilles", "_blank");
            

                    break;
                    case this.media5: console.log("whatsapp")
                    window.open(
                        "https://wa.me/31610738222", "_blank");
                  

                    break;
                    case this.media6: console.log("github")
                    window.open(
                        "https://github.com/patronasxdxd", "_blank");
                    break;
            }
    
        
    }
}





    setModel() {

        this.touchedPoints = []

        window.addEventListener('pointerdown', (event) =>
        {
            this.touchedPoints.push(event.pointerId)

            this.cursorXMin = Math.abs((event.clientX / this.sizes.width * 2 - 1)*0.9)
            this.cursorXMax = Math.abs((event.clientX / this.sizes.width * 2 - 1)*1.1)

            this.cursorYMin = Math.abs((event.clientY / this.sizes.height * 2 - 1)*0.9)
            this.cursorYMax = Math.abs((event.clientY / this.sizes.height * 2 - 1)*1.1)

        })


         window.addEventListener('pointerup', (event) =>
            {
                this.cursor.x = event.clientX / this.sizes.width * 2 - 1
                this.cursor.y = - (event.clientY / this.sizes.height) * 2 + 1

                this.absX = Math.abs(this.cursor.x)
                this.absY = Math.abs(this.cursor.y)

                if(this.touchedPoints.length === 1 && 
                this.absX > this.cursorXMin && this.absX < this.cursorXMax &&
                this.absY > this.cursorYMin && this.absY < this.cursorYMax) 

                {
                this.click(this.cursor,this.camera)

                this.touchedPoints = []
                }
                else
                {this.touchedPoints = []}
            })

        this.signHitBoxes = new THREE.Group()
        this.hitBoxMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true} )


        
               
        

        this.mediabuttonsHitBoxes = new THREE.Group()
        this.projectHitBoxGeometry2 = new THREE.PlaneGeometry( 0.37, 0.335 )
        
        this.media1 = new THREE.Mesh(
            this.projectHitBoxGeometry2,
            this.hitBoxMaterial
        )

        this.media1.rotation.y = Math.PI / 2;
        this.media1.position.set(8.3,0.40,-9.20)

        this.media2 = new THREE.Mesh(
            this.projectHitBoxGeometry2,
            this.hitBoxMaterial
        )

        this.media2.rotation.y = Math.PI / 2;
        this.media2.position.set(8.05,1.20,-9.50)



        this.media3 = new THREE.Mesh(
            this.projectHitBoxGeometry2,
            this.hitBoxMaterial
        )

        this.media3.rotation.y = Math.PI / 2;
        this.media3.position.set(8.3,0.40,-9.50)


        this.media4 = new THREE.Mesh(
            this.projectHitBoxGeometry2,
            this.hitBoxMaterial
        )

        this.media4.rotation.y = Math.PI / 2;
        this.media4.position.set(8.2,0.80,-9.20)

        this.media5 = new THREE.Mesh(
            this.projectHitBoxGeometry2,
            this.hitBoxMaterial
        )

        this.media5.rotation.y = Math.PI / 2;
        this.media5.position.set(8.05,1.20,-9.20)


        this.media6 = new THREE.Mesh(
            this.projectHitBoxGeometry2,
            this.hitBoxMaterial
        )

        this.media6.rotation.y = Math.PI / 2;
        this.media6.position.set(8.2,0.80,-9.50)


        this.projectHitBoxGeometry3 = new THREE.PlaneGeometry( 1.5, 0.435 )
        this.project1 = new THREE.Mesh(
          this.projectHitBoxGeometry3,
          this.hitBoxMaterial
      )


      this.project1.rotation.y = Math.PI / -2;
      this.project1.position.set(-11,-0.25,4.3)

    


        this.mediabuttonsHitBoxes.add(this.media1,this.media2,this.media3,this.media4,this.media5,this.media6)
        this.mediabuttonsHitBoxes.visible = false
        this.project1.visible = false;

        


        this.scene.add(this.aboutMeBoxes,this.mediabuttonsHitBoxes,this.project1)

        
        this.actualRoom.children.forEach((child) => {

            
            child.castShadow = true;
            child.receiveShadow = true;

            if (child instanceof THREE.Group) {
                child.children.forEach((groupchild) => {
                    // console.log(groupchild.material);
                    groupchild.castShadow = true;
                    groupchild.receiveShadow = true;
                });
            }

            // console.log(child);

            if (child.name === "Aquarium") {
                // console.log(child);
                child.children[0].material = new THREE.MeshPhysicalMaterial();
                child.children[0].material.roughness = 0;
                child.children[0].material.color.set(0x549dd2);
                child.children[0].material.ior = 3;
                child.children[0].material.transmission = 1;
                child.children[0].material.opacity = 1;


                //these two fu
                // child.children[0].material.depthWrite = false;
                // child.children[0].material.depthTest = false;
            }

            if (child.name === "Computer") {
                child.children[1].material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.screen,
                });
            }

            const projectDiv = document.getElementById("Socials");
            

            
projectDiv.addEventListener("click", function handleClick() {
    const targetPosition = { x: 14, y: 2, z: -14.2 };

    const startingPosition = {
        x: this.camera.perspectiveCamera.position.x,
        y: this.camera.perspectiveCamera.position.y,
        z: this.camera.perspectiveCamera.position.z
      };

const tween = new TWEEN.Tween(startingPosition)
 .to(targetPosition, 2000) 
.easing(TWEEN.Easing.Quadratic.InOut) // Use a quadratic easing function
 .onUpdate(() => {
// Update the camera position on every frame of the animation
 this.camera.perspectiveCamera.position.set(
startingPosition.x,
startingPosition.y,
startingPosition.z
);
})
.start(); // Start the animation

// Call TWEEN.update() on every frame of your render loop to update the Tween
function render() {
requestAnimationFrame(render);
TWEEN.update();
// Render your Three.js scene here
}
render();

    //This moves the tv xddd
// this.room.scene.children[1].position.y = 10






}.bind(this));




            
            // const texture = new THREE.TextureLoader().load('/textures/phonebg.jpeg');
            // this.textureSocial.wrapT = THREE.RepeatWrapping;
            // this.textureSocial.repeat.set(3, 3.1);
            // this.textureSocial.needsUpdate = true;
            // this.textureSocial.flipY = true;    
           
            if (child.name === "Cube148") {
    
                //material038
                child.material = new THREE.MeshBasicMaterial({
                    map: this.textureSocial,
                });
            }

                   
            // const texture2 = new THREE.TextureLoader().load('/textures/bluex.jpeg');


            // if (child.name === "Cube072") {
    
            //     //material038
            //     child.material = new THREE.MeshBasicMaterial({
            //         map: texture2,
            //     });
            // }



          


            const socialDiv = document.getElementById("Projects");
        socialDiv.addEventListener("click",function handleClick() {


            const targetPosition = { x: -20, y: 1.73, z: 5.2 };

            const startingPosition = {
                x: this.camera.perspectiveCamera.position.x,
                y: this.camera.perspectiveCamera.position.y,
                z: this.camera.perspectiveCamera.position.z
              };
        //     this.experience.camera.perspectiveCamera.position.z = 10;
        //  this.experience.camera.perspectiveCamera.position.y = 3;
        //  this.experience.camera.perspectiveCamera.position.x = -1;  
        const tween = new TWEEN.Tween(startingPosition)
         .to(targetPosition, 2000) // 2000 milliseconds duration
        .easing(TWEEN.Easing.Quadratic.InOut) // Use a quadratic easing function
         .onUpdate(() => {
    // Update the camera position on every frame of the animation
         this.camera.perspectiveCamera.position.set(
        startingPosition.x,
        startingPosition.y,
        startingPosition.z
    );
  })
  .start(); // Start the animation

// Call TWEEN.update() on every frame of your render loop to update the Tween
function render() {
  requestAnimationFrame(render);
  TWEEN.update();
  // Render your Three.js scene here
}
render();
        
            //This moves the tv xddd
        // this.room.scene.children[1].position.y = 10

       


        

        }.bind(this));


        const Skills = document.getElementById("Skills");
        Skills.addEventListener("click",function handleClick() {


            const targetPosition = { x: -13.4, y: 0.4, z: -13 };

            const startingPosition = {
                x: this.camera.perspectiveCamera.position.x,
                y: this.camera.perspectiveCamera.position.y,
                z: this.camera.perspectiveCamera.position.z
              };
        //     this.experience.camera.perspectiveCamera.position.z = 10;
        //  this.experience.camera.perspectiveCamera.position.y = 3;
        //  this.experience.camera.perspectiveCamera.position.x = -1;  
        const tween = new TWEEN.Tween(startingPosition)
         .to(targetPosition, 2000) // 2000 milliseconds duration
        .easing(TWEEN.Easing.Quadratic.InOut) // Use a quadratic easing function
         .onUpdate(() => {
    // Update the camera position on every frame of the animation
         this.camera.perspectiveCamera.position.set(
        startingPosition.x,
        startingPosition.y,
        startingPosition.z
    );
  })
  .start(); // Start the animation

// Call TWEEN.update() on every frame of your render loop to update the Tween
function render() {
  requestAnimationFrame(render);
  TWEEN.update();
  // Render your Three.js scene here
}
render();
        
        
        

        }.bind(this));


        });


        

        this.scene.add(this.actualRoom);
  
     
    }

    

  



    setAnimation() {
        this.mixer = new THREE.AnimationMixer(this.actualmonster);


        this.monster.animations.forEach((item, index) => {
          
            const objectName = item.name;
            if (
              
                 objectName == "Action.001"  ||   objectName == "Action.002" 
              ||   objectName == "Action.003" 
            ) {
              this.swim = this.mixer.clipAction(item);
              this.swim.play();
            }
          });

          this.mixer2 = new THREE.AnimationMixer(this.actualDragon);

          this.dragon.animations.forEach((item, index) => {
          
            const objectName = item.name;
            if (
                objectName == "dragon_armature.001Action"
      
            ) {
              this.swim = this.mixer2.clipAction(item);
              this.swim.play();
            }
          });

    
       
          
          
    }


    resize() {}

    update() {
        this.mixer.update(this.time.delta * 0.0009);
        this.mixer2.update(this.time.delta * 0.0009);

    }


    
}
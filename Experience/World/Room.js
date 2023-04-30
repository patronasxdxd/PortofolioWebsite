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
        this.raycaster = new THREE.Raycaster()
    
        console.log(this.room);
        this.debug = this.experience.debug
        this.actualRoom = this.room.scene;
        this.tween = new TWEEN.Tween();
        this.sizes = this.experience.sizes;
        this.camera= this.experience.camera;
        console.log("acgi");
        console.log(this.actualRoom);
        this.cursor = new THREE.Vector2()
        console.log(this.experience,"dawdw")
        // this.roomChildren = {};
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



            this.playchess();


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
        
            //This moves the tv xddd
        // this.room.scene.children[1].position.y = 10

       


        

        }.bind(this));


        });


        
        // const width = 0.5;
        // const height = 0.7;
        // const intensity = 1;
        // const rectLight = new THREE.RectAreaLight(
        //     0xffffff,
        //     intensity,
        //     width,
        //     height
        // );
        // rectLight.position.set(7.68244, 7, 0.5);
        // rectLight.rotation.x = -Math.PI / 2;
        // rectLight.rotation.z = Math.PI / 4;
        // this.actualRoom.add(rectLight);

        // this.roomChildren["rectLight"] = rectLight;

        // const rectLightHelper = new RectAreaLightHelper(rectLight);
        // rectLight.add(rectLightHelper);
        // console.log(this.room);

        this.scene.add(this.actualRoom);
        // this.actualRoom.scale.set(0.11, 0.11, 0.11);
    }

    

    playchess(){

        console.log("dwa")
        const crabOne = this.room.scene.getObjectByName("CrabPlayerOne");
        const crabTwo = this.room.scene.getObjectByName("CrabPlayerTwo");

       
        const bishopMesh = this.room.scene.getObjectByName("White_Bishop003_Cylinder011");
        const whiteQueen = this.room.scene.getObjectByName("chesspiece_queen_Cylinder013");
        const whiteKing = this.room.scene.getObjectByName("chesspiece_king_Cylinder.012");
        const whiteBishop2 = this.room.scene.getObjectByName("White_Bishop002_Cylinder011");
        const whitePawn1 = this.room.scene.getObjectByName("White_Pawn015_Cylinder010");  
        const whitePawn2 = this.room.scene.getObjectByName("White_Pawn014_Cylinder010"); 
        const whitePawn3 = this.room.scene.getObjectByName("White_Pawn013_Cylinder010");
        const whitePawn4 = this.room.scene.getObjectByName("White_Pawn012_Cylinder010");  
        const whitePawn5 = this.room.scene.getObjectByName("White_Pawn011_Cylinder010"); 
        const whitePawn6 = this.room.scene.getObjectByName("White_Pawn010_Cylinder010"); 
        const whitePawn7 = this.room.scene.getObjectByName("White_Pawn009_Cylinder010");
        const whitePawn8 = this.room.scene.getObjectByName("White_Pawn008_Cylinder010");  

        const whiteKnight1 = this.room.scene.getObjectByName("chesspiece_knight003_Cylinder009");  
        const whiteKnight2 = this.room.scene.getObjectByName("chesspiece_knight002_Cylinder009"); 

        const whiteRook1 = this.room.scene.getObjectByName("chesspiece_rook003_Cylinder008"); 
        const whiteRook2 = this.room.scene.getObjectByName("chesspiece_rook002_Cylinder008"); 



        const blackRook1 = this.room.scene.getObjectByName("chesspiece_rook000_Cylinder007");
        const blackRook2 = this.room.scene.getObjectByName("chesspiece_rook001_Cylinder007");
        const blackKnight1 = this.room.scene.getObjectByName("chesspiece_knight000_Cylinder006");
        const blackKnight2 = this.room.scene.getObjectByName("chesspiece_knight001_Cylinder006");
        const blackPawn1 = this.room.scene.getObjectByName("White_Pawn007_Cylinder");
        const blackPawn2 = this.room.scene.getObjectByName("White_Pawn006_Cylinder");
        const blackPawn3 = this.room.scene.getObjectByName("White_Pawn005_Cylinder");
        const blackPawn4 = this.room.scene.getObjectByName("White_Pawn004_Cylinder");
        const blackPawn5 = this.room.scene.getObjectByName("White_Pawn003_Cylinder");
        const blackPawn6 = this.room.scene.getObjectByName("White_Pawn002_Cylinder");
        const blackPawn7 = this.room.scene.getObjectByName("White_Pawn001_Cylinder");
        const blackPawn8 = this.room.scene.getObjectByName("White_Pawn_Cylinder");
        const blackBischop1 = this.room.scene.getObjectByName("White_Bishop001_Cylinder001");
        const blackBischop2 = this.room.scene.getObjectByName("White_Bishop_Cylinder001");
        const blackQueen = this.room.scene.getObjectByName("chesspiece_queen001_Cylinder005");
        const blackKing = this.room.scene.getObjectByName("chesspiece_king001_Cylinder002");
    


        let crabOnePosition = crabOne.position.clone(); // clone the position to avoid reference issues
        let crabTwoPosition = crabTwo.position.clone();
        let whitePawn4Position = whitePawn4.position.clone();
        let whitePawn8Position = whitePawn8.position.clone();
        let whiteKnight1Position = whiteKnight1.position.clone();
        let blackKnight2Position = blackKnight2.position.clone();
        let blackPawn5Position = blackPawn5.position.clone();





     
        let timer = 0.1


        async function runLoop() {
        
            for (let index = 0; index < 120; index++) {
              crabOne.position.z -= 0.00001;
                
              if (index > 36) {
                whitePawn4.position.z -= 0.00001;

              }
              await new Promise(resolve => setTimeout(resolve, timer));
            }
            await walkBack()
          }

          async function walkBack() {
            for (let index = 0; index < 120; index++) {
              crabOne.position.z += 0.00001;
              await new Promise(resolve => setTimeout(resolve, timer));
            }
          }

          async function walkTo(){
            for (let index = 0; index < 125; index++) {
                crabTwo.position.x += 0.00001;
                await new Promise(resolve => setTimeout(resolve, timer));
              }
          }
          

          async function walkBack2() {
            for (let index = 0; index < 80; index++) {
              crabTwo.position.z -= 0.00001;
              await new Promise(resolve => setTimeout(resolve, timer));
            }
          }

          async function runLoop2() {

            await walkTo();

            for (let index = 0; index < 80; index++) {
            if (index < 80 ){
            crabTwo.position.z += 0.00001;
            }
            
            blackKnight2.position.z += 0.00001;
              
              
              await new Promise(resolve => setTimeout(resolve, timer));
            }


            for (let index = 0; index < 40; index++) {
                
                crabTwo.position.x -= 0.00001;
                
        
                blackKnight2.position.x -= 0.00001;
                  
                  
                  await new Promise(resolve => setTimeout(resolve, timer));
                }
            walkBack2();

           
          }

          async function walkTo2() {
            for (let index = 0; index < 100; index++) {
                crabOne.position.x -= 0.00001;
              await new Promise(resolve => setTimeout(resolve, timer));
            }
          }

          async function walkBack3() {
            for (let index = 0; index < 50; index++) {
              crabOne.position.z += 0.00001;
              await new Promise(resolve => setTimeout(resolve,timer));
            }
          }

          async function runLoop3() {

            await walkTo2();

            for (let index = 0; index < 40; index++) {
              whiteKnight1.position.z -= 0.00001;
              crabOne.position.z -= 0.00001;
              await new Promise(resolve => setTimeout(resolve, timer));
            }

            for (let index = 0; index < 80; index++) {
                whiteKnight1.position.x += 0.00001;
                crabOne.position.x += 0.00001;
                await new Promise(resolve => setTimeout(resolve, timer));
              }

              await walkBack3();

          }


          

          async function walkTo3() {
            for (let index = 0; index < 40; index++) {
                crabTwo.position.x -= 0.00001;
              await new Promise(resolve => setTimeout(resolve, timer));
            }
          }

          async function walkBack4() {
            for (let index = 0; index < 120; index++) {
              crabTwo.position.z -= 0.00001;
              await new Promise(resolve => setTimeout(resolve, timer));
            }
          }


          async function runLoop4() {

            await walkTo3();

            for (let index = 0; index < 120; index++) {
                if (index>35){
                blackPawn5.position.z += 0.00001;
                }

                crabTwo.position.z += 0.00001;
                await new Promise(resolve => setTimeout(resolve,timer));
            }
            await walkBack4();
          }


          async function runLoop5() {

            for (let index = 0; index < 120; index++) {
                crabOne.position.z -= 0.00001;
                await new Promise(resolve => setTimeout(resolve, timer));
              }


              for (let index = 0; index < 40; index++) {
                crabOne.position.z -= 0.00001;
                crabOne.position.x += 0.00001;
                whitePawn4.position.z -= 0.00001;
                whitePawn4.position.x += 0.00001;

                await new Promise(resolve => setTimeout(resolve, timer));
              }
              blackPawn5.visible = false;
              for (let index = 0; index < 160; index++) {
                crabOne.position.z += 0.00001;
                await new Promise(resolve => setTimeout(resolve, timer));
              }

          }

          async function runLoop6() {

            for (let index = 0; index < 40; index++) {
                crabTwo.position.x += 0.00001;
                await new Promise(resolve => setTimeout(resolve, timer));
              }

              for (let index = 0; index < 60; index++) {
                crabTwo.position.z += 0.00001;
                await new Promise(resolve => setTimeout(resolve, timer));
              }


              for (let index = 0; index < 80; index++) {
                blackKnight2.position.z += 0.00001;
                crabTwo.position.z += 0.00001;
                await new Promise(resolve => setTimeout(resolve, timer));
              }


              for (let index = 0; index < 40; index++) {
                crabTwo.position.x += 0.00001;
                blackKnight2.position.x += 0.00001;
                await new Promise(resolve => setTimeout(resolve, timer));
              }

              for (let index = 0; index < 150; index++) {
                crabTwo.position.z -= 0.00001;
                await new Promise(resolve => setTimeout(resolve, timer));
              }



          }


          async function runLoop7() {
            for (let index = 0; index < 130; index++) {
                crabOne.position.x += 0.00001;
                await new Promise(resolve => setTimeout(resolve, timer));
              }


              for (let index = 0; index < 65; index++) {
                crabOne.position.z -= 0.00001;
                if (index >20) {
                    whitePawn8.position.z -= 0.00001;
                } 

                await new Promise(resolve => setTimeout(resolve, timer));
              }


              for (let index = 0; index < 50; index++) {
                crabOne.position.z += 0.00001;
                await new Promise(resolve => setTimeout(resolve, timer));
              }




          }


          async function runLoop8() {

            for (let index = 0; index < 50; index++) {
                crabTwo.position.x += 0.00001;
                await new Promise(resolve => setTimeout(resolve, timer));
              }

              for (let index = 0; index < 80; index++) {
                crabTwo.position.z += 0.00001;
                await new Promise(resolve => setTimeout(resolve, timer));
              }


              for (let index = 0; index < 100; index++) {
                crabTwo.position.z += 0.00001;
                await new Promise(resolve => setTimeout(resolve, timer));
              }


              for (let index = 0; index < 50; index++) {
                crabTwo.position.x -= 0.00001;
                await new Promise(resolve => setTimeout(resolve, timer));
              }


              for (let index = 0; index < 40; index++) {
                crabTwo.position.x -= 0.00002;
                blackKnight2.position.x -= 0.00002;
                crabTwo.position.z += 0.00001;
                blackKnight2.position.z += 0.00001;
                await new Promise(resolve => setTimeout(resolve, timer));
              }

              for (let index = 0; index < 50; index++) {
                crabTwo.position.z -= 0.00001;
                crabTwo.position.x -= 0.00001;
                await new Promise(resolve => setTimeout(resolve, timer));
              }



          }


        let count = 0;
setInterval(() => {
    
    switch (count) {
        case 0:
            crabOne.position.copy(crabOnePosition);
            crabTwo.position.copy(crabTwoPosition);
            whitePawn4.position.copy(whitePawn4Position);
            whitePawn8.position.copy(whitePawn8Position);
            whiteKnight1.position.copy(whiteKnight1Position);
            blackKnight2.position.copy(blackKnight2Position);
            blackPawn5.position.copy(blackPawn5Position);
            blackPawn5.visible = true;
        runLoop()
        
      break;
    case 1:
        runLoop2()
      break;
    case 2:
        runLoop3()
      break;
    case 3:
        runLoop4()
      break;
    case 4:
        runLoop5()
    break;
    case 5:
        runLoop6()
    break;
    case 6:
        runLoop7()
        break;
    case 7:
        runLoop8()
        break;
  
    case 8:
        //just waiting
        break
  }
  count = (count + 1) % 9; // reset the count to 0 after it reaches 8
}, 11500); // 11500 milliseconds = 11.5 seconds


       
          
        


    }


    setAnimation() {
        this.mixer = new THREE.AnimationMixer(this.actualRoom);

        // console.log(this.mixer);

        this.room.animations.forEach((item, index) => {
            const objectName = item.name;
            if (
                objectName == "dragon_armature.001Action"
              ||   objectName == "Action.001"  ||   objectName == "Action.002" 
              ||   objectName == "Action.003" 
            ) {
              this.swim = this.mixer.clipAction(item);
              this.swim.play();
            }
          });
      

       
          
          
    }


    resize() {}

    update() {
        this.mixer.update(this.time.delta * 0.0009);

    }


    
}
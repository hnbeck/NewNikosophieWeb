// the following import statement is solely for the type checking and
// autocompletion features in IDE.  A Behavior cannot inherit from
// another behavior or a base class but can use the methods and
// properties of the card to which it is installed.
// The prototype classes ActorBehavior and PawnBehavior provide
// the features defined at the card object.

import { Quaternion, Vector3 } from "three";
import {PawnBehavior} from "../PrototypeBehavior";

class GroundPawn extends PawnBehavior  {
    setup() {
        const THREE = Microverse.THREE;
        // the 3D object will likely not be loaded yet.
        this.subscribe(this.id, "3dModelLoaded", "modelLoaded");
        
    }
    modelLoaded(){
        const THREE = Microverse.THREE;
        let scene = this.shape.children[0];
        // set all to wireframe
        console.log("Number of Ground children: ", this.shape.children.length);
        console.log("Scena name: ", scene.name);
        if (scene.name == "world model")
        {
            scene.traverse((obj => 
            {  
                const geometry = obj.geometry;
                console.log("Ground obj", obj);

                if (geometry)
                {
                    obj.material.transparent = true; 
                    obj.material.opacity = 0.9; 
                    // add a wireframe version of the object
                    const wireframe = new THREE.WireframeGeometry( geometry );
                    const line = new THREE.LineSegments( wireframe );
                    line.material = new THREE.LineBasicMaterial({color:0xa0a0ff, linewidth: 5 });
                    line.material.depthTest = false;
                    line.material.opacity = 0.2;
                    line.material.transparent = true;
                    line.applyMatrix4(obj.matrix);
                    obj.parent.add(line);
               }
                
            } ))
        }
       
    }
}

export default {
    modules: [
        {
            name: "Ground",
            pawnBehaviors: [GroundPawn]
        }
    ]
}

/* globals Microverse */

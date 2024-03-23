// the following import statement is solely for the type checking and
// autocompletion features in IDE.  A Behavior cannot inherit from
// another behavior or a base class but can use the methods and
// properties of the card to which it is installed.
// The prototype classes ActorBehavior and PawnBehavior provide
// the features defined at the card object.

import { Quaternion, Vector3 } from "three";
import {PawnBehavior} from "../PrototypeBehavior";

class BlockyPawn extends PawnBehavior  {
    setup() {
        const THREE = Microverse.THREE;
        // the 3D object will likely not be loaded yet.
        this.subscribe(this.id, "3dModelLoaded", "modelLoaded");
        
    }
    modelLoaded(){
        const THREE = Microverse.THREE;
        let scene = this.shape.children[0];
        // set all to wireframe
        console.log("Number of children: ", this.shape.children.length)
        scene.traverse((obj => 
            { 
                console.log("ID: ",obj.id, "Name ", obj.name);
                obj.material = new THREE.MeshBasicMaterial({color: 0xa5a5ff})
                obj.material.transparent = true; 
                obj.material.opacity = 0.15; 

                const geometry = obj.geometry;
                console.log("Geometry: ", geometry);
                console.log("Object", obj);
               
                if (geometry)
                {
                    // add a wireframe version of the object
                    const wireframe = new THREE.WireframeGeometry( geometry );
                    const line = new THREE.LineSegments( wireframe );
                    line.material = new THREE.LineBasicMaterial({color:0xa0a0ff, linewidth: 5 });
                    line.material.depthTest = false;
                    line.material.opacity = 0.5;
                    line.material.transparent = true;
                    obj.parent.add(line);
                }
              
            } ))
        console.log("Number Elements in Scene:", scene.children.length);
        // this is just as excersise
        this.scaleTo([1.0, 1.0, 0.8]);
        this.translateTo([0.0, 2, -10.0]) ;
    }
}

export default {
    modules: [
        {
            name: "Blocky",
            pawnBehaviors: [BlockyPawn]
        }
    ]
}

/* globals Microverse */

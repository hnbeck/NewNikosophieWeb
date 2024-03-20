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
        scene.traverse((obj => obj.material = new THREE.MeshBasicMaterial( { color: 0xeeeeff, wireframe: true } ) ))
        // this is just as excersise
        this.scaleTo([1.0, 2.0, 0.6]);
        this.translateTo([0.0, 3.0, -7.0]) ;
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

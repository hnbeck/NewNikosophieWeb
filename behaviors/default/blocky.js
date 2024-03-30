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
        this.addEventListener("pointerDown", "onClick"); 
    }

    onClick(event) {
        const THREE = Microverse.THREE;
        let scene = this.shape.children[0];

        let rControl = this.isInControl(scene);
        if (rControl)
        {
            console.log("RIng Control", rControl);
            rControl.parent.remove(rControl);
            rControl.geometry.dispose(); 
            rControl.material.dispose(); 
            return
        }; 

        let bCenter = new THREE.Vector3(0,0,0);
        let bRadius = 0.0; 
        // search bounding sphere
        console.log("Click Start traversing");
        scene.traverse((obj => 
            {     
                console.log("Click Object", obj);
                if ( obj.geometry && obj.type == "Mesh")
                {
                    //const sphere = obj.geometry.boundingSphere; 
                    // using a bounding box for positioning and size the ring control
                    const box = new THREE.BoxHelper( obj, 0xff0000 );
                    //console.log("CLICK BOX: ", box);
                    const radius = Math.max(bRadius, box.geometry.boundingSphere.radius);
                    //console.log("CLICK Found sphere: ", radius, sphere.center )
                    //console.log("CLICK Pos", box.position);
                    bRadius = Math.max(bRadius, radius); 
                    bCenter.x = (bCenter.x + box.position.x)/2; 
                    bCenter.y = (bCenter.y + box.position.y)/2; 
                    bCenter.z = (bCenter.z + box.position.z)/2; 
                }
               
            } ))
           
            // add ring control to scene (top level)
            const ring = new THREE.RingGeometry(bRadius,bRadius*1.05,32,32);
            const material = new THREE.MeshBasicMaterial({color:0xeeaa00, side: THREE.DoubleSide });
            material.depthTest = false;
            material.opacity = 0.6;
            material.transparent = true;
            const mesh = new THREE.Mesh( ring, material ); 
            scene.add(mesh);
    }

    isInControl(scene) {
        let b = null;
        // check if ring control is already in secne - must be toplevel
        scene.children.forEach((o) => {   
            if (o.geometry && o.geometry.type == "RingGeometry")
            {
                b = o; 
            }
        })
        // return ring control if any
        return b; 
    }

    modelLoaded(){
        const THREE = Microverse.THREE;
        let scene = this.shape.children[0];
        // set all to wireframe
        //console.log("Scene: ", scene)
        // we are responsible for blocky only 
        if (scene.name == "blocky")
        {
        scene.traverse((obj => 
            { 
                const geometry = obj.geometry;
                console.log("Geometry: ", geometry);
                console.log("Object", obj);
            
                if (geometry)
                {
                    if (obj.material) obj.material.dispose();
                    obj.material = new THREE.MeshBasicMaterial({color: 0xa5a5ff})
                    obj.material.transparent = true; 
                    obj.material.opacity = 0.35; 
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
        }
        console.log("Number Elements in Scene:", scene.children.length);
        // this is just as excersise
        this.scaleTo([1.0, 1.0, 0.8]);
        this.translateTo([0.0, 2, -10.0]) ;
    }

    teardown() {
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

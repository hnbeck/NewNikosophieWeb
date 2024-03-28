// Copyright 2022 by Croquet Corporation, Inc. All Rights Reserved.
// https://croquet.io
// info@croquet.io

export function init(Constants) {
    Constants.AvatarNames = ["newwhite"];

    /* Alternatively, you can specify a card spec for an avatar,
       instead of a string for the partical file name, to create your own avatar.
       You can add behaviorModules here. Also, if the system detects a behavior module
       named AvatarEventHandler, that is automatically installed to the avatar.
        {
            type: "3d",
            modelType: "glb",
            name: "rabbit",
            dataLocation: "./assets/avatars/newwhite.zip",
            dataRotation: [0, Math.PI, 0],
            dataScale: [0.3, 0.3, 0.3],
        }
    */

    Constants.UserBehaviorDirectory = "behaviors/default";
    Constants.UserBehaviorModules = [
        "lights.js", "blocky.js", "ground.js"
    ];

    Constants.DefaultCards = [
        {
            card: {
                name:"world model",
                layers: ["walk"],
                type: "3d",
                behaviorModules: ["Ground"],
                singleSided: true,
                shadow: true,
                translation:[0, -1.7, 0],
                dataLocation: "./assets/3D/floor.glb",
                dataScale: [1, 1, 1],
                fileName: "/floor.glb",
                placeholder: true,
                placeholderSize: [500, 0.1, 500],
                placeholderColor: 0xe0e0e0,
                placeholderOffset: [0, 0, 0],
            }
        },
        {
            card: {
                name: "light",
                layers: ["light"],
                type: "lighting",
                behaviorModules: ["Light"],
                clearColor: 0x0505a0,
                dataLocation: "./assets/img/skynight.jpg",
                fileName: "/horizont.jpg",
                dataType: "jpg",
                
            }
        },
        { card: {
            behaviorModules: ["Blocky"],
            name: "blocky",
            layers: ["pointer"],
            type: "3d",
            modelType: "wrl",
            dataLocation: "./assets/3D/test2.wrl",
            fileName: "test2.wrl",
            dataScale: [1.5, 1.0, 1.5],
            singleSided: true,
            shadow: true, 
            translation: [-2, 1, -10]
        }
    }
    ];
}

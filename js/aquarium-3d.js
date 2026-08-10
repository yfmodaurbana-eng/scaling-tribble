/* ============================================================
   ACUARIO DESIGNER STUDIO
   REAL WEBGL 3D AQUARIUM ENGINE
   PROPORTIONAL GEOMETRY ENGINE V1.0
   ============================================================

   X = LARGO
   Z = FONDO
   Y = ALTO

   IMPORTANTE:
   La geometría NO se normaliza.
   Las dimensiones reales modifican directamente
   las proporciones del acuario.

   La cámara se adapta al tamaño.
   El acuario NO se encoge ni se deforma.
   ============================================================ */

console.log("🐠 AQUARIUM 3D ENGINE PRO CARGADO");


/* ============================================================
   CONFIGURACIÓN
============================================================ */

const AQUARIUM_3D = {

    /* Conversión visual.
       1 unidad 3D = 10 cm */

    UNIT: 0.1,

    /* Espesor visual mínimo */

    MIN_GLASS: 0.04,

    /* Cámara */

    CAMERA_PADDING: 1.75,

    CAMERA_HEIGHT: 0.65,

    CAMERA_ANGLE: 0.35,

    /* Agua */

    WATER_HEIGHT: 0.90,

    /* Grava */

    GRAVEL_HEIGHT: 0.08

};


/* ============================================================
   ESTADO
============================================================ */

let scene;
let camera;
let renderer;
let controls;

let aquariumGroup;
let waterMesh;
let gravelMesh;
let lightGroup;

let raycaster;
let mouse;

let selectedObject = null;

let objectsGroup;

let tankDimensions = {

    length: 70,
    width: 30,
    height: 40

};


/* ============================================================
   UTILIDADES
============================================================ */

function getElement(id){

    return document.getElementById(id);

}


function getNumber(id, fallback){

    const el = getElement(id);

    if(!el){

        return fallback;

    }

    const value =
        parseFloat(el.value);

    if(!Number.isFinite(value) || value <= 0){

        return fallback;

    }

    return value;

}


/* ============================================================
   LEER MEDIDAS
============================================================ */

function readDimensions(){

    const length =
        getNumber(
            "largo",
            70
        );

    const width =
        getNumber(
            "ancho",
            30
        );

    const height =
        getNumber(
            "alto",
            40
        );


    tankDimensions.length =
        length;

    tankDimensions.width =
        width;

    tankDimensions.height =
        height;


    return {

        length,
        width,
        height

    };

}


/* ============================================================
   CRISTAL
============================================================ */

function getGlassThickness(){

    const select =
        getElement("cristalManual");


    if(!select){

        return 0.06;

    }


    const value =
        select.value;


    if(value === "auto"){

        return 0.06;

    }


    const mm =
        parseFloat(value);


    if(!Number.isFinite(mm)){

        return 0.06;

    }


    return Math.max(

        AQUARIUM_3D.MIN_GLASS,

        mm / 100

    );

}


/* ============================================================
   CREAR ESCENA
============================================================ */

function initAquarium3D(){

    const container =
        getElement("canvas-container");


    if(!container){

        console.error(
            "❌ No existe #canvas-container"
        );

        return;

    }


    /* ================================================
       ESCENA
    ================================================= */

    scene =
        new THREE.Scene();


    scene.background =
        new THREE.Color(
            0x06121b
        );


    /* ================================================
       CÁMARA
    ================================================= */

    camera =
        new THREE.PerspectiveCamera(

            45,

            container.clientWidth /
            Math.max(
                container.clientHeight,
                1
            ),

            0.01,

            5000

        );


    /* ================================================
       RENDERER
    ================================================= */

    renderer =
        new THREE.WebGLRenderer({

            antialias: true,

            alpha: false

        });


    renderer.setPixelRatio(
        Math.min(
            window.devicePixelRatio,
            2
        )
    );


    renderer.setSize(

        container.clientWidth,

        container.clientHeight

    );


    renderer.outputColorSpace =
        THREE.SRGBColorSpace;


    renderer.shadowMap.enabled =
        true;


    renderer.shadowMap.type =
        THREE.PCFSoftShadowMap;


    container.innerHTML = "";

    container.appendChild(
        renderer.domElement
    );


    /* ================================================
       CONTROLES
    ================================================= */

    controls =
        new THREE.OrbitControls(

            camera,

            renderer.domElement

        );


    controls.enableDamping =
        true;


    controls.dampingFactor =
        0.08;


    controls.enablePan =
        false;


    controls.minDistance =
        0.5;


    controls.maxDistance =
        1000;


    controls.target.set(
        0,
        2,
        0
    );


    /* ================================================
       LUCES
    ================================================= */

    createLights();


    /* ================================================
       OBJETOS
    ================================================= */

    objectsGroup =
        new THREE.Group();


    scene.add(
        objectsGroup
    );


    /* ================================================
       RAYCASTER
    ================================================= */

    raycaster =
        new THREE.Raycaster();


    mouse =
        new THREE.Vector2();


    /* ================================================
       CREAR ACUARIO
    ================================================= */

    createAquarium();


    /* ================================================
       EVENTOS
    ================================================= */

    window.addEventListener(
        "resize",
        resizeAquarium3D
    );


    document.addEventListener(
        "input",
        handleDimensionChange
    );


    document.addEventListener(
        "change",
        handleDimensionChange
    );


    renderer.domElement.addEventListener(
        "click",
        selectObject
    );


    /* ================================================
       ANIMACIÓN
    ================================================= */

    animate();


    console.log(
        "✅ WebGL 3D inicializado"
    );

}


/* ============================================================
   ILUMINACIÓN
============================================================ */

function createLights(){

    lightGroup =
        new THREE.Group();


    const ambient =
        new THREE.AmbientLight(

            0xffffff,

            1.2

        );


    lightGroup.add(
        ambient
    );


    const key =
        new THREE.DirectionalLight(

            0xffffff,

            2.2

        );


    key.position.set(

        5,
        8,
        7

    );


    key.castShadow =
        true;


    key.shadow.mapSize.width =
        2048;


    key.shadow.mapSize.height =
        2048;


    lightGroup.add(
        key
    );


    const fill =
        new THREE.DirectionalLight(

            0x6edfff,

            0.8

        );


    fill.position.set(

        -5,
        4,
        -4

    );


    lightGroup.add(
        fill
    );


    scene.add(
        lightGroup
    );

}


/* ============================================================
   CREAR ACUARIO
============================================================ */

function createAquarium(){

    if(aquariumGroup){

        scene.remove(
            aquariumGroup
        );

    }


    aquariumGroup =
        new THREE.Group();


    scene.add(
        aquariumGroup
    );


    const d =
        readDimensions();


    /*
       CONVERSIÓN:

       70 cm → 7 unidades
       30 cm → 3 unidades
       40 cm → 4 unidades

       NO NORMALIZAMOS.

       Por tanto:

       140 cm → 14 unidades

       y será exactamente el doble
       de largo.
    */

    const L =
        d.length *
        AQUARIUM_3D.UNIT;


    const W =
        d.width *
        AQUARIUM_3D.UNIT;


    const H =
        d.height *
        AQUARIUM_3D.UNIT;


    const glass =
        getGlassThickness();


    createGlass(
        L,
        W,
        H,
        glass
    );


    createWater(
        L,
        W,
        H
    );


    createGravel(
        L,
        W,
        H
    );


    createLightBar(
        L,
        W,
        H
    );


    /*
       El centro geométrico del tanque
       queda aproximadamente a H / 2.
    */

    controls.target.set(

        0,

        H * 0.42,

        0

    );


    adjustCamera(

        L,
        W,
        H

    );


    updateInformation(
        d
    );

}


/* ============================================================
   CRISTALES
============================================================ */

function createGlass(
    L,
    W,
    H,
    thickness
){

    const glassMaterial =
        new THREE.MeshPhysicalMaterial({

            color:
                0x9fe9ff,

            transparent:
                true,

            opacity:
                0.18,

            roughness:
                0.05,

            metalness:
                0,

            transmission:
                0.25,

            side:
                THREE.DoubleSide

        });


    /*
       BASE
    */

    const bottomGeometry =
        new THREE.BoxGeometry(

            L + thickness * 2,

            thickness,

            W + thickness * 2

        );


    const bottom =
        new THREE.Mesh(

            bottomGeometry,

            glassMaterial

        );


    bottom.position.y =
        thickness / 2;


    bottom.receiveShadow =
        true;


    aquariumGroup.add(
        bottom
    );


    /*
       FRENTE
    */

    const frontGeometry =
        new THREE.BoxGeometry(

            L,

            H,

            thickness

        );


    const front =
        new THREE.Mesh(

            frontGeometry,

            glassMaterial

        );


    front.position.set(

        0,

        H / 2,

        W / 2

    );


    aquariumGroup.add(
        front
    );


    /*
       PARTE TRASERA
    */

    const back =
        new THREE.Mesh(

            frontGeometry,

            glassMaterial

        );


    back.position.set(

        0,

        H / 2,

        -W / 2

    );


    aquariumGroup.add(
        back
    );


    /*
       LATERAL IZQUIERDO
    */

    const sideGeometry =
        new THREE.BoxGeometry(

            thickness,

            H,

            W

        );


    const left =
        new THREE.Mesh(

            sideGeometry,

            glassMaterial

        );


    left.position.set(

        -L / 2,

        H / 2,

        0

    );


    aquariumGroup.add(
        left
    );


    /*
       LATERAL DERECHO
    */

    const right =
        new THREE.Mesh(

            sideGeometry,

            glassMaterial

        );


    right.position.set(

        L / 2,

        H / 2,

        0

    );


    aquariumGroup.add(
        right
    );


    /*
       BORDES VISUALES
    */

    createGlassEdges(

        L,
        W,
        H,
        thickness

    );

}


/* ============================================================
   BORDES DEL CRISTAL
============================================================ */

function createGlassEdges(

    L,
    W,
    H,
    thickness

){

    const edgeMaterial =
        new THREE.MeshBasicMaterial({

            color:
                0x72dfff,

            transparent:
                true,

            opacity:
                0.55

        });


    const edgeSize =
        Math.max(
            thickness * 0.45,
            0.035
        );


    /*
       Cuatro columnas verticales
    */

    const verticalGeometry =
        new THREE.BoxGeometry(

            edgeSize,
            H,
            edgeSize

        );


    const positions = [

        [-L / 2, H / 2, -W / 2],

        [ L / 2, H / 2, -W / 2],

        [-L / 2, H / 2,  W / 2],

        [ L / 2, H / 2,  W / 2]

    ];


    positions.forEach(
        position => {

            const edge =
                new THREE.Mesh(

                    verticalGeometry,

                    edgeMaterial

                );


            edge.position.set(

                position[0],
                position[1],
                position[2]

            );


            aquariumGroup.add(
                edge
            );

        }
    );


    /*
       Marco superior delantero
    */

    const topFront =
        new THREE.Mesh(

            new THREE.BoxGeometry(

                L,
                edgeSize,
                edgeSize

            ),

            edgeMaterial

        );


    topFront.position.set(

        0,
        H,
        W / 2

    );


    aquariumGroup.add(
        topFront
    );


    /*
       Marco superior trasero
    */

    const topBack =
        topFront.clone();


    topBack.position.z =
        -W / 2;


    aquariumGroup.add(
        topBack
    );


    /*
       Marco lateral superior
    */

    const topSideGeometry =
        new THREE.BoxGeometry(

            edgeSize,
            edgeSize,
            W

        );


    const topLeft =
        new THREE.Mesh(

            topSideGeometry,

            edgeMaterial

        );


    topLeft.position.set(

        -L / 2,
        H,
        0

    );


    aquariumGroup.add(
        topLeft
    );


    const topRight =
        topLeft.clone();


    topRight.position.x =
        L / 2;


    aquariumGroup.add(
        topRight
    );

}


/* ============================================================
   AGUA
============================================================ */

function createWater(
    L,
    W,
    H
){

    const waterHeight =
        H *
        AQUARIUM_3D.WATER_HEIGHT;


    const geometry =
        new THREE.BoxGeometry(

            Math.max(
                L - 0.18,
                0.1
            ),

            Math.max(
                waterHeight,
                0.1
            ),

            Math.max(
                W - 0.18,
                0.1
            )

        );


    const material =
        new THREE.MeshPhysicalMaterial({

            color:
                0x087ea8,

            transparent:
                true,

            opacity:
                0.48,

            roughness:
                0.08,

            metalness:
                0,

            transmission:
                0.12

        });


    waterMesh =
        new THREE.Mesh(

            geometry,

            material

        );


    waterMesh.position.y =
        waterHeight / 2 +
        0.05;


    waterMesh.receiveShadow =
        true;


    aquariumGroup.add(
        waterMesh
    );

}


/* ============================================================
   GRAVA
============================================================ */

function createGravel(
    L,
    W,
    H
){

    const gravelHeight =
        Math.max(

            H *
            AQUARIUM_3D.GRAVEL_HEIGHT,

            0.05

        );


    const geometry =
        new THREE.BoxGeometry(

            Math.max(
                L - 0.12,
                0.1
            ),

            gravelHeight,

            Math.max(
                W - 0.12,
                0.1
            )

        );


    const material =
        new THREE.MeshStandardMaterial({

            color:
                0x625545,

            roughness:
                0.9

        });


    gravelMesh =
        new THREE.Mesh(

            geometry,

            material

        );


    gravelMesh.position.y =
        gravelHeight / 2 +
        0.08;


    gravelMesh.receiveShadow =
        true;


    aquariumGroup.add(
        gravelMesh
    );

}


/* ============================================================
   LUZ SUPERIOR
============================================================ */

function createLightBar(
    L,
    W,
    H
){

    const geometry =
        new THREE.BoxGeometry(

            L * 0.72,

            0.07,

            Math.min(
                W * 0.55,
                0.45
            )

        );


    const material =
        new THREE.MeshStandardMaterial({

            color:
                0xffffff,

            emissive:
                0xffffff,

            emissiveIntensity:
                2.5

        });


    const lightBar =
        new THREE.Mesh(

            geometry,

            material

        );


    lightBar.position.set(

        0,

        H + 0.08,

        0

    );


    aquariumGroup.add(
        lightBar
    );


    const aquariumLight =
        new THREE.PointLight(

            0xffffff,

            1.8,

            Math.max(
                L * 2,
                10
            )

        );


    aquariumLight.position.set(

        0,
        H * 0.9,
        0

    );


    aquariumGroup.add(
        aquariumLight
    );

}


/* ============================================================
   CÁMARA
============================================================ */

function adjustCamera(
    L,
    W,
    H
){

    /*
       La cámara se adapta al tamaño.

       MUY IMPORTANTE:

       No modificamos L, W ni H.

       Solo modificamos la distancia
       desde la cámara.
    */

    const largest =
        Math.max(

            L,
            W,
            H

        );


    const distance =
        Math.max(

            largest *
            AQUARIUM_3D.CAMERA_PADDING,

            6

        );


    camera.position.set(

        distance * 0.95,

        distance *
        AQUARIUM_3D.CAMERA_HEIGHT,

        distance

    );


    camera.lookAt(

        0,

        H * 0.42,

        0

    );


    controls.target.set(

        0,

        H * 0.42,

        0

    );


    controls.update();

}


/* ============================================================
   CAMBIO DE MEDIDAS
============================================================ */

let dimensionTimer = null;


function handleDimensionChange(event){

    const id =
        event.target?.id;


    if(

        id !== "largo" &&
        id !== "ancho" &&
        id !== "alto" &&
        id !== "cristalManual"

    ){

        return;

    }


    clearTimeout(
        dimensionTimer
    );


    dimensionTimer =
        setTimeout(

            () => {

                createAquarium();

            },

            80

        );

}


/* ============================================================
   INFORMACIÓN
============================================================ */

function updateInformation(d){

    const litros =
        (
            d.length *
            d.width *
            d.height
        ) / 1000;


    const volumenUtil =
        litros *
        0.85;


    setText(

        "sideLitros",

        litros.toFixed(1) +
        " L"

    );


    setText(

        "infoLitros",

        litros.toFixed(1) +
        " L"

    );


    setText(

        "infoMedidas",

        d.length.toFixed(1) +
        " × " +
        d.width.toFixed(1) +
        " × " +
        d.height.toFixed(1) +
        " cm"

    );


    setText(

        "volumenUtil",

        volumenUtil.toFixed(1) +
        " L"

    );


    const cristal =
        getGlassThickness() *
        100;


    setText(

        "infoCristal",

        cristal.toFixed(0) +
        " mm"

    );


    setText(

        "sideCristal",

        cristal.toFixed(0) +
        " mm"

    );


    updateStructuralInfo(
        d
    );

}


function setText(
    id,
    value
){

    const element =
        getElement(id);


    if(element){

        element.textContent =
            value;

    }

}


/* ============================================================
   SEGURIDAD ESTRUCTURAL VISUAL
============================================================ */

function updateStructuralInfo(d){

    let reinforcement =
        "No necesario";


    let risk =
        "🟢 Diseño doméstico";


    if(d.length > 120){

        reinforcement =
            "1 tirante";


        risk =
            "🟡 Requiere refuerzo";

    }


    if(d.length > 180){

        reinforcement =
            "2 tirantes";


        risk =
            "🟠 Refuerzo estructural";

    }


    if(d.length > 250){

        reinforcement =
            "Refuerzo obligatorio";


        risk =
            "🔴 Gran formato";

    }


    setText(

        "sideRefuerzo",

        reinforcement

    );


    setText(

        "infoTirantes",

        reinforcement

    );


    setText(

        "riesgo",

        risk

    );


    const measure =
        d.width;


    if(d.length > 120){

        setText(

            "infoMedidaTirante",

            measure.toFixed(1) +
            " cm"

        );

    }else{

        setText(

            "infoMedidaTirante",

            "—"

        );

    }

}


/* ============================================================
   SELECCIÓN DE OBJETOS
============================================================ */

function selectObject(event){

    if(!renderer){

        return;

    }


    const rect =
        renderer.domElement
        .getBoundingClientRect();


    mouse.x =
        (
            (
                event.clientX -
                rect.left
            ) /
            rect.width
        ) * 2 - 1;


    mouse.y =
        -(
            (
                event.clientY -
                rect.top
            ) /
            rect.height
        ) * 2 + 1;


    raycaster.setFromCamera(

        mouse,

        camera

    );


    const intersects =
        raycaster.intersectObjects(

            objectsGroup.children,

            true

        );


    if(!intersects.length){

        clearSelection();

        return;

    }


    let selected =
        intersects[0].object;


    while(

        selected.parent &&
        selected.parent !== objectsGroup

    ){

        selected =
            selected.parent;

    }


    selectMesh(
        selected
    );

}


function selectMesh(mesh){

    clearSelection();


    selectedObject =
        mesh;


    mesh.userData
        .originalScale =
        mesh.scale.clone();


    mesh.scale.multiplyScalar(
        1.08
    );


    console.log(
        "Objeto seleccionado:",
        mesh.userData.type ||
        mesh.name ||
        "objeto"
    );

}


function clearSelection(){

    if(

        selectedObject &&
        selectedObject.userData.originalScale

    ){

        selectedObject.scale.copy(

            selectedObject
                .userData
                .originalScale

        );

    }


    selectedObject =
        null;

}


/* ============================================================
   CREACIÓN DE OBJETOS
============================================================ */

function addAquariumObject(
    type
){

    if(!objectsGroup){

        return null;

    }


    let mesh;


    const material =
        new THREE.MeshStandardMaterial({

            color:
                getObjectColor(type),

            roughness:
                0.75

        });


    if(type === "rock"){

        const geometry =
            new THREE.DodecahedronGeometry(
                0.35,
                1
            );


        mesh =
            new THREE.Mesh(

                geometry,

                material

            );

    }


    else if(type === "plant"){

        mesh =
            createPlant();

    }


    else if(type === "fish"){

        mesh =
            createFish();

    }


    else if(type === "light"){

        mesh =
            createDecorationLight();

    }


    else{

        return null;

    }


    mesh.userData.type =
        type;


    mesh.position.set(

        0,

        0.5,

        0

    );


    objectsGroup.add(
        mesh
    );


    return mesh;

}


/* ============================================================
   COLORES OBJETOS
============================================================ */

function getObjectColor(
    type
){

    switch(type){

        case "rock":
            return 0x665b4d;

        case "plant":
            return 0x1aa85c;

        case "fish":
            return 0xff8c32;

        case "light":
            return 0xffffff;

        default:
            return 0xffffff;

    }

}


/* ============================================================
   PLANTA
============================================================ */

function createPlant(){

    const group =
        new THREE.Group();


    const material =
        new THREE.MeshStandardMaterial({

            color:
                0x18a957,

            roughness:
                0.8

        });


    for(
        let i = 0;
        i < 5;
        i++
    ){

        const geometry =
            new THREE.CylinderGeometry(

                0.025,
                0.035,

                0.8 +
                Math.random() *
                0.5,

                8

            );


        const stem =
            new THREE.Mesh(

                geometry,

                material

            );


        stem.position.set(

            (
                Math.random() -
                0.5
            ) * 0.25,

            0.45,

            (
                Math.random() -
                0.5
            ) * 0.25

        );


        stem.rotation.z =
            (
                Math.random() -
                0.5
            ) * 0.35;


        group.add(
            stem
        );

    }


    return group;

}


/* ============================================================
   PEZ
============================================================ */

function createFish(){

    const group =
        new THREE.Group();


    const bodyGeometry =
        new THREE.SphereGeometry(

            0.25,
            24,
            16

        );


    bodyGeometry.scale(

        1.5,
        0.75,
        0.7

    );


    const bodyMaterial =
        new THREE.MeshStandardMaterial({

            color:
                0xff8b32,

            roughness:
                0.4

        });


    const body =
        new THREE.Mesh(

            bodyGeometry,

            bodyMaterial

        );


    group.add(
        body
    );


    const tailGeometry =
        new THREE.ConeGeometry(

            0.2,
            0.45,
            3

        );


    const tail =
        new THREE.Mesh(

            tailGeometry,

            bodyMaterial

        );


    tail.rotation.z =
        Math.PI / 2;


    tail.position.x =
        -0.45;


    group.add(
        tail
    );


    return group;

}


/* ============================================================
   LUZ DECORATIVA
============================================================ */

function createDecorationLight(){

    const group =
        new THREE.Group();


    const geometry =
        new THREE.BoxGeometry(

            0.6,
            0.05,
            0.15

        );


    const material =
        new THREE.MeshStandardMaterial({

            color:
                0xffffff,

            emissive:
                0xffffff,

            emissiveIntensity:
                3

        });


    const mesh =
        new THREE.Mesh(

            geometry,

            material

        );


    group.add(
        mesh
    );


    return group;

}


/* ============================================================
   REDIMENSIONAR
============================================================ */

function resizeAquarium3D(){

    const container =
        getElement("canvas-container");


    if(!container){

        return;

    }


    const width =
        Math.max(

            container.clientWidth,

            1

        );


    const height =
        Math.max(

            container.clientHeight,

            1

        );


    camera.aspect =
        width / height;


    camera.updateProjectionMatrix();


    renderer.setSize(

        width,

        height

    );

}


/* ============================================================
   ANIMACIÓN
============================================================ */

function animate(){

    requestAnimationFrame(
        animate
    );


    if(controls){

        controls.update();

    }


    if(lightGroup){

        lightGroup.rotation.y +=
            0.00015;

    }


    renderer.render(

        scene,

        camera

    );

}


/* ============================================================
   BOTONES DE OBJETOS
============================================================ */

document.addEventListener(

    "click",

    event => {

        const button =
            event.target.closest(
                "[data-type]"
            );


        if(!button){

            return;

        }


        const type =
            button.dataset.type;


        const object =
            addAquariumObject(
                type
            );


        if(object){

            selectMesh(
                object
            );

        }

    }

);


/* ============================================================
   ELIMINAR OBJETO
============================================================ */

document.addEventListener(

    "click",

    event => {

        const button =
            event.target.closest(
                "#eliminar"
            );


        if(

            !button ||
            !selectedObject

        ){

            return;

        }


        objectsGroup.remove(
            selectedObject
        );


        selectedObject =
            null;

    }

);


/* ============================================================
   INICIALIZACIÓN SEGURA
============================================================ */

function startAquarium3D(){

    if(
        typeof THREE === "undefined"
    ){

        console.error(

            "❌ Three.js no está cargado."

        );

        return;

    }


    if(
        typeof THREE.OrbitControls ===
        "undefined"
    ){

        console.error(

            "❌ OrbitControls no está cargado."

        );

        return;

    }


    initAquarium3D();

}


if(
    document.readyState ===
    "loading"
){

    document.addEventListener(

        "DOMContentLoaded",

        startAquarium3D

    );

}else{

    startAquarium3D();

}


/* ============================================================
   API GLOBAL
============================================================ */

window.Aquarium3D = {

    rebuild:
        createAquarium,

    addObject:
        addAquariumObject,

    getDimensions:
        readDimensions,

    getSelectedObject:
        () => selectedObject

};

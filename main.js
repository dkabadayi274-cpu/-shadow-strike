import * as THREE from "three";

// =======================
// SAHNE
// =======================

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

// =======================
// KAMERA
// =======================

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

// =======================
// RENDERER
// =======================

const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

document.body.appendChild(renderer.domElement);

// =======================
// IŞIK
// =======================

const hemiLight = new THREE.HemisphereLight(
    0xffffff,
    0x444444,
    2
);

scene.add(hemiLight);

const dirLight = new THREE.DirectionalLight(
    0xffffff,
    1.5
);

dirLight.position.set(10,20,10);

scene.add(dirLight);

// =======================
// ZEMİN
// =======================

const ground = new THREE.Mesh(

    new THREE.PlaneGeometry(300,300),

    new THREE.MeshStandardMaterial({
        color:0x4f8f3f
    })

);

ground.rotation.x = -Math.PI/2;

scene.add(ground);

// =======================
// OYUNCU
// =======================

const player = new THREE.Mesh(

    new THREE.CapsuleGeometry(
        0.5,
        1.2,
        8,
        16
    ),

    new THREE.MeshStandardMaterial({
        color:0x00ff66
    })

);

player.position.y = 1;

scene.add(player);

// =======================
// KAMERA BAŞLANGICI
// =======================

camera.position.set(
    0,
    5,
    8
);

// =======================
// RESIZE
// =======================

window.addEventListener("resize",()=>{

    camera.aspect =
        window.innerWidth /
        window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

});
// =======================
// JOYSTICK
// =======================

const joystick = {
    active: false,
    startX: 0,
    startY: 0,
    x: 0,
    y: 0,
    radius: 45
};

const move = {
    x: 0,
    z: 0
};

renderer.domElement.addEventListener("touchstart",(e)=>{

    const t = e.touches[0];

    if(t.clientX < window.innerWidth/2){

        joystick.active = true;

        joystick.startX = t.clientX;
        joystick.startY = t.clientY;

        joystick.x = t.clientX;
        joystick.y = t.clientY;

    }

});

renderer.domElement.addEventListener("touchmove",(e)=>{

    if(!joystick.active) return;

    const t = e.touches[0];

    let dx = t.clientX - joystick.startX;
    let dy = t.clientY - joystick.startY;

    const dist = Math.sqrt(dx*dx + dy*dy);

    if(dist > joystick.radius){

        dx = dx/dist * joystick.radius;
        dy = dy/dist * joystick.radius;

    }

    joystick.x = joystick.startX + dx;
    joystick.y = joystick.startY + dy;

    move.x = dx / joystick.radius;
    move.z = dy / joystick.radius;

});

renderer.domElement.addEventListener("touchend",()=>{

    joystick.active = false;

    move.x = 0;
    move.z = 0;

});

function drawJoystick(){

    if(!joystick.active) return;

    const ctx = renderer.getContext();

}
// =======================
// HAREKET
// =======================

const speed = 0.12;

function updatePlayer(){

    player.position.x += move.x * speed;
    player.position.z += move.z * speed;

    if(move.x !== 0 || move.z !== 0){

        player.rotation.y = Math.atan2(
            move.x,
            move.z
        );

    }

}

// =======================
// KAMERA TAKİBİ
// =======================

function updateCamera(){

    const targetX = player.position.x;
    const targetY = player.position.y + 5;
    const targetZ = player.position.z + 8;

    camera.position.lerp(
        new THREE.Vector3(
            targetX,
            targetY,
            targetZ
        ),
        0.08
    );

    camera.lookAt(
        player.position.x,
        player.position.y + 1,
        player.position.z
    );

}

// =======================
// OYUN DÖNGÜSÜ
// =======================

function animate(){

    requestAnimationFrame(animate);

    updatePlayer();

    updateCamera();

    renderer.render(
        scene,
        camera
    );

}

animate();

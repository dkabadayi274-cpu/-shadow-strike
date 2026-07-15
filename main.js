import * as THREE from 'three';
const scene=new THREE.Scene();
scene.background=new THREE.Color(0x87ceeb);
const camera=new THREE.PerspectiveCamera(75,innerWidth/innerHeight,.1,1000);
const renderer=new THREE.WebGLRenderer({antialias:true});
renderer.setSize(innerWidth,innerHeight);
document.body.appendChild(renderer.domElement);

const light=new THREE.HemisphereLight(0xffffff,0x444444,2);
scene.add(light);

const ground=new THREE.Mesh(
 new THREE.PlaneGeometry(100,100),
 new THREE.MeshStandardMaterial({color:0x4d8b4a})
);
ground.rotation.x=-Math.PI/2;
scene.add(ground);

const player=new THREE.Mesh(
 new THREE.BoxGeometry(1,2,1),
 new THREE.MeshStandardMaterial({color:0x00ff66})
);
player.position.y=1;
scene.add(player);

camera.position.set(0,5,8);

function animate(){
 requestAnimationFrame(animate);
 camera.position.x=player.position.x;
 camera.lookAt(player.position);
 renderer.render(scene,camera);
}
animate();

addEventListener('resize',()=>{
 camera.aspect=innerWidth/innerHeight;
 camera.updateProjectionMatrix();
 renderer.setSize(innerWidth,innerHeight);
});

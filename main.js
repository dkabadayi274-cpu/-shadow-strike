const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

const player = {
    x: 400,
    y: 300,
    radius: 22,
    speed: 4,
    color: "#00d084"
};

let joystick = {
    active: false,
    startX: 0,
    startY: 0,
    dx: 0,
    dy: 0
};

canvas.addEventListener("touchstart", (e)=>{
    const t = e.touches[0];

    if(t.clientX < window.innerWidth/2){
        joystick.active = true;
        joystick.startX = t.clientX;
        joystick.startY = t.clientY;
    }
});

canvas.addEventListener("touchmove",(e)=>{
    if(!joystick.active) return;

    const t = e.touches[0];

    joystick.dx = t.clientX - joystick.startX;
    joystick.dy = t.clientY - joystick.startY;
});

canvas.addEventListener("touchend",()=>{
    joystick.active=false;
    joystick.dx=0;
    joystick.dy=0;
});

function update(){

    player.x += joystick.dx * 0.05;
    player.y += joystick.dy * 0.05;

}

function draw(){

    ctx.fillStyle="#2b7a3d";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    // Oyuncu
    ctx.beginPath();
    ctx.arc(player.x,player.y,player.radius,0,Math.PI*2);
    ctx.fillStyle=player.color;
    ctx.fill();

    // Joystick
    if(joystick.active){

        ctx.beginPath();
        ctx.arc(joystick.startX,joystick.startY,45,0,Math.PI*2);
        ctx.strokeStyle="white";
        ctx.lineWidth=4;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(
            joystick.startX+joystick.dx,
            joystick.startY+joystick.dy,
            20,
            0,
            Math.PI*2
        );
        ctx.fillStyle="white";
        ctx.fill();

    }

}

function loop(){

    update();
    draw();

    requestAnimationFrame(loop);

}

loop();

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    r: 20
};

const joystick = {
    active: false,
    baseX: 0,
    baseY: 0,
    stickX: 0,
    stickY: 0,
    max: 45
};

canvas.addEventListener("touchstart", e => {
    const t = e.touches[0];

    if (t.clientX < canvas.width / 2) {
        joystick.active = true;
        joystick.baseX = t.clientX;
        joystick.baseY = t.clientY;
        joystick.stickX = t.clientX;
        joystick.stickY = t.clientY;
    }
});

canvas.addEventListener("touchmove", e => {
    if (!joystick.active) return;

    const t = e.touches[0];

    let dx = t.clientX - joystick.baseX;
    let dy = t.clientY - joystick.baseY;

    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > joystick.max) {
        dx = dx / dist * joystick.max;
        dy = dy / dist * joystick.max;
    }

    joystick.stickX = joystick.baseX + dx;
    joystick.stickY = joystick.baseY + dy;

    player.x += dx * 0.08;
    player.y += dy * 0.08;
});

canvas.addEventListener("touchend", () => {
    joystick.active = false;
});

function draw() {

    ctx.fillStyle = "#2b7a3d";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc(player.x, player.y, player.r, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();

    if (joystick.active) {

        ctx.beginPath();
        ctx.arc(joystick.baseX, joystick.baseY, joystick.max, 0, Math.PI * 2);
        ctx.strokeStyle = "white";
        ctx.lineWidth = 4;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(joystick.stickX, joystick.stickY, 20, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();

    }

    requestAnimationFrame(draw);
}

draw();

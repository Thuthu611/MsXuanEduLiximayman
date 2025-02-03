const wheelCanvas = document.getElementById("wheelCanvas");
const ctx = wheelCanvas.getContext("2d");
const sections = ["Giảm 10%", "Miễn Phí Ship", "Giảm 20%", "Quà Bí Ẩn", "Giảm 50%", "Cảm Ơn"];
const colors = ["#f44336", "#2196F3", "#4CAF50", "#FFC107", "#9C27B0", "#E91E63"];
let angle = 0, spinning = false;

function drawWheel() {
    const slice = (2 * Math.PI) / sections.length;
    for (let i = 0; i < sections.length; i++) {
        ctx.beginPath();
        ctx.moveTo(150, 150);
        ctx.arc(150, 150, 150, slice * i, slice * (i + 1));
        ctx.fillStyle = colors[i];
        ctx.fill();
        ctx.stroke();
        ctx.save();
        ctx.fillStyle = "#fff";
        ctx.translate(150 + Math.cos(slice * (i + 0.5)) * 100, 150 + Math.sin(slice * (i + 0.5)) * 100);
        ctx.rotate(slice * (i + 0.5));
        ctx.fillText(sections[i], -ctx.measureText(sections[i]).width / 2, 5);
        ctx.restore();
    }
}

function spinWheel() {
    if (spinning) return;
    spinning = true;
    let spins = Math.floor(Math.random() * 10) + 5;
    let endAngle = spins * 360 + Math.random() * 360;
    let resultIndex = Math.floor((endAngle % 360) / (360 / sections.length));
    let finalResult = sections[sections.length - 1 - resultIndex];
    let rotation = 0;
    let interval = setInterval(() => {
        rotation += 20;
        wheelCanvas.style.transform = `rotate(${rotation}deg)`;
        if (rotation >= endAngle) {
            clearInterval(interval);
            document.getElementById("result").innerText = `Chúc mừng! Bạn nhận được: ${finalResult}`;
            spinning = false;
        }
    }, 50);
}

drawWheel();

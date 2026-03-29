const app = document.getElementById("app-container");
const canvas = document.getElementById("confetti-canvas");
const ctx = canvas.getContext("2d");

let noClickCount = 0;
let particles = [];
let animationFrame;

const mainMessages = [
    "Purva, please choose me as your boyfriend! 🥺❤️",
    "Are you sure? Think again! 🤔",
    "Maybe take a second? ✨",
    "I'm a great catch! 🎣",
    "We'd be cute! 🧸",
    "Error 404: No not found. 🤖",
    "Final answer? 🧐",
    "Snacks are on me! 🍫",
    "Still no? 🥺",
    "Mean! 😂",
    "Catch me! 🏃💨"
];

function initMainScreen() {
    noClickCount = 0;
    particles = [];
    cancelAnimationFrame(animationFrame);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    app.innerHTML = `
        <div class="container">
            <h1 id="question">${mainMessages[0]}</h1>
            <div class="buttons">
                <button id="yesBtn" class="icon-btn yes">
                    <img src="images/boy.jpg" alt="Boy">
                </button>
                <button id="noBtn" class="icon-btn no">
                    <img src="images/no.png" alt="X">
                </button>
            </div>
        </div>
    `;
    attachListeners();
}

function attachListeners() {
    const yesBtn = document.getElementById("yesBtn");
    const noBtn = document.getElementById("noBtn");
    const question = document.getElementById("question");

    noBtn.addEventListener("click", () => {
        noClickCount++;
        if (noClickCount < mainMessages.length) {
            question.innerText = mainMessages[noClickCount];
        }
        if (noClickCount >= 10) teleportButton(noBtn);
    });

    noBtn.addEventListener("mouseover", () => {
        if (noClickCount >= 10) teleportButton(noBtn);
    });

    yesBtn.addEventListener("click", showSuccess);
}

function teleportButton(btn) {
    const margin = 50;
    const maxX = window.innerWidth - btn.offsetWidth - margin;
    const maxY = window.innerHeight - btn.offsetHeight - margin;
    btn.style.position = "fixed";
    btn.style.left = Math.max(margin, Math.random() * maxX) + "px";
    btn.style.top = Math.max(margin, Math.random() * maxY) + "px";
}

function showSuccess() {
    app.innerHTML = `
        <div class="container">
            <h1 style="font-size: 2rem;">Yay! I'll give you a Tiramisu 🥰❤️</h1>
            <!-- Restart button as a round arrow icon -->
            <button id="restartBtn" class="icon-btn restart">
                <img src="images/restart.jpg" alt="Restart">
            </button>
        </div>
    `;
    document.getElementById("restartBtn").addEventListener("click", initMainScreen);
    setupConfetti();
    animateConfetti();
}

function setupConfetti() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    for (let i = 0; i < 80; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: -20,
            size: Math.random() * 5 + 2,
            color: ['#ff4d4d', '#ff0066', '#ffffff'][Math.floor(Math.random() * 3)],
            velocity: { x: (Math.random() - 0.5) * 4, y: Math.random() * 3 + 3 }
        });
    }
}

function animateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.x += p.velocity.x; p.y += p.velocity.y; });
    particles = particles.filter(p => p.y < canvas.height);
    particles.forEach(p => {
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size);
    });
    if (particles.length > 0) animationFrame = requestAnimationFrame(animateConfetti);
}

initMainScreen();

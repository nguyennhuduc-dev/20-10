```javascript
/* =========================
   KHỞI ĐỘNG WEBSITE
========================= */

const intro = document.getElementById("intro");
const startBtn = document.getElementById("startBtn");

startBtn.addEventListener("click", () => {

    intro.style.opacity = "0";

    setTimeout(() => {
        intro.style.display = "none";
    }, 1000);

    createPetals();

    // thử bật nhạc
    music.play().catch(() => {});
});


/* =========================
   NHẠC
========================= */

const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");

let playing = false;

musicBtn.addEventListener("click", () => {

    if (!playing) {

        music.play();

        musicBtn.innerHTML =
            '<i class="fa-solid fa-volume-high"></i> Đang phát';

        playing = true;

    } else {

        music.pause();

        musicBtn.innerHTML =
            '<i class="fa-solid fa-music"></i> Nhạc nền';

        playing = false;
    }

});


/* =========================
   CÁNH HOA RƠI
========================= */

function createPetals() {

    setInterval(() => {

        const petal = document.createElement("div");

        petal.className = "petal";

        const flowers = [
            "🌸",
            "🌷",
            "💗",
            "🌹",
            "✨"
        ];

        petal.innerHTML =
            flowers[
                Math.floor(
                    Math.random() * flowers.length
                )
            ];

        petal.style.left =
            Math.random() * 100 + "vw";

        petal.style.fontSize =
            Math.random() * 20 + 15 + "px";

        petal.style.animationDuration =
            Math.random() * 5 + 5 + "s";

        petal.style.opacity =
            Math.random() * .7 + .3;

        document.body.appendChild(petal);

        setTimeout(() => {
            petal.remove();
        }, 10000);

    }, 350);
}


/* =========================
   LỜI CHÚC
========================= */

const wishBtn = document.getElementById("wishBtn");
const popup = document.getElementById("popup");
const closePopup = document.getElementById("closePopup");

wishBtn.addEventListener("click", () => {

    popup.classList.add("show");

});


closePopup.addEventListener("click", () => {

    popup.classList.remove("show");

});


popup.addEventListener("click", (e) => {

    if (e.target === popup) {

        popup.classList.remove("show");

    }

});


/* =========================
   GIFT
========================= */

const giftBtn = document.getElementById("giftBtn");

giftBtn.addEventListener("click", (e) => {

    e.preventDefault();

    popup.classList.add("show");

});


/* =========================
   PHÁO HOA
========================= */

const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

});


let particles = [];


function createFirework(x, y) {

    for (let i = 0; i < 80; i++) {

        const angle =
            Math.random() * Math.PI * 2;

        const speed =
            Math.random() * 7 + 2;

        particles.push({

            x: x,

            y: y,

            vx: Math.cos(angle) * speed,

            vy: Math.sin(angle) * speed,

            life: 100,

            size: Math.random() * 3 + 1

        });

    }

}


function animateFireworks() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    particles.forEach((p, index) => {

        p.x += p.vx;

        p.y += p.vy;

        p.vy += .05;

        p.life--;

        ctx.globalAlpha =
            p.life / 100;

        ctx.fillStyle =
            `hsl(${Math.random() * 360},100%,70%)`;

        ctx.beginPath();

        ctx.arc(
            p.x,
            p.y,
            p.size,
            0,
            Math.PI * 2
        );

        ctx.fill();

        if (p.life <= 0) {

            particles.splice(index, 1);

        }

    });

    ctx.globalAlpha = 1;

    requestAnimationFrame(
        animateFireworks
    );

}

animateFireworks();


/* =========================
   NÚT NHẬN LỜI CHÚC
========================= */

const fireworkBtn =
    document.getElementById("fireworkBtn");

fireworkBtn.addEventListener("click", () => {

    popup.classList.remove("show");

    // pháo hoa nhiều lần

    for (let i = 0; i < 8; i++) {

        setTimeout(() => {

            createFirework(
                Math.random() * canvas.width,
                Math.random() * canvas.height * .6
            );

        }, i * 300);

    }

});


/* =========================
   CLICK MÀN HÌNH TẠO TIM
========================= */

document.addEventListener("click", (e) => {

    if (
        e.target.tagName === "BUTTON" ||
        e.target.tagName === "A"
    ) {
        return;
    }

    const heart =
        document.createElement("div");

    heart.innerHTML = "💗";

    heart.style.position = "fixed";

    heart.style.left = e.clientX + "px";

    heart.style.top = e.clientY + "px";

    heart.style.pointerEvents = "none";

    heart.style.fontSize = "20px";

    heart.style.zIndex = "2000";

    heart.style.transition =
        "1s ease";

    document.body.appendChild(heart);

    setTimeout(() => {

        heart.style.transform =
            "translateY(-100px) scale(1.5)";

        heart.style.opacity = "0";

    }, 50);

    setTimeout(() => {

        heart.remove();

    }, 1100);

});


/* =========================
   CHỮ HIỆN DẦN
========================= */

const description =
    document.querySelector(".description");

const originalText =
    description.textContent;

description.textContent = "";

let charIndex = 0;

function typeText() {

    if (charIndex < originalText.length) {

        description.textContent +=
            originalText.charAt(charIndex);

        charIndex++;

        setTimeout(typeText, 70);

    }

}

setTimeout(typeText, 1500);
```

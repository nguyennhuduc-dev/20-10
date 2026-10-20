```javascript
/* =========================================
   LẤY ELEMENT
========================================= */

const intro = document.getElementById("intro");
const startBtn = document.getElementById("startBtn");

const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");

const popup = document.getElementById("popup");
const closePopup = document.getElementById("closePopup");

const wishBtn = document.getElementById("wishBtn");
const giftBtn = document.getElementById("giftBtn");

const fireworkBtn =
    document.getElementById("fireworkBtn");

const memoryBtn =
    document.getElementById("memoryBtn");

const petalsContainer =
    document.getElementById("petals");

const canvas =
    document.getElementById("fireworks");

const ctx =
    canvas.getContext("2d");


/* =========================================
   BIẾN
========================================= */

let musicPlaying = false;

let musicStarted = false;

let fireworks = [];


/* =========================================
   CANVAS
========================================= */

function resizeCanvas() {

    canvas.width = window.innerWidth;

    canvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener(
    "resize",
    resizeCanvas
);


/* =========================================
   MỞ WEBSITE
========================================= */

startBtn.addEventListener(
    "click",
    function () {

        intro.classList.add("hide");

        /*
         * Không cho intro chặn click
         * sau khi đã biến mất.
         */

        setTimeout(
            function () {

                intro.style.display = "none";

            },
            1000
        );

        createPetals();

        /*
         * Trình duyệt thường cho phép
         * phát nhạc sau khi người dùng click.
         */

        music
            .play()
            .then(
                function () {

                    musicPlaying = true;

                    musicStarted = true;

                    updateMusicButton();

                }
            )
            .catch(
                function () {

                    console.log(
                        "Chưa có file music.mp3 hoặc trình duyệt chặn âm thanh."
                    );

                }
            );

    }
);


/* =========================================
   NHẠC
========================================= */

function updateMusicButton() {

    if (musicPlaying) {

        musicBtn.innerHTML =
            '<i class="fa-solid fa-volume-high"></i>' +
            '<span>Đang phát</span>';

    } else {

        musicBtn.innerHTML =
            '<i class="fa-solid fa-music"></i>' +
            '<span>Nhạc nền</span>';

    }

}


musicBtn.addEventListener(
    "click",
    function () {

        if (!musicPlaying) {

            music
                .play()
                .then(
                    function () {

                        musicPlaying = true;

                        musicStarted = true;

                        updateMusicButton();

                    }
                )
                .catch(
                    function () {

                        alert(
                            "Bạn cần đặt file music.mp3 vào cùng thư mục với index.html."
                        );

                    }
                );

        } else {

            music.pause();

            musicPlaying = false;

            updateMusicButton();

        }

    }
);


/* =========================================
   TẠO CÁNH HOA
========================================= */

let petalsStarted = false;

function createPetals() {

    if (petalsStarted) {
        return;
    }

    petalsStarted = true;

    setInterval(
        function () {

            createSinglePetal();

        },
        350
    );

}


function createSinglePetal() {

    const petal =
        document.createElement("div");

    petal.className = "petal";

    const objects = [
        "🌸",
        "🌷",
        "🌹",
        "💗",
        "✨"
    ];

    petal.innerHTML =
        objects[
            Math.floor(
                Math.random() *
                objects.length
            )
        ];

    petal.style.left =
        Math.random() * 100 + "vw";

    petal.style.fontSize =
        Math.random() * 18 + 14 + "px";

    petal.style.opacity =
        Math.random() * .6 + .3;

    petal.style.animationDuration =
        Math.random() * 5 + 5 + "s";

    petalsContainer.appendChild(petal);

    setTimeout(
        function () {

            petal.remove();

        },
        11000
    );

}


/* =========================================
   POPUP
========================================= */

function openPopup() {

    popup.classList.add("show");

}

function closePopupFunction() {

    popup.classList.remove("show");

}


wishBtn.addEventListener(
    "click",
    openPopup
);


giftBtn.addEventListener(
    "click",
    function (event) {

        event.preventDefault();

        openPopup();

    }
);


memoryBtn.addEventListener(
    "click",
    openPopup
);


closePopup.addEventListener(
    "click",
    closePopupFunction
);


popup.addEventListener(
    "click",
    function (event) {

        /*
         * Chỉ đóng khi click vùng
         * bên ngoài popup-box.
         */

        if (
            event.target === popup
        ) {

            closePopupFunction();

        }

    }
);


/* =========================================
   ESC ĐỂ ĐÓNG POPUP
========================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            closePopupFunction();

        }

    }
);


/* =========================================
   PHÁO HOA
========================================= */

function createFirework(
    x,
    y
) {

    const count = 90;

    for (
        let i = 0;
        i < count;
        i++
    ) {

        const angle =
            Math.random() *
            Math.PI *
            2;

        const speed =
            Math.random() *
            7 +
            2;

        fireworks.push({

            x: x,

            y: y,

            velocityX:
                Math.cos(angle) *
                speed,

            velocityY:
                Math.sin(angle) *
                speed,

            life: 100,

            size:
                Math.random() *
                2.5 +
                1,

            hue:
                Math.random() *
                360

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

    for (
        let i = fireworks.length - 1;
        i >= 0;
        i--
    ) {

        const particle =
            fireworks[i];

        particle.x +=
            particle.velocityX;

        particle.y +=
            particle.velocityY;

        particle.velocityY += .05;

        particle.life -= 1;

        ctx.globalAlpha =
            particle.life / 100;

        ctx.fillStyle =
            `hsl(
                ${particle.hue},
                100%,
                70%
            )`;

        ctx.beginPath();

        ctx.arc(
            particle.x,
            particle.y,
            particle.size,
            0,
            Math.PI * 2
        );

        ctx.fill();

        if (
            particle.life <= 0
        ) {

            fireworks.splice(
                i,
                1
            );

        }

    }

    ctx.globalAlpha = 1;

    requestAnimationFrame(
        animateFireworks
    );

}

animateFireworks();


/* =========================================
   BẮN PHÁO HOA NHIỀU LẦN
========================================= */

function celebration() {

    const total = 12;

    for (
        let i = 0;
        i < total;
        i++
    ) {

        setTimeout(
            function () {

                createFirework(
                    Math.random() *
                    canvas.width,

                    Math.random() *
                    canvas.height *
                    .65
                );

            },
            i * 250
        );

    }

}


fireworkBtn.addEventListener(
    "click",
    function () {

        closePopupFunction();

        celebration();

        /*
         * Thêm vài trái tim
         */

        for (
            let i = 0;
            i < 15;
            i++
        ) {

            setTimeout(
                function () {

                    createClickHeart(
                        Math.random() *
                        window.innerWidth,

                        Math.random() *
                        window.innerHeight
                    );

                },
                i * 100
            );

        }

    }
);


/* =========================================
   CLICK TẠO TIM
========================================= */

function createClickHeart(
    x,
    y
) {

    const heart =
        document.createElement("div");

    heart.className =
        "click-heart";

    heart.innerHTML =
        Math.random() > .5
            ? "💗"
            : "💕";

    heart.style.left =
        x + "px";

    heart.style.top =
        y + "px";

    document.body.appendChild(
        heart
    );

    requestAnimationFrame(
        function () {

            heart.style.transform =
                `
                translate(
                    ${Math.random() * 60 - 30}px,
                    -100px
                )
                scale(1.5)
                `;

            heart.style.opacity = "0";

        }
    );

    setTimeout(
        function () {

            heart.remove();

        },
        1100
    );

}


/*
 * Click ở background sẽ tạo tim.
 *
 * Không bắt click của:
 * - button
 * - link
 * - popup
 */

document.addEventListener(
    "click",
    function (event) {

        const target =
            event.target;

        if (
            target.closest("button") ||
            target.closest("a") ||
            target.closest(".popup-box")
        ) {

            return;

        }

        createClickHeart(
            event.clientX,
            event.clientY
        );

    }
);


/* =========================================
   HIỆU ỨNG GÕ CHỮ
========================================= */

const subtitle =
    document.querySelector(
        ".hero-subtitle"
    );

const subtitleText =
    subtitle.textContent.trim();

subtitle.textContent = "";

let textIndex = 0;

function typeSubtitle() {

    if (
        textIndex <
        subtitleText.length
    ) {

        subtitle.textContent +=
            subtitleText[textIndex];

        textIndex++;

        setTimeout(
            typeSubtitle,
            65
        );

    }

}

setTimeout(
    typeSubtitle,
    1200
);


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements =
    document.querySelectorAll(
        ".flower-item, .memory-section .big-heart"
    );


const observer =
    new IntersectionObserver(
        function (entries) {

            entries.forEach(
                function (entry) {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.style.opacity =
                            "1";

                        entry.target.style.transform =
                            "translateY(0)";

                    }

                }
            );

        },
        {
            threshold: .2
        }
    );


revealElements.forEach(
    function (element) {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(40px)";

        element.style.transition =
            "opacity .8s ease, transform .8s ease";

        observer.observe(
            element
        );

    }
);


/* =========================================
   KHỞI TẠO
========================================= */

updateMusicButton();
```

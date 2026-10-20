document.addEventListener("DOMContentLoaded", function () {

    console.log("20/10 website loaded successfully");


    /* =========================================
       ELEMENTS
    ========================================= */

    const intro =
        document.getElementById("intro");

    const startBtn =
        document.getElementById("startBtn");

    const musicBtn =
        document.getElementById("musicBtn");

    const music =
        document.getElementById("music");

    const wishBtn =
        document.getElementById("wishBtn");

    const memoryBtn =
        document.getElementById("memoryBtn");

    const giftBtn =
        document.getElementById("giftBtn");

    const popup =
        document.getElementById("popup");

    const closePopup =
        document.getElementById("closePopup");

    const fireworkBtn =
        document.getElementById("fireworkBtn");

    const petals =
        document.getElementById("petals");

    const canvas =
        document.getElementById("fireworks");

    const ctx =
        canvas
            ? canvas.getContext("2d")
            : null;


    /* =========================================
       OPEN GIFT
       
       Có cả onclick trong HTML.
       Phần này chỉ hỗ trợ thêm.
    ========================================= */

    if (startBtn) {

        startBtn.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                console.log(
                    "startBtn clicked"
                );

                if (typeof window.openGift === "function") {
                    window.openGift();
                }

                startEffects();

            }
        );

    }


    /* =========================================
       START EFFECTS
    ========================================= */

    let effectsStarted = false;

    function startEffects() {

        if (effectsStarted) {
            return;
        }

        effectsStarted = true;

        createPetals();

        setTimeout(
            function () {
                createPetals();
            },
            1500
        );

    }


    /* =========================================
       PETALS
    ========================================= */

    function createPetals() {

        if (!petals) {
            return;
        }

        const flowerEmojis = [
            "🌸",
            "🌷",
            "🌹",
            "💮",
            "💗"
        ];

        for (
            let i = 0;
            i < 12;
            i++
        ) {

            const petal =
                document.createElement("div");

            petal.className = "petal";

            petal.textContent =
                flowerEmojis[
                    Math.floor(
                        Math.random()
                        *
                        flowerEmojis.length
                    )
                ];

            const size =
                15 +
                Math.random() * 22;

            const left =
                Math.random() * 100;

            const duration =
                5 +
                Math.random() * 7;

            const delay =
                Math.random() * 4;

            petal.style.left =
                left + "%";

            petal.style.fontSize =
                size + "px";

            petal.style.animationDuration =
                duration + "s";

            petal.style.animationDelay =
                delay + "s";

            petals.appendChild(petal);

            setTimeout(
                function () {

                    if (petal.parentNode) {
                        petal.remove();
                    }

                },
                (duration + delay + 1) * 1000
            );

        }

    }


    /* =========================================
       POPUP
    ========================================= */

    function showPopup() {

        if (!popup) {
            return;
        }

        popup.classList.add("show");

        document.body.style.overflow =
            "hidden";

    }


    function hidePopup() {

        if (!popup) {
            return;
        }

        popup.classList.remove("show");

        document.body.style.overflow =
            "";

    }


    /* WISH BUTTON */

    if (wishBtn) {

        wishBtn.addEventListener(
            "click",
            function () {

                showPopup();

            }
        );

    }


    /* MEMORY BUTTON */

    if (memoryBtn) {

        memoryBtn.addEventListener(
            "click",
            function () {

                showPopup();

                launchFireworks();

            }
        );

    }


    /* GIFT BUTTON */

    if (giftBtn) {

        giftBtn.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                showPopup();

                launchFireworks();

            }
        );

    }


    /* CLOSE */

    if (closePopup) {

        closePopup.addEventListener(
            "click",
            function () {

                hidePopup();

            }
        );

    }


    /* CLICK OUTSIDE POPUP */

    if (popup) {

        popup.addEventListener(
            "click",
            function (event) {

                if (
                    event.target === popup
                ) {

                    hidePopup();

                }

            }
        );

    }


    /* ESC */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape"
            ) {

                hidePopup();

            }

        }
    );


    /* =========================================
       FIREWORK BUTTON
    ========================================= */

    if (fireworkBtn) {

        fireworkBtn.addEventListener(
            "click",
            function () {

                launchFireworks();

                createHeartBurst();

            }
        );

    }


    /* =========================================
       MUSIC
    ========================================= */

    let musicPlaying = false;


    function updateMusicButton() {

        if (!musicBtn) {
            return;
        }

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


    if (musicBtn) {

        musicBtn.addEventListener(
            "click",
            function () {

                if (!music) {
                    return;
                }

                if (musicPlaying) {

                    music.pause();

                    musicPlaying = false;

                    updateMusicButton();

                } else {

                    music.play()
                        .then(
                            function () {

                                musicPlaying =
                                    true;

                                updateMusicButton();

                            }
                        )
                        .catch(
                            function (error) {

                                console.log(
                                    "Không thể phát nhạc:",
                                    error
                                );

                            }
                        );

                }

            }
        );

    }


    /* =========================================
       CLICK HEART
    ========================================= */

    document.addEventListener(
        "click",
        function (event) {

            if (
                event.target.closest(
                    "button"
                ) ||
                event.target.closest(
                    "a"
                )
            ) {
                return;
            }

            createClickHeart(
                event.clientX,
                event.clientY
            );

        }
    );


    function createClickHeart(
        x,
        y
    ) {

        const heart =
            document.createElement("div");

        heart.className =
            "click-heart";

        heart.textContent =
            "💗";

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
                    "translateY(-80px) scale(1.5)";

                heart.style.opacity =
                    "0";

            }
        );

        setTimeout(
            function () {

                heart.remove();

            },
            1000
        );

    }


    /* =========================================
       CANVAS
    ========================================= */

    let particles = [];


    function resizeCanvas() {

        if (!canvas) {
            return;
        }

        canvas.width =
            window.innerWidth;

        canvas.height =
            window.innerHeight;

    }


    resizeCanvas();

    window.addEventListener(
        "resize",
        resizeCanvas
    );


    /* =========================================
       FIREWORK
    ========================================= */

    function launchFireworks() {

        if (!canvas || !ctx) {
            return;
        }

        for (
            let i = 0;
            i < 5;
            i++
        ) {

            setTimeout(
                function () {

                    createFirework();

                },
                i * 350
            );

        }

    }


    function createFirework() {

        if (!canvas) {
            return;
        }

        const x =
            100 +
            Math.random()
            *
            (canvas.width - 200);

        const y =
            80 +
            Math.random()
            *
            (canvas.height * 0.45);

        const colors = [
            "#ff4f9c",
            "#ff9ec5",
            "#ffd1e1",
            "#ffffff",
            "#ff6fa8"
        ];

        const color =
            colors[
                Math.floor(
                    Math.random()
                    *
                    colors.length
                )
            ];

        for (
            let i = 0;
            i < 55;
            i++
        ) {

            const angle =
                Math.random()
                *
                Math.PI
                *
                2;

            const speed =
                2 +
                Math.random() * 5;

            particles.push({

                x: x,

                y: y,

                vx:
                    Math.cos(angle)
                    *
                    speed,

                vy:
                    Math.sin(angle)
                    *
                    speed,

                life: 1,

                decay:
                    .012 +
                    Math.random() * .015,

                color: color,

                size:
                    2 +
                    Math.random() * 2

            });

        }

    }


    function animateFireworks() {

        if (!canvas || !ctx) {
            return;
        }

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        for (
            let i = particles.length - 1;
            i >= 0;
            i--
        ) {

            const p =
                particles[i];

            p.x += p.vx;

            p.y += p.vy;

            p.vy += .04;

            p.life -= p.decay;

            ctx.globalAlpha =
                Math.max(
                    0,
                    p.life
                );

            ctx.beginPath();

            ctx.arc(
                p.x,
                p.y,
                p.size,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                p.color;

            ctx.fill();

            if (
                p.life <= 0
            ) {

                particles.splice(
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
       HEART BURST
    ========================================= */

    function createHeartBurst() {

        for (
            let i = 0;
            i < 18;
            i++
        ) {

            const heart =
                document.createElement(
                    "div"
                );

            heart.className =
                "click-heart";

            heart.textContent =
                Math.random() > .5
                    ? "💗"
                    : "💖";

            heart.style.left =
                (
                    window.innerWidth / 2
                    +
                    (Math.random() - .5)
                    * 250
                )
                + "px";

            heart.style.top =
                (
                    window.innerHeight / 2
                    +
                    (Math.random() - .5)
                    * 150
                )
                + "px";

            document.body.appendChild(
                heart
            );

            const x =
                (Math.random() - .5)
                * 250;

            const y =
                -50 -
                Math.random() * 180;

            requestAnimationFrame(
                function () {

                    heart.style.transform =
                        `translate(${x}px, ${y}px) scale(1.5)`;

                    heart.style.opacity =
                        "0";

                }
            );

            setTimeout(
                function () {

                    heart.remove();

                },
                1200
            );

        }

    }


    /* =========================================
       INITIAL
    ========================================= */

    updateMusicButton();

});

/* =====================================================
   20/10 PRO JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const music = document.getElementById("bgMusic");
    const musicBtn = document.getElementById("musicBtn");

    let musicPlaying = false;

    /* =================================================
       PETALS
    ================================================= */

    createPetals();

    function createPetals() {

        const container = document.getElementById("petals");

        if (!container) return;

        const symbols = ["🌸", "🌷", "💮", "♥"];

        for (let i = 0; i < 35; i++) {

            const petal = document.createElement("div");

            petal.className = "petal";

            petal.innerHTML =
                symbols[Math.floor(Math.random() * symbols.length)];

            petal.style.left =
                Math.random() * 100 + "%";

            petal.style.animationDuration =
                7 + Math.random() * 8 + "s";

            petal.style.animationDelay =
                Math.random() * 8 + "s";

            petal.style.opacity =
                .25 + Math.random() * .55;

            petal.style.fontSize =
                10 + Math.random() * 14 + "px";

            container.appendChild(petal);
        }
    }


    /* =================================================
       SPARKLES
    ================================================= */

    createSparkles();

    function createSparkles() {

        const container =
            document.getElementById("sparkles");

        if (!container) return;

        for (let i = 0; i < 45; i++) {

            const sparkle =
                document.createElement("span");

            sparkle.className = "sparkle";

            sparkle.style.left =
                Math.random() * 100 + "%";

            sparkle.style.top =
                Math.random() * 100 + "%";

            sparkle.style.animationDelay =
                Math.random() * 3 + "s";

            container.appendChild(sparkle);
        }
    }


    /* =================================================
       START EFFECTS
    ================================================= */

    window.startEffects = function () {

        startTyping();

        setTimeout(() => {
            launchFirework(
                window.innerWidth * .25,
                window.innerHeight * .25
            );
        }, 500);

        setTimeout(() => {
            launchFirework(
                window.innerWidth * .75,
                window.innerHeight * .3
            );
        }, 900);
    };


    /* =================================================
       MUSIC
    ================================================= */

    window.playMusic = function () {

        if (!music) return;

        music.volume = 0.35;

        music.play()
            .then(() => {

                musicPlaying = true;

                updateMusicIcon();

            })
            .catch(() => {
                console.log("Music chưa được phát.");
            });
    };


    musicBtn?.addEventListener("click", () => {

        if (!music) return;

        if (musicPlaying) {

            music.pause();

            musicPlaying = false;

        } else {

            music.play()
                .then(() => {
                    musicPlaying = true;
                })
                .catch(() => {
                    alert("Bạn cần thêm file music.mp3 vào thư mục website.");
                });
        }

        updateMusicIcon();
    });


    function updateMusicIcon() {

        if (!musicBtn) return;

        musicBtn.innerHTML = musicPlaying
            ? `<i class="fa-solid fa-volume-high"></i>`
            : `<i class="fa-solid fa-volume-xmark"></i>`;
    }


    /* =================================================
       TYPING EFFECT
    ================================================= */

    let typingStarted = false;

    function startTyping() {

        if (typingStarted) return;

        typingStarted = true;

        const textElement =
            document.getElementById("typingText");

        if (!textElement) return;

        const text =
            "Chúc bạn luôn xinh đẹp, luôn vui vẻ và luôn tự tin trên hành trình của riêng mình. Mong rằng mỗi ngày thức dậy đều có thật nhiều điều khiến bạn mỉm cười. Happy Women's Day! 💗";

        let index = 0;

        function type() {

            if (index < text.length) {

                textElement.textContent +=
                    text.charAt(index);

                index++;

                setTimeout(type, 35);
            }
        }

        type();
    }


    /* =================================================
       POPUP
    ================================================= */

    window.showWish = function () {

        const popup =
            document.getElementById("popup");

        const title =
            document.getElementById("popupTitle");

        const text =
            document.getElementById("popupText");

        if (!popup) return;

        title.textContent =
            "Một lời chúc dành cho bạn 💗";

        text.textContent =
            "Chúc bạn có một ngày 20/10 thật vui vẻ. " +
            "Mong rằng bạn luôn giữ được nụ cười, " +
            "sự tự tin và những điều đẹp đẽ trong trái tim.";

        popup.classList.add("show");

        heartBurst();
    };


    window.showSurprise = function () {

        const popup =
            document.getElementById("popup");

        const title =
            document.getElementById("popupTitle");

        const text =
            document.getElementById("popupText");

        if (!popup) return;

        title.textContent =
            "Bất ngờ dành cho bạn 🎁";

        text.textContent =
            "Nếu hôm nay chưa có ai nói với bạn điều này " +
            "thì hãy nhớ rằng: bạn rất đặc biệt. " +
            "Hãy luôn yêu thương và trân trọng chính mình nhé! 💕";

        popup.classList.add("show");

        heartBurst();
        launchMegaFireworks();
    };


    window.closePopup = function () {

        const popup =
            document.getElementById("popup");

        if (popup) {
            popup.classList.remove("show");
        }
    };


    /* =================================================
       ESCAPE
    ================================================= */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            closePopup();
        }

    });


    /* =================================================
       SCROLL
    ================================================= */

    window.scrollToSection = function (id) {

        const section =
            document.getElementById(id);

        if (!section) return;

        section.scrollIntoView({
            behavior: "smooth"
        });
    };


    /* =================================================
       NAV ACTIVE
    ================================================= */

    const sections =
        document.querySelectorAll("section[id]");

    const navLinks =
        document.querySelectorAll("nav a");

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting)
                        return;

                    navLinks.forEach(link => {

                        link.classList.remove("active");

                        if (
                            link.getAttribute("href") ===
                            "#" + entry.target.id
                        ) {
                            link.classList.add("active");
                        }

                    });

                });

            },
            {
                threshold: .4
            }
        );

    sections.forEach(section => {
        observer.observe(section);
    });


    /* =================================================
       REVEAL
    ================================================= */

    const revealItems =
        document.querySelectorAll(
            ".flower-card, .memory-item, .wish-card, .quote"
        );

    revealItems.forEach(item => {
        item.classList.add("reveal");
    });

    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        revealObserver.unobserve(
                            entry.target
                        );
                    }

                });

            },
            {
                threshold: .15
            }
        );

    revealItems.forEach(item => {
        revealObserver.observe(item);
    });


    /* =================================================
       CLICK HEART
    ================================================= */

    document.addEventListener("click", event => {

        if (
            event.target.closest("button") ||
            event.target.closest("a")
        ) {
            return;
        }

        createClickHeart(
            event.clientX,
            event.clientY
        );
    });


    function createClickHeart(x, y) {

        const heart =
            document.createElement("div");

        heart.className =
            "click-heart";

        heart.textContent =
            Math.random() > .5
                ? "♥"
                : "♡";

        heart.style.left =
            x + "px";

        heart.style.top =
            y + "px";

        heart.style.setProperty(
            "--x",
            (Math.random() * 100 - 50) + "px"
        );

        heart.style.setProperty(
            "--y",
            (-80 - Math.random() * 80) + "px"
        );

        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 1000);
    }


    /* =================================================
       FIREWORK CANVAS
    ================================================= */

    const canvas =
        document.getElementById("fireworks");

    const ctx =
        canvas?.getContext("2d");

    let particles = [];

    function resizeCanvas() {

        if (!canvas) return;

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


    function launchFirework(x, y) {

        if (!ctx) return;

        const colors = [
            "#ff5c93",
            "#ff9fbd",
            "#ffd166",
            "#ffffff",
            "#c77dff"
        ];

        const color =
            colors[
                Math.floor(
                    Math.random() * colors.length
                )
            ];

        for (let i = 0; i < 70; i++) {

            const angle =
                Math.PI * 2 *
                (i / 70);

            const speed =
                2 + Math.random() * 4;

            particles.push({

                x,
                y,

                vx:
                    Math.cos(angle) *
                    speed,

                vy:
                    Math.sin(angle) *
                    speed,

                life: 1,

                decay:
                    .012 +
                    Math.random() * .012,

                color
            });
        }
    }


    function animateFireworks() {

        if (!ctx || !canvas) return;

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        particles =
            particles.filter(
                particle =>
                    particle.life > 0
            );

        particles.forEach(particle => {

            particle.x += particle.vx;

            particle.y += particle.vy;

            particle.vy += .04;

            particle.life -=
                particle.decay;

            ctx.globalAlpha =
                particle.life;

            ctx.fillStyle =
                particle.color;

            ctx.beginPath();

            ctx.arc(
                particle.x,
                particle.y,
                2,
                0,
                Math.PI * 2
            );

            ctx.fill();
        });

        ctx.globalAlpha = 1;

        requestAnimationFrame(
            animateFireworks
        );
    }

    animateFireworks();


    /* =================================================
       MEGA FIREWORKS
    ================================================= */

    window.launchMegaFireworks = function () {

        if (!canvas) return;

        const width =
            window.innerWidth;

        const height =
            window.innerHeight;

        launchFirework(
            width * .2,
            height * .25
        );

        setTimeout(() => {
            launchFirework(
                width * .5,
                height * .2
            );
        }, 250);

        setTimeout(() => {
            launchFirework(
                width * .8,
                height * .25
            );
        }, 500);

        setTimeout(() => {
            launchFirework(
                width * .35,
                height * .35
            );
        }, 750);

        setTimeout(() => {
            launchFirework(
                width * .65,
                height * .35
            );
        }, 1000);
    };


    /* =================================================
       HEART BURST
    ================================================= */

    function heartBurst() {

        const symbols = [
            "♥",
            "♡",
            "💗",
            "💖",
            "💕"
        ];

        for (let i = 0; i < 25; i++) {

            setTimeout(() => {

                const heart =
                    document.createElement("div");

                heart.className =
                    "click-heart";

                heart.textContent =
                    symbols[
                        Math.floor(
                            Math.random() *
                            symbols.length
                        )
                    ];

                heart.style.left =
                    50 + "vw";

                heart.style.top =
                    50 + "vh";

                heart.style.fontSize =
                    16 +
                    Math.random() * 25 +
                    "px";

                heart.style.setProperty(
                    "--x",
                    (Math.random() * 500 - 250) +
                    "px"
                );

                heart.style.setProperty(
                    "--y",
                    (Math.random() * 500 - 350) +
                    "px"
                );

                document.body.appendChild(
                    heart
                );

                setTimeout(() => {
                    heart.remove();
                }, 1200);

            }, i * 35);
        }
    }

});

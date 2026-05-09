document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const audio = document.getElementById('bg-music');
    let currentSlide = 1;

    // Start Journey
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            audio.play().catch(e => console.log("Audio play blocked"));
            nextSlide(2);
        });
    }

    window.nextSlide = (target) => {
        const curEl = document.getElementById(`slide-${currentSlide}`);
        const nextEl = document.getElementById(`slide-${target}`);

        if (!curEl || !nextEl) return;

        if (typeof gsap === 'undefined') {
            curEl.classList.remove('active');
            nextEl.classList.add('active');
            currentSlide = target;
            return;
        }

        gsap.to(curEl, {
            opacity: 0,
            y: -20,
            duration: 0.5,
            onComplete: () => {
                curEl.classList.remove('active');
                nextEl.classList.add('active');
                
                gsap.fromTo(nextEl, 
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
                );

                animateSlide(target);
                currentSlide = target;
            }
        });
    };

    function animateSlide(n) {
        if (typeof gsap === 'undefined') return;

        // Clean entrance animations for each slide
        const content = document.querySelector(`#slide-${n} .slide-content`);
        if (content) {
            gsap.from(content.children, {
                opacity: 0,
                y: 20,
                stagger: 0.15,
                duration: 1,
                ease: "power2.out"
            });
        }

        // Specific neat touches
        if (n === 2) {
            gsap.from('.frame', {
                scale: 0.9,
                rotation: (i) => i % 2 === 0 ? -2 : 2,
                stagger: 0.1,
                duration: 1
            });
        }
        if (n === 3) {
            gsap.from('.polaroid', {
                rotation: (i) => i === 0 ? -5 : 5,
                x: (i) => i === 0 ? -20 : 20,
                duration: 1
            });
        }
    }

    // Floating dots for Slide 1
    const dots = document.querySelector('.floating-elements');
    if (dots && typeof gsap !== 'undefined') {
        for(let i=0; i<15; i++) {
            const d = document.createElement('div');
            d.style.cssText = `position:absolute; width:6px; height:6px; background:var(--accent); opacity:0.1; border-radius:50%; left:${Math.random()*100}%; top:${Math.random()*100}%;`;
            dots.appendChild(d);
            gsap.to(d, {
                y: -30, 
                duration: 2 + Math.random()*2, 
                repeat: -1, yoyo: true,
                ease: "sine.inOut"
            });
        }
    }
});

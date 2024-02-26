function bannerAnim() {
    let headingElem = document.querySelector('.homeBanner .blob h1')
    let heading = new SplitType(headingElem, {types: 'words, chars'})

    let tl = gsap.timeline({delay: 1})
    tl
        .to(heading.chars, {
            translateY: 0,
            translateZ: 0,
            autoAlpha: 1,
            stagger: 0.1,
            duration: 1.5,
            ease: "expo.out",
        })
}

function lenisSetup() {
    const lenis = new Lenis({
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
        smooth: true,
        mouseMultiplier: 1,
    })

    function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf);
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            lenis.scrollTo(this.getAttribute("href"));
        });
    });
    let body = $('body')
    let icon = $('.menuBtn i')
    $('.menuBtn').click(function () {
        body.toggleClass('active')
        if (icon.hasClass('fas fa-bars')) {
            lenis.stop()
            icon.removeClass()
            icon.addClass('fas fa-times')
        } else {
            lenis.start()
            icon.removeClass()
            icon.addClass('fas fa-bars')
        }
    });
}

$(function () {
    ScrollTrigger.normalizeScroll(true);
    bannerAnim();
    lenisSetup();
})

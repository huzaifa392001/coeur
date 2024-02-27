function menuToggle() {
    let body = $('body')
    let icon = $('.menuBtn i')
    $('.menuBtn').click(function () {
        body.toggleClass('active')
        if (icon.hasClass('fas fa-bars')) {
            icon.removeClass()
            icon.addClass('fas fa-times')
        } else {
            icon.removeClass()
            icon.addClass('fas fa-bars')
        }
    });
}

function bannerAnim() {
    let headingElem = document.querySelector('.homeBanner .blob h1')
    let innerHeadingElem = document.querySelector('.innerBan .content h1')
    let heading = new SplitType(headingElem ? headingElem : innerHeadingElem, {types: 'words, chars'})

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
    const locomotiveScroll = new LocomotiveScroll({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
        smooth: true,
        mouseMultiplier: 1,
    });

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            locomotiveScroll.scrollTo(this.getAttribute("href"));
        });
    });

    if(window.innerWidth <= 991){
        $('[data-scroll]').removeAttr('data-scroll-speed')
    }
}

function allSliders() {
    var swiper = new Swiper(".gallerySlider", {
        slidesPerView: 'auto',
        spaceBetween: 32,
        centeredSlides: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });
}

function barba() {
    barba.init({
        debug: true,
        // transitions: [{
        //     name: 'default-transaction',
        //     async leave(data) {
        //         let currentCont = data.current
        //         ScrollTrigger.getAll().forEach(t => t.kill());
        //         scroll.destroy();
        //         return barbaTl
        //             .to(currentCont, {autoAlpha: 0})
        //             .to('.preLoader', {css: {display: 'flex'},})
        //             .to('.preLoader.white > img', {y: 0, autoAlpha: 1})
        //             .to('.preLoader.white', {yPercent: 0, ease: 'Circ.easeInOut'})
        //             .to('.preLoader.black', {xPercent: 0, ease: 'Circ.easeInOut'});
        //         // console.log("Leave")
        //     },
        //     async afterEnter(data) {
        //         let nextCont = data.next
        //
        //         data.current.container.remove();
        //         barbaTl
        //             .to(nextCont, {autoAlpha: 1})
        //             .to('.preLoader.white > img', {y: 50, autoAlpha: 0})
        //             .to('.preLoader.white', {yPercent: -100, ease: 'Circ.easeInOut'})
        //             .to('.preLoader.black', {xPercent: -100, ease: 'Circ.easeInOut'})
        //             .to(".preLoader", {css: {display: 'none'}})
        //             .from('.navbar-brand > img', {x: -50, autoAlpha: 0})
        //     }
        // }]
    })
}

$(function () {
    ScrollTrigger.normalizeScroll(true);
    menuToggle();
    bannerAnim();
    lenisSetup();
    allSliders();
    Fancybox.bind('[data-fancybox="gallery"]', {
        // Your custom options for a specific gallery
    });
})

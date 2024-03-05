$(function () {
    menuToggle();
    bannerAnim();
    allSliders();
    Fancybox.bind();

    const image = document.getElementById('draggableImage');
    const container = document.querySelector('.mapSec .mapImg');

    if (image) {
        makeImageDraggableAndScrollable(image, container);
    }
    stackingImages();
    horizontalSection()
})

$(window).on("load", function () {
    if (window.innerWidth >= 992) {
        let pageLoc = window.location.href;
        let pageLocParts = pageLoc.split('/'); // Split the URL
        console.log(pageLocParts); // Log the parts to see if they split correctly

        // Check if the last part is "index.html", "", or "index"
        let lastPart = pageLocParts[pageLocParts.length - 1];
        if (lastPart === "index.html" || lastPart === "" || lastPart === "index") {
            console.log("Last part is index.html, an empty string, or index. lenisSetup() won't run.");
        } else {
            lenisSetup(); // If not, call lenisSetup()
        }
    }
});

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


    $('.modalPopup').on('click', function () {
        var modalTarget = $(this).data('modal-target');
        $(modalTarget).toggleClass('active');
        $('.overlay').toggleClass('active');
        if (document.querySelector('html').style.overflow === 'hidden') {
            document.querySelector('html').style.overflow = 'auto'
        } else {
            document.querySelector('html').style.overflow = 'hidden'
        }
    });
    $('.overlay').on('click', function () {
        $('.sideModal.active').toggleClass('active');
        $('.overlay').toggleClass('active');
        if (document.querySelector('html').style.overflow === 'hidden') {
            document.querySelector('html').style.overflow = 'auto'
        } else {
            document.querySelector('html').style.overflow = 'hidden'
        }
    });
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

function makeImageDraggableAndScrollable(image, container) {
    let posX = 0, posY = 0, posInitialX = 0, posInitialY = 0;
    let isDragging = false;

    function dragStart(e) {
        isDragging = true;
        image.style.cursor = 'grabbing';
        posInitialX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
        posInitialY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
        document.addEventListener('mousemove', elementDrag);
        document.addEventListener('touchmove', elementDrag);
        document.addEventListener('mouseup', dragEnd);
        document.addEventListener('touchend', dragEnd);
    }

    function elementDrag(e) {
        if (isDragging) {
            e.preventDefault();
            const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
            const clientY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
            posX = posInitialX - clientX;
            posY = posInitialY - clientY;
            posInitialX = clientX;
            posInitialY = clientY;

            updateImagePosition(image, -posX, -posY);
        }
    }

    function dragEnd() {
        isDragging = false;
        image.style.cursor = 'grab';
        document.removeEventListener('mousemove', elementDrag);
        document.removeEventListener('touchmove', elementDrag);
        document.removeEventListener('mouseup', dragEnd);
        document.removeEventListener('touchend', dragEnd);
    }

    function updateImagePosition(img, deltaX, deltaY) {
        let newLeft = img.offsetLeft + deltaX;
        let newTop = img.offsetTop + deltaY;

        if (newLeft > 0) newLeft = 0;
        if (newTop > 0) newTop = 0;
        if (newLeft < container.offsetWidth - img.offsetWidth) newLeft = container.offsetWidth - img.offsetWidth;
        if (newTop < container.offsetHeight - img.offsetHeight) newTop = container.offsetHeight - img.offsetHeight;

        img.style.left = newLeft + "px";
        img.style.top = newTop + "px";
    }

    image.addEventListener('mousedown', dragStart);
    image.addEventListener('touchstart', dragStart);
}

function horizontalSection() {
    let allWrapper = document.querySelectorAll('.sliderSec')

    allWrapper.forEach((wrapper) => {

        let sections = wrapper.querySelectorAll('.panel')
        console.log(`${sections.length * 100}%`)
        wrapper.style.width = `${sections.length * 100}%`
        gsap.to(sections, {
            xPercent: -100 * (sections.length - 1),
            ease: "none",
            scrollTrigger: {
                trigger: wrapper,
                pin: true,
                start: 'top',
                scrub: 1,
                end: () => "+=" + (wrapper.offsetWidth / 2),
            }
        })
    })
}

function stackingImages() {
    let images = document.querySelectorAll('.floorImg img');

    // Assign z-index in descending order
    images.forEach((image, index) => {
        image.style.zIndex = images.length - index;
    });
}


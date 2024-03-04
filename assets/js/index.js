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

function svgRotate() {
    let tl = gsap.timeline({defaults: {duration: 3, repeat: -1, yoyo: true}})
    let elements = gsap.utils.toArray('#svgRotate > *')


    tl.to(elements, {
        scale: 1.5,
        transformOrigin: 'center center',
        stagger: 2
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


$(function () {
    menuToggle();
    bannerAnim();
    allSliders();
    Fancybox.bind('[data-fancybox="gallery"]', {});
    svgRotate()

    const image = document.getElementById('draggableImage');
    const container = document.querySelector('.mapSec .mapImg');

    if (image) {
        makeImageDraggableAndScrollable(image, container);
    }


    $('.modalPopup').on('click', function () {
        var modalTarget = $(this).data('modal-target');
        $(modalTarget).toggleClass('active');
    });
})

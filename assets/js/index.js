$(function () {
    gsap.registerPlugin(DrawSVGPlugin)
    menuToggle();
    allSliders();
    stackingImages();
    horizontalSection();
    secHeading();
    Fancybox.bind();
    bgAnim()

    const image = document.getElementById('draggableImage');
    const container = document.querySelector('.mapSec .mapImg');

    if (image) {
        makeImageDraggableAndScrollable(image, container);
    }
})

$(window).on("load", function () {
    window.scrollTo(0, 0);
    if (window.innerWidth >= 992) {
        let pageLoc = window.location.href;
        let pageLocParts = pageLoc.split('/');

        let lastPart = pageLocParts[pageLocParts.length - 1];
        if (lastPart === "index.html" || lastPart === "" || lastPart === "index") {
            HomeBannerAnim();
        } else if (lastPart === "info-cles" || lastPart === "info-cles.html") {
            console.log(lastPart)
            lenisSetup()
        } else {
            bannerAnim()
        }
    } else {
        mobileBannerAnim()
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

    gsap.to("header .menuBtn svg", {
        rotation: "+=360",
        repeat: -1,
        duration: 10,
        ease: "none"
    })
}

function HomeBannerAnim() {
    let headingElem = document.querySelector('.homeBanner .blob h1')
    let heading = new SplitType(headingElem, {types: 'words, chars'})

    let tl = gsap.timeline({delay: 1, pause: true})
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

function mobileBannerAnim() {
    let headingElem = document.querySelector('.homeBanner .blob h1')
    let innerHeadingElem = document.querySelector('.innerBan .content h1')
    let heading = new SplitType(headingElem ? headingElem : innerHeadingElem, {types: 'words, chars'})
    gsap.set(innerHeadingElem, {
        autoAlpha: 1
    })

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

function bannerAnim() {
    let innerHeadingElem = document.querySelector('.innerBan .content h1')
    let bannerImage = document.querySelector('.innerBan .bannerImg')
    let heading = new SplitType(innerHeadingElem, {types: 'words, chars'})
    gsap.set(innerHeadingElem, {
        autoAlpha: 1
    })
    let tl = gsap.timeline({
        delay: 1, pause: true, onComplete: () => {
            lenisSetup();
        }
    })
    tl
        .to("#myClip path ", {
            attr: {
                d: "M -741.595 132.032 C -1068.187 433.229 -1151.593 956.524 -102.629 1373.504 C 269.88 1521.583 1825.523 1899.312 2376.193 1391.459 C 2598.47 1186.463 3416.507 57.807 2326.783 -375.385 C 1346.392 -765.108 -344.684 -234.017 -741.595 132.032 Z",
            },
            ease: "none",
            duration: 2
        })
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
            wrapper.style.width = `${sections.length * 100}%`

            gsap.to(sections, {
                xPercent: -100 * (sections.length - 1) - 5,
                ease: "none",
                scrollTrigger: {
                    trigger: wrapper,
                    pin: true,
                    start: 'top',
                    scrub: 1,
                    end: () => "+=" + (wrapper.offsetWidth / 2)
                }
            })
        }
    )
}

function stackingImages() {
    let images = document.querySelectorAll('.floorImg img');

    // Assign z-index in descending order
    images.forEach((image, index) => {
        image.style.zIndex = images.length - index;
    });
}

function secHeading() {
    let headings = document.querySelectorAll('.secHeading')
    let paraElem = document.querySelectorAll('.linesAnim')
    headings.forEach((heading) => {
        let text = new SplitType(heading, {types: 'words, chars'})

        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: heading,
                toggleActions: "play none none reverse"
            }
        })

        tl.from(text.chars, {
            autoAlpha: 0,
            stagger: 0.1,
            duration: 0.5
        })
    })

    paraElem.forEach((elem) => {
        let text = new SplitType(elem, {types: 'lines'})

        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: elem,
                toggleActions: "play none none reverse"
            }
        })

        tl.from(text.lines, {
            autoAlpha: 0,
            y: -50,
            stagger: 0.2,
            duration: 0.5
        })
    })

}

function bgAnim() {
// Define the colors
    const colors = ["#BCCF02", "#EF9757", "#00AAC1"];

// Select all divs that will have the colors applied.
    const colorDivs = gsap.utils.toArray('#colorAnim .color');

// Function to get the next color in the array
    function getNextColor(index) {
        return colors[(index + 1) % colors.length];
    }

// GSAP timeline setup
    const tl = gsap.timeline({repeat: -1, yoyo: true}); // infinitely repeat the timeline

    colorDivs.forEach((div, i) => {
        tl.to(div, {
            backgroundColor: getNextColor(i), // Use the getNextColor function
            duration: 7,
            // rotation: '+=360',
            scale: 1.5,
            ease: "none",
        }, 0); // Start all animations at the same time
    });

    tl.play(); // Play the timeline

}
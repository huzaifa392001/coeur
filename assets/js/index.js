$(document).ready(function () {
    const body = $('body');
    const icon = $('.menuBtn .btnIcon');
    const image = document.getElementById('draggableImage');
    const container = document.querySelector('.mapSec .mapImg');
    const isDesktop = window.innerWidth >= 992;

    $('.menuBtn').click(function () {
        body.toggleClass('active');
        icon.toggleClass('active');
        const iconHTML = icon.hasClass('active') ? '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M0 2H20M0 10H20M0 18H20" stroke="url(#paint0_linear_4024_680)" stroke-width="3"/></svg>' : '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.87879 11L0.939453 18.9393L3.06077 21.0606L11.0001 13.1213L18.9395 21.0606L21.0608 18.9393L13.1214 11L21.0608 3.06065L18.9395 0.939331L11.0001 8.87867L3.06077 0.939331L0.939453 3.06065L8.87879 11Z" fill="url(#paint0_linear_4024_1942)"/></svg>';
        $('.menuBtn .btnIcon').html(iconHTML);
    });

    gsap.to(".rotateSvg", {
        rotation: "+=360",
        repeat: -1,
        duration: 10,
        ease: "none"
    });

    if (image) {
        makeImageDraggableAndScrollable(image, container);
    }

    $(window).on("load", function () {
        window.scrollTo(0, 0);

        if (isDesktop) {
            const pageLoc = window.location.href;
            const lastPart = pageLoc.substring(pageLoc.lastIndexOf('/') + 1);
            if (lastPart === "index.html" || lastPart === "" || lastPart === "index") {
                HomeBannerAnim();
            } else if (lastPart === "info-cles" || lastPart === "info-cles.html") {
                lenisSetup();
            } else {
                bannerAnim();
            }
        } else {
            mobileBannerAnim();
        }
    });

    allSliders();
    stackingImages();
    horizontalSection();
    secHeading();
    Fancybox.bind();
    bgAnim();
});

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
            let width = 0, transform = 0, lastImgWidth = 0;
            let sections = wrapper.querySelectorAll('.panel')
            let images = wrapper.querySelectorAll('.panel img')
            images.forEach((sec) => {
                width += sec.clientWidth
                lastImgWidth = sec.clientWidth
            })
            wrapper.style.width = `${width}px`;
            if (window.innerWidth >= 1367) {
                transform = (width / 2)
            } else if (window.innerWidth >= 992) {
                transform = (width / 1.5)
            } else if (window.innerWidth >= 576) {
                transform = (width - (lastImgWidth / 1.5))
            } else if (window.innerWidth >= 450) {
                transform = (width - (lastImgWidth / 2))
            } else {
                transform = width - lastImgWidth + 50
            }
            gsap.to(sections, {
                x: -transform,
                ease: "none",
                scrollTrigger: {
                    trigger: wrapper,
                    pin: true,
                    start: 'top',
                    scrub: 1,
                    end: () => "+=" + width
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

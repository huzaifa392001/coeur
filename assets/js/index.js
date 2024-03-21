$(document).ready(function () {
    window.scrollTo(0, 0)
    allFunc()
});
$(window).on("load", function () {
    const isDesktop = window.innerWidth >= 992;


    if (isDesktop) {
        const pageLoc = window.location.href;
        const lastPart = pageLoc.substring(pageLoc.lastIndexOf('/') + 1);
        if (lastPart === "index.html" || lastPart === "index" || lastPart === "") {
            HomeBannerAnim();
        } else {
            bannerAnim();
            lenisSetup();
        }
    } else {
        mobileBannerAnim();
    }
});

function allFunc() {
    const image = document.getElementById('draggableImage');
    const container = document.querySelector('.mapSec .mapImg');
    if (image) {
        makeImageDraggableAndScrollable(image, container);
    }
    menuTrigger()
    allSliders();
    stackingImages();
    horizontalSection();
    secHeading();
    bgAnim();
    animateSVGCircles();
    handleIntroVideo()
    animateInfoClesBannerColors()
    playVideo()
    modalPopup()
}

function menuTrigger() {
    const body = $('body');
    const icon = $('.menuBtn .btnIcon');
    $('.menuBtn').click(function () {
        body.toggleClass('active');
        icon.toggleClass('active');
    });
    gsap.to(".rotateSvg", {
        rotation: "+=360",
        repeat: -1,
        duration: 10,
        ease: "none"
    });
}

function HomeBannerAnim() {
    let headingElem = document.querySelectorAll('.homeBanner .blob .animate')
    let heading = new SplitType(headingElem, {types: 'words, chars'})

    let tl = gsap.timeline({delay: 1, pause: true})
    tl
        .to(heading.chars, {
            translateY: 0,
            translateZ: 0,
            autoAlpha: 1,
            stagger: 0.1,
            duration: 1,
            ease: "expo.out",
        })
        .to('.animate ~ button', {
            autoAlpha: 1,
            ease: "expo.out",
        }, "-=0.9")
}

function mobileBannerAnim() {
    let headingElem = document.querySelectorAll(['.homeBanner .blob .animate', '.innerBan .content h1'])
    headingElem.forEach((text) => {
        gsap.set(text, {autoAlpha: 1})
        let heading = new SplitType(text, {types: 'words, chars'})

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
    let banner = document.querySelector('.innerBan')
    if (banner) {
        let innerHeadingElem = document.querySelector('.innerBan .content h1')
        let bannerImage = document.querySelector('.innerBan .bannerImg')
        let heading = new SplitType(innerHeadingElem, {types: 'words, chars'})
        gsap.set(innerHeadingElem, {
            autoAlpha: 1
        })
        let tl = gsap.timeline({pause: true})
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
    } else {
        lenisSetup();
    }
}

function lenisSetup() {
    const locomotiveScroll = new LocomotiveScroll({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
        smooth: true,
        mouseMultiplier: 1,
    });
    const hash = window.location.hash;
    console.log(hash)
    if (hash && document.querySelector(hash)) {
        locomotiveScroll.scrollTo(hash)
    }

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
    var swiper = new Swiper(".galleryInnerSlider", {
        slidesPerView: '1',
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        autoplay: {
            delay: 2500
        }
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

function animateSVGCircles() {
    // Define the colors
    const colors = ["#BCCF02", "#EF9757", "#00AAC1"];

    // Select all '.homeBanner .blob svg' within the document
    let svgElements = document.querySelectorAll([".homeBanner .blob > svg", ".bgBlob > svg"]);
    svgElements.forEach(svg => {
        // Select circles within the current SVG
        const circles = svg.querySelectorAll('circle');

        // Function to get the next color in the array
        function getNextColor(index) {
            return colors[(index + 1) % colors.length];
        }

        // GSAP timeline setup
        const tl = gsap.timeline({repeat: -1, yoyo: true}); // infinitely repeat the timeline

        circles.forEach((circle, i) => {
            tl.to(circle, {
                // Change the fill color using the getNextColor function
                attr: {fill: getNextColor(i)},
                duration: 5,
                rotation: '+=360',
                scale: 1.5,
                transformOrigin: '50% 50%', // Ensure the circle scales and rotates around its center
                ease: "none"
            }, "-=4.8"); // Overlap the timing of animations slightly for a smooth transition
        });
        tl.play(); // Play the timeline
    });
}

function modalPopup() {
    document.querySelectorAll('[data-image-modal]').forEach(item => {
        item.addEventListener('click', () => {
            openModal(item);
        });
    });

    document.querySelector(".close")?.addEventListener("click", () => {
        document.getElementById("myModal").style.display = "none";
    });
// Function to open modal
    const openModal = (anchor) => {
        const modal = document.getElementById("myModal");
        const modalImg = document.getElementById("modal-image");
        const captionText = document.getElementById("caption");
        const imgSrc = anchor.getAttribute('data-src');
        const imgCaption = anchor.getAttribute('data-caption');
        const isAutoHeight = anchor.getAttribute('data-height-auto')

        modal.style.display = "flex";
        modal.classList.remove("fadeOut");
        modalImg.src = imgSrc;
        if (imgCaption) {
            captionText.innerHTML = imgCaption;
        } else {
            console.log(imgCaption)
            captionText.style.display = "none"
        }
        if (isAutoHeight == 'true') {
            modal.classList.add("autoHeightModal")
            console.log(isAutoHeight)
        } else {
            if (modal.classList.contains('autoHeightModal')) {
                modal.classList.remove("autoHeightModal")
            }
        }
    }

// Function to close modal
    const closeModal = () => {
        const modal = document.getElementById("myModal");
        modal.classList.add("fadeOut");
        setTimeout(() => {
            modal.style.display = "none";
        }, 500);
    }
}

function handleIntroVideo() {
    let introVideoContainer = document.querySelector("#introVideo");
    let hasVisited = localStorage.getItem('hasVisited');

    if (hasVisited) {
        gsap.to(introVideoContainer, {
            autoAlpha: 0,
            duration: 0 // Hide it immediately
        });
    } else {
        console.log('working')

        let button = document.querySelector('#playBtn');
        let skipBtn = document.querySelector('#skipBtn');
        let video = document.querySelector('#introVideo video');
        let container = document.querySelector("#introVideo .blob");

        button?.addEventListener('click', function () {
            localStorage.setItem('hasVisited', true);
            video?.play();
            video?.setAttribute("controls", "true");
            gsap.to(container, {
                autoAlpha: 0,
                duration: 0.5 // Fade out the button container
            });
        });

        skipBtn?.addEventListener('click', function () {
            console.log('here')
            video?.load()
            video?.removeAttribute("controls");
            gsap.to(introVideoContainer, {
                autoAlpha: 0,
                duration: 0.5 // Fade out the video container
            });
        });

        video?.addEventListener("ended", function () {
            gsap.to(introVideoContainer, {
                autoAlpha: 0,
                duration: 0.5 // Fade out the video container
            });
        });
    }
}

function animateInfoClesBannerColors() {
    // Define the colors
    const colors = ["#BCCF02", "#EF9757", "#00AAC1"];

    // Select all '.color' divs within '.infoClesBanner' within the document
    let colorDivs = document.querySelectorAll(".infoClesBanner .color");
    // Process each .color div individually
    colorDivs.forEach((div, index) => {
        // GSAP timeline for current div with infinite loop and yoyo effect
        const tl = gsap.timeline({repeat: -1, yoyo: true});

        // Starting color index offset by div index to ensure different colors
        let colorIndex = index;

        // Setup animation for the current div
        for (let i = 0; i < colors.length; i++) {
            tl.to(div, {
                // Change the background color - get the next color in the array for each div
                backgroundColor: colors[colorIndex % colors.length],
                duration: 5,
                scale: 1.05,
                transformOrigin: '50% 50%',
                ease: "none"
            }, '+=0'); // You can adjust this to manage the timing of color changes

            // Move to the next color
            colorIndex++;
        }

        // Start the timeline animation
        tl.play(); // Play the timeline
    });
}

function playVideo() {
    let container = document.querySelector('.videoCont')
    let button = container?.querySelector('.playBtn')
    let video = container?.querySelector('video')

    button?.addEventListener('click', function () {
        gsap.to(button, {autoAlpha: 0})
        video?.play()
        video?.setAttribute("controls", "true");
    })
    video?.addEventListener('ended', function () {
        gsap.to(button, {autoAlpha: 1})
        video?.load()
        video?.removeAttribute("controls");
    })

}
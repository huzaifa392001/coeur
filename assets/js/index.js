gsap.registerPlugin(ScrollTrigger, ScrollSmoother, MorphSVGPlugin, MotionPathPlugin);
let mm = gsap.matchMedia();
let customScroll;
let hasVisited = localStorage.getItem('hasVisited');
const preloadImages = (selector = 'img') => {
    return new Promise((resolve) => {
        // The imagesLoaded library is used to ensure all images (including backgrounds) are fully loaded.
        imagesLoaded(document.querySelectorAll(selector), {background: true}, resolve);
    });
};
barba.init({
    transitions: [
        {
            async leave(data) {
                await leavePage()
                data.current.container.remove();
            },
            async enter(data) {
                await enterPage(data)
            },
            async once(data) {
                bannerAnimation(data.next.namespace);
                handleIntroVideo();
                if (data.next.namespace !== 'index') {
                    initScroll();
                }
                allFunc();
            },
        },
    ],
});

function leavePage() {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    if (customScroll) {
        customScroll.kill()
    }
    if (document.body.classList.contains("active")) {
        document.body.classList.remove("active");
        document.querySelector('.menuBtn .btnIcon').classList.remove("active");
    }
}

function enterPage(data) {
    if (data.next.namespace !== 'index') {
        initScroll();
    }
    preloadImages('.panel .sliderImg img').then(() => {
        bannerAnimation(data.next.namespace);
        allFunc();
    });
}

function initScroll() {
    customScroll = ScrollSmoother.create({
        smooth: 1,
        effects: true,
        smoothTouch: 0.1,
    });
    customScroll.scrollTop(0);
}

function allFunc() {
    handleIntroVideo()
    const image = document.getElementById('draggableImage');
    const container = document.querySelector('.mapSec .mapImg');
    if (image) {
        makeImageDraggableAndScrollable(image, container);
    }
    menuTrigger()
    allSliders();
    stackingImages();
    secHeading();
    bgAnim();
    animateSVGCircles();
    animateSVGColors();
    animateInfoClesBannerColors()
    playVideo()
    modalPopup()
    pinBlob()
    // DVDPlayerSaver()
    animateSVGPath();
    horizontalSection();
    ScrollTrigger.refresh();
}

function bannerAnimation(loc) {
    mm.add('(min-width: 992px)', () => {
        if (loc === 'index' || loc === '') {
            let headingElem = document.querySelectorAll(['#introVideo .blob .animate', '#homeSec .blob .animate'])
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
            if (!hasVisited) {
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
        } else {
            let innerHeadingElem = document.querySelector('.innerBan .content h1')
            let heading = new SplitType(innerHeadingElem, {types: 'words, chars'})
            gsap.set(innerHeadingElem, {
                autoAlpha: 1,
            })
            let tl = gsap.timeline({delay: 0.5})
            tl
                .to("#myClip path ", {
                    attr: {
                        d: "M -741.595 132.032 C -1068.187 433.229 -1151.593 956.524 -102.629 1373.504 C 269.88 1521.583 1825.523 1899.312 2376.193 1391.459 C 2598.47 1186.463 3416.507 57.807 2326.783 -375.385 C 1346.392 -765.108 -344.684 -234.017 -741.595 132.032 Z",
                    },
                    ease: "none",
                    duration: 1
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
    })
    mm.add("(max-width: 991px)", () => {
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
                .to('.animate ~ button', {
                    autoAlpha: 1,
                    ease: "expo.out",
                }, "-=0.9")
        })
    })
}

function menuTrigger() {
    const body = document.body;
    const icon = document.querySelector('.menuBtn .btnIcon');
    const menuBtn = document.querySelector('.menuBtn');

    menuBtn.addEventListener('click', function () {
        body.classList.toggle('active');
        icon.classList.toggle('active');
    });

    // GSAP animation for the SVG rotation
    gsap.to(".rotateSvg", {
        rotation: "+=360",
        repeat: -1,
        duration: 15,
        ease: "none"
    });
}

function allSliders() {
    let swiper = new Swiper(".galleryInnerSlider", {
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
            let width = 0;
            let section = wrapper.querySelector('.panel')
            let images = wrapper.querySelectorAll('.panel .sliderImg')
            images.forEach((img) => {
                width += img.clientWidth
            })
            let lastElement = images[images.length - 1];
            gsap.to(section, {
                x: -(width - lastElement.clientWidth / 1.2),
                ease: "none",
                scrollTrigger: {
                    trigger: wrapper,
                    pin: true,
                    start: 'top',
                    scrub: 1,
                    end: () => `+=${width}`
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
    const colors = ["#BCCF02", "#EF9757", "#00AAC1"];

    const colorDivs = gsap.utils.toArray('#colorAnim .color');

    function getNextColor(index) {
        return colors[(index + 1) % colors.length];
    }

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

    // Select all '.homeBanner .blob > svg' within the document
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

function animateSVGColors() {
    // Define the colors
    const colors = ["#BCCF02", "#EF9757", "#00AAC1"];

    // Select .colorWrapper inside the SVG within the document
    let colorWrappers = document.querySelectorAll([".bgBlob > svg .color", ".homeBanner .blob svg .color"]);

    // GSAP timeline setup for the colorWrapper div
    const tl = gsap.timeline({repeat: -1, yoyo: true}); // infinitely repeat the timeline

    // Function to get the next color in the array
    function getNextColor(index) {
        return colors[(index + 1) % colors.length];
    }

    colorWrappers.forEach((div, i) => {
        // Change the background color using the defined colors, set duration and easing
        tl.to(div, {
            backgroundColor: getNextColor(i),
            duration: 15,
            rotation: '+=360',
            scale: 1.5,
            transformOrigin: '50% 50%', // Ensure the circle scales and rotates around its center
            ease: "none"
        }, "-=14.8"); // Overlap the timing of animations slightly for a smooth transition
    });

    tl.play(); // Play the timeline
}

function modalPopup() {
    let modalPopups = document.querySelectorAll('.modalPopup');
    let overlay = document.querySelector('.overlay');
    let htmlElement = document.documentElement;

    modalPopups?.forEach(function (modalPopup) {
        modalPopup.addEventListener('click', function () {
            let modalTarget = document.querySelector(modalPopup.getAttribute('data-modal-target'));
            modalTarget.classList.toggle('active');
            overlay.classList.toggle('active');
            htmlElement.style.overflow = htmlElement.style.overflow === 'hidden' ? 'auto' : 'hidden';
        });
    });

    overlay?.addEventListener('click', function () {
        let activeSideModal = document.querySelector('.sideModal.active');
        if (activeSideModal) {
            activeSideModal.classList.toggle('active');
        }
        overlay.classList.toggle('active');
        htmlElement.style.overflow = htmlElement.style.overflow === 'hidden' ? 'auto' : 'hidden';
    });

    document.querySelectorAll('[data-image-modal]').forEach(item => {
        item.addEventListener('click', () => {
            // customScroll.kill()
            openModal(item);
        });
    });

    let closeButton = document.querySelector('.close');
    if (closeButton) {
        closeButton.addEventListener("click", () => {
            // initScroll()
            closeModal();
        });
    }

// Function to open modal
    const openModal = (anchor) => {
        const modal = document.getElementById("myModal");
        const modalImg = document.getElementById("modal-image");
        const captionText = document.getElementById("caption");
        const imgSrc = anchor.getAttribute('data-src');
        const imgCaption = anchor.getAttribute('data-caption');

        modal.style.display = "flex";
        modal.classList.remove("fadeOut");
        modalImg.src = imgSrc;
        captionText.innerHTML = imgCaption || '';
        captionText.style.display = imgCaption ? "block" : "none";

        if (anchor.getAttribute('data-height-auto') === 'true') {
            modal.classList.add("autoHeightModal");
        } else {
            modal.classList.remove("autoHeightModal");
        }
    };

// Function to close modal
    const closeModal = () => {
        const modal = document.getElementById("myModal");
        modal.classList.add("fadeOut");
        setTimeout(() => {
            modal.style.display = "none";
        }, 500);
    };

}

function handleIntroVideo() {
    let introVideoContainer = document.querySelector("#introVideo");
    let hasVisited = localStorage.getItem('hasVisited');

    if (hasVisited) {
        gsap.to(introVideoContainer, {
            autoAlpha: 0,
            duration: 0,
            onComplete: () => {
                document.querySelector("html").style.overflow = 'auto'
            }
        });
        if (introVideoContainer) {
            introVideoContainer.innerHTML = null
        }
    } else {
        if (introVideoContainer) {
            gsap.set("#introVideo .blob h1", {
                autoAlpha: 1
            })
            let button = introVideoContainer.querySelector('#playBtn');
            let skipBtn = introVideoContainer.querySelector('#skipBtn');
            let video = introVideoContainer.querySelector('#introVideo video');
            let container = introVideoContainer.querySelector("#introVideo .blob");

            button?.addEventListener('click', function () {
                localStorage.setItem('hasVisited', true);
                video?.play();
                video?.setAttribute("controls", "true");
                gsap.to(container, {
                    autoAlpha: 0,
                    duration: 0.5,
                    onComplete: () => {
                        document.querySelector("html").style.overflow = 'auto'
                    }
                });
            });

            skipBtn?.addEventListener('click', function () {
                video?.load()
                video?.removeAttribute("controls");
                gsap.to(introVideoContainer, {
                    autoAlpha: 0,
                    duration: 0.5,
                    onComplete: () => {
                        if (introVideoContainer) {
                            introVideoContainer.innerHTML = null
                            document.querySelector("html").style.overflow = 'auto'
                        }
                    }
                });
            });

            video?.addEventListener("ended", function () {
                gsap.to(introVideoContainer, {
                    autoAlpha: 0,
                    duration: 0.5, // Fade out the video container
                    onComplete: () => {
                        if (introVideoContainer) {
                            introVideoContainer.innerHTML = null
                        }
                    }
                });
            });
        }
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

function pinBlob() {
    let end = document.querySelector('body').offsetHeight;
    let section = document.querySelectorAll('.sliderSec .sliderImg')
    if (section.length > 0) {
        section.forEach((sec) => {
            end += sec.offsetHeight
        })
    }
    ScrollTrigger.create({
        trigger: ".bgBlob",
        start: 'top top',
        pin: ".bgBlob",
        pinSpacing: false,
        end: `+=${end}`
    })
}

function animateSVGPath() {
    // Removed yoyo: true to stop reversing the animation at each step.
    let tl = gsap.timeline({defaults: {duration: 3, ease: "none"}, repeat: -1});

    tl.to('#blob1', {morphSVG: '#blob2'})
        .to('#blob1', {morphSVG: '#blob3'})
        .to('#blob1', {morphSVG: '#blob4'})
        .to('#blob1', {morphSVG: '#blob1'}); // Morphs back to the original shape, completes the loop
}

function DVDPlayerSaver() {
    const bounceDuration = 2; // Duration of each bounce
    const screenWidth = document.querySelector('.bgBlob').innerWidth; // The width of the viewport
    const screenHeight = document.querySelector('.bgBlob').innerHeight; // The height of the viewport
    const svgWidth = document.querySelector('.bgBlob .rotateSvg').clientWidth; // The width of the SVG
    const svgHeight = document.querySelector('.bgBlob .rotateSvg').clientHeight; // The height of the SVG

    let posX = Math.random() * (screenWidth - svgWidth);
    let posY = Math.random() * (screenHeight - svgHeight);
    let directionX = 1;
    let directionY = 1;

// Setup an interval to change directions when hitting edges
    setInterval(function () {
        // Calculate new position
        posX += directionX * (screenWidth - svgWidth) * 0.1; // Move 10% of the screen width
        posY += directionY * (screenHeight - svgHeight) * 0.1; // Move 10% of the screen height

        // Reverse direction if hitting an edge
        if (posX <= 0 || posX >= screenWidth - svgWidth) {
            directionX *= -1;
        }
        if (posY <= 0 || posY >= screenHeight - svgHeight) {
            directionY *= -1;
        }

        // Animate SVG to new position
        gsap.to('.bgBlob svg', {
            duration: bounceDuration,
            x: posX,
            y: posY,
            ease: "none" // No easing for a consistent speed
        });
    }, bounceDuration * 1000); // Interval matches the duration of the bounce animation

}


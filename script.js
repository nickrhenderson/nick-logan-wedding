// JavaScript to handle polaroid
document.addEventListener('DOMContentLoaded', () => {
    const polaroids = document.querySelectorAll('.polaroid');
    const tacks = document.querySelectorAll('.polaroid-tack');
    
    polaroids.forEach(polaroid => {
        const rotation = getCurrentRotation(polaroid);
        polaroid.style.setProperty('--current-rotation', `${rotation}deg`);

        // Add event listener for click to trigger swing animation
        polaroid.addEventListener('click', function() {
            triggerAnimation(polaroid);
        });

        // Remove the class after the animation ends
        polaroid.addEventListener('animationend', function(event) {
            if (event.animationName === 'swing') {
                polaroid.classList.remove('swing');
            } else if (event.animationName === 'fall') {
                polaroid.classList.remove('fall');
                polaroid.style.opacity = '0'; // Make the polaroid invisible
                polaroid.style.visibility = 'hidden'; // Hide the polaroid from view
            }
        });
    });

    function getCurrentRotation(element) {
        const transform = window.getComputedStyle(element).getPropertyValue('transform');
        if (transform === 'none') return 0;

        const values = transform.split('(')[1].split(')')[0].split(',');
        const a = parseFloat(values[0]);
        const b = parseFloat(values[1]);
        const angle = Math.atan2(b, a) * (180 / Math.PI);

        return Math.round(angle);
    }

    function triggerAnimation(polaroid) {
        if (!polaroid.classList.contains('swing') && !polaroid.classList.contains('fall')) {
            polaroid.classList.add('swing');
            setTimeout(() => {
                polaroid.classList.remove('swing');
            }, 1000); // Adjust duration to match animation duration
        }
    }

    function handleTackClick(tack, polaroid) {
        if (!polaroid.classList.contains('fall') && !polaroid.classList.contains('swing')) {
            tack.classList.add('clicked');
            polaroid.classList.add('fall');
            setTimeout(() => {
                polaroid.classList.remove('fall');
                polaroid.style.opacity = '0'; // Make the polaroid invisible
                polaroid.style.visibility = 'hidden'; // Hide the polaroid from view
            }, 1000); // Adjust timeout to match animation duration
        }
    }

    polaroids.forEach((polaroid, index) => {
        const tack = tacks[index];

        if (tack) {
            tack.addEventListener('click', () => handleTackClick(tack, polaroid));
        }
    });

    window.addEventListener('scroll', () => {
        polaroids.forEach(polaroid => triggerAnimation(polaroid));
    });
});

// JavaScript to handle scrolling to section of page
document.addEventListener('DOMContentLoaded', () => {
    const scrollLinks = document.querySelectorAll('.scroll-link');
    const topBar = document.querySelector('.top-bar');
    const topBarHeight = topBar ? topBar.offsetHeight : 0; // Get the top bar height

    console.log('Top bar height:', topBarHeight);
    console.log('Scroll links:', scrollLinks);

    scrollLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent the default anchor behavior
            
            const targetId = link.getAttribute('href').substring(1); // Get the target ID
            console.log('Clicked link href:', link.getAttribute('href'));
            const targetElement = document.getElementById(targetId); // Get the target element

            if (targetElement) {
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY; // Get the target position
                console.log('Target element position:', targetPosition);
                const offsetPosition = targetPosition - topBarHeight; // Adjust position for the top bar
                console.log('Offset position:', offsetPosition);
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth' // Smooth scroll
                });
            } else {
                console.error('Target element not found:', targetId);
            }
        });
    });
});


// JavaScript to underline top bar and change background color
document.addEventListener('DOMContentLoaded', () => {
    const scrollLinks = document.querySelectorAll('.scroll-link');
    const navLinksContainer = document.querySelector('.nav-links');
    const underline = document.createElement('div');
    underline.classList.add('underline');
    navLinksContainer.appendChild(underline);

    const topBar = document.querySelector('.top-bar');
    const topBarHeight = topBar ? topBar.offsetHeight : 0; // Get the top bar height

    function updateUnderline(link) {
        const linkRect = link.getBoundingClientRect();
        const containerRect = navLinksContainer.getBoundingClientRect();
        underline.style.width = `${linkRect.width}px`;
        underline.style.left = `${linkRect.left - containerRect.left}px`;
    }

    function initializeUnderline() {
        const activeLink = document.querySelector('.scroll-link.active');
        if (activeLink) {
            updateUnderline(activeLink);
        } else if (scrollLinks.length > 0) {
            updateUnderline(scrollLinks[0]);
        }
    }

    function updateActiveLink() {
        const sections = document.querySelectorAll('div[id]');
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 60 && window.scrollY < sectionTop + sectionHeight - 60) {  // Adjust the value as needed
                currentSection = section.getAttribute('id');
            }
        });

        scrollLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === currentSection) {
                link.classList.add('active');
                updateUnderline(link);
            }
        });

        // Check which link the underline is currently under
        const photosLink = document.querySelector('a[href="#intro"]'); // 'PHOTOS' link
        const photosLinkRect = photosLink ? photosLink.getBoundingClientRect() : null;

        if (photosLinkRect) {
            const underlineRect = underline.getBoundingClientRect();
            if (underlineRect.left >= photosLinkRect.left && underlineRect.right <= photosLinkRect.right) {
                topBar.classList.remove('black-background');
                topBar.classList.add('default-background');
            } else {
                topBar.classList.remove('default-background');
                topBar.classList.add('black-background');
            }
        }
    }

    // Initialize underline position on page load
    initializeUnderline();

    // Update underline and active link on scroll
    window.addEventListener('scroll', updateActiveLink);

    // Optionally update the underline position on window resize
    window.addEventListener('resize', () => {
        const activeLink = document.querySelector('.scroll-link.active');
        if (activeLink) {
            updateUnderline(activeLink);
        }
    });
});

// Javascript for countdown
document.addEventListener('DOMContentLoaded', function () {
    function updateCountdown() {
        const now = new Date();
        const targetDate = new Date('2025-05-12T00:00:00');

        const timeDifference = targetDate - now;

        if (timeDifference <= 0) {
            document.querySelectorAll('.countdown').forEach(element => {
                element.innerHTML = 'The date has passed!';
            });
            return;
        }

        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

        const countdownText = `${days} DAYS ${hours} HOURS ${minutes} MINUTES`;

        document.querySelectorAll('.countdown').forEach(element => {
            element.innerHTML = countdownText;
        });
    }

    // Update the countdown immediately and then every minute
    updateCountdown();
    setInterval(updateCountdown, 60000);
});
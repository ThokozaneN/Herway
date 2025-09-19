
        // Header scroll effect
        window.addEventListener('scroll', function() {
            const header = document.getElementById('header');
            const backToTop = document.getElementById('backToTop');
            
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.boxShadow = 'none';
            }
            
            if (window.scrollY > 500) {
                backToTop.classList.add('active');
            } else {
                backToTop.classList.remove('active');
            }
        });
        
        // Mobile menu toggle
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const navMenu = document.getElementById('nav-menu');
        
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuBtn.innerHTML = navMenu.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
        
        // Close mobile menu when clicking on links
        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
        
        // Scroll animation for elements
        function checkVisibility() {
            const elements = document.querySelectorAll('.community-card, .product-card, .empowerment-tab');
            
            elements.forEach(element => {
                const position = element.getBoundingClientRect();
                
                // Checking if the element is in the viewport
                if(position.top < window.innerHeight - 100 && position.bottom >= 0) {
                    element.classList.add('visible');
                }
            });
        }
        
        // Initial check and then on scroll
        window.addEventListener('scroll', checkVisibility);
        window.addEventListener('load', checkVisibility);
        
        // Story slider functionality
        const storySlides = document.querySelectorAll('.story-slide');
        const storyDots = document.querySelectorAll('.story-dot');
        let currentSlide = 0;
        let slideInterval;
        
        function showSlide(index) {
            // Hide all slides
            storySlides.forEach(slide => slide.classList.remove('active'));
            storyDots.forEach(dot => dot.classList.remove('active'));
            
            // Show the selected slide
            storySlides[index].classList.add('active');
            storyDots[index].classList.add('active');
            currentSlide = index;
        }
        
        // Add click events to dots
        storyDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
                resetSlideInterval();
            });
        });
        
        // Auto-advance slides
        function startSlideInterval() {
            slideInterval = setInterval(() => {
                currentSlide = (currentSlide + 1) % storySlides.length;
                showSlide(currentSlide);
            }, 5000);
        }
        
        function resetSlideInterval() {
            clearInterval(slideInterval);
            startSlideInterval();
        }
        
        startSlideInterval();
        
        // Back to top functionality
        document.getElementById('backToTop').addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
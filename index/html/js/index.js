        // JavaScript Document
        // 页面加载完成后执行
        document.addEventListener('DOMContentLoaded', function() {
            // 隐藏加载动画
            setTimeout(() => {
                const loader = document.getElementById('loader');
                loader.classList.add('hidden');
            }, 800);
            
            // 导航栏滚动效果
            const navbar = document.getElementById('navbar');
            window.addEventListener('scroll', function() {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });
        
        // 移动端菜单切换
            const menuBtn = document.getElementById('menuBtn');
            const mobileMenu = document.getElementById('mobileMenu');
            
            menuBtn.addEventListener('click', function() {
                mobileMenu.style.display = mobileMenu.style.display === 'block' ? 'none' : 'block';
                
        // 添加动画效果
                if (mobileMenu.style.display === 'block') {
                    mobileMenu.style.animation = 'slideDown 0.3s ease forwards';
                } else {
                    mobileMenu.style.animation = 'slideUp 0.3s ease forwards';
                }
            });
            
        // 移动端菜单项点击后关闭菜单
            const mobileLinks = mobileMenu.querySelectorAll('a');
            mobileLinks.forEach(link => {
                link.addEventListener('click', function() {
                    mobileMenu.style.display = 'none';
                });
            });
            
        // 轮播图功能
        const initCarousel = () => {
        const slide = document.querySelector('.carousel-slide');
        const images = document.querySelectorAll('.carousel-slide img');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const indicators = document.querySelectorAll('.indicator');
        
        if (!slide || images.length === 0) return; // 确保元素存在
        
        let counter = 0;
        let size = images[0].clientWidth;
        let autoSlideInterval;
        let isTransitioning = false;
        
        // 初始化轮播图
        function setupCarousel() {
            size = images[0].clientWidth;
            slide.style.transform = `translateX(${-size * counter}px)`;
            updateIndicators();
        }
        
        // 下一张
        function nextSlide() {
            if (isTransitioning) return;
            
            isTransitioning = true;
            if (counter >= images.length - 1) {
                counter = 0;
            } else {
                counter++;
            }
            
            slide.style.transition = "transform 0.5s ease-in-out";
            slide.style.transform = `translateX(${-size * counter}px)`;
            updateIndicators();
            resetAutoSlide();
        }
        
        // 上一张
        function prevSlide() {
            if (isTransitioning) return;
            
            isTransitioning = true;
            if (counter <= 0) {
                counter = images.length - 1;
            } else {
                counter--;
            }
            
            slide.style.transition = "transform 0.5s ease-in-out";
            slide.style.transform = `translateX(${-size * counter}px)`;
            updateIndicators();
            resetAutoSlide();
        }
        
        // 更新指示器
        function updateIndicators() {
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === counter);
            });
        }
        
        // 自动轮播
        function startAutoSlide() {
            autoSlideInterval = setInterval(nextSlide, 5000); // 5秒切换一次
        }
        
        // 重置自动轮播
        function resetAutoSlide() {
            clearInterval(autoSlideInterval);
            startAutoSlide();
        }
        
        // 处理过渡结束
        function handleTransitionEnd() {
            isTransitioning = false;
        }
        
        // 事件监听
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
        
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                if (isTransitioning || index === counter) return;
                
                isTransitioning = true;
                counter = index;
                slide.style.transition = "transform 0.5s ease-in-out";
                slide.style.transform = `translateX(${-size * counter}px)`;
                updateIndicators();
                resetAutoSlide();
            });
        });
        
        slide.addEventListener('transitionend', handleTransitionEnd);
        
        // 响应式处理
        window.addEventListener('resize', () => {
            slide.style.transition = "none";
            size = images[0].clientWidth;
            slide.style.transform = `translateX(${-size * counter}px)`;
            setTimeout(() => {
                slide.style.transition = "transform 0.5s ease-in-out";
            }, 50);
        });
        
        // 鼠标悬停暂停
        const carouselContainer = document.querySelector('.carousel-container');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', () => {
                clearInterval(autoSlideInterval);
            });
            
            carouselContainer.addEventListener('mouseleave', startAutoSlide);
        }
        
        // 初始化
        setupCarousel();
        startAutoSlide();
    };
    
    // 初始化轮播图
    initCarousel();
    // 滚动动画 - 元素进入视口时显示
            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);
            
            // 观察所有需要动画的元素
            document.querySelectorAll('.section, .feature-card').forEach(el => {
                observer.observe(el);
            });
            
            // 平滑滚动
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 100, // 考虑导航栏高度
                            behavior: 'smooth'
                        });
                    }
                });
            });
            
            // 回到顶部按钮
            const backToTopBtn = document.getElementById('backToTop');
            
            window.addEventListener('scroll', () => {
                if (window.scrollY > 300) {
                    backToTopBtn.classList.add('visible');
                } else {
                    backToTopBtn.classList.remove('visible');
                }
            });
            
            backToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
             // 添加CSS动画
            const style = document.createElement('style');
            style.textContent = `
                @keyframes slideDown {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes slideUp {
                    from { opacity: 1; transform: translateY(0); }
                    to { opacity: 0; transform: translateY(-10px); }
                }
            `;
            document.head.appendChild(style);
        });

// مدیریت هدر
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.simple-header');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    
    // باز/بستن منوی موبایل
    mobileMenuBtn.addEventListener('click', function() {
        header.classList.toggle('active');
    });
    
    // بستن منو هنگام کلیک روی لینک
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            if (header.classList.contains('active')) {
                header.classList.remove('active');
            }
        });
    });
    
    // تغییر وضعیت active لینک‌ها
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // حذف active از همه
            document.querySelectorAll('.nav-link').forEach(item => {
                item.classList.remove('active');
            });
            
            // اضافه کردن active به این لینک
            this.classList.add('active');
        });
    });
    
    // دکمه‌های ورود و ثبت نام
    document.querySelectorAll('.auth-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const isLogin = this.classList.contains('login-btn');
            alert(isLogin ? 'صفحه ورود باز می‌شود' : 'صفحه ثبت نام باز می‌شود');
        });
    });
});





    const items = document.querySelectorAll('.gallery-item');
    let currentIndex = 0;

    function updateSlider() {
        items.forEach((item, index) => {
            item.classList.remove('active');

            if (index === currentIndex) {
                item.classList.add('active');
            }
        });
    }

    function nextSlide() {
        currentIndex++;
        if (currentIndex >= items.length) {
            currentIndex = 0;
        }
        updateSlider();
    }

    function prevSlide() {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = items.length - 1;
        }
        updateSlider();
    }

    // Auto Slide
    setInterval(nextSlide, 4000);







// انیمیشن شمارنده
document.addEventListener('DOMContentLoaded', function() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000; // 2 ثانیه
        const increment = target / (duration / 16); // 60 فریم در ثانیه
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = formatNumber(target);
                clearInterval(timer);
            } else {
                element.textContent = formatNumber(Math.floor(current));
            }
        }, 16);
    };
    
    const formatNumber = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
   

 
    // مشاهده عناصر هنگام اسکرول
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(number => {
        observer.observe(number);
    });
});




    // داده‌های جدیدترین بلاگ‌ها
    const latestBlogs = [
        {
            id: 1,
            title: "تکنیک‌های پیشرفته نقاشی با آبرنگ",
            excerpt: "آموزش کامل تکنیک‌های حرفه‌ای نقاشی با آبرنگ شامل لایه‌گذاری، ترکیب رنگ و ایجاد بافت‌های طبیعی.",
            image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "نقاشی",
            date: "۲ روز پیش",
            author: {
                name: "مریم کریمی",
                avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                role: "هنرمند نقاش"
            },
            views: 1245,
            comments: 23,
            readTime: "۸ دقیقه"
        },
        {
            id: 2,
            title: "طراحی UI/UX برای اپلیکیشن‌های هنری",
            excerpt: "اصول طراحی رابط کاربری برای اپلیکیشن‌های حوزه هنر با تمرکز بر تجربه کاربری هنرمندان.",
            image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "طراحی",
            date: "۴ روز پیش",
            author: {
                name: "علی رضایی",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                role: "طراح UI/UX"
            },
            views: 892,
            comments: 15,
            readTime: "۶ دقیقه"
        },
        {
            id: 3,
            title: "تأثیر هنر معاصر بر جامعه امروز",
            excerpt: "بررسی نقش هنر معاصر در شکل‌گیری فرهنگ و هویت اجتماعی با نگاهی به آثار هنرمندان برجسته.",
            image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "هنر معاصر",
            date: "۱ هفته پیش",
            author: {
                name: "سارا محمدی",
                avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                role: "منتقد هنری"
            },
            views: 1567,
            comments: 34,
            readTime: "۱۰ دقیقه"
        },
        {
            id: 4,
            title: "آموزش عکاسی پرتره با نور طبیعی",
            excerpt: "راهنمای کامل عکاسی پرتره با استفاده از نور طبیعی و تکنیک‌های ترکیب‌بندی حرفه‌ای.",
            image: "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "عکاسی",
            date: "۲ هفته پیش",
            author: {
                name: "رضا احمدی",
                avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                role: "عکاس حرفه‌ای"
            },
            views: 2103,
            comments: 42,
            readTime: "۱۲ دقیقه"
        },
        {
            id: 5,
            title: "اصول مینیمالیسم در طراحی گرافیک",
            excerpt: "آشنایی با اصول مینیمالیسم و کاربرد آن در طراحی گرافیک و برندینگ معاصر.",
            image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "طراحی گرافیک",
            date: "۳ هفته پیش",
            author: {
                name: "نازنین جعفری",
                avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                role: "گرافیست"
            },
            views: 1789,
            comments: 28,
            readTime: "۷ دقیقه"
        },
        {
            id: 6,
            title: "تکنولوژی‌های جدید در هنر دیجیتال",
            excerpt: "مروری بر آخرین تکنولوژی‌ها و ابزارهای حوزه هنر دیجیتال و تأثیر آن بر خلق آثار هنری.",
            image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "هنر دیجیتال",
            date: "۱ ماه پیش",
            author: {
                name: "محمد حسینی",
                avatar: "https://images.unsplash.com/photo-1507591064344-4c6ce005-128?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                role: "هنرمند دیجیتال"
            },
            views: 2345,
            comments: 51,
            readTime: "۱۱ دقیقه"
        }
    ];

    // تابع ساخت کارت بلاگ
    function createBlogCard(blog) {
        return `
            <div class="col-lg-4 col-md-6">
                <div class="blog-card">
                    <div class="blog-image">
                        <span class="blog-category">${blog.category}</span>
                        <img src="img/o.jpg" alt="${blog.title}">
                    </div>
                    <div class="blog-content">
                        <div class="blog-date">
                            <i class="far fa-calendar-alt"></i>
                            ${blog.date}
                            <span style="margin: 0 10px;">•</span>
                            <i class="far fa-clock"></i>
                            ${blog.readTime}
                        </div>
                        <h3 class="blog-title">${blog.title}</h3>
                        <p class="blog-excerpt">${blog.excerpt}</p>
                        
 
                        

                            <a href="single-blog.html" class="read-more-btn">
                                ادامه مطلب
                                <i class="fas fa-arrow-left"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // تابع نمایش بلاگ‌ها
    function renderLatestBlogs() {
        const container = document.getElementById('latestBlogsContainer');
        


    // تابع اسلایدر بلاگ‌ها (اختیاری)
    function initBlogSlider() {
        let currentIndex = 0;
        const slidesToShow = 3;
        const container = document.getElementById('latestBlogsContainer');
        
        function updateSlider() {
            const blogsToShow = latestBlogs.slice(currentIndex, currentIndex + slidesToShow);
            container.innerHTML = '';
            
            blogsToShow.forEach(blog => {
                container.innerHTML += createBlogCard(blog);
            });
        }
        


    // اجرا پس از لود صفحه
    document.addEventListener('DOMContentLoaded', function() {
        renderLatestBlogs();
        
        // اگر اسلایدر فعال است
        if (document.querySelector('.blogs-slider')) {
            initBlogSlider();
        }
        
        // انیمیشن روی هاور کارت‌ها
        document.querySelectorAll('.blog-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    });

    // تابع جستجوی بلاگ‌ها
    function searchBlogs(query) {
        const filteredBlogs = latestBlogs.filter(blog => 
            blog.title.includes(query) || 
            blog.excerpt.includes(query) ||
            blog.category.includes(query) ||
            blog.author.name.includes(query)
        );
        
        const container = document.getElementById('latestBlogsContainer');
        container.innerHTML = '';
        
        filteredBlogs.forEach((blog, index) => {
            const blogCard = createBlogCard(blog);
            container.innerHTML += blogCard;
            
            const cards = container.querySelectorAll('.blog-card');
            setTimeout(() => {
                if (cards[index]) {
                    cards[index].style.animationDelay = `${index * 0.2}s`;
                    cards[index].style.opacity = '1';
                }
            }, 100);
        });
    }





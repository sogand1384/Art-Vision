        // انیمیشن شمارنده آمار
        function animateCounter(element, start, end, duration) {
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                const value = Math.floor(progress * (end - start) + start);
                element.textContent = value + "+";
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        }

        // فعال کردن انیمیشن هنگام اسکرول
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statElements = document.querySelectorAll('.stat-number');
                    statElements.forEach(el => {
                        const value = parseInt(el.textContent);
                        if (!el.classList.contains('animated')) {
                            animateCounter(el, 0, value, 2000);
                            el.classList.add('animated');
                        }
                    });
                }
            });
        }, { threshold: 0.5 });

        observer.observe(document.querySelector('.stats-section'));
        function showModall() {
            document.getElementById('modalOverlay').style.display = 'block';
        }
        
        function closeModall() {
            document.getElementById('modalOverlay').style.display = 'none';
        }
        
        // بستن با کلید Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeModall();
            }
        });













// داده‌های نمونه برای آثار هنری
        const artgalArtworksData = {
            1: {
                title: "طلوع در کوهستان",
                artist: "سارا احمدی",
                artistAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
                image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
                style: "امپرسیونیسم",
                technique: "رنگ روغن",
                year: "۱۴۰۲",
                size: "۸۰ × ۱۲۰ سانتی‌متر",
                description: "این اثر با الهام از طبیعت کوهستانی البرز خلق شده است. نقاش با استفاده از تکنیک رنگ روغن و سبک امپرسیونیستی، بازی نور در طلوع آفتاب را به تصویر کشیده است. ترکیب‌بندی اثر با تمرکز بر تضاد بین سایه‌های کوه و نور گرم خورشید ایجاد شده است.",
                likes: 342,
                views: 1287,
                price: "۴۵,۰۰۰,۰۰۰ تومان"
            },
            2: {
                title: "رقص رنگ‌ها",
                artist: "رضا محمودی",
                artistAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
                image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
                style: "انتزاعی",
                technique: "آکریلیک",
                year: "۱۴۰۱",
                size: "۱۰۰ × ۱۰۰ سانتی‌متر",
                description: "اثری مدرن در سبک انتزاعی که با رنگ‌های زنده و حرکت آزاد قلم مو خلق شده است. هنرمند در این اثر به دنبال بیان احساسات درونی و انرژی زندگی از طریق رنگ و فرم بوده است. ترکیب رنگ‌های مکمل و تضاد آنها در این اثر قابل توجه است.",
                likes: 287,
                views: 945,
                price: "۳۲,۰۰۰,۰۰۰ تومان"
            }
        };

        // تغییر بین نمایش‌ها
        function artgalSwitchView(viewType) {
            // به‌روزرسانی تب‌ها
            document.querySelectorAll('.artgal-view-tab').forEach(tab => {
                tab.classList.remove('active');
            });
            
            // فعال کردن تب انتخاب شده
            if (viewType === 'all') {
                document.querySelector('.artgal-view-tab:first-child').classList.add('active');
            } else {
                document.querySelector('.artgal-view-tab:last-child').classList.add('active');
            }
            
            // در حالت واقعی، اینجا درخواست AJAX برای فیلتر کردن آثار ارسال می‌شود
            alert(`نمایش آثار ${viewType === 'all' ? 'همه' : 'منتخب گالری'}`);
        }

        // اعمال فیلترها
        function artgalApplyFilters() {
            const style = document.querySelector('.artgal-filter-select:nth-child(1)').value;
            const technique = document.querySelector('.artgal-filter-select:nth-child(2)').value;
            const sort = document.querySelector('.artgal-filter-select:nth-child(3)').value;
            
            // شبیه‌سازی اعمال فیلتر
            const btn = document.querySelector('.artgal-filter-btn');
            const originalText = btn.textContent;
            
            btn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>در حال اعمال فیلتر...';
            btn.disabled = true;
            
            setTimeout(() => {
                let filterText = '';
                if (style) filterText += `سبک: ${style} `;
                if (technique) filterText += `تکنیک: ${technique} `;
                if (sort) filterText += `مرتب‌سازی: ${sort}`;
                
                alert(`فیلترها اعمال شدند:\n${filterText}`);
                btn.innerHTML = originalText;
                btn.disabled = false;
            }, 1500);
        }

        // جستجو
        document.querySelector('.artgal-search-btn').addEventListener('click', function() {
            const searchTerm = document.querySelector('.artgal-search-input').value;
            if (searchTerm.trim()) {
                // شبیه‌سازی جستجو
                const btn = this;
                const originalHTML = btn.innerHTML;
                
                btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                
                setTimeout(() => {
                    alert(`در حال جستجو برای: "${searchTerm}"`);
                    btn.innerHTML = originalHTML;
                }, 1000);
            }
        });

        // مشاهده کامل اثر
        function artgalViewArtwork(artworkId) {
            const artwork = artgalArtworksData[artworkId];
            if (!artwork) return;
            
            const modalContent = `
                <div class="row g-0">
                    <div class="col-lg-8">
                        <div style="height: 70vh; overflow: hidden;">
                            <img src="${artwork.image}" alt="${artwork.title}" 
                                 style="width: 100%; height: 100%; object-fit: contain; background: #000;">
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div style="padding: 30px;">
                            <h3 style="color: #ffe1a8; margin-bottom: 15px;">${artwork.title}</h3>
                            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 20px;">
                                <img src="${artwork.artistAvatar}" alt="${artwork.artist}" 
                                     style="width: 50px; height: 50px; border-radius: 50%; border: 2px solid rgba(255, 225, 168, 0.3);">
                                <div>
                                    <h5 style="color: #fff; margin: 0;">${artwork.artist}</h5>
                                    <p style="color: rgba(255, 255, 255, 0.7); margin: 5px 0 0; font-size: 0.9rem;">نقاش</p>
                                </div>
                            </div>
                            
                            <div style="margin: 25px 0;">
                                <p style="color: rgba(255, 255, 255, 0.9); line-height: 1.8;">${artwork.description}</p>
                            </div>
                            
                            <div style="background: rgba(255, 240, 225, 0.05); border-radius: 10px; padding: 20px; margin-bottom: 25px;">
                                <h5 style="color: #ffe1a8; margin-bottom: 15px;">مشخصات اثر</h5>
                                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                                    <div>
                                        <p style="color: rgba(255, 255, 255, 0.7); margin: 0; font-size: 0.9rem;">سبک</p>
                                        <p style="color: #ffe1a8; margin: 5px 0 0; font-weight: 600;">${artwork.style}</p>
                                    </div>
                                    <div>
                                        <p style="color: rgba(255, 255, 255, 0.7); margin: 0; font-size: 0.9rem;">تکنیک</p>
                                        <p style="color: #ffe1a8; margin: 5px 0 0; font-weight: 600;">${artwork.technique}</p>
                                    </div>
                                    <div>
                                        <p style="color: rgba(255, 255, 255, 0.7); margin: 0; font-size: 0.9rem;">سال خلق</p>
                                        <p style="color: #ffe1a8; margin: 5px 0 0; font-weight: 600;">${artwork.year}</p>
                                    </div>
                                    <div>
                                        <p style="color: rgba(255, 255, 255, 0.7); margin: 0; font-size: 0.9rem;">ابعاد</p>
                                        <p style="color: #ffe1a8; margin: 5px 0 0; font-weight: 600;">${artwork.size}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 30px;">
                                <div style="display: flex; gap: 20px;">
                                    <div style="text-align: center;">
                                        <i class="fas fa-heart" style="color: #ff6b6b;"></i>
                                        <p style="color: rgba(255, 255, 255, 0.8); margin: 5px 0 0; font-size: 0.9rem;">${artwork.likes} لایک</p>
                                    </div>
                                    <div style="text-align: center;">
                                        <i class="fas fa-eye" style="color: #4ecdc4;"></i>
                                        <p style="color: rgba(255, 255, 255, 0.8); margin: 5px 0 0; font-size: 0.9rem;">${artwork.views} بازدید</p>
                                    </div>
                                </div>
                                <button style="background: linear-gradient(135deg, rgba(255, 225, 168, 0.9), rgba(255, 203, 105, 0.9)); color: #250902; border: none; padding: 12px 25px; border-radius: 8px; font-weight: 600; cursor: pointer;">
                                    <i class="fas fa-shopping-cart me-2"></i>
                                    افزودن به سبد خرید
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            document.getElementById('artgalModalContent').innerHTML = modalContent;
            document.getElementById('artgalArtworkModal').style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }

        // بستن مدال
        function artgalCloseModal() {
            document.getElementById('artgalArtworkModal').style.display = 'none';
            document.body.style.overflow = 'auto';
        }

        // تغییر صفحه
        function artgalChangePage(page) {
            // شبیه‌سازی تغییر صفحه
            const btns = document.querySelectorAll('.artgal-page-btn');
            btns.forEach(btn => btn.classList.remove('active'));
            
            // فعال کردن دکمه صفحه جدید
            const activeBtn = Array.from(btns).find(btn => btn.textContent.trim() === page.toString());
            if (activeBtn) {
                activeBtn.classList.add('active');
            }
            
            alert(`در حال بارگذاری صفحه ${page}...`);
        }

        // بارگذاری بیشتر
        function artgalLoadMore() {
            const btn = document.querySelector('.artgal-filter-btn[onclick="artgalLoadMore()"]');
            const originalText = btn.textContent;
            
            btn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>در حال بارگذاری...';
            btn.disabled = true;
            
            setTimeout(() => {
                alert('۶ نقاشی دیگر بارگذاری شد!');
                btn.innerHTML = originalText;
                btn.disabled = false;
            }, 1500);
        }

        // بستن مدال با کلیک خارج
        document.getElementById('artgalArtworkModal').addEventListener('click', function(e) {
            if (e.target === this) {
                artgalCloseModal();
            }
        });

        // بستن مدال با کلید Esc
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                artgalCloseModal();
            }
        });

        // نمایش اولیه
        document.addEventListener('DOMContentLoaded', function() {
            artgalSwitchView('all');
        });









       // منوی موبایل
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const simpleHeader = document.querySelector('.simple-header');
        
        mobileMenuBtn.addEventListener('click', function() {
            simpleHeader.classList.toggle('active');
        });

        // دکمه اسکرول به بالا
        const scrollToTopBtn = document.getElementById("scrollToTopBtn");
        
        window.addEventListener("scroll", function() {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add("show");
            } else {
                scrollToTopBtn.classList.remove("show");
            }
        });
        
        scrollToTopBtn.addEventListener("click", function() {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });

        // فیلتر دسته‌بندی
        const filterTags = document.querySelectorAll('.filter-tag');
        
        filterTags.forEach(tag => {
            tag.addEventListener('click', function() {
                // حذف کلاس active از همه تگ‌ها
                filterTags.forEach(t => t.classList.remove('active'));
                // اضافه کردن کلاس active به تگ کلیک شده
                this.classList.add('active');
                
                // در اینجا می‌توانید کد فیلتر کردن مقالات را اضافه کنید
            });
        });









     // قیمت‌های محصولات
        const prices = {
            1: 290000,  // کتاب
            2: 450000,  // تابلو
            3: 180000   // مجسمه
        };

        // محاسبه جمع کل
        function calculateTotal() {
            let subtotal = 0;
            
            // محاسبه جمع هر آیتم
            document.querySelectorAll('.quantity-input').forEach((input, index) => {
                const itemId = index + 1;
                const quantity = parseInt(input.value);
                const price = prices[itemId];
                const itemTotal = quantity * price;
                
                // به‌روزرسانی جمع هر آیتم
                document.getElementById(`item-total-${itemId}`).textContent = 
                    formatPrice(itemTotal) + ' تومان';
                
                subtotal += itemTotal;
            });
            
            // محاسبه مالیات (۹٪)
            const tax = Math.round(subtotal * 0.09);
            
            // هزینه ارسال
            const shipping = subtotal > 500000 ? 0 : 30000;
            
            // تخفیف
            const discount = subtotal > 1000000 ? Math.round(subtotal * 0.1) : 0;
            
            // جمع کل
            const total = subtotal + shipping + tax - discount;
            
            // به‌روزرسانی نمایش
            document.getElementById('subtotal').textContent = formatPrice(subtotal) + ' تومان';
            document.getElementById('tax').textContent = formatPrice(tax) + ' تومان';
            document.getElementById('shipping').textContent = formatPrice(shipping) + ' تومان';
            document.getElementById('discount').textContent = formatPrice(discount) + ' تومان';
            document.getElementById('total').textContent = formatPrice(total) + ' تومان';
            
            return total;
        }

        // فرمت قیمت
        function formatPrice(price) {
            return price.toLocaleString('fa-IR');
        }

        // به‌روزرسانی تعداد
        function updateQuantity(button, change) {
            const input = button.parentElement.querySelector('.quantity-input');
            let value = parseInt(input.value) + change;
            
            if (value < 1) value = 1;
            if (value > 10) value = 10;
            
            input.value = value;
            updateTotal();
        }

        // حذف آیتم
        function removeItem(button) {
            const cartItem = button.closest('.cart-item');
            if (confirm('آیا از حذف این محصول از سبد خرید اطمینان دارید؟')) {
                cartItem.style.opacity = '0';
                cartItem.style.transform = 'translateX(100px)';
                
                setTimeout(() => {
                    cartItem.remove();
                    updateTotal();
                    checkEmptyCart();
                }, 300);
            }
        }

        // بررسی سبد خرید خالی
        function checkEmptyCart() {
            const items = document.querySelectorAll('.cart-item').length;
            if (items === 0) {
                const cartContainer = document.getElementById('cart-container');
                cartContainer.innerHTML = `
                    <div class="empty-cart">
                        <div class="empty-icon">
                            <i class="fas fa-shopping-cart"></i>
                        </div>
                        <h3 class="empty-title">سبد خرید شما خالی است</h3>
                        <p class="empty-text">
                            هنوز محصولی به سبد خرید خود اضافه نکرده‌اید.
                            می‌توانید از محصولات ما دیدن کنید.
                        </p>
                        <a href="#" class="checkout-btn" style="max-width: 200px;">
                            <i class="fas fa-store me-2"></i>
                            مشاهده محصولات
                        </a>
                    </div>
                `;
            }
        }

        // به‌روزرسانی جمع کل
        function updateTotal() {
            calculateTotal();
        }

        // ادامه فرآیند خرید
        function proceedToCheckout() {
            const total = calculateTotal();
            if (total === 0) {
                alert('سبد خرید شما خالی است!');
                return;
            }
            
            // شبیه‌سازی انتقال به صفحه پرداخت
            const btn = document.querySelector('.checkout-btn');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> در حال انتقال...';
            btn.disabled = true;
            
            setTimeout(() => {
                alert('در حال انتقال به صفحه پرداخت...');
                btn.innerHTML = originalText;
                btn.disabled = false;
                
                // در حالت واقعی:
                // window.location.href = "checkout.html";
            }, 1000);
        }

        // ادامه خرید
        function continueShopping() {
            // شبیه‌سازی بازگشت به فروشگاه
            const btn = document.querySelector('.continue-btn');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> در حال انتقال...';
            
            setTimeout(() => {
                alert('در حال انتقال به فروشگاه...');
                btn.innerHTML = originalText;
                
                // در حالت واقعی:
                // window.location.href = "products.html";
            }, 800);
        }

        // بارگذاری اولیه
        document.addEventListener('DOMContentLoaded', function() {
            updateTotal();
        });







  // توگل FAQ
        function toggleFAQ(element) {
            const faqCard = element.parentElement;
            const answer = faqCard.querySelector('.faq-answer');
            
            if (faqCard.classList.contains('active')) {
                faqCard.classList.remove('active');
                answer.style.display = 'none';
            } else {
                document.querySelectorAll('.faq-card').forEach(card => {
                    card.classList.remove('active');
                    card.querySelector('.faq-answer').style.display = 'none';
                });
                
                faqCard.classList.add('active');
                answer.style.display = 'block';
            }
        }

        // ارسال فرم
        document.querySelector('.submit-btn').addEventListener('click', function() {
            const btn = this;
            const originalText = btn.innerHTML;
            
            // شبیه‌سازی ارسال
            btn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>در حال ارسال...';
            btn.disabled = true;
            
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check me-2"></i>پیام ارسال شد!';
                btn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                    btn.style.background = '';
                    
                    // ریست فرم
                    document.querySelectorAll('.form-control-custom').forEach(input => {
                        input.value = '';
                    });
                }, 2000);
            }, 1500);
        });











   // مدیریت نوار کناری
        function toggleSidebar() {
            const sidebar = document.getElementById('sidebar');
            sidebar.classList.toggle('active');
        }

        // بستن نوار کناری با کلیک خارج
        document.addEventListener('click', function(event) {
            const sidebar = document.getElementById('sidebar');
            const sidebarToggle = document.querySelector('.sidebar-toggle');
            
            if (!sidebar.contains(event.target) && !sidebarToggle.contains(event.target)) {
                sidebar.classList.remove('active');
            }
        });

        // بستن نوار کناری با Escape
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                document.getElementById('sidebar').classList.remove('active');
            }
        });

        // انیمیشن کارت‌ها
        document.addEventListener('DOMContentLoaded', function() {
            const cards = document.querySelectorAll('.stat-card, .section-card, .artwork-item');
            
            cards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            });
        });

        // مدیریت دکمه‌ها
        document.querySelectorAll('.action-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const text = this.textContent.trim();
                alert(`دکمه "${text}" کلیک شد!`);
            });
        });

        // مدیریت آثار هنری
        document.querySelectorAll('.artwork-item').forEach(item => {
            item.addEventListener('click', function() {
                const title = this.querySelector('.artwork-title').textContent;
                const price = this.querySelector('.artwork-price').textContent;
                alert(`اثر: ${title}\nقیمت: ${price}`);
            });
        });











        // متغیرهای جهانی
        let currentCategory = 'all';
        let searchTerm = '';

        // توگل FAQ
        function toggleFAQ(element) {
            const faqCard = element.parentElement;
            const answer = faqCard.querySelector('.faq-answer');
            
            if (faqCard.classList.contains('active')) {
                faqCard.classList.remove('active');
                answer.style.display = 'none';
            } else {
                faqCard.classList.add('active');
                answer.style.display = 'block';
            }
        }

        // فیلتر دسته‌بندی
        function filterCategory(category) {
            currentCategory = category;
            
            // به‌روزرسانی دکمه‌های دسته‌بندی
            document.querySelectorAll('.category-btn').forEach(btn => {
                btn.classList.remove('active');
                if (btn.textContent.includes(getCategoryName(category))) {
                    btn.classList.add('active');
                }
            });
            
            // نمایش همه دسته‌بندی‌ها
            if (category === 'all') {
                document.querySelectorAll('.category-section').forEach(section => {
                    section.style.display = 'block';
                });
                document.querySelectorAll('.faq-card').forEach(card => {
                    if (matchesSearch(card)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            } else {
                // نمایش فقط دسته‌بندی انتخاب شده
                document.querySelectorAll('.category-section').forEach(section => {
                    if (section.id === category) {
                        section.style.display = 'block';
                    } else {
                        section.style.display = 'none';
                    }
                });
                
                document.querySelectorAll('.faq-card').forEach(card => {
                    if (card.dataset.category === category && matchesSearch(card)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            }
            
            // باز کردن اولین سوال
            const firstVisibleCard = document.querySelector('.faq-card[style*="display: block"], .faq-card:not([style*="display: none"])');
            if (firstVisibleCard && !firstVisibleCard.classList.contains('active')) {
                firstVisibleCard.classList.add('active');
                firstVisibleCard.querySelector('.faq-answer').style.display = 'block';
            }
            
            // اسکرول به بخش مربوطه
            if (category !== 'all') {
                document.getElementById(category).scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }

        // جستجو
        document.querySelector('.search-input').addEventListener('input', function(e) {
            searchTerm = e.target.value.toLowerCase();
            applyFilters();
        });

        // بررسی تطابق با جستجو
        function matchesSearch(card) {
            if (!searchTerm) return true;
            
            const question = card.querySelector('.faq-question span').textContent.toLowerCase();
            const answer = card.querySelector('.faq-answer p').textContent.toLowerCase();
            
            return question.includes(searchTerm) || answer.includes(searchTerm);
        }

        // اعمال فیلترها
        function applyFilters() {
            document.querySelectorAll('.faq-card').forEach(card => {
                const matchesCategory = currentCategory === 'all' || card.dataset.category === currentCategory;
                const matchesSearchTerm = matchesSearch(card);
                
                if (matchesCategory && matchesSearchTerm) {
                    card.style.display = 'block';
                    card.parentElement.style.display = 'block';
                } else {
                    card.style.display = 'none';
                    // اگر هیچ کارتی در بخش نمایش داده نشد، کل بخش را مخفی کن
                    const section = card.closest('.category-section');
                    const visibleCards = section.querySelectorAll('.faq-card[style*="display: block"]');
                    if (visibleCards.length === 0 && currentCategory !== 'all') {
                        section.style.display = 'none';
                    }
                }
            });
            
            // اگر همه بخش‌ها مخفی شدند، پیام نمایش دهید
            const visibleSections = document.querySelectorAll('.category-section[style*="display: block"]');
            if (visibleSections.length === 0 && searchTerm) {
                document.getElementById('faq-container').innerHTML += `
                    <div class="text-center py-5">
                        <i class="fas fa-search fa-3x mb-3" style="color: #ffe1a8;"></i>
                        <h4 class="cream-color mb-3">نتیجه‌ای یافت نشد</h4>
                        <p class="light-cream">هیچ سوالی با عبارت "${searchTerm}" یافت نشد.</p>
                    </div>
                `;
            }
        }

        // تبدیل کد دسته‌بندی به نام فارسی
        function getCategoryName(code) {
            const categories = {
                'all': 'همه سوالات',
                'general': 'عمومی',
                'account': 'حساب کاربری',
                'payment': 'پرداخت',
                'technical': 'فنی',
                'security': 'امنیت',
                'services': 'خدمات'
            };
            return categories[code] || code;
        }

        // باز کردن اولین سوال هنگام لود صفحه
        document.addEventListener('DOMContentLoaded', function() {
            const firstCard = document.querySelector('.faq-card');
            if (firstCard) {
                firstCard.classList.add('active');
                firstCard.querySelector('.faq-answer').style.display = 'block';
            }
            
            // انیمیشن شمارنده آمار
            const counters = document.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                const target = parseInt(counter.textContent);
                const increment = target / 100;
                let current = 0;
                
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.ceil(current) + (counter.textContent.includes('+') ? '+' : '');
                        setTimeout(updateCounter, 20);
                    } else {
                        counter.textContent = target + (counter.textContent.includes('+') ? '+' : '');
                    }
                };
                
                updateCounter();
            });
        });











        // فرمت شماره کارت
        document.getElementById('cardNumber').addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
            let formatted = value.replace(/(\d{4})/g, '$1 ').trim();
            e.target.value = formatted;
            
            // آپدیت پیش نمایش کارت
            let preview = formatted || '**** **** **** ****';
            document.getElementById('cardPreview').textContent = preview;
        });
        
        // فرمت تاریخ انقضا
        document.getElementById('expiryDate').addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            e.target.value = value;
            document.getElementById('expiryPreview').textContent = value || 'MM/YY';
        });
        
        // آپدیت نام دارنده کارت
        document.getElementById('cardHolder').addEventListener('input', function(e) {
            document.getElementById('namePreview').textContent = e.target.value || 'نام شما';
        });
        
        // دکمه پرداخت
        document.querySelector('.pay-btn').addEventListener('click', function() {
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> در حال پرداخت...';
            this.disabled = true;
            
            // شبیه‌سازی پرداخت
            setTimeout(() => {
                alert('پرداخت با موفقیت انجام شد!');
                this.innerHTML = '<i class="fas fa-lock"></i> پرداخت مبلغ';
                this.disabled = false;
            }, 2000);
        });
        
        // انتخاب روش پرداخت
        document.querySelectorAll('.method-card').forEach(card => {
            card.addEventListener('click', function() {
                document.querySelectorAll('.method-card').forEach(c => {
                    c.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    c.style.background = 'rgba(255, 255, 255, 0.05)';
                });
                
                this.style.borderColor = 'rgba(255, 225, 168, 0.6)';
                this.style.background = 'rgba(111, 29, 27, 0.2)';
                
                alert('روش پرداخت ' + this.querySelector('h3').textContent + ' انتخاب شد');
            });
        });










       // مدیریت فرم
        const artgalRegisterForm = document.getElementById('artgalRegisterForm');
        const artgalSuccessMessage = document.getElementById('artgalSuccessMessage');
        const artgalPasswordInput = document.getElementById('artgalPassword');
        const artgalPasswordStrength = document.getElementById('artgalPasswordStrength');

        // بررسی قدرت رمز عبور
        artgalPasswordInput.addEventListener('input', function() {
            const password = this.value;
            let strength = 'weak';
            
            if (password.length >= 8) {
                if (/[A-Z]/.test(password) && /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) {
                    strength = 'strong';
                } else if (password.length >= 10 || (/[A-Z]/.test(password) && /[0-9]/.test(password))) {
                    strength = 'medium';
                }
            }
            
            // به‌روزرسانی نوار قدرت
            artgalPasswordStrength.className = 'artgal-strength-bar';
            artgalPasswordStrength.classList.add(`artgal-strength-${strength}`);
        });

        artgalRegisterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const password = artgalPasswordInput.value;
            const confirmPassword = this.querySelector('input[type="password"]:last-of-type').value;
            
            // اعتبارسنجی
            if (password !== confirmPassword) {
                alert('کلمه عبور و تکرار آن مطابقت ندارند');
                return;
            }
            
            if (!this.querySelector('#artgalTerms').checked) {
                alert('لطفاً با قوانین و مقررات موافقت کنید');
                return;
            }
            
            // شبیه‌سازی ثبت نام
            const submitBtn = this.querySelector('.artgal-submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'در حال ایجاد حساب...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                // در اینجا باید درخواست AJAX به سرور ارسال شود
                // این فقط شبیه‌سازی است
                
                // نمایش پیام موفقیت
                artgalSuccessMessage.style.display = 'block';
                submitBtn.textContent = '✅ ثبت نام موفق';
                submitBtn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
                
                setTimeout(() => {
                    // انتقال به صفحه لاگین یا صفحه اصلی
                    alert('حساب کاربری شما با موفقیت ایجاد شد!');
                    window.location.href = 'login.html'; // یا صفحه اصلی
                }, 1500);
                
            }, 2000);
        });









        // نمایش بخش انتخاب شده
        function showSection(sectionId) {
            // مخفی کردن همه بخش‌ها
            document.querySelectorAll('.policy-section').forEach(section => {
                section.style.display = 'none';
            });
            
            // نمایش بخش انتخاب شده
            document.getElementById(sectionId + '-section').style.display = 'block';
            
            // به‌روزرسانی تب‌های فعال
            document.querySelectorAll('.policy-tab').forEach(tab => {
                tab.classList.remove('active');
            });
            
            // فعال کردن تب مربوطه
            const activeTab = Array.from(document.querySelectorAll('.policy-tab')).find(tab => 
                tab.textContent.includes(getSectionName(sectionId))
            );
            if (activeTab) {
                activeTab.classList.add('active');
            }
            
            // اسکرول به بخش
            document.getElementById(sectionId + '-section').scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }

        // تبدیل کد بخش به نام فارسی
        function getSectionName(code) {
            const sections = {
                'terms': 'قوانین و مقررات',
                'privacy': 'حریم خصوصی',
                'cookies': 'سیاست کوکی‌ها',
                'refund': 'سیاست بازپرداخت'
            };
            return sections[code] || code;
        }

        // فعال/غیرفعال کردن دکمه توافق
        document.getElementById('agree-checkbox').addEventListener('change', function() {
            document.getElementById('agree-btn').disabled = !this.checked;
        });

        // کلیک بر روی دکمه توافق
        document.getElementById('agree-btn').addEventListener('click', function() {
            const btn = this;
            const originalText = btn.innerHTML;
            
            // شبیه‌سازی پردازش
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> در حال پردازش...';
            btn.disabled = true;
            
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check-circle"></i> تأیید شد!';
                btn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
                
                // نمایش پیام موفقیت
                alert('با تشکر! توافق شما با قوانین و مقررات ثبت شد.');
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                    btn.style.background = '';
                    
                    // بازگشت به خانه (شبیه‌سازی)
                    window.location.href = '#';
                }, 2000);
            }, 1500);
        });

        // اسکرول به بخش‌های مختلف از فوتر
        document.querySelectorAll('.footer-link[href^="#"]').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').replace('#', '');
                if (targetId) {
                    document.getElementById(targetId).scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                    });
                }
            });
        });

        // باز شدن تب قوانین به صورت پیش‌فرض
        document.addEventListener('DOMContentLoaded', function() {
            showSection('terms');
        });









        // وضعیت‌های تعاملی
        let artgalIsLiked = false;
        let artgalIsSaved = false;
        let artgalInCart = false;
        let artgalLikeCount = 452;
        let artgalCurrentZoom = 1;

        // تغییر تصویر اصلی
        function artgalChangeImage(thumbnail, imageType) {
            // حذف کلاس active از همه تصاویر
            document.querySelectorAll('.artgal-thumbnail').forEach(img => {
                img.classList.remove('active');
            });
            
            // اضافه کردن کلاس active به تصویر انتخاب شده
            thumbnail.classList.add('active');
            
            // تغییر تصویر اصلی
            const mainImage = document.getElementById('artgalMainImage');
            const imageUrls = {
                'main': 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
                'detail1': 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
                'detail2': 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
                'signature': 'https://images.unsplash.com/photo-1543857778-c4a1a569e388?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
            };
            
            mainImage.src = imageUrls[imageType];
        }

        // زوم کردن
        function artgalZoomIn() {
            artgalCurrentZoom = Math.min(artgalCurrentZoom + 0.2, 3);
            document.getElementById('artgalMainImage').style.transform = `scale(${artgalCurrentZoom})`;
        }

        function artgalZoomOut() {
            artgalCurrentZoom = Math.max(artgalCurrentZoom - 0.2, 1);
            document.getElementById('artgalMainImage').style.transform = `scale(${artgalCurrentZoom})`;
        }

        // تمام صفحه
        function artgalFullscreen() {
            const image = document.getElementById('artgalMainImage');
            if (image.requestFullscreen) {
                image.requestFullscreen();
            } else if (image.webkitRequestFullscreen) {
                image.webkitRequestFullscreen();
            } else if (image.msRequestFullscreen) {
                image.msRequestFullscreen();
            }
        }

        // لایک کردن
        function artgalToggleLike() {
            const likeBtn = document.getElementById('artgalLikeBtn');
            const likeCount = document.getElementById('artgalLikeCount');
            
            artgalIsLiked = !artgalIsLiked;
            
            if (artgalIsLiked) {
                likeBtn.innerHTML = '<i class="fas fa-heart" style="color: #ff6b6b;"></i> <span>' + (artgalLikeCount + 1) + '</span> لایک';
                likeBtn.classList.add('active');
                alert('اثر مورد علاقه شما اضافه شد! ❤️');
            } else {
                likeBtn.innerHTML = '<i class="far fa-heart"></i> <span>' + artgalLikeCount + '</span> لایک';
                likeBtn.classList.remove('active');
            }
        }

        // ذخیره کردن
        function artgalToggleSave() {
            const saveBtn = document.getElementById('artgalSaveBtn');
            
            artgalIsSaved = !artgalIsSaved;
            
            if (artgalIsSaved) {
                saveBtn.innerHTML = '<i class="fas fa-bookmark"></i> ذخیره شد';
                saveBtn.classList.add('active');
                alert('اثر به لیست ذخیره‌های شما اضافه شد! 📌');
            } else {
                saveBtn.innerHTML = '<i class="far fa-bookmark"></i> ذخیره';
                saveBtn.classList.remove('active');
            }
        }

        // اشتراک گذاری
        function artgalShare() {
            const shareData = {
                title: 'طلوع در کوهستان - سارا احمدی',
                text: 'این نقاشی زیبا از سارا احمدی را در گالری نقاشی ببینید!',
                url: window.location.href
            };
            
            if (navigator.share) {
                navigator.share(shareData)
                    .then(() => console.log('اشتراک‌گذاری موفقیت‌آمیز بود'))
                    .catch((error) => console.log('خطا در اشتراک‌گذاری:', error));
            } else {
                // کپی لینک
                navigator.clipboard.writeText(window.location.href)
                    .then(() => {
                        alert('لینک اثر در کلیپ‌بورد کپی شد! 📋\nمیتوانید آن را با دیگران به اشتراک بگذارید.');
                    })
                    .catch(err => {
                        console.error('خطا در کپی کردن لینک:', err);
                    });
            }
        }

        // افزودن به سبد خرید
        function artgalAddToCart() {
            const cartBtn = document.getElementById('artgalAddToCartBtn');
            
            if (artgalInCart) {
                alert('این اثر قبلاً به سبد خرید شما اضافه شده است!');
                return;
            }
            
            cartBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> در حال افزودن...';
            cartBtn.disabled = true;
            
            setTimeout(() => {
                artgalInCart = true;
                cartBtn.innerHTML = '<i class="fas fa-check"></i> افزوده شد به سبد';
                cartBtn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
                
                alert('🎨 اثر "طلوع در کوهستان" با موفقیت به سبد خرید شما اضافه شد!\n\n' +
                      ' قیمت: ۴۴,۸۰۰,۰۰۰ تومان\n' +
                      ' تحویل: ۲۴-۷۲ ساعت کاری');
                
                // بازگرداندن دکمه به حالت اول بعد از ۳ ثانیه
                setTimeout(() => {
                    cartBtn.innerHTML = '<i class="fas fa-shopping-cart"></i> افزودن به سبد خرید';
                    cartBtn.disabled = false;
                    cartBtn.style.background = '';
                }, 3000);
            }, 1500);
        }

        // افزودن به علاقه‌مندی‌ها
        function artgalAddToWishlist() {
            alert('💝 اثر به لیست علاقه‌مندی‌های شما اضافه شد!\n\n' +
                  'می‌توانید در صفحه پروفایل خود تمام آثار ذخیره شده را مشاهده کنید.');
        }

        // بازگشت از حالت تمام صفحه
        document.addEventListener('fullscreenchange', function() {
            if (!document.fullscreenElement) {
                artgalCurrentZoom = 1;
                document.getElementById('artgalMainImage').style.transform = 'scale(1)';
            }
        });

        // بارگذاری اولیه
        document.addEventListener('DOMContentLoaded', function() {
            console.log('صفحه اثر هنری بارگذاری شد 🎨');
        });










      // داده‌های نمونه برای صفحه
        const blogData = {
            tags: ["طراحی وب", "تکنولوژی", "فرانت‌اند", "UI/UX", "React", "پرفورمنس", "JavaScript", "CSS"],
            categories: [
                { name: "طراحی وب", count: 12 },
                { name: "برنامه‌نویسی", count: 8 },
                { name: "UI/UX", count: 5 },
                { name: "تکنولوژی", count: 15 },
                { name: "آموزش", count: 7 }
            ],
            popularArticles: [
                { title: "راهنمای کامل Flexbox", views: 250 },
                { title: "آموزش Grid CSS", views: 189 },
                { title: "بهینه‌سازی سرعت سایت", views: 167 },
                { title: "معرفی React 18", views: 145 },
                { title: "اصول SEO برای توسعه‌دهندگان", views: 132 }
            ],
            comments: [
                {
                    id: 1,
                    name: "سارا احمدی",
                    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                    date: "۲ روز پیش",
                    text: "مقاله بسیار مفیدی بود! مخصوصاً بخش مربوط به Mobile-First خیلی کاربردی بود. منتظر مقالات بعدی شما هستم.",
                    replies: []
                },
                {
                    id: 2,
                    name: "رضا کریمی",
                    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                    date: "۱ هفته پیش",
                    text: "به عنوان یک توسعه‌دهنده Frontend، تحلیل شما در مورد React و Vue.js بسیار عالی بود. لطفاً در مورد مقایسه عمیق‌تر این دو فریمورک هم بنویسید.",
                    replies: [
                        {
                            id: 3,
                            name: "علی محمدی (نویسنده)",
                            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                            date: "۶ روز پیش",
                            text: "ممنون از نظرتون رضا جان! حتماً در مقاله آینده به مقایسه عمیق‌تر این دو فریمورک خواهم پرداخت."
                        }
                    ]
                }
            ]
        };

        // نمایش نوتیفیکیشن
        function showNotification(message, type = 'info') {
            // حذف نوتیفیکیشن قبلی اگر وجود دارد
            const existingNotification = document.querySelector('.notification');
            if (existingNotification) {
                existingNotification.remove();
            }
            
            // ایجاد نوتیفیکیشن جدید
            const notification = document.createElement('div');
            notification.className = `notification ${type}`;
            
            // آیکون بر اساس نوع
            let icon = 'fa-info-circle';
            if (type === 'success') icon = 'fa-check-circle';
            if (type === 'error') icon = 'fa-exclamation-circle';
            
            notification.innerHTML = `
                <i class="fas ${icon}"></i>
                <span>${message}</span>
                <button class="notification-close"><i class="fas fa-times"></i></button>
            `;
            
            document.body.appendChild(notification);
            
            // بستن خودکار بعد از 5 ثانیه
            const autoClose = setTimeout(() => {
                closeNotification(notification);
            }, 5000);
            
            // دکمه بستن
            notification.querySelector('.notification-close').addEventListener('click', () => {
                clearTimeout(autoClose);
                closeNotification(notification);
            });
        }

        // بستن نوتیفیکیشن
        function closeNotification(notification) {
            notification.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }

        // افزایش شمارنده بازدید
        function incrementViewCount() {
            const viewCountElement = document.getElementById('viewCount');
            let currentCount = parseInt(viewCountElement.textContent) || 125;
            currentCount++;
            viewCountElement.textContent = currentCount;
            
            // ذخیره در localStorage
            localStorage.setItem('blogViewCount', currentCount);
        }

        // بارگذاری تعداد بازدید از localStorage
        function loadViewCount() {
            const savedCount = localStorage.getItem('blogViewCount');
            if (savedCount) {
                document.getElementById('viewCount').textContent = savedCount;
            }
        }

        // ایجاد تگ‌ها
        function createTags() {
            const container = document.getElementById('tagsContainer');
            blogData.tags.forEach(tag => {
                const tagElement = document.createElement('a');
                tagElement.href = '#';
                tagElement.className = 'tag';
                tagElement.textContent = tag;
                tagElement.addEventListener('click', (e) => {
                    e.preventDefault();
                    showNotification(`مقالات با برچسب "${tag}" در حال نمایش هستند`, 'info');
                });
                container.appendChild(tagElement);
            });
        }

        // ایجاد دسته‌بندی‌ها
        function createCategories() {
            const container = document.getElementById('categoriesList');
            blogData.categories.forEach(category => {
                const li = document.createElement('li');
                li.className = 'mb-2';
                li.innerHTML = `
                    <a href="#" class="text-light d-flex justify-content-between text-decoration-none">
                        <span>${category.name}</span>
                        <span class="badge bg-gold">${category.count}</span>
                    </a>
                `;
                
                li.querySelector('a').addEventListener('click', (e) => {
                    e.preventDefault();
                    showNotification(`مقالات دسته "${category.name}" در حال نمایش هستند`, 'info');
                });
                
                container.appendChild(li);
            });
        }

        // ایجاد مقالات محبوب
        function createPopularArticles() {
            const container = document.getElementById('popularArticles');
            blogData.popularArticles.forEach(article => {
                const articleElement = document.createElement('a');
                articleElement.href = '#';
                articleElement.className = 'list-group-item list-group-item-action bg-transparent border-light text-light mb-2';
                articleElement.innerHTML = `
                    <div class="d-flex w-100 justify-content-between">
                        <h6 class="mb-1">${article.title}</h6>
                    </div>
                    <small class="text-muted">${article.views} بازدید</small>
                `;
                
                articleElement.addEventListener('click', (e) => {
                    e.preventDefault();
                    showNotification(`مقاله "${article.title}" در حال بارگذاری است`, 'info');
                });
                
                container.appendChild(articleElement);
            });
        }

        // ایجاد نظرات
        function createComments() {
            const container = document.getElementById('commentsContainer');
            const commentCountElement = document.getElementById('commentCount');
            
            // شمارش کل نظرات
            let totalComments = blogData.comments.length;
            blogData.comments.forEach(comment => {
                totalComments += comment.replies.length;
            });
            commentCountElement.textContent = totalComments;
            
            // ایجاد نظرات
            blogData.comments.forEach(comment => {
                createCommentElement(comment, container, false);
            });
        }

        // ایجاد المان نظر
        function createCommentElement(comment, container, isReply = false) {
            const commentDiv = document.createElement('div');
            commentDiv.className = isReply ? 'comment-card comment-reply' : 'comment-card';
            commentDiv.id = `comment-${comment.id}`;
            
            commentDiv.innerHTML = `
                <div class="comment-header">
                    <div class="comment-avatar">
                        <img src="${comment.avatar}" alt="${comment.name}">
                    </div>
                    <div>
                        <h5 class="mb-1">${comment.name}</h5>
                        <div class="comment-date">${comment.date}</div>
                    </div>
                </div>
                <p>${comment.text}</p>
                ${!isReply ? '<button class="btn btn-sm btn-custom reply-btn">پاسخ</button>' : ''}
            `;
            
            container.appendChild(commentDiv);
            
            // افزودن رویداد پاسخ
            if (!isReply) {
                const replyBtn = commentDiv.querySelector('.reply-btn');
                replyBtn.addEventListener('click', () => {
                    showReplyForm(comment.id);
                });
            }
            
            // ایجاد پاسخ‌ها
            if (comment.replies && comment.replies.length > 0) {
                const repliesContainer = document.createElement('div');
                comment.replies.forEach(reply => {
                    createCommentElement(reply, repliesContainer, true);
                });
                commentDiv.appendChild(repliesContainer);
            }
        }

        // نمایش فرم پاسخ
        function showReplyForm(commentId) {
            const commentDiv = document.getElementById(`comment-${commentId}`);
            const existingForm = commentDiv.querySelector('.reply-form');
            
            if (existingForm) {
                existingForm.remove();
                return;
            }
            
            const replyForm = document.createElement('div');
            replyForm.className = 'reply-form mt-3';
            replyForm.innerHTML = `
                <form class="reply-comment-form">
                    <div class="mb-3">
                        <textarea class="form-control form-control-custom" rows="3" placeholder="پاسخ خود را بنویسید..." required></textarea>
                    </div>
                    <div class="d-flex gap-2">
                        <button type="submit" class="btn btn-sm btn-custom">ارسال پاسخ</button>
                        <button type="button" class="btn btn-sm btn-secondary cancel-reply">انصراف</button>
                    </div>
                </form>
            `;
            
            commentDiv.appendChild(replyForm);
            
            // ارسال پاسخ
            const form = replyForm.querySelector('.reply-comment-form');
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const text = form.querySelector('textarea').value;
                if (text.trim()) {
                    submitReply(commentId, text);
                    form.remove();
                }
            });
            
            // انصراف
            const cancelBtn = replyForm.querySelector('.cancel-reply');
            cancelBtn.addEventListener('click', () => {
                replyForm.remove();
            });
        }

        // ارسال پاسخ جدید
        function submitReply(commentId, text) {
            const newReply = {
                id: Date.now(),
                name: "کاربر مهمان",
                avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                date: "همین الآن",
                text: text
            };
            
            const comment = blogData.comments.find(c => c.id === commentId);
            if (comment) {
                if (!comment.replies) comment.replies = [];
                comment.replies.push(newReply);
                
                // به‌روزرسانی نمایش
                const commentDiv = document.getElementById(`comment-${commentId}`);
                const repliesContainer = commentDiv.querySelector('.reply-form').previousSibling || commentDiv;
                
                const replyElement = document.createElement('div');
                replyElement.className = 'comment-card comment-reply mt-3';
                replyElement.innerHTML = `
                    <div class="comment-header">
                        <div class="comment-avatar">
                            <img src="${newReply.avatar}" alt="${newReply.name}">
                        </div>
                        <div>
                            <h5 class="mb-1">${newReply.name}</h5>
                            <div class="comment-date">${newReply.date}</div>
                        </div>
                    </div>
                    <p>${newReply.text}</p>
                `;
                
                commentDiv.insertBefore(replyElement, commentDiv.querySelector('.reply-form'));
                
                // به‌روزرسانی تعداد نظرات
                const commentCount = parseInt(document.getElementById('commentCount').textContent);
                document.getElementById('commentCount').textContent = commentCount + 1;
                
                showNotification('پاسخ شما با موفقیت ثبت شد', 'success');
            }
        }

        // ارسال نظر جدید
        document.getElementById('commentForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('commentName').value.trim();
            const email = document.getElementById('commentEmail').value.trim();
            const text = document.getElementById('commentText').value.trim();
            
            if (!name || !email || !text) {
                showNotification('لطفاً تمام فیلدها را پر کنید', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('لطفاً یک ایمیل معتبر وارد کنید', 'error');
                return;
            }
            
            const newComment = {
                id: Date.now(),
                name: name,
                avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                date: "همین الآن",
                text: text,
                replies: []
            };
            
            blogData.comments.push(newComment);
            
            // ایجاد المان نظر جدید
            const container = document.getElementById('commentsContainer');
            createCommentElement(newComment, container, false);
            
            // به‌روزرسانی تعداد نظرات
            const commentCount = parseInt(document.getElementById('commentCount').textContent);
            document.getElementById('commentCount').textContent = commentCount + 1;
            
            // ریست فرم
            this.reset();
            
            showNotification('نظر شما با موفقیت ثبت شد و پس از تأیید نمایش داده می‌شود', 'success');
        });

        // اعتبارسنجی ایمیل
        function isValidEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }

        // جستجوی مقالات
        document.getElementById('searchBtn').addEventListener('click', function() {
            const query = document.getElementById('searchInput').value.trim();
            if (query) {
                showNotification(`نتایج جستجو برای "${query}" در حال نمایش هستند`, 'info');
            } else {
                showNotification('لطفاً عبارت جستجو را وارد کنید', 'error');
            }
        });

        // عضویت در خبرنامه
        document.getElementById('subscribeBtn').addEventListener('click', function() {
            const email = document.getElementById('newsletterEmail').value.trim();
            
            if (!email) {
                showNotification('لطفاً ایمیل خود را وارد کنید', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('لطفاً یک ایمیل معتبر وارد کنید', 'error');
                return;
            }
            
            // شبیه‌سازی ارسال
            setTimeout(() => {
                document.getElementById('newsletterEmail').value = '';
                showNotification('عضویت شما در خبرنامه با موفقیت انجام شد!', 'success');
            }, 500);
        });

        // ناوبری مقالات
        document.getElementById('prevArticle').addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('مقاله قبلی در حال بارگذاری است', 'info');
        });

        document.getElementById('nextArticle').addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('مقاله بعدی در حال بارگذاری است', 'info');
        });

        // دکمه بازگشت به بالا
        const backToTopBtn = document.getElementById('backToTop');
        
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // مقداردهی اولیه صفحه
        document.addEventListener('DOMContentLoaded', function() {
            // بارگذاری تعداد بازدید
            loadViewCount();
            incrementViewCount();
            
            // ایجاد المان‌های داینامیک
            createTags();
            createCategories();
            createPopularArticles();
            createComments();
            
            // نمایش پیام خوش‌آمد
            setTimeout(() => {
                showNotification('برای مشاهده سایر مقالات به صفحه بلاگ مراجعه کنید', 'info');
            }, 2000);
            
            // انیمیشن‌های ورودی
            const fadeElements = document.querySelectorAll('.fade-in');
            fadeElements.forEach((el, index) => {
                el.style.animationDelay = `${index * 0.2}s`;
            });
            
            // فعال کردن رویداد جستجو با Enter
            document.getElementById('searchInput').addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    document.getElementById('searchBtn').click();
                }
            });
            
            // فعال کردن رویداد عضویت در خبرنامه با Enter
            document.getElementById('newsletterEmail').addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    document.getElementById('subscribeBtn').click();
                }
            });
        });




  function showModal() {
            document.getElementById('modalOverlay').style.display = 'block';
        }
        
        function closeModal() {
            document.getElementById('modalOverlay').style.display = 'none';
        }
        
        // بستن با کلید Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeModal();
            }
        });










     // ایجاد ذرات شناور
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // اندازه تصادفی
        const size = Math.random() * 20 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // موقعیت تصادفی
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // تاخیر انیمیشن تصادفی
        particle.style.animationDelay = `${Math.random() * 15}s`;
        
        // شفافیت تصادفی
        particle.style.opacity = `${Math.random() * 0.3 + 0.1}`;
        
        particlesContainer.appendChild(particle);
    }
}

// نمایش/مخفی کردن رمز عبور
function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const toggleBtn = document.getElementById('togglePassword');
    const eyeIcon = toggleBtn.querySelector('i');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.classList.remove('fa-eye');
        eyeIcon.classList.add('fa-eye-slash');
        toggleBtn.setAttribute('aria-label', 'مخفی کردن رمز عبور');
    } else {
        passwordInput.type = 'password';
        eyeIcon.classList.remove('fa-eye-slash');
        eyeIcon.classList.add('fa-eye');
        toggleBtn.setAttribute('aria-label', 'نمایش رمز عبور');
    }
}

// مدیریت فرم ورود
function handleLoginForm(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const loginBtn = document.getElementById('loginBtn');
    const originalText = loginBtn.innerHTML;
    
    // اعتبارسنجی ساده
    if (!username) {
        showNotification('لطفاً نام کاربری یا ایمیل خود را وارد کنید', 'error');
        document.getElementById('username').focus();
        return;
    }
    
    if (!password) {
        showNotification('لطفاً رمز عبور خود را وارد کنید', 'error');
        document.getElementById('password').focus();
        return;
    }
    
    if (password.length < 6) {
        showNotification('رمز عبور باید حداقل ۶ کاراکتر باشد', 'error');
        document.getElementById('password').focus();
        return;
    }
    
    // شبیه‌سازی ارسال فرم
    loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> در حال ورود...';
    loginBtn.disabled = true;
    
    // شبیه‌سازی تاخیر سرور
    setTimeout(() => {
        // در اینجا باید اطلاعات به سرور ارسال شود
        // برای نمایش، پیام موفقیت نشان می‌دهیم
        showNotification('ورود با موفقیت انجام شد! در حال انتقال...', 'success');
        
        // بازنشانی دکمه
        loginBtn.innerHTML = originalText;
        loginBtn.disabled = false;
        
        // شبیه‌سازی انتقال به صفحه کاربر
        setTimeout(() => {
            // در واقعیت باید کاربر به داشبورد منتقل شود
            window.location.href = 'dashboard.html';
        }, 1500);
        
    }, 2000);
}

// نمایش نوتیفیکیشن
function showNotification(message, type) {
    // حذف نوتیفیکیشن قبلی اگر وجود دارد
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // ایجاد نوتیفیکیشن جدید
    const notification = document.createElement('div');
    notification.classList.add('notification', type);
    
    // آیکون بر اساس نوع
    let icon = 'fa-info-circle';
    if (type === 'success') icon = 'fa-check-circle';
    if (type === 'error') icon = 'fa-exclamation-circle';
    
    notification.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    // استایل‌های نوتیفیکیشن
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'error' ? 'rgba(111, 29, 27, 0.9)' : 'rgba(76, 175, 80, 0.9)'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 12px;
        z-index: 10000;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        animation: slideIn 0.3s ease forwards;
        max-width: 400px;
    `;
    
    // استایل‌های داخلی
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        .notification-close {
            background: none;
            border: none;
            color: rgba(255, 255, 255, 0.7);
            cursor: pointer;
            margin-right: auto;
            font-size: 1rem;
            transition: color 0.3s ease;
        }
        
        .notification-close:hover {
            color: white;
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // بستن خودکار
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease forwards';
            
            const slideOutStyle = document.createElement('style');
            slideOutStyle.textContent = `
                @keyframes slideOut {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(slideOutStyle);
            
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
    
    // دکمه بستن
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });
}








// 

    // ابتدا مطمئن شویم صفحه کامل لود شده
window.onload = function() {
    console.log("✅ صفحه آماده است!");
    startProgress();
};

function startProgress() {
    console.log("🚀 شروع بارگذاری...");
    
    let progress = 0;
    const progressFill = document.getElementById('progressFill');
    const percentage = document.getElementById('percentage');
    
    // ابتدا بررسی کنیم المان‌ها پیدا می‌شوند یا نه
    if (!progressFill || !percentage) {
        console.error("❌ المان‌های مورد نظر پیدا نشدند!");
        console.log("progressFill:", progressFill);
        console.log("percentage:", percentage);
        return; // اجرا نشود
    }
    
    console.log("✅ المان‌ها پیدا شدند!");
    
    const progressInterval = setInterval(() => {
        progress += Math.random() * 3 + 1;
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);
            console.log("✅ بارگذاری کامل شد!");
            
            setTimeout(() => {
                console.log("🎬 شروع افکت محو شدن...");
                document.body.style.opacity = '0';
                document.body.style.transition = 'opacity 0.8s ease';
                
                setTimeout(() => {
                    console.log("🔄 انتقال به صفحه اصلی...");
                    window.location.href = "index.html";
                }, 800);
            }, 500);
        }
        
        // به‌روزرسانی
        progressFill.style.width = `${progress}%`;
        percentage.textContent = `${Math.round(progress)}%`;
        
        console.log(`📊 پیشرفت: ${Math.round(progress)}%`);
        
    }, 300);
}










        // مدیریت آپلود تصویر
        function previewImage(event) {
            const input = event.target;
            const previewContainer = document.getElementById('previewContainer');
            const previewImage = document.getElementById('previewImage');
            const uploadArea = document.getElementById('uploadArea');
            
            if (input.files && input.files[0]) {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    previewImage.src = e.target.result;
                    previewContainer.style.display = 'block';
                    uploadArea.style.display = 'none';
                }
                
                reader.readAsDataURL(input.files[0]);
            }
        }
        
        function removeImage() {
            const previewContainer = document.getElementById('previewContainer');
            const uploadArea = document.getElementById('uploadArea');
            const imageInput = document.getElementById('imageInput');
            
            previewContainer.style.display = 'none';
            uploadArea.style.display = 'block';
            imageInput.value = '';
        }
        
        // مدیریت تگ‌ها
        let tags = [];
        
        function addTag() {
            const tagInput = document.getElementById('tagInput');
            const tagText = tagInput.value.trim();
            
            if (tagText && !tags.includes(tagText)) {
                tags.push(tagText);
                renderTags();
                tagInput.value = '';
            }
        }
        
        function removeTag(tag) {
            tags = tags.filter(t => t !== tag);
            renderTags();
        }
        
        function renderTags() {
            const container = document.getElementById('tagsContainer');
            container.innerHTML = '';
            
            tags.forEach(tag => {
                const tagElement = document.createElement('div');
                tagElement.className = 'tag-item';
                tagElement.innerHTML = `
                    <span class="tag-remove" onclick="removeTag('${tag}')">×</span>
                    ${tag}
                `;
                container.appendChild(tagElement);
            });
        }
        
        // مدیریت فرم
        document.getElementById('addArtForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // اعتبارسنجی
            const imageInput = document.getElementById('imageInput');
            if (!imageInput.files[0]) {
                alert('لطفاً تصویر اثر را انتخاب کنید');
                return;
            }
            
            // شبیه‌سازی ارسال فرم
            const submitBtn = this.querySelector('.btn-submit');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>در حال ذخیره...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('اثر هنری با موفقیت اضافه شد!');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                this.reset();
                removeImage();
                tags = [];
                renderTags();
            }, 2000);
        });
        
        // کشیدن و رها کردن فایل
        const uploadArea = document.getElementById('uploadArea');
        
        uploadArea.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.style.borderColor = '#ffe1a8';
            this.style.background = 'rgba(255, 225, 168, 0.1)';
        });
        
        uploadArea.addEventListener('dragleave', function(e) {
            e.preventDefault();
            this.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            this.style.background = 'rgba(255, 255, 255, 0.03)';
        });
        
        uploadArea.addEventListener('drop', function(e) {
            e.preventDefault();
            this.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            this.style.background = 'rgba(255, 255, 255, 0.03)';
            
            const file = e.dataTransfer.files[0];
            if (file && file.type.startsWith('image/')) {
                document.getElementById('imageInput').files = e.dataTransfer.files;
                previewImage({ target: document.getElementById('imageInput') });
            }
        });
        
        // مقداردهی اولیه تگ‌های نمونه
        tags = ['نقاشی', 'هنر معاصر', 'آبرنگ', 'طبیعت'];
        renderTags();











        // مدیریت آواتار
        function updateAvatar(event) {
            const input = event.target;
            const avatar = document.getElementById('profileAvatar');
            
            if (input.files && input.files[0]) {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    avatar.src = e.target.result;
                    showNotification('تصویر پروفایل با موفقیت آپلود شد', 'success');
                }
                
                reader.readAsDataURL(input.files[0]);
            }
        }
        
        // مدیریت بیوگرافی
        function updateBioCounter() {
            const bioText = document.getElementById('bioText');
            const counter = document.getElementById('bioCounter');
            const length = bioText.value.length;
            counter.textContent = length;
            
            if (length > 500) {
                counter.style.color = '#ff6b6b';
            } else {
                counter.style.color = 'rgba(255, 255, 255, 0.5)';
            }
        }
        
        // مدیریت مهارت‌ها
        let skills = ['نقاشی رنگ روغن', 'آبرنگ', 'طراحی', 'هنر دیجیتال', 'مینیمال'];
        
        function addSkill() {
            const skillInput = document.getElementById('skillInput');
            const skillText = skillInput.value.trim();
            
            if (skillText && !skills.includes(skillText)) {
                skills.push(skillText);
                renderSkills();
                skillInput.value = '';
            }
        }
        
        function removeSkill(skill) {
            skills = skills.filter(s => s !== skill);
            renderSkills();
        }
        
        function renderSkills() {
            const container = document.getElementById('skillsContainer');
            container.innerHTML = '';
            
            skills.forEach(skill => {
                const skillElement = document.createElement('div');
                skillElement.className = 'skill-item';
                skillElement.innerHTML = `
                    ${skill}
                    <span class="skill-remove" onclick="removeSkill('${skill}')">×</span>
                `;
                container.appendChild(skillElement);
            });
        }
        
        // مدیریت نمونه کارها
        function addPortfolioItem(event) {
            const input = event.target;
            const container = document.getElementById('portfolioItems');
            
            if (input.files && input.files[0]) {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    const col = document.createElement('div');
                    col.className = 'col-md-4 mb-4';
                    col.innerHTML = `
                        <div class="artwork-item">
                            <img src="${e.target.result}" class="img-fluid rounded" alt="نمونه کار">
                            <div class="d-flex justify-content-between mt-2">
                                <button class="btn btn-sm btn-outline-light">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="btn btn-sm btn-outline-danger" onclick="removePortfolioItem(this)">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    `;
                    container.prepend(col);
                    showNotification('نمونه کار با موفقیت اضافه شد', 'success');
                }
                
                reader.readAsDataURL(input.files[0]);
                input.value = '';
            }
        }
        
        function removePortfolioItem(button) {
            if (confirm('آیا از حذف این نمونه کار مطمئن هستید؟')) {
                button.closest('.col-md-4').remove();
                showNotification('نمونه کار حذف شد', 'info');
            }
        }
        
        function savePortfolio() {
            showNotification('نمونه کارها با موفقیت ذخیره شدند', 'success');
        }
        
        // تغییر رمز عبور
        function changePassword() {
            const newPassword = prompt('لطفاً رمز عبور جدید را وارد کنید:');
            if (newPassword && newPassword.length >= 6) {
                showNotification('رمز عبور با موفقیت تغییر کرد', 'success');
            } else if (newPassword) {
                showNotification('رمز عبور باید حداقل ۶ کاراکتر باشد', 'error');
            }
        }
        
        // ذخیره تنظیمات
        function saveSettings() {
            showNotification('تنظیمات با موفقیت ذخیره شدند', 'success');
        }
        
        function resetSettings() {
            if (confirm('آیا از بازنشانی همه تنظیمات مطمئن هستید؟')) {
                document.getElementById('twoFactorSwitch').checked = false;
                document.getElementById('emailNotifications').checked = true;
                document.getElementById('newFollowerNotifications').checked = true;
                document.getElementById('saleNotifications').checked = true;
                document.getElementById('eventNotifications').checked = false;
                showNotification('تنظیمات بازنشانی شدند', 'info');
            }
        }
        
        // مدیریت فرم‌ها
        function resetForm(formId) {
            if (confirm('آیا از بازنشانی فرم مطمئن هستید؟')) {
                document.getElementById(formId).reset();
                if (formId === 'professionalForm') {
                    updateBioCounter();
                    skills = ['نقاشی رنگ روغن', 'آبرنگ', 'طراحی', 'هنر دیجیتال', 'مینیمال'];
                    renderSkills();
                }
                showNotification('فرم بازنشانی شد', 'info');
            }
        }
        
        // ارسال فرم‌ها
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const submitBtn = this.querySelector('.btn-save');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>در حال ذخیره...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    showNotification('تغییرات با موفقیت ذخیره شدند', 'success');
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 1500);
            });
        });
        
        // نمایش نوتیفیکیشن
        function showNotification(message, type = 'info') {
            const notification = document.createElement('div');
            notification.className = `notification ${type}`;
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                left: 20px;
                background: ${type === 'success' ? 'rgba(76, 175, 80, 0.9)' : 
                            type === 'error' ? 'rgba(244, 67, 54, 0.9)' : 
                            'rgba(33, 150, 243, 0.9)'};
                color: white;
                padding: 15px 25px;
                border-radius: 10px;
                display: flex;
                align-items: center;
                gap: 12px;
                z-index: 10000;
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.2);
                box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
                animation: slideIn 0.3s ease forwards;
                font-family: Vazir, sans-serif;
                max-width: 400px;
            `;
            
            let icon = 'fa-info-circle';
            if (type === 'success') icon = 'fa-check-circle';
            if (type === 'error') icon = 'fa-exclamation-circle';
            
            notification.innerHTML = `
                <i class="fas ${icon}"></i>
                <span>${message}</span>
            `;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.style.animation = 'slideOut 0.3s ease forwards';
                    setTimeout(() => notification.remove(), 300);
                }
            }, 3000);
        }
        
        // مقداردهی اولیه
        document.addEventListener('DOMContentLoaded', function() {
            updateBioCounter();
            renderSkills();
            
            // استایل انیمیشن نوتیفیکیشن
            const style = document.createElement('style');
            style.textContent = `
                @keyframes slideIn {
                    from {
                        transform: translateX(-100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                @keyframes slideOut {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(-100%);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        });


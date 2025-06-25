/**
 * File JavaScript untuk Website Kopi Street BAHAGIYA
 * Berkas ini menangani semua fungsionalitas interaktif di halaman index.html dan cerita-kami.html.
 * Kode ini dirancang agar modular dan hanya berjalan jika elemen yang dibutuhkan ada di halaman tersebut.
 *
 * @version 2.0.0
 * @author Gemini
 * @date 25 Juni 2025
 */

// Menjalankan skrip hanya setelah seluruh konten halaman (DOM) dimuat.
document.addEventListener('DOMContentLoaded', function() {

    // =========================================================================
    // Inisialisasi Elemen Umum
    // =========================================================================
    // Mengambil elemen-elemen yang ada di kedua halaman.
    const navbar = document.getElementById('navbar');
    const themeToggleBtn = document.getElementById('theme-toggle');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const openIcon = document.getElementById('menu-open-icon');
    const closeIcon = document.getElementById('menu-close-icon');
    const cursorDot = document.getElementById('cursor-dot');
    const cursorOutline = document.getElementById('cursor-outline');
    const interactiveElements = document.querySelectorAll('.interactive-el, button, a');

    // =========================================================================
    // 1. Fungsionalitas Navbar Mengambang (HANYA UNTUK INDEX.HTML)
    // =========================================================================
    // Fungsi ini hanya akan berjalan jika elemen-elemen spesifik homepage ada.
    const navBrand = document.getElementById('nav-brand');
    const heroSection = document.querySelector('.relative.h-screen'); // Cek keberadaan hero section

    if (heroSection && navBrand) { // Jika ini adalah homepage
        const navLinks = navbar.querySelectorAll('nav a');

        function handleScroll() {
            // Jika posisi scroll lebih dari 50px dari atas
            if (window.scrollY > 50) {
                // Tambahkan kelas untuk background, blur, dan bayangan
                navbar.classList.add('bg-white/80', 'dark:bg-gray-900/80', 'backdrop-blur-lg', 'shadow-md', 'dark:shadow-black/20');
                // Ubah warna teks agar tetap terlihat
                navBrand.classList.add('text-gray-900', 'dark:text-white');
                navBrand.classList.remove('text-white');
                if (themeToggleBtn) {
                    themeToggleBtn.classList.remove('text-gray-200');
                    themeToggleBtn.classList.add('text-gray-800', 'dark:text-gray-200');
                }
                navLinks.forEach(link => {
                    link.classList.add('text-gray-600', 'dark:text-gray-300');
                    link.classList.remove('text-white');
                });
            } else {
                // Kembalikan ke tampilan transparan jika scroll di paling atas
                navbar.classList.remove('bg-white/80', 'dark:bg-gray-900/80', 'backdrop-blur-lg', 'shadow-md', 'dark:shadow-black/20');
                navBrand.classList.remove('text-gray-900', 'dark:text-white');
                navBrand.classList.add('text-white');
                if(themeToggleBtn){
                    themeToggleBtn.classList.add('text-gray-200');
                    themeToggleBtn.classList.remove('text-gray-800', 'dark:text-gray-200');
                }
                 navLinks.forEach(link => {
                    link.classList.remove('text-gray-600', 'dark:text-gray-300');
                    link.classList.add('text-white');
                });
            }
        }
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Panggil juga saat halaman dimuat untuk mengatur state awal
    }


    // =========================================================================
    // 2. Animasi Reveal (Muncul saat di-scroll) - UNIVERSAL
    // =========================================================================
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) { 
                    entry.target.classList.add('visible'); 
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 }); 

        revealElements.forEach((el) => revealObserver.observe(el));
    }


    // =========================================================================
    // 3. Toggle Tema Gelap/Terang (Dark/Light Mode) - UNIVERSAL
    // =========================================================================
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function() {
            if (document.documentElement.classList.contains('dark')) {
                document.documentElement.classList.remove('dark');
                localStorage.theme = 'light';
            } else {
                document.documentElement.classList.add('dark');
                localStorage.theme = 'dark';
            }
        });
    }
    
    // =========================================================================
    // 4. Fungsionalitas Menu Mobile (Hamburger Menu) - UNIVERSAL
    // =========================================================================
    if (mobileMenuButton && mobileMenu && openIcon && closeIcon) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            openIcon.classList.toggle('hidden');
            closeIcon.classList.toggle('hidden');
        });
    }


    // =========================================================================
    // 5. Filter Menu Produk (HANYA UNTUK INDEX.HTML)
    // =========================================================================
    const filterContainer = document.getElementById('menu-filters');
    if (filterContainer) { // Hanya jalankan jika container filter ada
        const filterButtons = filterContainer.querySelectorAll('.filter-btn');
        const menuItems = document.querySelectorAll('#menu-grid .menu-item');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filter = button.getAttribute('data-filter');

                menuItems.forEach(item => {
                    if (filter === 'semua' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                        // Menggunakan timeout kecil agar transisi berjalan mulus
                        setTimeout(() => {
                           item.classList.remove('hidden', 'scale-0', 'opacity-0');
                        }, 10);
                    } else {
                        item.classList.add('scale-0', 'opacity-0');
                        setTimeout(() => { 
                            item.classList.add('hidden');
                            item.style.display = 'none'; 
                        }, 300); // Durasi harus cocok dengan transisi di CSS
                    }
                });
            });
        });
    }


    // =========================================================================
    // 6. Kursor Kustom Interaktif - UNIVERSAL
    // =========================================================================
    if (cursorDot && cursorOutline) {
        // Cek apakah pengguna bukan di perangkat sentuh untuk menampilkan kursor kustom
        const isTouchDevice = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0;

        if (!isTouchDevice()) {
            window.addEventListener('mousemove', (e) => {
                const posX = e.clientX;
                const posY = e.clientY;

                cursorDot.style.left = `${posX}px`;
                cursorDot.style.top = `${posY}px`;

                cursorOutline.animate({
                    left: `${posX}px`,
                    top: `${posY}px`
                }, { duration: 500, fill: "forwards" });
            });
            
            interactiveElements.forEach(el => {
                el.addEventListener('mouseover', () => cursorOutline.classList.add('hover'));
                el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hover'));
            });
        } else {
            // Sembunyikan kursor kustom di perangkat sentuh
            cursorDot.style.display = 'none';
            cursorOutline.style.display = 'none';
        }
    }
});

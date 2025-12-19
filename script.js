// Fungsi ini diletakkan di global scope agar bisa diakses oleh tombol HTML.
function scrollSlider(direction) {
    const sliderContainer = document.querySelector('#fitur .col-12');

    if (!sliderContainer) return;

    // Mendefinisikan jarak pergeseran (misalnya, lebar satu card + margin)
    // 350px adalah estimasi jarak pergeseran yang baik (lebar card di mobile/desktop)
    const scrollAmount = window.innerWidth > 768 ? 370 : 350; 

    sliderContainer.scrollBy({
        left: scrollAmount * direction,
        behavior: 'smooth'
    });
}


// 1. Fungsi untuk Navbar Sticky dan Ganti Warna
window.onscroll = function() {
    const navbar = document.querySelector('.navbar');
    
    // Periksa jika navbar ada sebelum mencoba mengubah kelas
    if (navbar) {
        if (window.scrollY > 50) { 
            navbar.classList.add('nav-color'); // 'nav-color' dari CSS Anda
            // Bootstrap 'shadow-md' diganti dengan class Tailwind 'shadow-md' jika Anda menggunakan Tailwind
            // Dalam versi ini, kita asumsikan Tailwind aktif
            navbar.classList.add('shadow-md'); 
        } else {
            navbar.classList.remove('nav-color');
            navbar.classList.remove('shadow-md');
        }
    }
};

// 2. Fungsi untuk Drag/Swipe Horizontal di Bagian Fitur Rumah (diaktifkan saat DOM siap)
document.addEventListener('DOMContentLoaded', () => {
    const sliderContainer = document.querySelector('#fitur .row > .col-12');
    
    if (sliderContainer) {
        // Tambahan: Membuat container bisa digeser (drag) dengan mouse/touch
        let isDown = false;
        let startX;
        let scrollLeft;

        sliderContainer.addEventListener('mousedown', (e) => {
            isDown = true;
            sliderContainer.style.cursor = 'grabbing'; // Berikan feedback visual
            startX = e.pageX - sliderContainer.offsetLeft;
            scrollLeft = sliderContainer.scrollLeft;
        });

        sliderContainer.addEventListener('mouseleave', () => {
            isDown = false;
            sliderContainer.style.cursor = 'grab';
        });

        sliderContainer.addEventListener('mouseup', () => {
            isDown = false;
            sliderContainer.style.cursor = 'grab';
        });

        sliderContainer.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - sliderContainer.offsetLeft;
            const walk = (x - startX) * 2; // Kecepatan scroll
            sliderContainer.scrollLeft = scrollLeft - walk;
        });

        // Mendukung Touch Events untuk perangkat mobile
        sliderContainer.addEventListener('touchstart', (e) => {
            isDown = true;
            startX = e.touches[0].pageX - sliderContainer.offsetLeft;
            scrollLeft = sliderContainer.scrollLeft;
        }, { passive: true }); // Menggunakan { passive: true } untuk performa touch

        sliderContainer.addEventListener('touchend', () => {
            isDown = false;
        });

        sliderContainer.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            const x = e.touches[0].pageX - sliderContainer.offsetLeft;
            const walk = (x - startX) * 2;
            sliderContainer.scrollLeft = scrollLeft - walk;
        }, { passive: false }); // Menggunakan { passive: false } karena kita menggunakan preventDefault internal

    }

    // 3. Fungsi Animasi Smooth Scroll (Fallback untuk tautan internal, meskipun CSS sudah menangani)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

});
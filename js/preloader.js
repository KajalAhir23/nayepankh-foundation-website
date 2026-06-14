// preloader.js
export function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            setTimeout(() => preloader.remove(), 600);
        });
        // Safety timeout to ensure loader disappears even if assets take too long
        setTimeout(() => {
            if (preloader.parentNode) {
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
                setTimeout(() => preloader.remove(), 600);
            }
        }, 3000);
    }
}

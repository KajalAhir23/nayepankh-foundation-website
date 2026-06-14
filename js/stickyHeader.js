// stickyHeader.js
export function initStickyHeader() {
    const header = document.querySelector('.header');
    if (!header) return;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        if (windowHeight > 0) {
            const scrollPercentage = (window.scrollY / windowHeight) * 100;
            document.documentElement.style.setProperty('--scroll-progress', `${scrollPercentage}%`);
        }
    });
}

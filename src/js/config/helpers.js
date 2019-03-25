import lozad from 'lozad';

export function ready(fn) {
    if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") fn();
    else document.addEventListener('DOMContentLoaded', fn);
}

export function loadImages() {
    const observer = lozad('.lozad', {
        loaded: function(el) {
            el.classList.add('lozad--loaded');
            //el.style.backgroundImage = `url(${el.getAttribute('data-background-image')})`;
        }
    });
    observer.observe();
}
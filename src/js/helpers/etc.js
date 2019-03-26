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

export function scrollTo(y, duration) {
    let initialY = document.documentElement.scrollTop || document.body.scrollTop;
    let baseY = (initialY + y) * 0.5;
    let difference = initialY - baseY;
    let startTime = performance.now();
    function step() {
        let normalizedTime = (performance.now() - startTime) / duration;
        if (normalizedTime > 1) normalizedTime = 1;
        window.scrollTo(0, baseY + difference * Math.cos(normalizedTime * Math.PI));
        if (normalizedTime < 1) window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
}

export function addClass(element, className) {
    if(element.classList) element.classList.add(className);
    else element.className += className;
}

export function removeClass(element, className) {
    if(element.classList) element.classList.remove(className);
    else {
        let classNames = element.className.split(' '),
            index = classNames.indexOf(className);
        classNames.splice(index, 1);
        element.className = classNames.join(' ');
    }
}

export function hasClass(element, className) {
    return element.classList ? element.classList.contains(className) : element.className.split(' ').indexOf(className) >= 0;
}
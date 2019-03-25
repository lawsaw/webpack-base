export default class ScrollTo {

    constructor(component) {
        this.link = component;
        this.event = 'click';
        this.target = this.getTarget();
        this.init();
    }

    init = () => {
        this.link.addEventListener(this.event, this.trigger, false);
    }

    unmount = () => {
        this.link.removeEventListener(this.event, this.trigger, false);
    }

    getTarget = () => {
        let id = this.link.getAttribute('href');
        id = id[0] === '#' ? id.substr(1) : id;
        return document.getElementById(id);
    }

    getTargetPosition = () => {
        return window.scrollY + this.target.getBoundingClientRect().top;
    }

    trigger = (e) => {
        e.preventDefault();
        let position = this.getTargetPosition();

        this.target.scrollIntoView({
            behavior: 'smooth'
        });

        // window.scrollTo({
        //     top: position,
        //     behavior: "smooth"
        // });
    }

}
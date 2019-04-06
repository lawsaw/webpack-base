import { app } from '../config/app';

export default class Svg {

    constructor() {
        this.timer = null;
        this.init();
    }

    init = () => {
        window.addEventListener('scroll', function () {
            window.clearTimeout(this.timer);
            app.isScroling = true;
            this.timer = setTimeout(() => {
                app.isScroling = false;
            }, 100);
        }, false);
    }

}



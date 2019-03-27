export default class Scroolly {

    constructor(component) {
        this.element = component;
        this.windowScrolledTop = 0;
        this.componentScrolledTop = 0;
        this.doc = {};
        this.com = this.getComponentData();
        this.init();
    }

    init = () => {
        window.addEventListener('scroll', this.trigger, false);
    }

    trigger = (e) => {
        this.doc = {
            docTop: document.documentElement.scrollTop,
            docBottom: document.documentElement.scrollHeight - document.documentElement.scrollTop - document.documentElement.clientHeight,
        }
        this.com = this.getComponentData();


        if(this.com.topBottom > 0 && this.com.bottomTop > 0) {
            this.componentInViewport(this.com);
        }

    }

    getComponentData = () => {
        let { top, height } = this.element.getBoundingClientRect();
        let { clientHeight } = document.documentElement;
        return {
            topTop:         this.getPercent(top, clientHeight),
            topBottom:      this.getPercent(top + height, clientHeight),
            topCenter:      this.getPercent(top + height/2, clientHeight),
            bottomBottom:   this.getPercent(clientHeight - top - height, clientHeight),
            bottomCenter:   this.getPercent(clientHeight - top - height/2, clientHeight),
            bottomTop:      this.getPercent(clientHeight - top, clientHeight),
        }
    }

    componentInViewport = (data) => {
        console.log(data);
    }

    getPercent = (value, max) => {
        let res = value * 100 / max;
        return res >= 100 ? 100 : res <= 0 ? 0 : Math.ceil(res);
    }


}
export default class Svg {

    constructor() {
        this.init();
    }

    init = () => {
        this.requireAll(require.context('../../svg/', true, /\.svg$/));
        this.fetch();
    }

    requireAll = (r) => {
        r.keys().forEach(r);
    }

    fetch = () => {
        fetch('svg/sprite.svg').then(res => {
            return res.text();
        }).then(data => {
            let div = document.createElement("div");
            div.style.display = 'none';
            div.innerHTML = data;
            document.body.insertBefore(div, document.body.childNodes[0]);
            //document.getElementById('svg-icons').innerHTML = data;
        });
    }

}



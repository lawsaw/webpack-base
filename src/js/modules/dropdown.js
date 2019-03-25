class Dropdown {

    constructor(props) {
        this.init();
        this.root = document.getElementById('rootDropdown');
        this.updatePosition = this.updatePosition.bind(this);
        this.test = () => {};
    }

    hasClass(elem, className) {
        return Array.prototype.indexOf.call(elem.classList, className) > 0 ? true : false;
    }

    getBack(front) {
        const id = front.getAttribute('data-id');
        return document.getElementById(id);
    }

    click(e, front) {
        if(!this.getBack(front)) {
            this.createDropdown(front);
            console.log('createDropdown');
        } else {
            this.removeDropdown(front);
            console.log('removeDropdown');
        }
    }

    removeDropdown(front) {
        const back = this.getBack(front);
        front.classList.remove('dropdown--active');
        front.setAttribute('data-id', '');
        window.removeEventListener('scroll', this.updatePosition, true);
        back.remove();
    }

    createDropdown(front) {
        front.classList.add('dropdown--active');
        const id = `dropdown-${Math.random().toString(16).slice(2)}`;
        front.setAttribute('data-id', id);
        const back = front.getElementsByClassName('dropdownBack')[0];
        const rect = back.getBoundingClientRect();
        const backOuter = back.cloneNode(true);
        backOuter.id = id;
        backOuter.style.left = `${rect.x}px`;
        backOuter.style.top = `${rect.y}px`;
        this.root.appendChild(backOuter);
        console.log(rect);
        this.test = e => this.updatePosition(e, front);
        window.addEventListener('scroll', this.test, true);
    }

    updatePosition(e, front) {
        console.log('scrolling');
    }

    init() {
        let containers = document.getElementsByClassName('dropdown');
        Array.prototype.map.call(containers, front => {
            front.addEventListener('click', e => this.click(e, front), true);
        })
    }

}
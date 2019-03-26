import { addClass, removeClass, hasClass } from '../helpers/etc';

export default class Tab {

    constructor(component) {
        this.tab = component;
        this.menuItems = component.getElementsByClassName('tabMenu-item');
        this.contentItems = component.getElementsByClassName('tabContent-item');
        this.menuButtons = component.getElementsByClassName('tabMenu-button');
        this.data = this.getData();
        this.event = 'click';
        this.activeClassMenu = 'tabMenu-item--active';
        this.activeClassContent = 'tabContent-item--active';
        this.animIn = component.getAttribute('data-anim-in') || 'fromAngleBottomRight';
        this.animOut = component.getAttribute('data-anim-out') || 'toAngleBottomRight';
        this.duration = component.getAttribute('data-anim-duration') || 1000;
        this.contentContainer = this.contentItems[0].parentNode; //tabContent
        this.lock = false;
        this.init();
    }

    init = () => {
        this.data.forEach(item => item.menu.addEventListener(this.event, e => this.trigger(e, item), false));
        this.setCurrentState();
        this.initButtons();
        console.log(this.getOppositeDirection('toAngleBottomRight'));
    }

    initButtons = () => {
        if(this.menuButtons) {
            Object.values(this.menuButtons).forEach(item => item.addEventListener(this.event, e => this.clickButton(e, item), false));
        }
    }

    unmount = () => {
        // Object.values(this.tabMenuItems).forEach(item => {
        //     item.removeEventListener(this.event, this.trigger, false);
        // });
    }

    getOppositeDirection = (direction) => {
        let directions = [['Left', 'Right'],['In', 'Out'],['Top', 'Bottom']];
        let current = 0;
        let opposite = 0;
        directions.find(item => item.find(item2 => direction.indexOf(item2) >= 0)).forEach(item => {
            if(direction.indexOf(item) >= 0) current = item
            else opposite = item;
        })
        return direction.replace(current, opposite);
    }

    trigger = (e, {menu, content}) => {
        e.preventDefault();
        let { menu: currentMenu } = this.getCurrentData();
        if(!this.lock && menu !== currentMenu) {
            this.lock = true;
            this.closeCurrent();
            this.openNew(menu, content);
        }
    }

    closeCurrent = (directionFlag) => {
        let animStyle = directionFlag ? this.getOppositeDirection(this.animOut) : this.animOut;
        console.log(animStyle);
        let { menu, content } = this.getCurrentData();
        let animModifier = `tabContent-item--${animStyle}`;
        removeClass(menu, this.activeClassMenu);
        addClass(content, animModifier);
        setTimeout(() => {
            removeClass(content, animModifier);
            removeClass(content, this.activeClassContent);
        }, this.duration);
    }

    openNew = (menu, content, directionFlag) => {
        let animStyle = directionFlag ? this.getOppositeDirection(this.animIn) : this.animIn;
        console.log(animStyle);
        let animModifier = `tabContent-item--${animStyle}`;
        addClass(menu, this.activeClassMenu);
        addClass(content, animModifier);
        this.setContainerHeight(content.offsetHeight);
        setTimeout(() => {
            this.lock = false;
            addClass(content, this.activeClassContent);
            removeClass(content, animModifier);
        }, this.duration);
    }

    setCurrentState = () => {
        let { content } = this.getCurrentData();
        this.setDuration();
        this.setContainerHeight(content.offsetHeight);
    }

    getCurrentData = () => {
        return {
            menu: this.data.find(item => hasClass(item.menu, this.activeClassMenu)).menu,
            content: this.data.find(item => hasClass(item.content, this.activeClassContent)).content,
        }
    }

    setDuration = () => {
        Object.values(this.contentItems).forEach(item => {
            item.style.animationDuration = `${this.duration / 1000}s`;
        });
        this.contentContainer.style.transitionDuration = `${this.duration / 1000}s`;
    }

    setContainerHeight = (value) => {
        this.contentContainer.style.height = `${value}px`;
    }

    clickButton = (e, button) => {
        if(!this.lock) {
            this.lock = true;
            let id = button.getAttribute('href');
            id = id[0] === '#' ? id.substr(1) : id;
            switch (id) {
                case 'prev':
                    this.slidePrev();
                    break;
                case 'next':
                    this.slideNext();
                    break;
                default:
                    break;
            }
        }
    }

    slidePrev = () => {
        let index = this.getPrevIndex();
        let { menu, content } = this.data[index];
        this.closeCurrent('prev');
        this.openNew(menu, content, 'prev');
    }

    slideNext = () => {
        let index = this.getNextIndex();
        let { menu, content } = this.data[index];
        this.closeCurrent();
        this.openNew(menu, content);
    }

    getPrevIndex = () => {
        let { menu } = this.getCurrentData();
        let index = 0;
        for(let i = 0; i < this.data.length; i++) {
            if(this.data[i].menu === menu) {
                index = i === 0 ? this.data.length-1 : i-1;
                break;
            }
        }
        return index;
    }

    getNextIndex = () => {
        let { menu } = this.getCurrentData();
        let index = 0;
        for(let i = 0; i < this.data.length; i++) {
            if(this.data[i].menu === menu) {
                index = i === this.data.length-1 ? 0 : i+1;
                break;
            }
        }
        return index;
    }

    getData = () => {
        return Object.values(this.menuItems).map(menuItem => {
            let id = menuItem.getAttribute('href');
            id = id[0] === '#' ? id.substr(1) : id;
            let content = Object.values(this.contentItems).find(contentItem => contentItem.getAttribute('data-tab') === id);
            return {
                menu: menuItem,
                content
            }
        })
    }

}
export default class Tooltip {

    constructor(component) {
        this.arrow_size = 10;
        this.root = document.getElementById('tooltip-root');
        this.left = 0;
        this.top = 0;
        this.position = 'top';
        this.duration = 300;
        this.frontend = component;
        this.active = false;
        this.event = component.getAttribute('event') || 'mousemove';
        this.positions = [
            'top', 'bottom', 'left', 'right', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight', 'leftTop', 'leftBottom', 'rightTop', 'rightBottom'
        ];
        this.init();
    }

    init = () => {
        window.addEventListener(this.event, this.trigger, false);
    }

    unmount = () => {
        this.close();
        window.removeEventListener(this.event, this.trigger, false);
    }

    getBackComponent = (component, targetClassName) => {
        for(let child of component.children) for(let classListItem of child.classList) if(classListItem === targetClassName) return child;
        return null; //There is no tooltipBack in HTML...
    }

    trigger = (e) => {
        const triggeredElement = e.target;
        if(triggeredElement === this.backend || this.isDescendant(this.backend, triggeredElement)) {
            //console.log('backend');
        } else if(triggeredElement === this.frontend || this.isDescendant(this.frontend, triggeredElement)) {
            if(this.active) {
                //console.log('frontend & active');
            } else {
                //console.log('frontend & NOT active');
                this.open();
            }
        } else {
            if(this.active) {
                //console.log('to close');
                this.close();
            }
        }
    }

    updatePositionClass = (newPosition) => {
        const classList = Object.values(this.backend.classList);
        for(let position of this.positions) {
            if(classList.find(item => item === `tooltipBack--${position}`)) {
                this.position = newPosition;
                this.backend.classList.remove(`tooltipBack--${position}`);
                this.backend.classList.add(`tooltipBack--${this.position}`);
                return;
            }
        }
    }

    updateDuration = (duration) => {
        this.backend.style.transitionDuration = `${duration/1000}s`;
        this.arrow.style.transitionDuration = `${duration/1000}s`;
    }

    open = () => {
        this.renderBack();
        this.active = true;
        setTimeout(() => {
            this.updateDuration(this.duration)
        }, this.duration);
        window.addEventListener('resize', this.setPosition, false);
        window.addEventListener('scroll', this.setPosition, false);
        this.setPosition();
    }

    close = () => {
        window.removeEventListener('resize', this.setPosition, false);
        window.removeEventListener('scroll', this.setPosition, false);
        this.active = false;
        this.updateDuration(0);
        this.root.removeChild(this.backend);
    }

    renderBack = () => {
        const backendNative = this.getBackComponent(this.frontend, 'tooltipBack');
        this.arrow = document.createElement('div');
            this.arrow.classList.add('tooltipBack-arrow');
        const closeButton = document.createElement('button');
            closeButton.innerText = 'Close';
            closeButton.onclick = this.close;
        const toolbar = document.createElement('div');
            toolbar.classList.add('tooltipBack-toolbar');
            toolbar.appendChild(closeButton);
        const content = document.createElement('div');
            content.classList.add('tooltipBack-content');
            content.innerHTML = backendNative.innerHTML;
        this.backend = backendNative.cloneNode(false);
        this.backend.classList.add(`tooltipBack--${this.position}`);
        this.backend.appendChild(toolbar);
        this.backend.appendChild(this.arrow);
        this.backend.appendChild(content);
        this.root.appendChild(this.backend);
    }

    setPosition = () => {
        const { left, top, position } = this.getPosition();
        this.backend.style.left = `${left}px`;
        this.backend.style.top = `${top}px`;
        this.updatePositionClass(position);
    }

    getPosition = () => {
        const frontRect = this.frontend.getBoundingClientRect();
        const backRect = this.backend.getBoundingClientRect();
        const clientLeft = 0,
              clientTop = 0,
              clientRight = window.innerWidth,
              clientBottom = window.innerHeight;
        const topLeftPointsCoords = this.getTopLeftPointsCoords(frontRect, backRect);
        for(let position in topLeftPointsCoords) {
            let rectangle = this.getRectangle(position, frontRect, backRect);
            if( (rectangle['topLeft'].left >= clientLeft && rectangle['bottomRight'].left <= clientRight) &&
                (rectangle['topLeft'].top >= clientTop && rectangle['bottomRight'].top <= clientBottom)
            ) {
                return {
                    left: topLeftPointsCoords[position].left,
                    top: topLeftPointsCoords[position].top,
                    position
                };
            }
        }
        const defaultPosition = 'top';
        return {
            left: topLeftPointsCoords[defaultPosition].left,
            top: topLeftPointsCoords[defaultPosition].top,
            position: defaultPosition
        };
    }

    isDescendant = (parent, child) => {
        let node = child.parentNode;
        while (node != null) {
            if (node === parent) {
                return true;
            }
            node = node.parentNode;
        }
        return false;
    }

    getTopLeftPointsCoords = (frontend, backend) => ({
        top: {
            left: frontend.left + frontend.width / 2 - backend.width / 2,
            top: frontend.top - backend.height - this.arrow_size,
        },
        bottom: {
            left: frontend.left + frontend.width / 2 - backend.width / 2,
            top: frontend.top + frontend.height + this.arrow_size,
        },
        left: {
            left: frontend.left - backend.width - this.arrow_size,
            top: frontend.top + frontend.height / 2 - backend.height / 2,
        },
        right: {
            left: frontend.left + frontend.width + this.arrow_size,
            top: frontend.top + frontend.height / 2 - backend.height / 2,
        },
        topRight: {
            left: frontend.left,
            top: frontend.top - backend.height - this.arrow_size,
        },
        bottomLeft: {
            left: frontend.left - backend.width + frontend.width,
            top: frontend.top + frontend.height + this.arrow_size,
        },
        leftTop: {
            left: frontend.left - backend.width - this.arrow_size,
            top: frontend.top + frontend.height - backend.height,
        },
        rightBottom: {
            left: frontend.left + frontend.width + this.arrow_size,
            top: frontend.top + frontend.height - backend.height,
        },
        leftBottom: {
            left: frontend.left - backend.width - this.arrow_size,
            top: frontend.top,
        },
        rightTop: {
            left: frontend.left + frontend.width + this.arrow_size,
            top: frontend.top,
        },
        topLeft: {
            left: frontend.left - backend.width + frontend.width,
            top: frontend.top - backend.height - this.arrow_size,
        },
        bottomRight: {
            left: frontend.left,
            top: frontend.top + frontend.height + this.arrow_size,
        },
    });

    getRectangle = (position, frontend, backend) => {
        const coords = this.getTopLeftPointsCoords(frontend, backend);
        return {
            topLeft: {
                left: coords[position].left,
                top: coords[position].top,
            },
            topRight: {
                left: coords[position].left + backend.width,
                top: coords[position].top,
            },
            bottomRight: {
                left: coords[position].left + backend.width,
                top: coords[position].top + backend.height,
            },
            bottomLeft: {
                left: coords[position].left,
                top: coords[position].top + backend.height,
            }
        }
    }

}
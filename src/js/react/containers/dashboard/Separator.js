import React, { Component } from 'react';

export default class extends Component {

    constructor(props) {
        super(props);
        this.start = 0;
        this.finish = 0;
        this.dir = this.props.type === 'col' ? 'clientX' : 'clientY';
    }

    state = {
        distance: 0
    }

    onMouseDown = (e) => {
        let value = e[this.dir];
        console.log('onMouseDown', value);
        this.start =  value;
        document.addEventListener('mouseup', this.onMouseUp, false);
        document.addEventListener('mousemove', this.onMouseMove, false);
    }

    onMouseUp = (e) => {
        document.removeEventListener('mouseup', this.onMouseUp, false);
        document.removeEventListener('mousemove', this.onMouseMove, false);
        this.props.setNewValue();
    }

    onMouseMove = (e) => {
        let value = e[this.dir];
        this.finish =  value;
        this.calculateDistance();
    }

    onDragStart = () => {
        console.log('gfds');
        return false;
    }

    calculateDistance = () => {
        let distance = this.finish - this.start;
        this.props.updateSize(distance);
        // this.setState(() => ({
        //     distance
        // }));
    }

    render() {
        // const { distance } = this.state;
        // console.log(distance);
        return(
            <div
                className="dashboardSeparator"
                onMouseDown={this.onMouseDown}
                onDragStart={this.onDragStart}
            >

            </div>
        )
    }
}
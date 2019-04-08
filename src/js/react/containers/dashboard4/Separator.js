import React, { Component } from 'react';

export default class extends Component {

    constructor(props) {
        super(props);
    }

    state = {

    }

    onMouseDown = (e) => {

        this.props.onMouseDown(e);
    }

    getSpaceProp = () => {
        const { style } = this.props;
        return Object.keys(style).find(item => item === 'left' || item === 'top');
    }

    render() {
        const { style, currentUnit } = this.props;
        //let spaceProp = this.getSpaceProp();
        //let superstyle = currentUnit ? {[spaceProp]: `${currentUnit}%`} : style;
        //console.log(currentUnit);

        return(
            <div
                className="dashboardSeparator"
                style={style}
                onMouseDown={this.onMouseDown}
            />
        )
    }
}
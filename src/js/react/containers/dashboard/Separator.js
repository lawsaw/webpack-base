import React, { Component } from 'react';

export default class extends Component {

    constructor(props) {
        super(props);
    }

    state = {

    }

    getSpaceProp = () => {
        const { style } = this.props;
        return Object.keys(style).find(item => item === 'left' || item === 'top');
    }

    render() {
        const { style, currentUnit } = this.props;
        let spaceProp = this.getSpaceProp();
        let superstyle = currentUnit ? {[spaceProp]: `${currentUnit}%`} : style;
        console.log(superstyle);
        return(
            <div
                className="dashboardSeparator"
                style={superstyle}
                onMouseDown={this.props.onMouseDown}
            />
        )
    }
}
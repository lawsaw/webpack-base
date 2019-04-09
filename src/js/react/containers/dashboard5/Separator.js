import React, { Component } from 'react';

export default class extends Component {

    onMouseDown = (e) => {
        this.props.onMouseDown(e);
    }

    render() {
        const { style } = this.props;
        return(
            <div
                className="dashboardSeparator"
                style={style}
                onMouseDown={this.onMouseDown}
            />
        )
    }
}
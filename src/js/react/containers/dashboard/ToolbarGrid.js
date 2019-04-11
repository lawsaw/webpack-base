import React, { Component } from 'react';

export default class extends Component {

    render() {
        const { index } = this.props;
        return(
            <div className="dashboardToolbar">
                <div className="dashboardToolbar-item" onClick={this.props.invertGrid}>invert</div>
            </div>
        )
    }
}
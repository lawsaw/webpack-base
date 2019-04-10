import React, { Component } from 'react';

export default class extends Component {

    render() {
        const { children } = this.props;
        return(
            <div className="dashboardBody">
                {children}
            </div>
        )
    }
}
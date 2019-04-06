import React, { Component } from 'react';

export default class extends Component {

    constructor(props) {
        super(props);
    }

    state = {

    }

    createHorizontal = () => {

    }

    render() {
        return(
            <div className="dashboardToolbar">
                <div className="dashboardToolbar-item">vertical</div>
                <div className="dashboardToolbar-item" onClick={this.createHorizontal}>horizontal</div>
                <div className="dashboardToolbar-item">close</div>
            </div>
        )
    }
}
import React, { Component } from 'react';

export default class extends Component {

    render() {
        const { index } = this.props;
        return(
            <div className="dashboardToolbar">
                <div className="dashboardToolbar-item" onClick={() => this.props.createGrid(index, 'col')}>col</div>
                <div className="dashboardToolbar-item" onClick={() => this.props.createGrid(index, 'row')}>row</div>
                <div className="dashboardToolbar-item" onClick={() => this.props.destroyGrid(index)}>close</div>
            </div>
        )
    }
}
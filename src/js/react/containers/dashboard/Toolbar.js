import React, { Component } from 'react';

export default class extends Component {

    constructor(props) {
        super(props);
    }

    state = {

    }

    createRow = () => {
        console.log('createRow');
        this.props.renderGrid('row', [<div>row-1</div>, <div>row-2</div>]);
    }

    createCol = () => {
        console.log('createCol')
        this.props.renderGrid('col', [<div>col-1</div>, <div>col-2</div>]);
    }

    gridClose = () => {
        console.log('gridClose')
        this.props.gridClose();
    }

    render() {
        return(
            <div className="dashboardToolbar">
                <div className="dashboardToolbar-item" onClick={this.createCol}>col</div>
                <div className="dashboardToolbar-item" onClick={this.createRow}>row</div>
                <div className="dashboardToolbar-item" onClick={this.gridClose}>close</div>
            </div>
        )
    }
}
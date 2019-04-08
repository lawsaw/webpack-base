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
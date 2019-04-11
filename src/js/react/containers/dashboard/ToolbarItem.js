import React, { Component } from 'react';

export default class extends Component {

    render() {
        const { index, childrenGridType } = this.props;
        console.log(childrenGridType);
        let col = <div className="dashboardToolbar-item" onClick={() => this.props.createGrid(index, 'col')}>col</div>;
        let row = <div className="dashboardToolbar-item" onClick={() => this.props.createGrid(index, 'row')}>row</div>;
        let x = <div className="dashboardToolbar-item" onClick={() => this.props.deleteGrid(index)}>del</div>;
        return (
            <div className="dashboardToolbar">
                {
                    childrenGridType ? (
                        <React.Fragment>
                            {childrenGridType === 'col' ? row : null}
                            {childrenGridType === 'row' ? col : null}
                        </React.Fragment>
                        ) : (
                        <React.Fragment>
                            {col}
                            {row}
                        </React.Fragment>
                    )
                }
                {x}
            </div>
        )
    }
}
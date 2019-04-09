import React, { Component } from 'react';
import cx from 'classnames';
import { Toolbar } from "./";

export default class extends Component {

    render() {
        const { style, refElem, index, children } = this.props;
        return(
            <div
                className={cx(`dashboardGrid-item`)}
                ref={refElem}
                style={style}
            >
                <React.Fragment>
                    <Toolbar
                        index={index}
                        createGrid={this.props.createGrid}
                        destroyGrid={this.props.destroyGrid}
                    />
                    {children}
                </React.Fragment>
            </div>
        )
    }
}
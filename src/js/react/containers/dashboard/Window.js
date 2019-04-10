import React, { Component } from 'react';
import cx from "classnames";

export default class extends Component {

    render() {
        const { children } = this.props;
        return (
            <div
                className={cx(`dashboardWindow`)}
                draggable={false}
            >
                {children}
            </div>
        )
    }
}
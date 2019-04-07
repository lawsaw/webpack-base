import React, { Component } from 'react';
import cx from 'classnames';
import { Window, Toolbar, Separator } from './';

export default class extends Component {

    constructor(props) {
        super(props);
    }

    static defaultProps = {

    }

    state = {

    }

    render() {
        const { style, refElem, children } = this.props;

        return(
            <div
                className={cx(`dashboardGrid-item`)}
                ref={refElem}
                style={style}
            >
                {children}
            </div>
        )
    }
}
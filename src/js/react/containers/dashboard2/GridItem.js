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
        const { isToolbar, isSeparator, size, children } = this.props;

        return(
            <div
                className={cx(`dashboardGrid-item`)}
                style={size}
            >
                {!isToolbar && <Toolbar />}
                {isSeparator && <Separator />}
                {
                    !isToolbar ? (
                        <Window>
                            {children}
                        </Window>
                    ) : children
                }
            </div>
        )
    }
}
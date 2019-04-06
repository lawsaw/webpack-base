import React, { Component } from 'react';
import cx from "classnames";

export default class extends Component {

    constructor(props) {
        super(props);
    }

    state = {

    }

    render() {
        return(
            <div className={cx(`dashboardWindow`)} draggable={false}>
                {this.props.children}
            </div>
        )
    }
}
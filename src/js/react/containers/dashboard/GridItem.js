import React, { Component } from 'react';
import cx from 'classnames';
import { Toolbar, Window } from "./";

export default class extends Component {

    render() {
        const { style, refElem, index, children } = this.props;
        return(
            <div
                className={cx(`dashboardGridItem`)}
                ref={refElem}
                style={style}
            >
                <React.Fragment>
                    <Toolbar
                        index={index}
                        createGrid={this.props.createGrid}
                        invertGrid={this.props.invertGrid}
                    />
                    <Window>
                        {children}
                    </Window>
                </React.Fragment>
            </div>
        )
    }
}
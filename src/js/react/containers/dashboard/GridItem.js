import React, { Component } from 'react';
import cx from 'classnames';
import { ToolbarItem, Window } from "./";

export default class extends Component {

    render() {
        const { style, refElem, index, childrenGridType, children } = this.props;
        return(
            <div
                className={cx(`dashboardGridItem`)}
                ref={refElem}
                style={style}
            >
                <React.Fragment>
                    <ToolbarItem
                        index={index}
                        createGrid={this.props.createGrid}
                        invertGrid={this.props.invertGrid}
                        deleteGrid={this.props.deleteGrid}
                        childrenGridType={childrenGridType}
                    />
                    <Window>
                        {children}
                    </Window>
                </React.Fragment>
            </div>
        )
    }
}
import React, { Component } from 'react';
import cx from 'classnames';

export default class extends Component {

    render() {
        const { style, refElem, index, children } = this.props;
        const { data } = this.state;
        return(
            <div
                className={cx(`dashboardGrid-item`)}
                ref={refElem}
                style={style}
            >
                <React.Fragment>
                    <Toolbar
                        index={index}
                        createGrid={this.createGrid}
                        destroyGrid={this.props.destroyGrid}
                    />
                    {children}
                </React.Fragment>
            </div>
        )
    }
}
import React, { Component } from 'react';
import cx from 'classnames';
import { Window, Toolbar, Separator } from './';

export default class extends Component {

    constructor(props) {
        super(props);
        //this.gridItem = React.createRef();
    }

    static defaultProps = {

    }

    state = {
        data: false
    }

    renderGrid = (type, content) => {
        this.setState(() => ({
            data: true
        }))
        this.type = type;
        this.content = content;

    }

    gridClose = () => {
        this.setState(() => ({
            data: false
        }))
    }

    updateSize = (distance) => {
        this.props.updateSize(distance);
    }

    render() {
        const { isToolbar, isSeparator, sizeStyle, type, refElem, children } = this.props;
        const { data } = this.state;
        let content = data && this.props.renderGrid(this.type, this.content);
        return(
            <div
                className={cx(`dashboardGrid-item`)}
                style={sizeStyle}
                ref={refElem}
                draggable={false}
            >
                {!data && <Toolbar
                    renderGrid={this.renderGrid}
                    gridClose={this.gridClose}
                />}
                {
                    isSeparator && <Separator
                        updateSize={this.updateSize}
                        setNewValue={this.props.setNewValue}
                        type={type}
                    />
                }

                {
                    data ? content : <Window>
                        {children}
                    </Window>
                }
            </div>
        )
    }
}
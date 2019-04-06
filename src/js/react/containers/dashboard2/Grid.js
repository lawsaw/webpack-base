import React, { Component } from 'react';
import cx from 'classnames';
import { GridItem } from './';
import { isReactComponent, isElement } from '../../helpers'

export default class Grid extends Component {

    constructor(props) {
        super(props);
    }

    static defaultProps = {
        type: 'col', //col
        content: [1, 2],
        size: 50
    }

    state = {

    }

    isNewGrid = (element) => {
        //return isElement(element) && element.type === Grid;
        return element.type && element.content;
    }

    getSizePart = () => {
        const { content, size } = this.props;
        return [
            size, 100 - size
        ]
    }

    getPart = () => {
        const { content, size } = this.props;
        let parts = content.length;
        return 100 / parts;
    }

    setPosition = (index) => {
        const { type, size } = this.props;
        let part = index === 0 ? size : 100 - size;
        let style = {};
        switch (type) {
            case 'col':
                style.width = `${part}%`;
                break;
            case 'row':
                style.height = `${part}%`;
                break;
            default:
                break;
        }
        return style;
    }

    render() {
        const { type, content } = this.props;
        return (
            <div className={cx(`dashboardGrid`, content.length > 1 && `dashboardGrid--${type}`)}>
                {
                    content.map((item, index, arr) => {
                        let isNewGrid = this.isNewGrid(item);
                        return (
                            <React.Fragment
                                key={index}
                            >
                                <GridItem
                                    key={index}
                                    isToolbar={isNewGrid}
                                    isSeparator={arr[index+1]}
                                    size={this.setPosition(index)}
                                >
                                    {
                                        isNewGrid ? this.props.renderGrid(item.type, item.content, item.size) : item
                                    }
                                </GridItem>
                            </React.Fragment>
                        )
                    })
                }
            </div>
        )
    }
}
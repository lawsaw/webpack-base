import React, { Component } from 'react';
import cx from 'classnames';
import { GridItem } from './';
import { isReactComponent, isElement } from '../../helpers'
import { cloneDeep } from 'lodash';

export default class Grid extends Component {

    constructor(props) {
        super(props);
        this.gridItems = [];
        this.clone = 0;
        this.gridItems = [];
        this.state = {
            size: 50,
        }
    }

    static defaultProps = {

    }

    updateSize = (distance) => {
        const { type } = this.props;
        const { size } = this.state;
        let { width, height } = this.gridItems[0].current.getBoundingClientRect();
        let newValue = this.pizda(distance, size, type === 'col' ? width : height);
        console.log(newValue, distance);
        this.clone = newValue;
        this.setState(() => ({
            size: this.clone
        }))
    }

    setNewValue = () => {
        console.log('setNewValue');
        // this.setState(() => ({
        //     size: this.clone
        // }))
    }

    pizda = (distance, size, realSize) => {
        let res;
        res = size + distance * size / realSize;
        if(distance < 0) {
            res = res <= 5 ? 5 : res;
        } else if(distance > 0) {
            res = res >= 95 ? 95 : res;
        } else {
            res = size;
        }
        return res;
    }

    getUpdatedValue = () => {
        console.log('getUpdatedValue');
    }

    setValueRound = (value, max) => {

    }

    addMeters = (size) => {
        const { type } = this.props;
        let style = {};
        switch (type) {
            case 'col':
                style.width = `${size}%`;
                break;
            case 'row':
                style.height = `${size}%`;
                break;
        }
        return style;
    }

    generateSize = () => {
        const { content } = this.props;
        const { size } = this.state;
        return content.length > 1 ? [
            size,
            100 - size
        ] : [
            100
        ]
    }

    render() {
        const { type, content } = this.props;
        let sizes = this.generateSize();
        return (
            <div
                className={cx(`dashboardGrid`, content.length > 0 && `dashboardGrid--${type}`)}
                draggable={false}
            >
                {
                    content.map((item, index) => {
                        let sizeStyle = this.addMeters(sizes[index]);
                        this.gridItems[index] = React.createRef();
                        return (
                            <GridItem
                                key={index}
                                index={index}
                                type={type}
                                sizeStyle={sizeStyle}
                                isSeparator={sizes[index+1]}
                                updateSize={this.updateSize}
                                refElem={this.gridItems[index]}
                                setNewValue={this.setNewValue}
                                renderGrid={this.props.renderGrid}
                            >
                                {item}
                            </GridItem>
                        )
                    })
                }
            </div>
        )
    }
}
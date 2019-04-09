import React, { Component } from 'react';
import cx from "classnames";
import { cloneDeep, isEqual } from 'lodash';
import { GridItem, Separator } from "./";

export default class extends Component {

    constructor(props) {
        super(props);
        this.dataContent = this.updateData();
        this.itemRef = [];
        this.resizeLimits = {start: 0, finish: 0};
        this.limit = {
            absolute: 0,
            relative: 30,
        };
        this.tempData = {};
        this.onMouseDownEvent = () => {};
        this.onMouseUpEvent = () => {};
        this.onMouseMoveEvent = () => {};
        this.mouseDirection = this.props.type === 'col' ? 'clientX' : 'clientY';
        this.state = {
            blocks: this.props.blocks,
            dataSize: this.props.getDefaultSize(this.dataContent),
            currentDelta: {index: 0, delta: 0}
        }
    }

    updateData = () => {
        const { blocks } = this.props;
        let dataContent = {};
        for(let i = 0; i < blocks; i++) {
            dataContent[i] = this.dataContent ? this.dataContent[i] ? this.dataContent[i] : null : null;
        }
        return dataContent;
    }

    onMouseDown = (e, index) => {
        this.resizeLimits.start =  e[this.mouseDirection];
        //console.log(index, this.startResizePoint);
        this.onMouseUpEvent = event => this.onMouseUp(event, index);
        this.onMouseMoveEvent = event => this.onMouseMove(event, index);
        document.addEventListener('mouseup', this.onMouseUpEvent, false);
        document.addEventListener('mousemove', this.onMouseMoveEvent, false);
        e.preventDefault();
        return false;
    }

    onMouseUp = (e, index) => {
        console.log('onMouseUp');
        document.removeEventListener('mouseup', this.onMouseUpEvent, false);
        document.removeEventListener('mousemove', this.onMouseMoveEvent, false);
        this.dataResize();
        e.preventDefault();
        return false;
    }

    onMouseMove = (e, index) => {
        this.resizeLimits.finish =  e[this.mouseDirection];
        //this.calculate(index);
        const { type } = this.props;
        const { dataSize, currentDelta } = this.state;
        let tempData = this.props.calculate(
            index,
            type,
            dataSize,
            this.resizeLimits,
            this.limit,
            this.itemRef[index],
            this.itemRef[index+1]
        );
        if(this.tempData.value !== tempData.value) {
            this.tempData = tempData;
            console.log(this.tempData);
            this.setState(() => ({
                currentDelta: {
                    index,
                    delta: tempData.delta,
                }
            }))
        }
    }

    dataResize = () => {
        if(!isEqual(this.state.dataSize, this.tempData.dataSize)) {
            this.setState(() => ({
                dataSize: this.tempData.dataSize,
                currentDelta: {}
            }))
        }
    }

    createGrid = (index, type) => {
        console.log(index, type);
    }

    destroyGrid = (index) => {
        console.log(index);
    }

    render() {
        const { type } = this.props;
        const { dataSize, currentDelta } = this.state;
        let dataContentArray = Object.keys(this.dataContent);
        return (
            <div
                className={cx(
                    `dashboardGrid`,
                    `dashboardGrid--${type}`
                )}
            >
                {
                    dataContentArray.map((item, index) => {
                        let { item: itemStyle, separator: separatorStyle } = this.props.getStyle(index, type, dataSize, currentDelta);
                        this.itemRef[index] = React.createRef();
                        return (
                            <React.Fragment
                                key={index}>
                                <GridItem
                                    index={index}
                                    style={itemStyle}
                                    children={this.dataContent[item]}
                                    refElem={this.itemRef[index]}
                                    createGrid={this.createGrid}
                                    destroyGrid={this.destroyGrid}
                                />
                                {
                                    dataContentArray[index+1] && <Separator
                                        style={separatorStyle}
                                        onMouseDown={e => this.onMouseDown(e, index)}
                                    />
                                }
                            </React.Fragment>
                        )
                    })
                }
            </div>
        )
    }
}
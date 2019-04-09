import React, { Component } from 'react';
import cx from "classnames";
import { cloneDeep, isEqual } from 'lodash';
import { GridItem, Separator } from "../dashboard4";

export default class extends Component {

    constructor(props) {
        super(props);
        this.dataContent = this.getCleanData();
        this.itemRef = [];
        this.clientDirection = this.props.type === 'col' ? 'clientX' : 'clientY';
        this.onMouseDownEvent = null;
        this.onMouseUpEvent = null;
        this.onMouseMoveEvent = null;
        this.state = {
            dataSize: this.getDefaultSize()
        }
    }

    componentDidMount() {}

    getCleanData = () => {
        const { blocks } = this.props;
        let data = {};
        for(let i = 0; i < blocks; i++) {
            data[i] = null
        }
        return data;
    }

    getDefaultSize = () => {
        let dataArr = Object.keys(this.dataContent);
        let defaultSize = {};
        let size = 100 / dataArr.length;
        dataArr.forEach((item, index) => {
            defaultSize[index] = {
                size,
                space: size * index
            }
        })
        return defaultSize;
    }

    getStyle = (index) => {
        const { type } = this.props;
        const { dataSize } = this.state;
        let style = {item: {}, separator: {}};
        switch (type) {
            case 'col':
                style.item.width = `${dataSize[index].size}%`;
                style.item.left = `${dataSize[index].space}%`;
                style.separator.left = `${dataSize[index].size + dataSize[index].space}%`;
                break;
            case 'row':
                style.item.height = `${dataSize[index].size}%`;
                style.item.top = `${dataSize[index].space}%`;
                style.separator.top = `${dataSize[index].size + dataSize[index].space}%`;
                break;
            default:
                style.item.left = `0%`;
                style.item.top = `0%`;
                style.item.width = `100%`;
                style.item.height = `100%`;
                break;
        }
        return style;
    }

    onMouseDown = (e, index) => {
        this.startResizePoint =  e[this.clientDirection];
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
        e.preventDefault();
        return false;
    }

    onMouseMove = (e, index) => {
        this.finishResizePoint =  e[this.clientDirection];
        this.calculate(index);
    }

    calculate = (index) => {
        const { dataSize } = this.state;
        const { type } = this.props;
        let cloneDataContent = cloneDeep(dataSize);
        let { size: sizePrev, space:spacePrev } = cloneDataContent[index];
        let { size: sizeNext, space:spaceNext } = cloneDataContent[index+1];
        let { width: widthRealPrev, left:leftRealPrev, height:heightRealPrev, top:topRealPrev } = this.itemRef[index].current.getBoundingClientRect();
        let { width: widthRealNext, left:leftRealNext, height:heightRealNext, top:topRealNext } = this.itemRef[index+1].current.getBoundingClientRect();
        let distance = this.finishResizePoint - this.startResizePoint;
        //console.log(widthRealPrev, leftRealPrev, widthRealNext, leftRealNext);
        // console.log(widthRealNext, leftRealNext);
        // console.log(index, sizePrev, spacePrev, sizeNext, spaceNext, distance);
        let max,
            unit,
            delta,
            value = Math.abs(distance),
            realDelta = 0;
        if(distance < 0) {
            max = type == 'col' ? widthRealPrev : heightRealPrev;
            delta = value * sizePrev / max;
            delta = delta > sizePrev-this.limit ? sizePrev-this.limit : delta;
            unit = sizePrev - delta;
            cloneDataContent[index].size = unit;
            cloneDataContent[index+1].size = sizeNext + delta;
            cloneDataContent[index+1].space = unit + spacePrev;
            realDelta = -delta;
        } else {
            max = type == 'col' ? widthRealNext : heightRealNext;
            delta = value * sizeNext / max;
            delta = delta > sizeNext-this.limit ? sizeNext-this.limit : delta;
            unit = sizePrev + delta;
            cloneDataContent[index].size = unit;
            cloneDataContent[index+1].space = spaceNext + delta;
            cloneDataContent[index+1].size = sizeNext - delta;
            realDelta = delta;
        }

        console.log(unit);

        // if(currentDelta.delta !== realDelta) {
        //     console.log(unit, realDelta);
        //     this.tempData = cloneDataContent;
        //     this.setState(() => ({
        //         currentDelta: {
        //             index,
        //             delta: realDelta,
        //         }
        //     }))
        // }
    }

    render() {
        const { type } = this.props;
        let dataArr = Object.keys(this.dataContent);
        return (
            <div
                className={cx(
                    `dashboardGrid`,
                    `dashboardGrid--${type}`
                )}
            >
                {
                    dataArr.map((item, index) => {
                        let { item: itemStyle, separator: separatorStyle } = this.getStyle(index);
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
                                    dataArr[index+1] && <Separator
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
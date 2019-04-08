import React, { Component } from 'react';
import { GridItem, Separator } from './';
import cx from "classnames";
import { cloneDeep, isEqual } from 'lodash';

export default class extends Component {

    constructor(props) {
        super(props);
        this.onMouseDownEvent = null;
        this.onMouseUpEvent = null;
        this.onMouseMoveEvent = null;
        this.itemRef = [];
        this.limit = 5;
        this.tempData = [];
        this.tempUnit = null;
        this.lock = false;
        this.timer = false;
        this.clientDirection = this.props.type === 'col' ? 'clientX' : 'clientY';
        this.state = {
            dataContent: this.getDefaultData(),
            currentDelta: {}
        }
    }

    static defaultProps = {
        type: 'col',
        content: [1,2,3]
    }

    componentDidMount = () => {
        //console.log('fsdf')
    }

    getDefaultData = () => {
        const { content } = this.props;
        let defaultData = {};
        let size = 100 / content.length;
        content.forEach((item, index) => {
            defaultData[index] = {
                size,
                space: size * index
            }
        })
        return defaultData;
    }

    setDefaultData = () => {
        let defaultData = this.getDefaultData();
        this.state(() => ({
            dataContent: defaultData
        }))
    }

    getStyle = (index) => {
        const { type } = this.props;
        const { dataContent, currentDelta } = this.state;
        let style = {item: {}, separator: {}};
        let { index:activeIndex, delta:activeDelta } = currentDelta;
        switch (type) {
            case 'col':
            default:
                style.item.width = `${dataContent[index].size}%`;
                style.item.left = `${dataContent[index].space}%`;
                style.separator.left = `${dataContent[index].size + dataContent[index].space + (activeIndex === index ? activeDelta : 0)}%`;
                break;
            case 'row':
                style.item.height = `${dataContent[index].size}%`;
                style.item.top = `${dataContent[index].space}%`;
                style.separator.top = `${dataContent[index].size + dataContent[index].space + (activeIndex === index ? activeDelta : 0)}%`;
                break
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

        // this.timer = setInterval(() => {
        //     this.lock = !this.lock
        // }, 750);

        e.preventDefault();
        return false;
    }

    onMouseUp = (e, index) => {
        console.log('onMouseUp');
        //this.finishResizePoint =  e[this.clientDirection];
        //console.log(index, this.finishResizePoint);
        document.removeEventListener('mouseup', this.onMouseUpEvent, false);
        document.removeEventListener('mousemove', this.onMouseMoveEvent, false);
        //clearInterval(this.timer);
        this.dataUpdate();
        e.preventDefault();
        return false;
    }

    onMouseMove = (e, index) => {
        //if(this.startResizePoint - e.clientX > 20) {
            this.finishResizePoint =  e[this.clientDirection];
            this.calculate(index);
       // }

        //console.log(index, this.finishResizePoint);
        //if(!this.lock) {

       //}
    }



    calculate = (index) => {
        const { dataContent, currentDelta } = this.state;
        const { type } = this.props;
        let cloneDataContent = cloneDeep(dataContent);
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

        if(currentDelta.delta !== realDelta) {
            console.log(unit, realDelta);
            this.tempData = cloneDataContent;
            this.setState(() => ({
                currentDelta: {
                    index,
                    delta: realDelta,
                }
            }))
            //console.log(this.state.currentDelta);

            //this.dataUpdate();
            //this.tempData = cloneDataContent;
        }




    }

    dataUpdate = () => {
        if(!isEqual(this.state.dataContent, this.tempData)) {
            this.setState(() => ({
                dataContent: this.tempData,
                currentDelta: {}
            }))
        }
    }

    render() {
        const { type, content } = this.props;
        const { currentDelta } = this.state;
        //console.log(currentDelta);
        return(
            <div
                className={cx(
                    `dashboardGrid`,
                    content.length > 1 && `dashboardGrid--${type}`
                )}
            >
                {
                    content.map((item, index) => {
                        let { item: itemStyle, separator: separatorStyle } = this.getStyle(index);
                        this.itemRef[index] = React.createRef();
                        let { index:activeIndex, delta:activeDelta } = currentDelta;
                        return (
                            <React.Fragment
                                key={index}>
                                <GridItem
                                    style={itemStyle}
                                    children={item}
                                    refElem={this.itemRef[index]}
                                />
                                {
                                    content[index+1] && <Separator
                                        style={separatorStyle}
                                        onMouseDown={e => this.onMouseDown(e, index)}
                                        currentDelta={activeIndex === index && currentDelta}
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
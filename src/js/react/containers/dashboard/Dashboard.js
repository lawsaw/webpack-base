import React, { Component } from 'react';
import { Window, Grid } from './';
import { cloneDeep } from "lodash";

export default class extends Component {

    renderGrid = (type, blocks) => {
        return(
            <Grid
                type={type}
                blocks={blocks}
                renderGrid={this.renderGrid}
                getDefaultSize={this.getDefaultSize}
                getStyle={this.getStyle}
                calculate={this.calculate}
            />
        )
    }

    getDefaultSize = (dataContent) => {
        let dataArr = Object.keys(dataContent);
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

    getStyle = (index, type, dataSize, currentDelta) => {
        let style = {item: {}, separator: {}};
        let { index: activeIndex, delta: activeDelta } = currentDelta;
        switch (type) {
            case 'col':
                style.item.width = `${dataSize[index].size}%`;
                style.item.left = `${dataSize[index].space}%`;
                style.separator.left = `${dataSize[index].size + dataSize[index].space + (activeIndex === index ? activeDelta : 0)}%`;
                break;
            case 'row':
                style.item.height = `${dataSize[index].size}%`;
                style.item.top = `${dataSize[index].space}%`;
                style.separator.top = `${dataSize[index].size + dataSize[index].space + (activeIndex === index ? activeDelta : 0)}%`;
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

    calculate = (index, type, dataSize, resizeLimits, limit, itemRefPrev, itemRefNext) => {
        let cloneDataSize = cloneDeep(dataSize);
        let { size: sizePrev, space:spacePrev } = cloneDataSize[index];
        let { size: sizeNext, space:spaceNext } = cloneDataSize[index+1];
        let { width: widthRealPrev, left:leftRealPrev, height:heightRealPrev, top:topRealPrev } = itemRefPrev.current.getBoundingClientRect();
        let { width: widthRealNext, left:leftRealNext, height:heightRealNext, top:topRealNext } = itemRefNext.current.getBoundingClientRect();
        let distance = resizeLimits.finish - resizeLimits.start;
        let max,
            unit,
            delta,
            value = Math.abs(distance),
            realDelta = 0;
        if(distance < 0) {
            max = type == 'col' ? widthRealPrev : heightRealPrev;
            value = max - value < limit.relative ? max - limit.relative : value;
            delta = value * sizePrev / max;
            delta = delta > sizePrev-limit.absolute ? sizePrev-limit.absolute : delta;
            unit = sizePrev - delta;
            cloneDataSize[index].size = unit;
            cloneDataSize[index+1].size = sizeNext + delta;
            cloneDataSize[index+1].space = unit + spacePrev;
            realDelta = -delta;
        } else {
            max = type == 'col' ? widthRealNext : heightRealNext;
            value = max - value < limit.relative ? max - limit.relative : value;
            delta = value * sizeNext / max;
            delta = delta > sizeNext-limit.absolute ? sizeNext-limit.absolute : delta;
            unit = sizePrev + delta;
            cloneDataSize[index].size = unit;
            cloneDataSize[index+1].space = spaceNext + delta;
            cloneDataSize[index+1].size = sizeNext - delta;
            realDelta = delta;
        }
        return {
            index,
            max,
            value,
            unit,
            delta: realDelta,
            dataSize: cloneDataSize
        }
    }

    render() {
        let grid = this.renderGrid('col', 2);
        return(
            <div className="dashboard">
                {grid}
            </div>
        )
    }
}
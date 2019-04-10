import React, { Component } from 'react';
import { Window, Grid } from './';
import { cloneDeep } from "lodash";

export default class extends Component {

    renderGrid = (type, blocks, content) => {
        return(
            <Grid
                type={type}
                blocks={blocks}
                content={content}
                renderGrid={this.renderGrid}
                getDefaultSize={this.getDefaultSize}
                getStyle={this.getStyle}
                calculate={this.calculate}
            />
        )
    }

    getDefaultSize = (dataContent) => {
        let defaultSize = {};
        let size = 100 / dataContent.length;
        dataContent.forEach((item, index) => {
            defaultSize[index] = {
                size,
                space: size * index
            }
        });
        return defaultSize;
    }

    getStyle = (index, type, dataSize, current) => {
        let style = {item: {}, separator: {}};
        let { index: currentIndex, delta: currentDelta } = current;
        switch (type) {
            case 'col':
                style.item.width = `${dataSize[index].size}%`;
                style.item.left = `${dataSize[index].space}%`;
                style.separator.left = `${dataSize[index].size + dataSize[index].space + (currentIndex === index ? currentDelta : 0)}%`;
                break;
            case 'row':
                style.item.height = `${dataSize[index].size}%`;
                style.item.top = `${dataSize[index].space}%`;
                style.separator.top = `${dataSize[index].size + dataSize[index].space + (currentIndex === index ? currentDelta : 0)}%`;
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
            value,
            delta,
            deltaAbsolute = Math.abs(distance),
            deltaRelative = 0;
        if(distance < 0) {
            max = type == 'col' ? widthRealPrev : heightRealPrev;
            deltaAbsolute = max - deltaAbsolute < limit.relative ? max - limit.relative : deltaAbsolute;
            delta = deltaAbsolute * sizePrev / max;
            delta = delta > sizePrev-limit.absolute ? sizePrev-limit.absolute : delta;
            value = sizePrev - delta;
            cloneDataSize[index].size = value;
            cloneDataSize[index+1].size = sizeNext + delta;
            cloneDataSize[index+1].space = value + spacePrev;
            deltaRelative = -delta;
        } else {
            max = type == 'col' ? widthRealNext : heightRealNext;
            deltaAbsolute = max - deltaAbsolute < limit.relative ? max - limit.relative : deltaAbsolute;
            delta = deltaAbsolute * sizeNext / max;
            delta = delta > sizeNext-limit.absolute ? sizeNext-limit.absolute : delta;
            value = sizePrev + delta;
            cloneDataSize[index].size = value;
            cloneDataSize[index+1].space = spaceNext + delta;
            cloneDataSize[index+1].size = sizeNext - delta;
            deltaRelative = delta;
        }
        return {
            index,
            max,
            deltaAbsolute,
            deltaRelative,
            value,
            dataSize: cloneDataSize
        }
    }

    render() {
        let grid = this.renderGrid('col', 1, [null]);
        return(
            <div className="dashboard">
                {grid}
            </div>
        )
    }
}
import React, { Component } from 'react';
import cx from "classnames";
import { cloneDeep, isEqual, isUndefined } from 'lodash';
import { GridItem, Separator, ToolbarGrid, ToolbarItem, Body, Grid } from "./";

export default class extends Component {

    constructor(props) {
        super(props);
        this.dataContent = this.props.content;
        this.itemRef = [];
        this.resizeLimits = {start: 0, finish: 0};
        this.limit = {
            absolute: 0,
            relative: 50,
        };
        this.tempData = {};
        this.onMouseDownEvent = () => {};
        this.onMouseUpEvent = () => {};
        this.onMouseMoveEvent = () => {};
        //this.mouseDirection = this.props.type === 'col' ? 'clientX' : 'clientY';
        this.state = {
            type: this.props.type,
            mouseDirection: this.props.type === 'col' ? 'clientX' : 'clientY',
            current: {index: 0, delta: 0},
            dataSize: this.props.getDefaultSize(this.dataContent),
            refresh: true
        }
    }

    componentDidMount() {
        // this.setState(() => ({
        //     dataSize: this.props.getDefaultSize(this.dataContent2),
        // }))
    }

    componentDidUpdate(pr, st) {

    }

    refresh = () => {
        this.setState(() => ({
            refresh: !this.state.refresh
        }))
    }

    onMouseDown = (e, index) => {
        const { mouseDirection } = this.state;
        this.resizeLimits.start =  e[mouseDirection];
        //console.log(index, this.startResizePoint);
        this.onMouseUpEvent = event => this.onMouseUp(event, index);
        this.onMouseMoveEvent = event => this.onMouseMove(event, index);
        document.addEventListener('mouseup', this.onMouseUpEvent, false);
        document.addEventListener('mousemove', this.onMouseMoveEvent, false);
        e.preventDefault();
        return false;
    }

    onMouseUp = (e, index) => {
        //console.log('onMouseUp');
        document.removeEventListener('mouseup', this.onMouseUpEvent, false);
        document.removeEventListener('mousemove', this.onMouseMoveEvent, false);
        this.dataResize();
        e.preventDefault();
        return false;
    }

    onMouseMove = (e, index) => {
        const { mouseDirection } = this.state;
        this.resizeLimits.finish =  e[mouseDirection];
        //this.calculate(index);
        const { type } = this.state;
        const { dataSize, current } = this.state;
        let tempData = this.props.calculate(
            index,
            type,
            dataSize,
            this.resizeLimits,
            this.limit,
            this.itemRef[index],
            this.itemRef[index+1]
        );
        if(this.tempData.deltaAbsolute !== tempData.deltaAbsolute) {
            this.tempData = tempData;
            //console.log(this.tempData);
            this.setState(() => ({
                current: {
                    index,
                    delta: tempData.deltaRelative,
                }
            }))
        }
    }

    dataResize = () => {
        if(!isEqual(this.state.dataSize, this.tempData.dataSize)) {
            this.setState(() => ({
                dataSize: this.tempData.dataSize,
                current: {}
            }))
        }
    }

    createGrid = (position, type) => {
        //console.log(position, type);

        if(this.dataContent.length <= 1) {
            this.dataContent.splice(position+1, 0, null);
            let defaultSize = this.props.getDefaultSize(this.dataContent);
            this.setState(() => ({
                type,
                mouseDirection: type === 'col' ? 'clientX' : 'clientY',
                dataSize: defaultSize
            }))
            console.log('111');
        } else {
            if(type === this.state.type) {
                this.dataContent.splice(position+1, 0, null);
                let defaultSize = this.props.getDefaultSize(this.dataContent);
                this.setState(() => ({
                    dataSize: defaultSize
                }));
                console.log('222');
            } else {
                if(this.dataContent[position] && this.dataContent[position].type === <Grid />.type) {
                    console.log('stop');
                    // this.dataContent.splice(position+1, 0, 'dfsdsfds');
                    // let defaultSize = this.props.getDefaultSize(this.dataContent);
                    // this.setState(() => ({
                    //     dataSize: defaultSize
                    // }));
                } else {
                    let grid = this.props.renderGrid(type, [this.dataContent[position], 'NEW']);
                    this.dataContent[position] = grid;
                    console.log('333');
                    this.refresh();
                }

            }
        }

        // this.dataContent.splice(position+1, 0, null);
        //
        // let grid = this.props.renderGrid(type, 1, [this.dataContent[position], 'NEW']);
        // //this.dataContent[position] = grid;
        // let defaultSize = this.props.getDefaultSize(this.dataContent);
        // this.setState(() => ({
        //     type,
        //     mouseDirection: type === 'col' ? 'clientX' : 'clientY',
        //     dataSize: defaultSize
        // }))

    }

    deleteGrid = (index) => {
        //console.log(`delete ${index}`);
        this.dataContent.splice(index, 1);
        let defaultSize = this.props.getDefaultSize(this.dataContent);
        this.setState(() => ({
            dataSize: defaultSize
        }));
    }

    invertGrid = () => {
        this.setState(() => ({
            type: this.state.type === 'col' ? 'row' : 'col',
            mouseDirection: this.state.type === 'row' ? 'clientX' : 'clientY',
        }))
    }

    render() {
        //const { type } = this.state;
        const { dataSize, current, type } = this.state;
        //let dataContentArray = Object.keys(this.dataContent);

        // console.log(this.dataContent);
        console.log(this);


        return (this.dataContent.length > 1) && (
            <div
                className={cx(
                    `dashboardGrid`,
                    `dashboardGrid--${type}`
                )}
            >
                {
                    this.dataContent.length > 1 && <ToolbarGrid
                        invertGrid={this.invertGrid}
                    />
                }
                <Body>
                    {
                        this.dataContent.map((item, index) => {
                            let { item: itemStyle, separator: separatorStyle } = this.props.getStyle(index, type, dataSize, current);
                            this.itemRef[index] = React.createRef();
                            let childrenGridType = null;
                            if(this.dataContent[index] && this.dataContent[index].type === <Grid />.type) {
                                childrenGridType = this.dataContent[index].props.type;
                            }  else {
                                childrenGridType = null;
                            }

                            return (
                                <React.Fragment
                                    key={index}
                                >
                                    <GridItem
                                        index={index}
                                        style={itemStyle}
                                        children={item}
                                        refElem={this.itemRef[index]}
                                        createGrid={this.createGrid}
                                        invertGrid={this.invertGrid}
                                        deleteGrid={this.deleteGrid}
                                        childrenGridType={childrenGridType}
                                    />
                                    {
                                        !isUndefined(this.dataContent[index+1]) && <Separator
                                            style={separatorStyle}
                                            onMouseDown={e => this.onMouseDown(e, index)}
                                        />
                                    }
                                </React.Fragment>
                            )
                        })
                    }
                </Body>
            </div>
        )
    }
}
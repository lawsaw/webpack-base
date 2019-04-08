import React, { Component } from 'react';
import cx from 'classnames';
import {Window, Toolbar, Separator, Grid} from './';

export default class extends Component {

    constructor(props) {
        super(props);
    }

    static defaultProps = {

    }

    state = {
        data: false
    }

    createGrid = (index, type) => {
        console.log(index, type);
        const { content } = this.props;
        this.type = type;
        this.setState(() => ({
            data: true
        }))
        // return <Grid
        //     type={type}
        //     content={[
        //         content[0],
        //         2
        //     ]}
        // />
    }

    render() {
        const { style, refElem, index, children } = this.props;
        const { data } = this.state;
        return(
            <div
                className={cx(`dashboardGrid-item`)}
                ref={refElem}
                style={style}
            >
                {
                    data ? <Grid
                        type={this.type}
                        content={[
                            children,
                            2
                        ]}
                    /> : (
                        <React.Fragment>
                            <Toolbar
                                index={index}
                                createGrid={this.createGrid}
                                destroyGrid={this.props.destroyGrid}
                            />
                            {children}
                        </React.Fragment>
                    )
                }
            </div>
        )
    }
}
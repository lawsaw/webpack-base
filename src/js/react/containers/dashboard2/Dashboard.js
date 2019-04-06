import React, { Component } from 'react';

import { Window, Grid } from './';

export default class extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        data: {
            type: 'col',
            size: 30,
            content: [
                1,
                {
                    type: 'row',
                    size: 35,
                    content: [
                        {
                            type: 'col',
                            size: 80,
                            content: [
                                {
                                    type: 'col',
                                    content: [
                                        1,
                                        5
                                    ]
                                },
                                5
                            ]
                        },
                        5
                    ]
                }
            ]
        }
    }

    renderGrid = (type, content, size) => {
        return <Grid
            type={type}
            content={content}
            size={size}
            renderGrid={this.renderGrid}
        />
    }

    render() {
        const { data } = this.state;
        let grid = this.renderGrid(data.type, data.content, data.size);
        return(
            <div className="dashboard">
                {grid}
            </div>
        )
    }
}
import React, { Component } from 'react';

import { Window, Grid } from './';

export default class extends Component {

    constructor(props) {
        super(props);
    }


    static defaultProps = {
        data: {
            type: 'col',
            content: [
                1
            ],
        }
    }

    renderGrid = (type, content) => {
        return <Grid
            type={type}
            content={content}
            renderGrid={this.renderGrid}
        />
    }

    render() {
        const { data } = this.props;
        let grid = this.renderGrid(data.type, data.content);
        return(
            <div className="dashboard">
                {grid}
            </div>
        )
    }
}
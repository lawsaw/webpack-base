import React, { Component } from 'react';
import { Window, Grid } from './';

export default class extends Component {

    constructor(props) {
        super(props);
    }

    static defaultProps = {

    }

    renderGrid = () => {
        return <Grid
            content={[1,2,3,4]}
        />
    }

    render() {
        return(
            <div className="dashboard">
                <Grid
                    content={[1,2,3,4]}
                />
            </div>
        )
    }
}
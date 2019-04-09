import React, { Component } from 'react';
import { Window, Grid } from './';

export default class extends Component {
    render() {
        return(
            <div className="dashboard">
                <Grid
                    type={'col'}
                    blocks={2}
                />
            </div>
        )
    }
}
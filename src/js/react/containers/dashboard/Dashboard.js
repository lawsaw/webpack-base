import React, { Component } from 'react';
import { Window, Grid } from './';

export default class extends Component {

    constructor(props) {
        super(props);
    }

    static defaultProps = {

    }

    render() {
        return(
            <div className="dashboard">
                <Grid
                    type={'row'}
                    content={[
                        10050, 22, 6612, 6412
                    ]}
                />
            </div>
        )
    }
}
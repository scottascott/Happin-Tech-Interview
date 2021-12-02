import React, { Component } from 'react'
import { Result, Button } from 'antd';
export default class BadRequest extends Component {
    render() {
        return (
            <Result
                status="error"
                title="400"
                subTitle="Sorry, request failed. Please post the url of Trackie event."
                extra={<Button type="primary" onClick={this.props.examples}>See examples</Button>}
            />
        )
    }
}

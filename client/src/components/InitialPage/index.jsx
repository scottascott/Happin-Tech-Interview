import React, { Component } from 'react'
import "./index.css"
import { Steps, Divider, Typography } from 'antd';
const { Step } = Steps;
const { Text,Title  } = Typography;

export default class InitialPage extends Component {
    state = {
        current: 0,
    };
    onChange = current => {
        this.setState({ current });
    };
    render() {
        const { current } = this.state;
        return (
            <div className="initialPage">
                <Title level={4}>How to use:</Title>
                <Steps current={current} onChange={this.onChange} direction="vertical">
                    <Step title="Step 1" description=
                        {<div>Go to <a href="https://www.trackie.com/online-registration/find-event/"  target="_blank" rel="noreferrer">trackie.com</a>.</div>}
                    />
                    <Step title="Step 2" description=
                        {<div>Find a specific event, click <Text style={{background:'green',color:'white'}}>&nbsp;More info&nbsp;</Text> to go to the event page.</div>}
                    />
                    <Step title="Step 3" description=
                        {<div>Copy the url of the event page, paste it in the post bar, then click <Text style={{background:'#1890ff',color:'white'}}>&nbsp;Post&nbsp;</Text>. </div>}/>
                </Steps>
                <Divider/>
                <div>For a quick start up, you can use the sample urls from <Text keyboard>&nbsp;examples&nbsp;</Text> on the top right of this page.</div>
            </div>
        )
    }
}

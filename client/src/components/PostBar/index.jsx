import React, { Component } from 'react'
import { Typography,Input,Button,Modal } from 'antd';
import "./index.css"
const { Title,Paragraph,Text } = Typography;
const { Search } = Input;

export default class PostBar extends Component {
    about=()=> {
        Modal.info({
          title: 'About the crawler:',
          content: (
            <div>
                <br/>
                <Paragraph><Text strong>Author:</Text> Kang Wang (Scott)</Paragraph>
                <Paragraph><a href="https://www.linkedin.com/in/kang-wang-a1b129210/" target="_blank" rel="noreferrer">LinkedIn Link</a></Paragraph>
                <Paragraph><Text strong>Vertion:</Text> 1.0.0</Paragraph>
                <Paragraph><Text strong>Created at:</Text> 2021-12-2</Paragraph>
            </div>
          ),
          onOk() {},
        });
    }
    render() {
        return (
            <div className="searchBar">
                <Title level={2} style={{color:"#f0f0f0",paddingTop:'10px'}}>
                    Trackie event crawler 
                    <Button size='small' shape="round" onClick={this.about}>about</Button>
                    <Button size='small' shape="round" onClick={this.props.examples}>examples</Button>
                </Title>
                <Search
                    placeholder="input Trackie event url here"
                    allowClear
                    enterButton="Post"
                    onSearch={value=>this.props.post(value)}
                />
            </div>
        )
    }
}

import React, { Component } from 'react'
import axios from 'axios';
import { Layout, Modal, Typography  } from 'antd';
import "./App.css"
import PostBar from './components/PostBar';
import BadRequest from './components/BadRequest';
import InitialPage from './components/InitialPage';
import Event from './components/Event';
const { Header, Content } = Layout;
const { Paragraph, Text } = Typography;


export default class App extends Component {
  state={ 
    apiResponse: 0 
  };

  post=(url)=>{
    if(url.length===0){
      this.setState({apiResponse: 0} )
      return;
    }
    axios.post('http://localhost:4200/events/crawl', {
      url: url
    })
    .then(response =>this.setState({apiResponse:response.data.data}))
    .catch(error=>this.setState({apiResponse:400}));
  }
  examples=()=> {
    Modal.info({
      title: 'Some examples of Trackie event url:',
      content: (
        <div>
          <Text italic>
            <Paragraph copyable>https://www.trackie.com/online-registration/event/nccp-course-foundations-of-coach-theory-modules-of-sport-and-club-coach/472081/#.Yaj9C9DMKUl</Paragraph>
            <Paragraph copyable>https://www.trackie.com/online-registration/event/bnaa-x-country-national-championships-botanical-gardens-2021-maac/471575/#.YakPmNDMKUk</Paragraph>
            <Paragraph copyable>https://www.trackie.com/online-registration/event/grimsby-singles-racquetball-league/472712/#.YakPtdDMKUk</Paragraph>
          </Text>
        </div>
      ),
      onOk() {},
    });
  }
  content=()=>{
    const {apiResponse}=this.state;
    if(apiResponse===0)
      return <InitialPage/>
    else if(apiResponse===400)
      return <BadRequest examples={this.examples}/>
    else
      return <Event events={this.state.apiResponse}/>
  }
  render() {
    return (
      <div>
        <Layout>
          <Header><PostBar examples={this.examples} post={this.post}/></Header>
          <Content><this.content/></Content>
        </Layout>
      </div>
    )
  }
}

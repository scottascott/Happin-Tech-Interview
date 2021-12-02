import React, { Component } from 'react'
import { Descriptions } from 'antd';
import "./index.css"
export default class Event extends Component {
    render() {
        //get event information
        const {events}=this.props

        //date format
        let startDate=JSON.stringify(events.result.startDate).substr(1,10)
        let endDate=JSON.stringify(events.result.endDate).substr(1,10)

        if(startDate.length<10)
            startDate=null;
        if(endDate.length<10)
            endDate=null;

        return (
            <div className="event">
                <Descriptions 
                    title="Event Info" 
                    bordered
                    column={2}
                    layout="vertical"
                    size="small"
                >
                    <Descriptions.Item label="Title" span={2}>{events.result.title}</Descriptions.Item>
                    <Descriptions.Item label="Description" span={2}>{events.result.description}</Descriptions.Item>
                    <Descriptions.Item label="Start Date">{startDate}</Descriptions.Item>
                    <Descriptions.Item label="End Date">{endDate}</Descriptions.Item>
                    <Descriptions.Item label="City">{events.result.city}</Descriptions.Item>
                    <Descriptions.Item label="State">{events.result.state}</Descriptions.Item>
                    <Descriptions.Item label="Location" span={2}>{events.result.location}</Descriptions.Item>
                    <Descriptions.Item label="Source Url" span={2}>{events.sourceUrl}</Descriptions.Item>
                </Descriptions>
            </div>
        )
    }
}

import { JSDOM } from "jsdom";
import cheerio from "cheerio";
import { IEvent } from "../../../models/event";
import { AbstractDocumentCrawler } from "./crawler";

export class TrackieCrawler extends AbstractDocumentCrawler {
  protected parse(doc: JSDOM): Partial<IEvent> {
    let $ = cheerio.load(doc.window.document.body.outerHTML);

    //get date
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
    let date=$('.date').html().trim();
    let numsOfDate:string[];
    numsOfDate=date.match(/[0-9]*\.?[0-9]+/g);
    //initialize start date and end date
    let startDate=new Date('1900-01-01T00:00:00');
    let endDate=new Date('1900-01-01T00:00:00');
    let isDateRange=true;
    //check if it is a date range or a start date. eg for date range: October 18-25th, 2021,   November 9 - December 21, 2021
    if(!date.includes('-')){//means only have start date
        isDateRange=false;
        for(let i=0;i<monthNames.length;i++){
            if(date.includes(monthNames[i])){
                startDate.setMonth(i);
                break;
            }
        }
        startDate.setDate(+numsOfDate[0]);
        startDate.setFullYear(+numsOfDate[1]);
    }
    else{//means it's a date range
        let flag=0;//to record if the month of start date is recorded
        for(let i=0;i<monthNames.length;i++){
            if(date.includes(monthNames[i])&&flag===0){
                startDate.setMonth(i);
                flag=1;
            }
            if(date.includes(monthNames[i]))
                endDate.setMonth(i);
        }
        startDate.setDate(+numsOfDate[0]);
        startDate.setFullYear(+numsOfDate[2]);
        endDate.setDate(+numsOfDate[1]);
        endDate.setFullYear(+numsOfDate[2]);
    }
    
    //get location
    let location=$('.location').html();
    
    let iEvent = {
        city: location.substring(0,location.indexOf(',')),
        country: "Canada",
        description: $('p','.info').html(),
        endDate: isDateRange?endDate:null,
        geoLocation: {
            lat: 0,
            lon: 0
        },
        location: location,
        startDate: startDate,
        state: location.substring(location.indexOf(',')+1),
        street: "",
        title: $('h2','.info').html()
    };
    let iCrawlerRecord = {
        initiator: "Scott Wang",
        result: iEvent,
        createdOn: new Date(),
        completedOn: new Date(),
        sourceUrl: this.url,
        //what are these? I didn't get any information through internet. Please give me some comments to let me know what they are
        appliedCrawler: "",
        notes: "",
        host: ""
    };
    this.crawlerRecord = iCrawlerRecord;

    return iEvent;
    // throw new Error("Method not implemented.");
  }
}

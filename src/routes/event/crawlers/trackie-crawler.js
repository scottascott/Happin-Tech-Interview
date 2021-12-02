"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.TrackieCrawler = void 0;
var cheerio_1 = require("cheerio");
var crawler_1 = require("./crawler");
var TrackieCrawler = /** @class */ (function (_super) {
    __extends(TrackieCrawler, _super);
    function TrackieCrawler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TrackieCrawler.prototype.parse = function (doc) {
        var $ = cheerio_1["default"].load(doc.window.document.body.outerHTML);
        //get date
        var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var date = $('.date').html().trim();
        var numsOfDate;
        numsOfDate = date.match(/[0-9]*\.?[0-9]+/g);
        //initialize start date and end date
        var startDate = new Date('1900-01-01T00:00:00');
        var endDate = new Date('1900-01-01T00:00:00');
        var isDateRange = true;
        //check if it is a date range or a start date. eg for date range: October 18-25th, 2021,   November 9 - December 21, 2021
        if (!date.includes('-')) { //means only have start date
            isDateRange = false;
            for (var i = 0; i < monthNames.length; i++) {
                if (date.includes(monthNames[i])) {
                    startDate.setMonth(i);
                    break;
                }
            }
            startDate.setDate(+numsOfDate[0]);
            startDate.setFullYear(+numsOfDate[1]);
        }
        else { //means it's a date range
            var flag = 0; //to record if the month of start date is recorded
            for (var i = 0; i < monthNames.length; i++) {
                if (date.includes(monthNames[i]) && flag === 0) {
                    startDate.setMonth(i);
                    flag = 1;
                }
                if (date.includes(monthNames[i]))
                    endDate.setMonth(i);
            }
            startDate.setDate(+numsOfDate[0]);
            startDate.setFullYear(+numsOfDate[2]);
            endDate.setDate(+numsOfDate[1]);
            endDate.setFullYear(+numsOfDate[2]);
        }
        //get location
        var location = $('.location').html();
        var iEvent = {
            city: location.substring(0, location.indexOf(',')),
            country: "Canada",
            description: $('p', '.info').html(),
            endDate: isDateRange ? endDate : null,
            geoLocation: {
                lat: 0,
                lon: 0
            },
            location: location,
            startDate: startDate,
            state: location.substring(location.indexOf(',') + 1),
            street: "",
            title: $('h2', '.info').html()
        };
        var iCrawlerRecord = {
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
    };
    return TrackieCrawler;
}(crawler_1.AbstractDocumentCrawler));
exports.TrackieCrawler = TrackieCrawler;

import { JSDOM } from "jsdom";
import { IEvent } from "../../../models/event";
import { AbstractDocumentCrawler } from "./crawler";

export class TrackieCrawler extends AbstractDocumentCrawler {
  protected parse(doc: JSDOM): Partial<IEvent> {
    throw new Error("Method not implemented.");
  }
}

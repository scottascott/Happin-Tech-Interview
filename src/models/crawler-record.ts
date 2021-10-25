import { IEvent } from "./event";

export interface ICrawlerRecord {
  initiator: string;

  result?: Partial<IEvent>;

  createdOn?: Date;

  completedOn?: Date;

  sourceUrl: string;

  appliedCrawler: string;

  notes?: string;

  host: string;
}

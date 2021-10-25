import { Logger } from "winston";
import { ICrawlerRecord } from "../../../models/crawler-record";
import { JSDOM } from "jsdom";
import { IEvent } from "../../../models/event";
import axios from "axios";
interface CrawlerOptions {
  contentType: string;
  queryParams: Record<string, string>;
}

export interface ICrawler {
  crawl(): Promise<ICrawlerRecord>;
}

export abstract class AbstractCrawler implements ICrawler {
  protected url: string;
  protected crawlerRecord: ICrawlerRecord;
  protected logger: Logger;
  protected options: CrawlerOptions = {
    contentType: "text/html",
    queryParams: {},
  };

  constructor(url: string, options: Partial<CrawlerOptions> = {}) {
    this.url = url;
    this.options = {
      ...this.options,
      ...options,
    };
  }

  abstract crawl(): Promise<ICrawlerRecord>;
}

export abstract class AbstractDocumentCrawler extends AbstractCrawler {
  protected abstract parse(doc: JSDOM): Partial<IEvent>;

  async crawl(): Promise<ICrawlerRecord> {
    let parsed = {};
    try {
      const resp = await this.fetch(this.url);
      const doc = this.load(resp);
      parsed = this.parse(doc);
    } catch (err) {
      this.logger.error(`Failed to parse the doc.`, err);
    }
    return {
      ...this.crawlerRecord,
    };
  }

  protected load(html: string) {
    return new JSDOM(html);
  }

  protected async fetch(url: string) {
    const resp = await axios.get(url, {
      headers: {
        "Content-Type": this.options.contentType,
      },
      params: this.options.queryParams,
    });
    return resp.data as string;
  }
}

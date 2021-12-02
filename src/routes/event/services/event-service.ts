import { ICrawler } from "../crawlers/crawler";
import { TrackieCrawler } from "../crawlers/trackie-crawler";

export class EventService {
  constructor() {  }

  async crawl(url: string) {
    const parsed = new URL(url);
    let crawler: ICrawler;
    switch (parsed.hostname.toLowerCase()) {
      case "trackie.com":
        crawler = new TrackieCrawler(url);
        break;
      case "www.trackie.com"://incase an user type in www.
        crawler = new TrackieCrawler(url);
        break;
    }
    return crawler.crawl();
  }
}

import instance from "./axios";

const handleCrawlData = () => {
  return instance.post("/crawl");
};

export const CrawlApi = {
  handleCrawlData,
};

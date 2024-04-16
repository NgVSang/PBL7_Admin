import { IRecord } from "@/types";
import instance from "./axios";

const handleCrawlData = () => {
  return instance.post<IRecord>("/crawl");
};

export const CrawlApi = {
  handleCrawlData,
};

import { IRecord } from "@/types";
import instance from "./axios";

const getCrawlHis = () => {
  return instance.get<IRecord[]>("/crawl");
};

const handleCrawlData = () => {
  return instance.post<IRecord>("/crawl");
};

export const CrawlApi = {
  handleCrawlData,
  getCrawlHis,
};

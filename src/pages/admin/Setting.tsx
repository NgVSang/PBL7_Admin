import { AdminLayout } from "@/components";
import { monthValue, weekValue } from "@/constants";
import { SettingApi } from "@/services";
import { Select, Switch } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useCallback, useEffect, useMemo, useState } from "react";

const Page = () => {
  const [crawl, setCrawl] = useState<boolean>(true);
  const [type, setType] = useState<"month" | "week">("week");
  const [date, setDate] = useState<number>(0);
  const [time, setTime] = useState<string>("");

  const handleGetData = useCallback(async () => {
    try {
      const res = await SettingApi.getSetting();
      if (res.data) {
        setCrawl(res.data.crawl);
        setType(res.data.type);
        setDate(res.data.date);
        setTime(res.data.time);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    handleGetData();
  }, []);

  const options = useMemo(() => {
    if (type === "week") {
      return weekValue;
    } else {
      return monthValue();
    }
  }, [type, weekValue]);

  return (
    <Content className="flex-1 p-6 bg-[#F5F6FA]">
      <span className="font-sans text-black text-2xl font-bold">Setting</span>
      <div className="px-[20px] py-[10px] bg-white rounded-[8px] shadow-md mt-[30px] w-full">
        <div className="w-full mb-[20px]">
          <p className="font-sans font-medium text-base mb-2">Auto crawl</p>
          <Switch value={crawl} onChange={setCrawl} />
        </div>
        <div className="flex flex-col gap-[20px]">
          <div className="w-full flex flex-row gap-[20px]">
            <div className="w-[50%]">
              <p className="font-sans font-medium text-base mb-2">Crawl by</p>
              <Select
                options={[
                  {
                    value: "month",
                    label: "Month",
                  },
                  {
                    value: "week",
                    label: "Week",
                  },
                ]}
                value={type}
                onChange={(value) => {
                  setType(value);
                  setDate(1);
                }}
                className="w-[70%]"
              />
            </div>
            <div className="w-[50%]">
              <p className="font-sans font-medium text-base mb-2">Day crawl</p>
              <Select
                options={options}
                value={date}
                onChange={(val) => {
                  setDate(val);
                }}
                className="w-[70%]"
              />
            </div>
          </div>
          <div className="w-full flex flex-row gap-[20px]">
            <div className="w-[50%]">
              <p className="font-sans font-medium text-base mb-2">Time</p>
            </div>
          </div>
        </div>
      </div>
    </Content>
  );
};

export default Page;
Page.Layout = AdminLayout;

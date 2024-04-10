import Image from "next/image";
import { Inter } from "next/font/google";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { DashboardApi, LinkApi } from "@/services";
import { AdminLayout, DashboardTotal } from "@/components";
import { Content } from "antd/es/layout/layout";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Table } from "antd";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Props {}

const Page = ({}: Props) => {
  const [data, setData] = useState<any>();

  const handleGetData = useCallback(async () => {
    try {
      const res = await DashboardApi.getDashboardInfor();
      if (res.data) setData(res.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    handleGetData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Number of Links crawled",
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const linksData = {
    labels,
    datasets: [
      {
        label: "Total Links",
        data: data?.links_per_months,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const answersData = {
    labels,
    datasets: [
      {
        label: "Total Answers",
        data: data?.answers_per_months,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      // className: "bg-black",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  return (
    <Content className="flex-1 p-6 bg-[#F5F6FA]">
      <span className="font-sans text-black text-2xl font-bold">Dashboard</span>
      <DashboardTotal data={data} />
      <div className="flex flex-row gap-[20px] w-full">
        <div className="px-[20px] py-[10px] bg-white rounded-[8px] shadow-md mt-[30px] w-full">
          <Bar options={options} data={linksData} />
        </div>
        <div className="px-[20px] py-[10px] bg-white rounded-[8px] shadow-md mt-[30px] w-full">
          <Bar options={options} data={answersData} />
        </div>
      </div>
      <div className="px-[20px] py-[10px] bg-white rounded-[8px] shadow-md mt-[30px] w-full">
        <p className="font-sans text-black text-xl font-normal pb-5 pt-2">
          New Links
        </p>
        <Table dataSource={dataSource} columns={columns} />
      </div>
    </Content>
  );
};
export default Page;
Page.Layout = AdminLayout;

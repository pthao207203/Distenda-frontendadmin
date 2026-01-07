import React from "react";
import { Helmet } from "react-helmet";
import SearchBar from "../../layouts/private/SearchBar";
import TableHeader from "./components/TableHeader";
import TableRow from "./components/TableRow";
import ActionButton from "./components/ActionButton";
import HistoryButton from "../../components/HistoryButton";
import { Link } from "react-router-dom";

const data = [
  {
    id: "#3568",
    teacher: "Đào Thị Hạnh",
    content: "Live học HTML bài 2",
    liveTime: "29/11/2024 23:13",
    approveTime: "29/11/2024 23:13",
    status: "live",
  },
  {
    id: "#3569",
    teacher: "Đào Thị Hạnh",
    content: "Live học HTML bài 3",
    liveTime: "30/11/2024 20:00",
    approveTime: "30/11/2024 19:30",
    status: "live",
  },
  {
    id: "#3570",
    teacher: "Nguyễn Văn A",
    content: "React cơ bản",
    liveTime: "28/11/2024 18:00",
    approveTime: "28/11/2024 17:30",
    status: "done",
  },
];

const LiveStreamList = () => {
  return (
    <>
      <Helmet>
        <title>Live Stream</title>
      </Helmet>

      <div className="flex flex-col flex-1 justify-center items-center shrink p-[4rem] text-[1.25rem] max-md:text-[1rem] font-medium bg-white basis-0 min-w-[15rem] max-md:px-[1.25rem] max-md:max-w-full">
        <SearchBar />
        <section className="flex gap-3 items-start self-end mt-3 text-[1.5rem] max-md:text-[1.125rem] text-white max-md:max-w-full">
          <Link to="/livestream/create">
            <ActionButton />
          </Link>
          <HistoryButton />
        </section>

        <div className="flex flex-col mt-[1.5rem] w-full text-[#171717]">
          <div className="text-right">
            Tổng số live stream: {data.length}
          </div>
        </div>

        <div className="flex flex-col mt-[1.5rem] w-full text-[#171717]">
          <TableHeader />
          {data.map((item, index) => (
            <TableRow key={index} {...item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default LiveStreamList;

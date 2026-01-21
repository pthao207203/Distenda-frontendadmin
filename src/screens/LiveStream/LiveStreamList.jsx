import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import SearchBar from "../../layouts/private/SearchBar";
import TableHeader from "./components/TableHeader";
import TableRow from "./components/TableRow";
import ActionButton from "./components/ActionButton";
import HistoryButton from "../../components/HistoryButton";
import { Link, useNavigate } from "react-router-dom";

const LiveStreamList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLivestreams();
  }, []);

  const fetchLivestreams = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/admin/livestreams`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const result = await response.json();
      if (response.ok) {
        setData(result.data || []);
      }
    } catch (error) {
      console.error("Fetch livestream error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = (item) => {
    console.log("Click livestream:", item);

    // CHƯA LIVE → sửa livestream
    if (item.LivestreamStatus === "not_started") {
      navigate(`/livestream/edit/${item._id}`);
      return;
    }

    // ĐANG LIVE hoặc 🟣 ĐÃ XONG → xem livestream / xem lại
    navigate(`/livestream/${item._id}`);
  };


  return (
    <>
      <Helmet>
        <title>Live Stream</title>
      </Helmet>

      <div className="flex flex-col flex-1 p-[4rem] bg-white max-md:px-[1.25rem]">
        <SearchBar />

        {/* Action */}
        <section className="flex gap-3 items-start self-end mt-3 text-white">
          <Link to="/livestream/create">
            <ActionButton
              label="Tạo Livstream"
              bgColor="bg-[#6C8299] hover:bg-[#55657a]"
              icon="https://cdn.builder.io/api/v1/image/assets/TEMP/b78a7b0bea08f365ad78bb218941e4d8e9e9ff8cd391ee696af50d042524edd2?placeholderIfAbsent=true&apiKey=66913a0089c7476296e0d5e235a1975e"
            />
          </Link>

          <HistoryButton />
        </section>

        {/* Total */}
        <div className="flex flex-col mt-[1.5rem] w-full text-[#171717]">
          <div className="text-right">
            Tổng số live stream: {data.length}
          </div>
        </div>

        {/* Table */}
        <div className="flex flex-col mt-[1.5rem] w-full text-[#171717]">
          <TableHeader />

          {loading && (
            <div className="text-center py-6">Đang tải dữ liệu...</div>
          )}

          {!loading &&
            data.map((item) => (
              <TableRow
                key={item._id}
                id={item.LivestreamStreamKey}
                title={item.LivestreamTitle}
                teacher={item.createdBy?.UserId?.AdminFullName}
                content={item.LivestreamDescription}
                liveTime={item.LivestreamStartedAt}
                status={item.LivestreamStatus}
                onClick={() => handleClick(item)}   // 👈 QUAN TRỌNG
              />
            ))}

        </div>
      </div>
    </>
  );
};

export default LiveStreamList;

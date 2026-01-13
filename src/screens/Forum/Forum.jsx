import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import ForumTableHeader from "./components/ForumTableHeader";
import ForumTableRow from "./components/ForumTableRow";
import SearchBar from "../../layouts/private/SearchBar";
import { coursesController } from "../../controllers/course.controller";
import { useRole } from "../../layouts/AppContext";
import Loading from "../../components/Loading";
import HistoryButton from "../../components/HistoryButton";
import ForumHistory from "./components/ForumHistory";
import moment from "moment";

function Forum() {
  const mockPosts = [
  {
    _id: "post_001",
    postId: "P001",
    userFullName: "Nguyễn Văn A",
    postTitle: "Hỏi về React useEffect",
    PostStatus: 1,
    createdBy: {
      createdAt: "2025-01-10T08:30:45.000Z",
    },
    reviewedBy: {
      reviewedAt: "2025-01-10T09:15:12.000Z",
    },
  },
  {
    _id: "post_002",
    postId: "P002",
    userFullName: "Trần Thị B",
    postTitle: "Cách tối ưu performance React",
    PostStatus: 2,
    createdBy: {
      createdAt: "2025-01-11T10:20:00.000Z",
    },
    reviewedBy: {
      reviewedAt: "2025-01-11T11:00:30.000Z",
    },
  },
  {
    _id: "post_003",
    postId: "P003",
    userFullName: "Lê Văn C",
    postTitle: "So sánh Redux và Zustand",
    PostStatus: 0,
    createdBy: {
      createdAt: "2025-01-12T14:45:10.000Z",
    },
    reviewedBy: {
      reviewedAt: "2025-01-12T15:30:00.000Z",
    },
  },
];
  const [allPosts, setAllPosts] = useState(mockPosts); // Dữ liệu gốc từ API
  // const [filteredPosts, setFilteredPosts] = useState([]); // Dữ liệu sau khi lọc
  const [loading, setLoading] = useState(false);
  // const { role } = useRole();

  const [isHistoryVisible, setIsHistoryVisible] = useState(false);

  // // Gọi API 1 lần duy nhất khi load trang
  // useEffect(() => {
  //   async function fetchData() {
  //     const result = await coursesController(setLoading);
  //     if (result) {
  //       setAllPosts(result);
  //       setFilteredPosts(result); // Ban đầu hiển thị toàn bộ
  //     }
  //   }

  //   fetchData();
  // }, []);
  const [filteredPosts, setFilteredPosts] = useState(mockPosts);

  // Hàm xử lý tìm kiếm realtime
  const handleSearch = (value) => {
  const keyword = value.trim().toLowerCase();

  // Reset khi input rỗng
  if (!keyword) {
    setFilteredPosts(allPosts);
    return;
  }

  const filtered = allPosts.filter((post) => {
    const postId = post.postId?.toLowerCase() || "";
    const user = post.userFullName?.toLowerCase() || "";
    const postTitle = post.postTitle?.toLowerCase() || "";

    const postTime = post.createdBy?.createdAt
      ? moment(post.createdBy.createdAt).format("DD/MM/YYYY HH:mm:ss").toLowerCase()
      : "";

    const reviewTime = post.reviewedBy?.reviewedAt
      ? moment(post.reviewedBy.reviewedAt).format("DD/MM/YYYY HH:mm:ss").toLowerCase()
      : "";

    const statusText =
      post.PostStatus === 1
        ? "đã duyệt"
        : post.PostStatus === 0
        ? "đã hủy"
        : "chờ duyệt";

    return (
      postId.includes(keyword) ||
      user.includes(keyword) ||
      postTitle.includes(keyword) ||
      postTime.includes(keyword) ||
      reviewTime.includes(keyword) ||
      statusText.includes(keyword)
    );
  });

  setFilteredPosts(filtered);
};

  const handleHistoryRequest = () => {
    setIsHistoryVisible(true);
  };

  const handleCloseHistoryRequest = () => {
    setIsHistoryVisible(false);
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <Helmet>
        <title>Forum</title>
      </Helmet>
      <main className="flex flex-col flex-1 shrink p-[4rem] md:text-[1.25rem] text-[1rem] min-h-[calc(100vh-2.5rem)] font-medium bg-white basis-0 max-md:px-5 max-md:max-w-full">
        <SearchBar onSearch={handleSearch} />

        {/* <section className="flex gap-3 items-start self-end mt-3 text-[1.5rem] max-md:text-[1.125rem] text-white max-md:max-w-full">
          <HistoryButton onClick={handleHistoryRequest} />
        </section> */}

        <section className="flex flex-col pb-16 mt-3 w-full text-neutral-900 max-md:max-w-full">
          <div className="self-stretch text-right text-[#131313] md:text-[1.25rem] text-[1rem]  font-medium leading-tight">
            Tổng số bài đăng: {filteredPosts.length}
          </div>
          <ForumTableHeader />

          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <ForumTableRow key={index} {...post} />
            ))
          ) : (
            <p className="mt-4 text-center">Không tìm thấy bài đăng nào.</p>
          )}
        </section>
      </main>

      {/* {isHistoryVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 max-md:px-10 overflow-hidden">
          <ForumHistory onClose={handleCloseHistoryRequest} />
        </div>
      )} */}
    </>
  );
}

export default Forum;

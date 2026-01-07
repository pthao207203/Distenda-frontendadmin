import { useState } from "react";
import LiveNow from "./components/LiveNow";
import LiveComment from "./components/LiveComment";
import "./components/LiveStream.css";


const LiveStreaming = () => {
  const [tab, setTab] = useState("LiveNow");

  return (
    <div className="flex h-screen overflow-hidden-scroll bg-white min-h-[calc(100vh-3.0125rem)] max-md:flex-col">
      
      {/* LEFT */}
      <div className="flex-1 p-6 space-y-6 overflow-y-auto overflow-hidden-scroll"> 

        <LiveNow />

        {/* 👉 LiveComment MOBILE (dưới LiveNow – trên LiveList) */}
        <div className="block md:hidden mt-5">
          <LiveComment />
        </div>
      </div>

      {/* RIGHT – LiveComment DESKTOP */}
      <aside className="hidden md:flex bg-[#CDD5DF] min-w-[320px] px-[1.5rem] py-[1.5rem]">
        <LiveComment />
      </aside>
    </div>
  );
};

export default LiveStreaming;

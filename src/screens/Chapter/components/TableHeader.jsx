export default function TableHeader({ onClickVideo, role }) {
  return (
    <div className="flex overflow-hidden w-full rounded-t-3xl bg-slate-500 min-h-[70px] max-md:max-w-full">
      <div className="flex basis-1/4 min-w-0 min-h-[70px] shrink gap-3 justify-center items-center px-3  bg-[#EBF1F9]">
        <div className="gap-2.5 text-center self-stretch my-auto">STT</div>
      </div>
      <div className="flex basis-1/4 min-w-0 min-h-[70px] shrink gap-3 justify-center items-center px-3  text-white">
        <div className="gap-2.5 text-center self-stretch my-auto">Tên bài</div>
      </div>
      <div className="flex basis-1/4 min-w-0 min-h-[70px] gap-3 justify-center items-center px-3  bg-[#EBF1F9] ">
        <div className="gap-2.5 text-center self-stretch my-auto">
          Lần cuối cập nhật
        </div>
      </div>
      <button
        disabled={!role?.role?.RolePermissions?.includes("course_create")}
        onClick={onClickVideo}
        className={`flex basis-1/4 min-w-0 min-h-[70px] gap-3 justify-center items-center px-3  text-white ${
          role?.role?.RolePermissions?.includes("course_edit")
            ? "bg-[#6C8299] hover:bg-[#55657a]"
            : "bg-[#CDD5DF] cursor-not-allowed"
        }`}
      >
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/4ed99d5fa1c35d0b53a77a4661afcb70ba8fd8f57d1e0f756eab68f69535ca53?placeholderIfAbsent=true&apiKey=bb36f631e8e54463aa9d0d8a1339282b"
          alt=""
          className="object-contain shrink-0 self-stretch my-auto aspect-square w-[30px]"
        />
        <div className="gap-2.5 self-stretch my-auto">Bài mới</div>
      </button>
    </div>
  );
}

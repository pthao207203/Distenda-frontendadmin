import * as React from "react";
import VoucherInfo from "./components/VoucherInfo";

function VoucherNew() {
  return (
    <main className="flex flex-col flex-1 justify-start shrink p-[3rem] text-xl font-medium bg-white basis-0 min-w-[15rem] max-md:px-[1.25rem] min-h-[3.75rem] max-md:min-h-[2.75rem]">
      <VoucherInfo />
    </main>
  );
}

export default VoucherNew;

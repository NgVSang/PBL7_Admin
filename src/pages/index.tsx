import React from "react";

const Page = () => {
  return (
    <div className="bg-white relative z-0 flex h-screen w-full overflow-hidden">
      <div className="w-[30%] flex-shrink-0 overflow-x-hidden bg-token-sidebar-surface-primary">
        <div className="bg-gray-50 h-full flex flex-col">
          <div></div>
        </div>
      </div>
      <div className="flex relative h-full max-w-full flex-1 flex-col overflow-hidden"></div>
    </div>
  );
};

export default Page;

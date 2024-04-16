import { NewChatIcon, SmallLogoIcon } from "@/assets/icons";
import { SidebarButton, UserInfor } from "@/components";
import { authSelector } from "@/redux/reducers";
import { Button, Input } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";

const Page = () => {
  const router = useRouter();
  const { user, loggedin } = useSelector(authSelector);

  const handleSignIn = useCallback(() => {
    router.push("/login");
  }, []);

  return (
    <div className="bg-white relative z-0 flex h-screen w-full overflow-hidden">
      <div className="w-[30%] h-full flex-shrink-0 overflow-x-hidden bg-token-sidebar-surface-primary">
        <div className="bg-gray-50 h-full flex flex-col justify-between">
          <SidebarButton
            text="New chat"
            type="action"
            className="mx-[20px] mt-[20px]"
          />
          <div className="">
            <p className="text-base font-sans text-gray-500 mx-[20px]">
              History
            </p>
            <div className="mt-[20px] flex flex-col gap-2 h-[500px] overflow-y-scroll px-[20px]">
              <SidebarButton text="Test chat 1" active />
              <SidebarButton text="Test chat 2" />
            </div>
          </div>
          {loggedin && user ? (
            <UserInfor className="mx-[20px] mb-[30px]" />
          ) : (
            <div className="px-[20px] pb-[30px]">
              <Button
                type="primary"
                className="w-full h-[40px] rounded-xl"
                onClick={handleSignIn}
              >
                Sign In
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="flex relative h-full max-w-full flex-1 flex-col overflow-hidden self-end z-1">
        <div className="sticky top-0 z-10 flex min-h-[40px] items-center  border-b p-[10px]">
          <span className="text-2xl font-sans font-medium text-black p-3 cursor-pointer">
            HistoryQuiz
          </span>
        </div>
        <div className="overflow-y-auto h-full w-full flex-1 overflow-hidden">
          <div className="flex flex-col"></div>
        </div>
        <div className="pb-8 px-5">
          <Input
            className="min-h-[50px] text-xl text-black rounded-[12px] border-gray-400"
            placeholder="Message HistoryQuiz"
          />
        </div>
      </div>
    </div>
  );
};

export default Page;

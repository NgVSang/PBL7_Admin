import React, { FC } from "react";
import { ContentQuizProps } from "./ContentQuiz.types";
import Image from "next/image";
import { DefaultAvatarIcon, SmallLogoIcon } from "@/assets/icons";
import { useSelector } from "react-redux";
import { authSelector } from "@/redux/reducers";

const ContentQuiz: FC<ContentQuizProps> = ({ data }) => {
  const { loggedin, user } = useSelector(authSelector);

  if (data.type === "ask") {
    return (
      <div className="flex flex-row px-[20px] pt-[30px] items-start, gap-2">
        <Image
          src={DefaultAvatarIcon}
          alt="Logo"
          className="w-[40px] h-[40px] rounded-full"
        />
        <div className=" flex flex-col gap-4 mt-[7px]">
          <span className="font-sans font-medium text-black text-base">
            {user?.name || "Customer"}
          </span>
          <div className="flex flex-col mt-[5px] gap-2">
            <p className="font-sans font-semibold text-black text-xl mb-[10px]">
              {data.question}
            </p>
            {data.answers.map((ans) => (
              <p className="font-sans text-black text-base px-[20px]">{ans}</p>
            ))}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-row px-[20px] pt-[30px] items-start, gap-2">
      <div className="rounded-full min-w-[40px] h-[40px] bg-gray-200 border border-gray-200 flex items-center justify-center">
        <Image src={SmallLogoIcon} alt="Logo" className="w-[20px] h-[20px]" />
      </div>
      <div className=" flex flex-col gap-4 mt-[7px]">
        <span className="font-sans font-medium text-black text-base">
          HistoryQuiz
        </span>
        <div className="flex flex-col mt-[5px] gap-2">
          <p className="font-sans font-semibold text-black text-xl mb-[10px]">
            Correct answer:{" "}
            {data.correct_answer === "" ? "Not Found" : data.correct_answer}
          </p>
          <p className="font-sans text-black text-base px-[10px]">
            <span className="font-semibold underline">Explain:</span>{" "}
            {data.explanation === "" ? "Not Found" : data.explanation}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContentQuiz;

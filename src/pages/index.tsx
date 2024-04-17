import {
  DeleteIcon,
  NewChatIcon,
  SmallLogoIcon,
  SubmitIcon,
} from "@/assets/icons";
import { ContentQuiz, SidebarButton, UserInfor } from "@/components";
import { uppercaseLetters } from "@/constants";
import { authSelector } from "@/redux/reducers";
import { ModelApi } from "@/services";
import { IContent, IConversation } from "@/types";
import { Button, Input } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const Page = () => {
  const router = useRouter();
  const messageContainerRef = useRef<any>(null);
  const { user, loggedin } = useSelector(authSelector);

  const [question, setQuestions] = useState("");
  const [data, setData] = useState<IConversation[]>([]);
  const [contents, setContents] = useState<IContent[]>([]);
  const [answers, setAnswers] = useState<string[]>(["", ""]);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentConversation, setCurrentConversation] =
    useState<IConversation>();

  const handleGetHistory = useCallback(async () => {
    try {
      const res = await ModelApi.getConversationCustomer();
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    handleGetHistory();
  }, []);

  const handleClickConversation = useCallback(async (data: IConversation) => {
    try {
      setIsLoading(true);
      setCurrentConversation(data);
      const res = await ModelApi.getConversationContent(data._id);
      setContents(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSignIn = useCallback(() => {
    router.push("/login");
  }, []);

  const addNewAnswers = useCallback(() => {
    setAnswers([...answers, ""]);
  }, [answers]);

  const deleteAnswers = useCallback(
    (index: number) => {
      if (answers.length === 2) {
        toast.error("Question should have as least 2 answers!");
      } else {
        setAnswers(
          answers.filter((value, i) => {
            return i !== index;
          })
        );
      }
    },
    [answers]
  );

  const handleGetAnswer = useCallback(async () => {
    try {
      setLoading(true);
      const conversationId = currentConversation?._id || "";
      const newArr = answers.map((ans, index) => {
        return `${uppercaseLetters[index]}. ${ans}`;
      });
      let res: any;
      if (loggedin) {
        res = await ModelApi.getAnswerByUser({
          answers: newArr,
          question: question,
          conversationId: conversationId,
        });
      } else {
        res = await ModelApi.getAnswerByCustomer({
          answers: newArr,
          question: question,
          conversationId: conversationId,
        });
      }
      setContents([
        ...contents,
        {
          _id: "",
          answers: newArr,
          conversationId: conversationId,
          correct_answer: "",
          createdAt: "",
          explanation: "",
          question: question,
          type: "ask",
          updatedAt: "Wed, 17 Apr 2024 08:46:54 GMT",
        },
        {
          _id: "",
          answers: newArr,
          conversationId: conversationId,
          correct_answer: res.data.correct_answer,
          createdAt: "",
          explanation: res.data.explanation,
          question: question,
          type: "answer",
          updatedAt: "Wed, 17 Apr 2024 08:46:54 GMT",
        },
      ]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setQuestions("");
      setAnswers(["", ""]);
    }
  }, [answers, question, currentConversation, contents]);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [contents]);

  const renderAnswers = useMemo(() => {
    return (
      <div
        className="flex flex-row gap-y-5 justify-between flex-wrap max-h-[200px] overflow-y-auto bar"
        style={{
          scrollbarWidth: "none",
        }}
      >
        {answers.map((ans, index) => (
          <div className="w-[47%] flex flex-row items-center" key={index}>
            <span className="text-black text-2xl mr-3">
              {uppercaseLetters[index]}.
            </span>
            <Input
              className="min-h-[50px] text-xl text-black rounded-[12px] border-gray-400 w-full"
              placeholder={`Input answer ${uppercaseLetters[index]}`}
              value={ans}
              tabIndex={index + 1}
              onChange={(event) => {
                setAnswers(
                  answers.map((text, i) => {
                    if (i === index) {
                      return event.target.value;
                    } else {
                      return text;
                    }
                  })
                );
              }}
              suffix={
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    deleteAnswers(index);
                  }}
                >
                  <Image src={DeleteIcon} alt="Submit" width={20} />
                </div>
              }
            />
          </div>
        ))}
        <div className="w-[47%] ">
          <Button
            className="min-h-[48px] rounded-[12px] min-w-[60%]"
            type="primary"
            onClick={addNewAnswers}
          >
            <span>Add</span>
          </Button>
        </div>
      </div>
    );
  }, [answers, addNewAnswers]);

  return (
    <div className="bg-white relative z-0 flex h-screen w-full overflow-hidden">
      <div className="w-[25%] h-full flex-shrink-0 overflow-x-hidden bg-token-sidebar-surface-primary">
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
              {data.map((conversation) => (
                <SidebarButton
                  text={conversation.title}
                  key={conversation._id}
                  active={currentConversation?._id === conversation._id}
                  onClick={() => {
                    handleClickConversation(conversation);
                  }}
                />
              ))}
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
        <div
          className="overflow-y-auto h-full w-full flex-1 overflow-hidden"
          ref={messageContainerRef}
        >
          <div className="flex flex-col pb-[30px]">
            {contents.map((e) => (
              <ContentQuiz data={e} key={e._id} />
            ))}
          </div>
        </div>
        <div className="py-8 px-5 gap-[20px] flex flex-col bg-gray-100">
          <Input
            className="min-h-[50px] text-xl text-black rounded-[12px] border-gray-400"
            placeholder="Question"
            value={question}
            onChange={(event) => {
              setQuestions(event.target.value);
            }}
            tabIndex={0}
            suffix={
              <Button
                className="bg-gray-200 cursor-pointer p-1 rounded-lg hover:bg-gray-300"
                loading={loading}
                disabled={loading}
                onClick={handleGetAnswer}
              >
                {!loading && (
                  <Image src={SubmitIcon} alt="Submit" width={24} height={24} />
                )}
              </Button>
            }
          />
          {renderAnswers}
        </div>
      </div>
    </div>
  );
};

export default Page;

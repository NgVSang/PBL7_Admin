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
import { Avatar, Button, Input, List, Skeleton } from "antd";
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
      const res = await ModelApi.getConversationUser();
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    handleGetHistory();
  }, []);

  useEffect(() => {
    if (!loggedin) {
      setCurrentConversation(undefined);
      setData([]);
      setContents([]);
    }
  }, [loggedin]);

  const handleClickConversation = useCallback(async (data: IConversation) => {
    try {
      setIsLoading(true);
      setContents([]);
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
    if (answers.length === 4) {
      toast.error("You only can type 4 answers per question!");
    } else {
      setAnswers([...answers, ""]);
    }
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
      if (question === "" || answers.includes("")) {
        toast.error("Please complete all information!");
      } else {
        setLoading(true);
        const conversationId = currentConversation?._id || "";
        const newArr = answers.map((ans, index) => {
          return `${uppercaseLetters[index]}. ${ans}`;
        });
        setContents((contents) => [
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
        ]);
        let res: any;
        if (loggedin) {
          res = await ModelApi.getAnswerByUser({
            answers: newArr,
            question: question,
            conversationId: conversationId,
          });
          if (!currentConversation) {
            try {
              const conversations = await ModelApi.getConversationUser();
              setData(conversations.data);
              setCurrentConversation(
                conversations.data.filter(
                  (e) => e._id === res.data.conversation_id
                )[0]
              );
            } catch (error) {
              console.log(error);
            }
          }
        } else {
          res = await ModelApi.getAnswerByCustomer({
            answers: newArr,
            question: question,
            conversationId: conversationId,
          });
        }
        setQuestions("");
        setAnswers(["", ""]);
        setContents((contents) => [
          ...contents,
          {
            _id: res.data?.answer_id || "",
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
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.message || "There are some problem");
      setContents((contents) => {
        const newContents = contents.slice(0, -1);
        return newContents;
      });
    } finally {
      setLoading(false);
    }
  }, [answers, question, currentConversation, contents]);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [contents]);

  const handleAddNewChat = useCallback(() => {
    setCurrentConversation(undefined);
    setContents([]);
  }, []);

  return (
    <div className="bg-white relative z-0 flex h-screen w-full overflow-hidden">
      <div className="w-[25%] min-w-[200px] max-w-[300px] h-full flex-shrink-0 overflow-x-hidden bg-token-sidebar-surface-primary">
        <div className="bg-gray-50 h-full flex flex-col justify-between">
          <SidebarButton
            text="New chat"
            type="action"
            className="mx-[20px] mt-[20px]"
            onClick={handleAddNewChat}
          />
          <div className="">
            <p className="text-base font-sans text-gray-500 mx-[20px]">
              History
            </p>
            <div className="mt-[20px] flex flex-col gap-2 h-[450px] overflow-y-scroll px-[20px]">
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
            <div className="flex flex-col w-full pb-[30px] gap-5">
              <div className="px-[20px]">
                <div
                  className="w-full h-[40px] rounded-xl bg-green-500 flex items-center justify-center cursor-pointer hover:bg-green-600"
                  onClick={() => {
                    router.push("/signup");
                  }}
                >
                  <span className="font-sans text-base text-white font-medium">
                    Sign Up
                  </span>
                </div>
              </div>
              <div className="px-[20px]">
                <div
                  className="w-full h-[40px] border border-gray-400 rounded-xl bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200"
                  onClick={handleSignIn}
                >
                  <span className="font-sans text-base text-black font-medium">
                    Login
                  </span>
                </div>
              </div>
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
          className="overflow-y-auto h-full w-full flex-1 overflow-hidden items-center flex flex-col"
          ref={messageContainerRef}
        >
          <div className="flex flex-col pb-[30px] max-w-[800px] w-[90%]">
            {contents.map((e) => (
              <ContentQuiz data={e} key={e._id} />
            ))}
            {(isLoading || loading) && (
              <div className="px-[20px] py-[30px]">
                <Skeleton active avatar />
              </div>
            )}
            {!currentConversation && contents.length === 0 && (
              <div className="w-full items-center flex flex-col pt-[100px] gap-[20px]">
                <div className="rounded-full w-[70px] h-[70px] bg-gray-200 border border-gray-200 flex items-center justify-center">
                  <Image
                    src={SmallLogoIcon}
                    alt="Logo"
                    className="w-[35px] h-[35px]"
                  />
                </div>
                <span className="text-3xl text-black font-medium font-sans">
                  How can I help you?
                </span>
              </div>
            )}
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
          />
          <div
            className="flex flex-row gap-y-5 justify-between flex-wrap max-h-[140px] overflow-y-auto bar"
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
          </div>
          <div className="w-full flex flex-row justify-end gap-5">
            <div
              className="min-w-[200px] min-h-[48px] text-black border border-gray-600 rounded-xl bg-white flex items-center justify-center cursor-pointer hover:border-blue-400 hover:text-blue-400"
              onClick={addNewAnswers}
            >
              <span className="font-sans text-base font-medium">Add</span>
            </div>
            <Button
              className="min-h-[48px] rounded-[12px] min-w-[200px]"
              type="primary"
              loading={loading}
              disabled={loading}
              onClick={handleGetAnswer}
            >
              <span className="font-sans text-base text-white font-medium">
                Submit
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

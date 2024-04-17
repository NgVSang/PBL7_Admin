import { IRecord } from "@/types";
import instance from "./axios";

type QuestionType = {
  question: string;
  answers: string[];
  conversationId: string;
};

const getAnswerByUser = (data: QuestionType) => {
  return instance.post("/user/question", data);
};

const getAnswerByCustomer = (data: QuestionType) => {
  return instance.post("/customer/question", data);
};

const getConversationCustomer = () => {
  return instance.get("/user/conversation");
};

const getConversationContent = (id: string) => {
  return instance.get(`/user/conversation/${id}`);
};

export const ModelApi = {
  getAnswerByUser,
  getAnswerByCustomer,
  getConversationCustomer,
  getConversationContent,
};

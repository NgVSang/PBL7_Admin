export interface ILink {
  _id: string;
  name: string;
  new: boolean;
  questions: number | string[];
  createdAt: string;
  updatedAt: string;
}

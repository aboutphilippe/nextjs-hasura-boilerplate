import IUser from "types/user";

export default interface IFeed {
  id: string;
  created_at: string;
  title: string;
  url: string;
  image: string;
  bggId: string;
  owned: boolean;
  body: string;
  author: IUser;
}

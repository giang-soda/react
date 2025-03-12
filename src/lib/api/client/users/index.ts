import endpoint from "../endpoint";
import fetcher, { IResponseList } from "../../";
import { IBase } from "@/lib/helpers/interfaces";

export interface IUser {
  id: number;
  name: string;
  email: string;
  role: number;
  pdlUserId: string;
  lastName: string;
  firstName: string;
}

export const usersList = async(params?: IBase): Promise<IResponseList<IUser>> => {
  const res = await fetcher(endpoint.users.list, {
    params
  });
  
  return res;
}

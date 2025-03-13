import fetcher, { IResponseList } from "../../";
import endpoint from "../endpoint";
import configServer from "@/config/config-server";
import { IBase } from "@/lib/helpers/interfaces";

export interface IUser {
  id: number;
  name: string;
  email: string;
  role: number;
}

export const usersList = async(params?: IBase): Promise<IResponseList<IUser>> => {
  const res = await fetcher(`${configServer.BACKEND_URL}${endpoint.users.list}`, {
    params
  });
  
  return res.data;
}

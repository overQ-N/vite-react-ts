import { AxiosPromise } from "axios";

interface Response {
  code: number;
  data: any;
  msg: string;
}
export type TResponse = AxiosPromise<Response>;
export type TData = {
  current?: number;
  size?: number;
  [key: string]: any;
};

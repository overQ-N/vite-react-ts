import { Method } from "axios";

export interface MockRequest {
  url: string;
  type: Method;
  body: string;
}

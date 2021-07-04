import axios from "axios";
import { notification } from "antd";
import { getStore } from "@/utils/storage";
import { UserInfo } from "@/stores/commonStore";
const request = axios.create();
request.defaults.validateStatus = function (status) {
  return status >= 200 && status <= 500;
};
request.interceptors.request.use(
  (config) => {
    const userInfo = getStore({ key: "userInfo" }) as UserInfo;
    config.headers = Object.assign(
      {
        TENANT_ID: userInfo?.tenant_id,
        Authorization: `Bearer ${userInfo?.access_token}`,
      },
      config.headers
    );
    return config;
  },
  (err) => Promise.reject(err)
);
request.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return response;
    }
    if (response.status === 401) {
      window.location.replace("/login");
    }
    if (response.status !== 200 || response.data.code === 1) {
      notification.error({
        message: response.data.msg,
      });
      return Promise.reject(new Error(response.data.msg));
    }

    return response;
  },
  (err: Error) => {
    return Promise.reject(err);
  }
);
export default request;

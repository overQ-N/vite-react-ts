import Mock from "mockjs";
import { MockRequest } from "./interface";
type RequestParams = {
  [key: string]: any;
};

// 生成随机len位数字
const randomLenStr = (len: number, isDate?: boolean) => {
  let random = Math.ceil(Math.random() * 10000000000000)
    .toString()
    .substr(0, len);
  if (isDate) {
    random += Date.now();
  }
  return random;
};
Mock.mock("/mock/login", "post", (options: MockRequest) => {
  const body = JSON.parse(options.body);
  if (body.username === "admin" && body.password === "123456") {
    return {
      msg: "登录成功",
      code: 0,
      data: {
        nickname: "admin",
        username: "admin",
        permissions: [],
      },
    };
  } else {
    return {
      msg: "用户不存在",
      code: 1,
      data: null,
    };
  }
});
Mock.mock("/mock/captcha", {
  msg: "操作成功",
  code: 0,
  data: randomLenStr(4, true),
});

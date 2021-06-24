import React, { useState, useEffect } from "react";
import { Form, Input, Row, Col, Button } from "antd";
import { encryption } from "@/utils/md5";
import styles from "./index.module.less";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
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
let randomStr = "";
function addUrlParams(url: string, params: Record<string, string>): string {
  let newUrl: string = url + "?";
  for (let key in params) {
    newUrl += `${key}=${params[key]}&`;
  }
  return newUrl;
}
const Login = () => {
  const [form] = Form.useForm();
  const [captchaSrc, setCaptchaSrc] = useState<string>();

  console.log("更新了");
  useEffect(() => {
    refreshCode();
  }, []);
  const refreshCode = (): void => {
    randomStr = randomLenStr(4, true);
    setCaptchaSrc(`${window.location.origin}/code?randomStr=${randomStr}`);
  };
  const onFinish = async (values: any) => {
    values.randomStr = randomStr;
    const user = encryption({
      data: values,
      key: "lenx123456789000",
      param: ["password"],
    });
    const res = await fetch(
      addUrlParams("/auth/oauth/token", {
        ...user,
        grant_type: "password",
        scope: "server",
        tenantId: 1,
      }),
      {
        headers: {
          isToken: "false",
          TENANT_ID: "1",
          Authorization: "Basic bGVueDpsZW54",
        },
        method: "post",
      }
    )
      .then((res) => res.json())
      .then((res) => {});
  };

  return (
    <div className={styles.login}>
      <Form
        className={styles.loginBox}
        {...formItemLayout}
        form={form}
        scrollToFirstError
      >
        <Form.Item
          name="username"
          label="Username"
          tooltip="What do you want others to call you?"
          rules={[
            {
              required: true,
              message: "Please input your username!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item label="Captcha" required>
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item
                name="code"
                noStyle
                rules={[
                  {
                    required: true,
                    message: "Please input the captcha you got!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12} onClick={refreshCode}>
              <img src={captchaSrc} alt="" className={styles.img} />
            </Col>
          </Row>
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;

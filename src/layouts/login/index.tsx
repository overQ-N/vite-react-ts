import React, { useState, useEffect } from "react";
import { Form, Input, Row, Col, Button, Spin } from "antd";
import { observer } from "mobx-react";
import { useStores } from "@/hooks";
import { encryption } from "@/utils/md5";
import styles from "./index.module.less";
import { flowResult } from "mobx";
import { withRouter, RouteComponentProps } from "react-router";
import { getStore } from "@/utils/storage";

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

interface Props extends RouteComponentProps {}
const Login: React.FC<Props> = observer((props) => {
  const [form] = Form.useForm();
  const [captchaSrc, setCaptchaSrc] = useState<string>();
  const commonStore = useStores("commonStore");

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
    const ret = await flowResult(
      commonStore.setUserInfo({
        ...user,
        grant_type: "password",
        scope: "server",
        tenantId: 1,
      })
    );
    if (ret?.message === "验证码不合法") {
      form.setFieldsValue({
        code: "",
      });
      return refreshCode();
    }
    if (commonStore.userInfo.nickname) {
      props.history.replace("/");
    }
  };

  return (
    <div className={styles.login}>
      <Spin spinning={commonStore.state === "pending"}>
        <Form
          className={styles.loginBox}
          {...formItemLayout}
          form={form}
          scrollToFirstError
          onFinish={onFinish}
          autoComplete="off"
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
      </Spin>
    </div>
  );
});

export default withRouter(Login);

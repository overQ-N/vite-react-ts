import React, { useState, ChangeEventHandler } from "react";

import { observer } from "mobx-react";
import { useStores } from "@/hooks";

import { flowResult } from "mobx";
import { withRouter, RouteComponentProps } from "react-router";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import loginComputer from "@/assets/images/login-computer.png";
import "./index.less";
interface Props extends RouteComponentProps {}
const Login: React.FC<Props> = observer((props) => {
  const [formModel, setFormModel] = useState({
    username: "admin",
    password: "123456",
  });

  const commonStore = useStores("commonStore");
  const onInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormModel({
      ...formModel,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    const ret = await flowResult(commonStore.setUserInfo(formModel));
    if (commonStore.userInfo.nickname) {
      props.history.replace("/");
    }
  };

  return (
    <div className="dowebok">
      <div className="container-login100">
        <div className="wrap-login100">
          <div className="login100-pic js-tilt" data-tilt="">
            <img src={loginComputer} alt="IMG" />
          </div>
          <form className="login100-form validate-form">
            <span className="login100-form-title">会员登陆</span>

            <div className="wrap-input100 validate-input">
              <input
                className="input100"
                value={formModel.username}
                onChange={onInput}
                type="text"
                name="username"
                placeholder="用户名"
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <UserOutlined />
              </span>
            </div>

            <div className="wrap-input100 validate-input">
              <input
                className="input100"
                value={formModel.password}
                onChange={onInput}
                type="password"
                name="password"
                placeholder="密码"
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <LockOutlined />
              </span>
            </div>

            <div className="container-login100-form-btn">
              <button className="login100-form-btn" onClick={onSubmit}>
                登陆
              </button>
            </div>

            <div className="text-center pt-4">
              <a className="txt2" href="#">
                忘记密码？
              </a>
            </div>

            <div className="text-center pt-32">
              <a className="txt2" href="#" target="_blank">
                还没有账号？立即注册
                <i
                  className="fa fa-long-arrow-right m-l-5"
                  aria-hidden="true"
                ></i>
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
});

export default withRouter(Login);

import React, { useEffect } from "react";
import { Menu, Dropdown } from "antd";
import {
  DownOutlined,
  LoginOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { observer } from "mobx-react";
import "./index.less";
import { useStores } from "@/hooks";
const menu = (
  <Menu>
    <Menu.Item key="0" icon={<UserOutlined />}>
      个人中心
    </Menu.Item>
    <Menu.Item key="1" icon={<SettingOutlined />}>
      个人设置
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3" icon={<LoginOutlined />}>
      退出登录
    </Menu.Item>
  </Menu>
);
type IProps = {};
const LayoutHeader: React.FC<IProps> = (props) => {
  const { userInfo } = useStores("commonStore");

  return (
    <div className="layout-header">
      <Dropdown overlay={menu}>
        <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
          {userInfo.nickname} <DownOutlined />
        </a>
      </Dropdown>
    </div>
  );
};

export default observer(LayoutHeader);

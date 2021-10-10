import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Menu, Button } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import layoutRoutes from "@/routes/layoutRoutes";
import { getStore, setStore } from "@/utils/storage";
import "./index.less";
const { SubMenu } = Menu;

class LayoutMenu extends React.Component<RouteComponentProps> {
  state = {
    collapsed: false,
    prevKey: "",
  };

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  routeToPage = ({ key, keyPath }: { key: string; keyPath: string[] }) => {
    // 防止重复点击MenuItem 避免多次re-render
    if (this.state.prevKey === key) {
      return;
    }
    this.state.prevKey = key;
    // 记录当前展开的菜单，刷新页面后，保持展开
    setStore({
      type: "session",
      key: "layoutMenuKeyPath",
      value: keyPath,
    });
    this.props.history.push(key);
  };

  render() {
    const keyPath = getStore({ type: "session", key: "layoutMenuKeyPath" });

    return (
      <div className="layout-menu">
        <div className="layout-menu-logo">LOGO</div>
        <Menu
          className="layout-menu-body"
          defaultSelectedKeys={[window.location.pathname ?? "/"]}
          defaultOpenKeys={keyPath}
          mode="inline"
          theme="dark"
          inlineCollapsed={this.state.collapsed}
          onClick={this.routeToPage}
        >
          {layoutRoutes?.map((item) =>
            item.routes?.length && item.path !== "/" ? (
              <SubMenu
                key={item.key}
                icon={
                  React.isValidElement(item.icon) ? (
                    item.icon
                  ) : (
                    <span className={`iconfont ${item.icon}`}></span>
                  )
                }
                title={item.name}
              >
                {item.routes.map((subItem) => (
                  <Menu.Item key={subItem.key}>{subItem.name}</Menu.Item>
                ))}
              </SubMenu>
            ) : (
              <Menu.Item key={item.key}>{item.name}</Menu.Item>
            )
          )}
        </Menu>
        <Button type="primary" onClick={this.toggleCollapsed}>
          {React.createElement(
            this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined
          )}
        </Button>
      </div>
    );
  }
}
export default withRouter(LayoutMenu);

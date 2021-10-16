import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Menu, Button, Layout } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import layoutRoutes from "@/routes/layoutRoutes";
import { getStore, setStore } from "@/utils/storage";
import "./index.less";
const { Sider } = Layout;
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
    const { collapsed } = this.state;
    return (
      <div
        className={
          this.state.collapsed
            ? "layout-menu--collapsed"
            : "layout-menu--extend"
        }
      >
        <Sider style={{ height: "100%" }} width={collapsed ? 48 : 200}>
          <div className="layout-menu">
            <div className="layout-menu-logo">LOGO</div>
            <Menu
              className="layout-menu-body"
              defaultSelectedKeys={[window.location.pathname ?? "/"]}
              defaultOpenKeys={keyPath}
              mode={collapsed ? "vertical" : "inline"}
              theme="dark"
              inlineCollapsed={collapsed}
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
                  <Menu.Item key={item.key} icon={item.icon}>
                    {item.name}
                  </Menu.Item>
                )
              )}
            </Menu>
            <div>
              <Button
                type="primary"
                onClick={this.toggleCollapsed}
                size="middle"
              >
                {React.createElement(
                  collapsed ? MenuUnfoldOutlined : MenuFoldOutlined
                )}
              </Button>
            </div>
          </div>
        </Sider>
      </div>
    );
  }
}
export default withRouter(LayoutMenu);

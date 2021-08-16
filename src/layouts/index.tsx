import React, { useEffect, useMemo, useRef, useState } from "react";
import { RouteConfigComponentProps, renderRoutes } from "react-router-config";
import { Layout, Menu } from "antd";
// import {} from
import { useStores } from "@/hooks";
import { toJS } from "mobx";
import styles from "./index.module.less";
import { observer } from "mobx-react";
import { MailOutlined } from "@ant-design/icons";
import classNames from "classnames";
import useClickOutside from "@/hooks/useClickOutside";
import { AppItem, MenuItem } from "@/stores/commonStore";

const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;
const Layouts: React.FC<RouteConfigComponentProps> = (props) => {
  const [menuActive, setMenuActive] = useState<boolean>(false);
  const siderRef = useRef(null);
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const commonStore = useStores("commonStore");
  useEffect(() => {
    if (!commonStore.userInfo.nickname) {
      props.history.replace("/login");
    }
    if (!commonStore.apps.length) {
      commonStore.getApps();
    }
  }, []);
  useClickOutside(siderRef, () => {
    setMenuActive(false);
  });
  console.log(toJS(commonStore).apps);
  console.log(`to`, toJS(commonStore).menu);
  const getShowMenu = (app: AppItem) => {
    const showMenu = commonStore.menu.filter((menu) => menu.appId === app.id);
    setMenu(showMenu);
    setMenuActive(true);
    console.log(`showMenu`, toJS(showMenu));
  };
  // menu-item点击时
  const handleMenuItemClick = (item: MenuItem, pItem: MenuItem) => {
    console.log(toJS(item), "item");
    console.log(toJS(pItem));
    props.history.push(`${pItem.path}/${item.path}`);
  };
  const { route } = props;

  const menuComponent = useMemo(() => {
    return (
      <Menu mode="inline">
        {menu.map((item) => (
          <SubMenu key={item.id} title={item.label}>
            {item.children.map((menuItem) => (
              <Menu.Item
                key={menuItem.id}
                onClick={() => handleMenuItemClick(menuItem, item)}
              >
                {menuItem.label}
              </Menu.Item>
            ))}
          </SubMenu>
        ))}
      </Menu>
    );
  }, [menu]);

  return (
    <Layout>
      <Sider className={styles.sider} width={100} ref={siderRef}>
        {commonStore.apps.map((app) => (
          <div
            key={app.id}
            className={styles.app}
            onClick={() => getShowMenu(app)}
          >
            {app.appName}
          </div>
        ))}
        <div
          className={[styles.menu, menuActive ? styles.active : ""].join(" ")}
        >
          {menuComponent}
        </div>
      </Sider>
      <Layout className={styles.layout}>
        <Header>Header</Header>
        <Content>{renderRoutes(route?.routes)}</Content>
      </Layout>
    </Layout>
  );
};

export default observer(Layouts);

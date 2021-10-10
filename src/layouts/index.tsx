import React, { useEffect, useMemo, useRef, useState } from "react";
import { RouteConfigComponentProps, renderRoutes } from "react-router-config";
import { Layout } from "antd";

import { useStores } from "@/hooks";
import { observer } from "mobx-react";
import LayoutMenu from "./LayoutMenu";
import LayoutHeader from "./LayoutHeader";
const { Header, Footer, Sider, Content } = Layout;

const Layouts: React.FC<RouteConfigComponentProps> = (props) => {
  const commonStore = useStores("commonStore");
  useEffect(() => {
    if (!commonStore.userInfo.nickname) {
      props.history.replace("/login");
    }
  }, []);

  const { route } = props;

  return (
    <Layout style={{ height: "100%" }}>
      <Sider>
        <LayoutMenu />
      </Sider>
      <Layout>
        <Header style={{ background: "#fff" }}>
          <LayoutHeader />
        </Header>
        <Content style={{ padding: 20 }}>{renderRoutes(route?.routes)}</Content>
      </Layout>
    </Layout>
  );
};

export default observer(Layouts);

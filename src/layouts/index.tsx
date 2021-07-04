import React, { useEffect, useState } from "react";
import { RouteConfigComponentProps, renderRoutes } from "react-router-config";
import { Layout } from "antd";
import { useStores } from "@/hooks";
const { Header, Footer, Sider, Content } = Layout;
const Layouts: React.FC<RouteConfigComponentProps> = React.memo((props) => {
  const commonStore = useStores("commonStore");
  useEffect(() => {
    if (!commonStore.apps.length) {
      commonStore.getApps();
    }
  }, []);
  const { route } = props;
  return (
    <Layout>
      <Sider
        style={{
          minHeight: "100vh",
        }}
      >
        Sider
      </Sider>
      <Layout>
        <Header>Header</Header>
        <Content>{renderRoutes(route?.routes)}</Content>
      </Layout>
    </Layout>
  );
});

export default Layouts;

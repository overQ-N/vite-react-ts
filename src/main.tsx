import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import zhCN from "antd/lib/locale/zh_CN";
import { ConfigProvider } from "antd";
import { BrowserRouter } from "react-router-dom";
import "@/styles/global.less";
import { renderRoutes, matchRoutes } from "react-router-config";
import routes from "./routes";
import stores from "./stores";

ReactDOM.render(
  <React.StrictMode>
    <Provider stores={stores}>
      <ConfigProvider locale={zhCN}>
        <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
      </ConfigProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

import React from "react";
import { Button } from "antd";
import { RouteComponentProps, withRouter } from "react-router-dom";
interface Props extends RouteComponentProps {}
const Product: React.FC<Props> = (props) => {
  const backHome = () => {
    props.history.push("/");
  };
  const goToProductMarket = () => {
    props.history.push("/ams/productMarket");
  };
  return (
    <div>
      <Button onClick={backHome}>回到首页</Button>
      <Button onClick={goToProductMarket}>去往ProductMarket</Button>
    </div>
  );
};

export default withRouter(Product);

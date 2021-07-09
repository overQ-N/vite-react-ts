import React from "react";
import { Button } from "antd";
import { RouteComponentProps, withRouter } from "react-router";
type Props = {} & RouteComponentProps;
const ProductMarket: React.FC<Props> = (props) => {
  const goToProduct = () => {
    props.history.push("/ams/product");
  };
  return (
    <div>
      ProductMarket
      <Button onClick={goToProduct}>去往product</Button>
    </div>
  );
};

export default withRouter(ProductMarket);

import React, { createRef } from "react";
import { Button } from "antd";
import { RouteComponentProps, withRouter } from "react-router";
type Props = {} & RouteComponentProps;
// const ChildBtn = (props) => {
//   <div>
//     <Button>你轻轻的来</Button>
//   </div>
// }

interface IEmpty {}
const ForwardCom = React.forwardRef(
  (props: IEmpty, ref: React.ForwardedRef<HTMLElement>) => (
    <Button ref={ref}>xxxx</Button>
  )
);
const ProductMarket: React.FC<Props> = (props) => {
  const goToProduct = () => {
    // props.history.push("/ams/product");
    console.log(``, ref.current);
  };
  const ref = createRef<HTMLElement>();
  return (
    <div>
      ProductMarket
      <Button onClick={goToProduct}>去往product</Button>
      <ForwardCom ref={ref}></ForwardCom>
    </div>
  );
};

export default withRouter(ProductMarket);

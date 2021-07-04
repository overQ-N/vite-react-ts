import React from "react";
import { Button } from "antd";
import { useStores } from "@/hooks";
import { withRouter, RouteComponentProps } from "react-router-dom";
interface Props extends RouteComponentProps {}
const Home: React.FC<Props> = (props) => {
  const commonStore = useStores("commonStore");
  if (!commonStore.userInfo.nickname) {
    props.history.replace("/login");
  }
  function goToMulPage() {
    console.log(import.meta.env.VITE_APP_API);
    // window.location.replace("/mul");
  }
  return (
    <div>
      <Button type="primary" onClick={goToMulPage}>
        test
      </Button>
    </div>
  );
};

export default withRouter(Home);

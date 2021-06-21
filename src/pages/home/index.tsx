import React from "react";
import { Button } from "antd";
const Home = () => {
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

export default Home;

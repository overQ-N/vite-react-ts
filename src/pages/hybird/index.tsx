import React, { useEffect } from "react";

const Hybird = () => {
  useEffect(() => {
    fetch("/upc/sysconfig/getFileServiceUrl")
      .then((res) => res.json())
      .then((res) => {
        console.log(`res`, res);
      });
  });
  return <div>Hybird</div>;
};

export default Hybird;

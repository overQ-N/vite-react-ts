import React, { useState } from "react";
import { Image } from "antd";
interface Props {
  src: string;
  preview?: string[];
}
const Img: React.FC<Props> = (props) => {
  const [visible, setVisible] = useState(false);
  const { src, preview } = props;
  const btn = <div>AAAA</div>;
  return (
    <>
      <Image
        preview={{
          visible: false,
        }}
        width={24}
        src={src}
        onClick={() => setVisible(true)}
      />
      <div style={{ display: "none" }}>
        <Image.PreviewGroup
          preview={{ visible, onVisibleChange: (vis) => setVisible(vis) }}
        >
          {preview?.map((v) => (
            <Image src={v} key={v} />
          ))}
        </Image.PreviewGroup>
      </div>
    </>
  );
};

export default Img;

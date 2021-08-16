import React from "react";
import { Modal } from "antd";
import styles from "../index.module.less";
interface Props {
  visible: boolean;
  toggleVis(vis: boolean): void;
}
const AddOrUpdate: React.FC<Props> = (props) => {
  const { visible, toggleVis } = props;
  const handleOk = () => {
    toggleVis(false);
  };
  const handleCancel = () => {
    toggleVis(false);
  };

  return (
    <Modal
      title="编辑款式"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      wrapClassName={styles.modalWrap}
    >
      <div></div>
    </Modal>
  );
};

export default AddOrUpdate;

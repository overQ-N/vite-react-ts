import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Select,
  Table,
  Checkbox,
  message,
  Popconfirm,
} from "antd";
import { ColumnsType } from "antd/es/table";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { findProdList, batchUpdateProdSnapUp, del } from "@/api/ams/product";
import Img from "@/components/Img";
import AddOrUpdate from "./components/addOrUpdate";
interface Product {
  ageBand: string;
  amsCode: string;
  category: string;
  colorNames: string;
  isSnapUp: number;
  prodCode: string;
  objectFileList: { fileName: string }[];
  [key: string]: any;
}
interface Props extends RouteComponentProps {}
const Product: React.FC<Props> = (props) => {
  const [data, setData] = useState<Product[]>([]);
  const [addOrUpdateVis, setAddOrUpdateVis] = useState<boolean>(false);
  const goToProductMarket = () => {
    props.history.push("/ams/productMarket");
  };
  const fetchData = async () => {
    const { data: res } = await findProdList({
      current: 1,
      size: 20,
    });
    if (res.code === 0) {
      setData(res.data.list);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: Product[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
  };
  const columns: ColumnsType<Product> = [
    {
      dataIndex: "picSrcUuid",
      key: "picSrcUuid",
      title: "图片",
      render: (val, record) => (
        <Img
          src={val}
          preview={record.objectFileList.map((v) => v.fileName)}
        ></Img>
      ),
    },
    {
      dataIndex: "isSnapUp",
      title: "是否秒杀款",
      width: 100,
      render: (val, record, idx) => (
        <Checkbox
          defaultChecked={!!val}
          onChange={async (e) => {
            console.log(e);
            const { checked } = e.target;
            try {
              const fd = new FormData();
              fd.append("prodIds", record.id);
              fd.append("isSnapUp", checked ? "1" : "0");
              const { data: res } = await batchUpdateProdSnapUp(fd);
              if (res.code === 0) {
                message.success("操作成功");
              }
            } catch (error) {}
          }}
        ></Checkbox>
      ),
    },
    {
      dataIndex: "prodCode",
      title: "款号",
    },
    {
      dataIndex: "amsCode",
      title: "设计号",
    },
    {
      dataIndex: "colorNames",
      title: "颜色",
    },
    {
      dataIndex: "sizeGrpCode",
      title: "尺码组",
    },
    {
      dataIndex: "sizeDesc",
      title: "尺码",
    },
    {
      dataIndex: "brand",
      title: "品牌",
    },
    {
      dataIndex: "category",
      title: "大类",
    },
    {
      dataIndex: "prodClassSub",
      title: "小类",
    },
    {
      dataIndex: "prodClass",
      title: "品类",
    },
    {
      dataIndex: "series",
      title: "系列",
    },
    {
      dataIndex: "prodStyle",
      title: "风格",
    },
    {
      dataIndex: "currencyPrice",
      title: "定货价",
    },
    {
      dataIndex: "marketYear",
      title: "上市年份",
      width: 80,
      ellipsis: true,
    },
    {
      dataIndex: "marketMonth",
      title: "上市月份",
      width: 80,
      ellipsis: true,
    },
    {
      dataIndex: "season",
      title: "上市季节",
      width: 80,
      ellipsis: true,
    },
    {
      dataIndex: "actions",
      fixed: "right",
      title: "操作",
      width: 200,
      render: (_, record) => (
        <div>
          <Button
            size="small"
            type="link"
            onClick={() => {
              setAddOrUpdateVis(true);
            }}
          >
            编辑
          </Button>
          <Popconfirm
            title="确认删除?"
            onConfirm={async () => {
              try {
                const { data: res } = await del(record.id);
                if (res.code === 0) {
                  message.success("删除成功");
                  fetchData();
                }
              } catch (error) {}
            }}
          >
            <Button size="small" type="link">
              删除
            </Button>
          </Popconfirm>

          <Button size="small" type="link">
            一键复制
          </Button>
        </div>
      ),
    },
  ];
  return (
    <div
      style={{
        padding: 10,
        background: "#fff",
      }}
    >
      <Form size="small" layout="inline" autoComplete="off">
        <Form.Item name="amsCode">
          <Input placeholder="设计号" allowClear></Input>
        </Form.Item>
        <Form.Item name="prodCode">
          <Input placeholder="款号" allowClear></Input>
        </Form.Item>
        <Form.Item>
          <Select
            placeholder="是否有图"
            allowClear
            style={{
              width: 200,
            }}
            options={[
              {
                label: "有图",
                value: 1,
                key: "1",
              },
              {
                label: "无图",
                value: 0,
                key: "0",
              },
            ]}
          ></Select>
        </Form.Item>
      </Form>
      <Table
        size="small"
        columns={columns}
        rowKey="id"
        bordered
        dataSource={data}
        rowSelection={rowSelection}
        scroll={{
          x: 2000,
        }}
      ></Table>
      <AddOrUpdate
        visible={addOrUpdateVis}
        toggleVis={(vis) => setAddOrUpdateVis(vis)}
      />
    </div>
  );
};

export default withRouter(Product);

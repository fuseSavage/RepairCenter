import React, { useEffect, useState } from "react";
// import ReactDOM from 'react-dom';
import { Pie } from "@ant-design/plots";

import { FetchDetailAll } from "../../services";
import { Typography } from "antd";

const { Title } = Typography;

export default function DemoPie() {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    const getDetail = async () => {
      await FetchDetailAll().then((response) => {
        if (response.data) {
          setDatas(response.data);
        }
      });
    };
    getDetail();
  }, []);

//   console.log("all", datas);

  let carlist = [];
  let motolist = [];
  let agirculturelist = [];
  let totol = [];

  if (datas !== null) {
    for (let i = 0; i < datas.length; i++) {
      if (datas[i].device_type === "รถยนต์") {
        // console.log(datas[i].device_type);
        carlist.push(datas[i].device_type);
      }
      if (datas[i].device_type === "รถจักรยานยนต์") {
        motolist.push(datas[i].device_type);
      }
      if (datas[i].device_type === "อุปกรณ์การเกษตร") {
        agirculturelist.push(datas[i].device_type);
      }
      totol.push(datas[i]);
    }
  }

  const data = [
    {
      type: "รถยนต์",
      value: carlist.length,
    },
    {
      type: "อุปกรณ์การเกษตร",
      value: agirculturelist.length,
    },
    {
      type: "รถจักรยานยนต์",
      value: motolist.length,
    },
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.8,
    label: {
      type: "outer",
    },
    // 自定义状态样式
    state: {
      active: {
        style: {
          lineWidth: 0,
          fillOpacity: 0.65,
        },
      },
    },
    // 添加 element 选中和激活交互
    interactions: [
      {
        type: "element-single-selected",
      },
      {
        type: "element-active",
      },
    ],
  };
  return (
    <>
      <Pie {...config} />
      <Title level={5}>การซ่อมทั้งระบบ {totol.length} รายการ</Title>
    </>
  );
}

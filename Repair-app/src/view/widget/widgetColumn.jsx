import React, { useState, useEffect } from "react";
import { Bar } from "@ant-design/plots";
import { Col, Row, Typography } from "antd";

// // Import services
import { FetctDetailByGarage } from "../../services";

const { Title } = Typography;

export default function DemoBar() {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    const getDetailByGarage = async () => {
      let local = {
        garageID: JSON.parse(localStorage.getItem("user")).userData.userId,
      };
      // console.log("local", local);
      // console.log(local);
      await FetctDetailByGarage(local).then(async (response) => {
        await setDatas(response.data);
      });
    };
    getDetailByGarage();
  }, []);

  let repairSum = [];
  let succeed = [];
  let notSucceed = [];

  if (datas !== null) {
    for (let i = 0; i < datas.length; i++) {
      // console.log(datas[i].status)
      repairSum.push(datas[i].length);

      if (datas[i].status === "อยู่ระหว่างการซ่อม") {
        notSucceed.push(datas[i].status);
        // console.log(datas[i].status)
      }
      if (datas[i].status === "สำเร็จ") {
        succeed.push(datas[i].status);
      }
    }
  }

  const data = [
    {
      type: "การซ่อมทั้งหมด",
      value: repairSum.length,
    },
    {
      type: "สำเร็จ",
      value: succeed.length,
    },
    {
      type: "กำลังซ่อม",
      value: notSucceed.length,
    },
  ];
  const config = {
    data,
    xField: "value",
    yField: "type",
    seriesField: "type",
    legend: {
      position: "top-right",
    },
  };
  return (
    <>
      <Row>
        <Col span={24}>
          <Title level={4}>สรุปการซ่อม</Title>
        </Col>
      </Row>
      <Bar {...config} />
    </>
  );
}

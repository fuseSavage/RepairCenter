import React, { useEffect, useState } from "react";

import { Row, Col, Typography, Select } from "antd";

// import Component
import Car from "../../component/car";
import Agriculture from "../../component/agriculture";
import Motorcycle from "../../component/motorcycle";

const { Title, Text } = Typography;
const { Option } = Select;

export default function App() {
  const [typeSelect, setTypeSelect] = useState();
  const [checkLocal, setChechLocal] = useState(null);

  useEffect(() => {
    // console.log("local", localStorage.getItem("user"));
    setChechLocal(JSON.parse(localStorage.getItem("user")));
  }, []);

  let MainContent;

  if (typeSelect === "รถยนต์") {
    MainContent = <Car typeSelect={typeSelect} checkLocal={checkLocal} />;
  } else if (typeSelect === "รถจักรยานยนต์") {
    MainContent = (
      <Motorcycle typeSelect={typeSelect} checkLocal={checkLocal} />
    );
  } else if (typeSelect === "อุปกรณ์การเกษตร") {
    MainContent = (
      <Agriculture typeSelect={typeSelect} checkLocal={checkLocal} />
    );
  } else {
    MainContent = null;
  }
  return (
    <>
      <Row>
        <Col span={24} style={{padding: '5%'}}>
          <Title level={3}>เพิ่มการซ่อม</Title>
        </Col>

        <Col span={24}>
          <div className="div-content-repairadd">
            <Col className="main-select-repair">
              <Title level={5}>ประเภทของอุปกรณ์</Title>

              <Row>
                <Col
                  xs={{ span: 1, offset: 1 }}
                  lg={{ span: 4, offset: 2 }}
                ></Col>
                <Col xs={{ span: 19, offset: 1 }} lg={{ span: 8, offset: 2 }}>
                  <div className="div-select">
                    <Select
                      allowClear
                      style={{ width: "100%" }}
                      placeholder="กรุณาเลือกประเภท"
                      onChange={(e) => {
                        setTypeSelect(e);
                      }}
                    >
                      <Option value="รถยนต์">รถยนต์</Option>
                      <Option value="รถจักรยานยนต์">รถจักรยานยนต์</Option>
                      <Option value="อุปกรณ์การเกษตร">อุปกรณ์การเกษตร</Option>
                    </Select>
                  </div>
                </Col>
                <Col
                  xs={{ span: 1, offset: 1 }}
                  lg={{ span: 4, offset: 2 }}
                ></Col>
              </Row>
            </Col>
            <div style={{ display: "flex", marginTop: "10px" }}>
              <Title style={{ color: "red" }} level={5}>
                หมายเหตุ : &nbsp;
              </Title>
              <Text>
                ในการเพิ่มการซ่อมเเต่ละครั้งลูกค้าจำเป็นต้องสมัครสมาชิกก่อนทุกครั้ง
              </Text>
            </div>

            {MainContent}
          </div>
        </Col>
      </Row>
    </>
  );
}

import React from "react";
import { Row, Col, Typography } from "antd";

import GoogleMaps from "./googleMaps";

const { Title, Text } = Typography;
// const { Search } = Input;

export default function App() {

  return (
    <>
      <Row gutter={[0, 32]}>
        <Col xs={{ span: 24 }} lg={{ span: 24 }} className="w-auto bg-freecar ">
          <Row className="div-p-5" gutter={[0, 32]}>
            <Col span={24}>
              <Title level={2}>
                <Text style={{ color: "#aaabb8" }}>
                  ร้านซ่อมที่มีในระบบทั้งหมด
                </Text>
              </Title>
            </Col>

            <Col span={24}>
              <Text style={{ color: "#a4b3b6" }}>
                ระบบจะแสดงร้านซ่อมที่มีในระบบทั้งหมด
                โดยทุกร้านได้ทำการสมัครเข้าร่วมกับระบบ Repair Center
                ระบบจัดการร้านซ่อม เรียบร้อยแล้ว
              </Text>
            </Col>

            
          </Row>
        </Col>
      </Row>

      <Row style={{ padding: "2% 15% 2% 15%" }}>
        <Col className="border" span={24}>
          <GoogleMaps />
        </Col>
      </Row>
    </>
  );
}

import React from "react";

import { Link } from "react-router-dom";

import { Row, Col, Typography } from "antd";

const { Title, Text } = Typography;

function App() {
  return (
    <Row className="footer-content">
      <Col
        xs={{ span: 11, offset: 1 }}
        lg={{ span: 6, offset: 2 }}
        className="Col-footer"
      >
        <div className="box1">
          <Col span={24} className="box1-box-title">
            <Title level={3} style={{ color: "rgb(189, 189, 189)" }}>
              Repair Center
            </Title>
            <Text style={{ color: "rgb(189, 189, 189)" }}>
              ระบบจัดการร้านซ่อมและศูนย์บริการ
            </Text>
          </Col>
        </div>
      </Col>

      <Col
        xs={{ span: 11, offset: 1 }}
        lg={{ span: 12, offset: 4 }}
        className="Col-footer"
      >
        <div className="box2">
          <Link to={"/register"}>
          <Row className="box2-button">
            <Col span={24} className="bt2-register">
            ลงทะเบียนออนไลน์ทันที
            </Col>
          </Row>
          </Link>
        </div>
      </Col>
    </Row>
  );
}

export default App;

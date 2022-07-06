import React from "react";

import { Row, Col, Typography, Select } from "antd";

const { Title } = Typography;
const { Option } = Select;

export default function App() {
  return (
    <>
      <Row gutter={[0, 32]} className="div-p-5">
        <Col span={24}>
          <Row>
            <Col xs={{ span: 2 }} lg={{ span: 6 }}></Col>
            <Col xs={{ span: 20 }} lg={{ span: 12 }}>
              <Title level={4}>ค้นหาตามสถานะ </Title>
              <div className="div-select">
                <Select
                  allowClear
                  style={{ width: "100%" }}
                  placeholder="กรุณาเลือกสถานะ"
                  onChange={(e) => {
                    // setTypeSelect(e);
                  }}
                >
                  <Option value="สำเร็จ">สำเร็จ</Option>
                  <Option value="อยู่ระหว่างการซ่อม">อยู่ระหว่างการซ่อม</Option>
                </Select>
              </div>
            </Col>
            <Col xs={{ span: 2 }} lg={{ span: 6 }}></Col>
          </Row>
        </Col>

        <Col span={24}>test</Col>
      </Row>
    </>
  );
}

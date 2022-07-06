import React from "react";

import { Row, Col, Typography } from "antd";

// icon
import {
  SearchOutlined,
  CloudServerOutlined,
  ControlOutlined,
  ToolOutlined,
  PieChartOutlined,
  SmileOutlined,
  LikeOutlined,
  PushpinOutlined,
  CommentOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

function App() {
  return (
    <Row gutter={[0, 16]} className="content-box">
      <Col span={24} className="box-text-title">
        <Title level={4}>คุณสมบัติของระบบ</Title>
      </Col>

      <Col
        xs={{ span: 24 }}
        lg={{ span: 7, offset: 1 }}
        className="Col-content"
      >
        <div>
          <CloudServerOutlined style={{ fontSize: "250%" }} />
          <Title level={5}> จัดเก็บข้อมูเข้าสู่ระบบส่วนกลาง </Title>
          <Text>
            การจัดเก็บข้อมูลเข้าส่วนกลางทำให้สามารถแชร์ฐานข้อมูลให้กับร้านค้าที่มีอยู่ในระบบ
          </Text>
        </div>
      </Col>
      <Col
        xs={{ span: 24 }}
        lg={{ span: 7, offset: 1 }}
        span={8}
        className="Col-content"
      >
        <div>
          <SearchOutlined style={{ fontSize: "250%" }} />
          <Title level={5}> ติดตามสถานะการซ่อม </Title>
          <Text>
            การจัดเก็บข้อมูลเข้าส่วนกลางทำให้ลูกค้าสามารถรู้ถึงสถานะงานซ่อมแต่ละงานได้โดยไม่ต้องออกไปตามถึงหน้างาน
          </Text>
        </div>
      </Col>
      <Col
        xs={{ span: 24 }}
        lg={{ span: 7, offset: 1 }}
        span={8}
        className="Col-content"
      >
        <div>
          <ControlOutlined style={{ fontSize: "250%" }} />
          <Title level={5}> ลดขั้นตอนในการทำงาน </Title>
          <Text>
            ช่วยลดขั้นตอนของการทำงานลงเมื่อต้องตรวจเช็คสภาพอุปกรณ์ที่นำมาซ่อมอย่างละเอียดอีกครั้ง
          </Text>
        </div>
      </Col>

      <Col
        xs={{ span: 24 }}
        lg={{ span: 7, offset: 1 }}
        className="Col-content"
      >
        <div>
          <ToolOutlined style={{ fontSize: "250%" }} />
          <Title level={5}> จัดการการซ่อม </Title>
          <Text>
            บันทึกข้อมูลของการซ่อมแต่ละครั้งเข้าระบบส่วนกลาง
            เพื่อแชร์ฐานข้อมูลและง่ายต่อการซ่อมในครั้งถัดไป
          </Text>
        </div>
      </Col>
      <Col
        xs={{ span: 24 }}
        lg={{ span: 7, offset: 1 }}
        className="Col-content"
      >
        <div>
          <PieChartOutlined style={{ fontSize: "250%" }} />
          <Title level={5}> ชุดรายงานที่ครอบคลุม </Title>
          <Text>
            มีชุดรายงานที่ครอบคลุม จัดเป็นหมวดหมู่ แสดงผลสวยงาม
            ตอบสนองทุกมุมมองของทางร้าน
          </Text>
        </div>
      </Col>
      <Col
        xs={{ span: 24 }}
        lg={{ span: 7, offset: 1 }}
        className="Col-content"
      >
        <div>
          <CommentOutlined style={{ fontSize: "250%" }} />
          <Title level={5}> แจ้งปัญหากับผู้ดูแลระบบ </Title>
          <Text>
            หากพบปัญหาการใช้งาน สามารถแจ้งปัญหากับผู้ดูแลระบบได้โดยตรง
          </Text>
        </div>
      </Col>

      <Col
        xs={{ span: 24 }}
        lg={{ span: 7, offset: 1 }}
        className="Col-content"
      >
        <div>
          <PushpinOutlined style={{ fontSize: "250%" }} />
          <Title level={5}> ค้นหาร้านซ่อม </Title>
          <Text>
            ลูกค้าสามารถค้นหาร้านซ่อมที่อยู่ในระบบเพื่อให้ลูกค้ามาใช้บริการที่ร้านซ่อมได้ถูก
            และทำให้ดึงดูดลูกค้าให้มาใช้บริการร้านของท่าน
          </Text>
        </div>
      </Col>
      <Col
        xs={{ span: 24 }}
        lg={{ span: 7, offset: 1 }}
        className="Col-content"
      >
        <div>
          <LikeOutlined style={{ fontSize: "250%" }} />
          <Title level={5}> ง่ายต่อการใช้งาน </Title>
          <Text>
            รูปแบบของระบบมีความเรียบง่าย สามารถใช้งานได้ง่ายและเรียนรู้การทำงานได้ไว
          </Text>
        </div>
      </Col>
      <Col
        xs={{ span: 24 }}
        lg={{ span: 7, offset: 1 }}
        className="Col-content"
      >
        <div>
          <SmileOutlined style={{ fontSize: "250%" }} />
          <Title level={5}> สามารถใช้งานได้ฟรี </Title>
          <Text>
            ผู้ใช้สามารถใช้งานระบบได้ฟรีโดยไม่มีค่าใช้จ่าย
            และสามารถลงทะเบียนออนไลน์ได้ทันที
          </Text>
        </div>
      </Col>
    </Row>
  );
}

export default App;

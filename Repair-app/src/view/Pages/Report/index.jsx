import React from "react";

import { Row, Col, Typography, Form, Input, Button, Select, Modal } from "antd";

import { CommentOutlined } from "@ant-design/icons";

// Import services
import { InsertReport } from "../../../services";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 24,
    },
    md: {
      span: 24,
    },
    lg: {
      span: 24,
    },
    xl: {
      span: 24,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 24,
    },
    md: {
      span: 24,
    },
    lg: {
      span: 24,
    },
    xl: {
      span: 24,
    },
  },
};

const { Option } = Select;

const { Title } = Typography;
/* eslint-enable no-template-curly-in-string */

export default function App() {
  const onFinish = (values) => {
    InsertReport(values).then((response) => {
      Modal.info({
        title: "เรียบร้อย",
        content: `แจ้งปัญหาการใช้งานเรียบร้อยแล้ว`,
        onOk: () => {
          setTimeout(() => {
            window.location.reload(false)
          }, 1);
        }
      });
    })
  };

  return (
    <>
      <Row gutter={[0, 32]}>
        <Col
          xs={{ span: 24 }}
          lg={{ span: 8 }}
          className="w-100 bg-theme display-flex-center"
        >
          <Col>
            <CommentOutlined style={{ color: "#a4b3b6", fontSize: "1000%" }} />

            <Title level={2} style={{ color: "#a4b3b6" }}>
              แจ้งปัญหาการใช้งาน
            </Title>
          </Col>
        </Col>

        <Col
          xs={{ span: 24 }}
          lg={{ span: 16 }}
          className="display-flex-center"
        >
          <Row>
            <Col span={24}>
              <Title level={4}>แจ้งปัญหาการใช้งาน</Title>
            </Col>
            <Form {...formItemLayout} name="nest-messages" onFinish={onFinish}>
              {/* Garage type ประเภทของร้านซ่อม */}
              <Form.Item
                name="party"
                label="ผู้ใช้งานที่แจ้งรายงาน"
                tooltip="เลือกประเภทของผู้ใช้"
                rules={[
                  {
                    required: true,
                    message: "กรุณาเลือกประเภทของร้านซ่อมของคุณ!",
                  },
                ]}
              >
                <Select
                  allowClear
                  style={{ width: "100%" }}
                  placeholder="Please select"
                >
                  <Option value="garage">ร้านซ่อมหรือศูนย์บริการ</Option>
                  <Option value="member">ลูกค้าสมาชิก</Option>
                </Select>
              </Form.Item>

              {/* User Name  ชื่อ-นามสกุล */}
              <Form.Item
                name="user_report"
                label="User ID"
                tooltip="ร้านซ่อมให้ใช้ ๊User ID  **หากเป็นลูกค้าให้ใช้เบอร์โทรศัพท์ที่ใช้สมัคร member"
                rules={[
                  {
                    required: true,
                    message: "กรุณาระบุ User ID ของคุณ!",
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              {/* User Name  ชื่อ-นามสกุล */}
              <Form.Item
                name="username"
                label="ชื่อ-นามสกุล"
                tooltip="ชื่อ-นามสกุล ของผู้ที่แจ้งปัญหา"
                rules={[
                  {
                    required: true,
                    message: "กรุณาระบุ ชื่อ-นามสกุล ของคุณ!",
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item name="report_detail" label="ปัญหาที่จะรายงาน">
                <Input.TextArea showCount maxLength={200} />
              </Form.Item>

              <Form.Item
                name="report_tel"
                label="หมายเลขโทรศัพท์ที่ติดติดต่อได้"
              >
                <Input />
              </Form.Item>

              <Form.Item wrapperCol={{ ...formItemLayout.wrapperCol }}>
                <Button className="bt-them" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Row>
        </Col>
      </Row>
    </>
  );
}

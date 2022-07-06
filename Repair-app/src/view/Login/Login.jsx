// import liff from "@line/liff";
import React from "react";

import { Form, Input, Button, Row, Col, Modal, Typography, Steps } from "antd";

import {
  LoginOutlined,
  SolutionOutlined,
  LoadingOutlined,
  SmileOutlined,
} from "@ant-design/icons";

import { sendLogin } from "../../services";

const { Title } = Typography;
const { Step } = Steps;

function App() {

  const onFinish = (values) => {
    const data = {
      garageID: values.garageID,
      password: values.password,
    };

    sendLogin(data).then((response) => {
      if (response.code === 200) {
        setTimeout(() => {
          window.location.reload(false);
        }, 1000);
      } else if (response.code === 205) {
        Modal.info({
          title: (
            <Title level={4}>ร้านซ่อมของท่านกำลังรอการอนุมัติจากระบบ</Title>
          ),
          content: (
            <Steps style={{ padding: "5%" }}>
              <Step
                status="finish"
                title="ลงทะเบียน"
                icon={<SolutionOutlined />}
              />
              <Step
                status="process"
                title="อยู่ระหว่างการตรวจสอบ"
                icon={<LoadingOutlined />}
              />
              <Step status="wait" title="สำเร็จ" icon={<SmileOutlined />} />
            </Steps>
          ),
          width: "900px",
        });
      } else if (response.code === 202) {
        setTimeout(() => {
          window.location.reload(false);
        }, 1000);
      } else {
        Modal.info({
          title: "ไม่มีผู้ใช้นี้ในระบบ",
          content: `กรุณาตรวจสอบ UserID / รหัสผ่าน ของท่าน`,
        });
      }
    });
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
            <LoginOutlined style={{ color: "#a4b3b6", fontSize: "1000%" }} />

            <Title level={2} style={{ color: "#a4b3b6" }}>
              เข้าสู่ระบบร้านค้า
            </Title>
          </Col>
        </Col>

        <Col
          xs={{ span: 24 }}
          lg={{ span: 16 }}
          className="display-flex-center"
        >
          <Row>
            <Form
              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item
                label="User ID"
                name="garageID"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอก User ID ของคุณ!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="รหัสผ่าน"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกรหัสผ่านของคุณ!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item>
                <Button className="bt-them" htmlType="submit">
                  ยืนยัน
                </Button>
              </Form.Item>
            </Form>
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default App;

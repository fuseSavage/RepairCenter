import React from "react";
import { Col, Form, Row, Typography, Input, Divider, Button, Modal } from "antd";

import { UserAddOutlined } from "@ant-design/icons";

// Import Services
import { InsertMember } from "../../../services";

const { Title } = Typography;

export default function AddMember() {
  // console.log(JSON.parse(localStorage.getItem("user")).userData.garageName);

  let garageName = JSON.parse(localStorage.getItem("user")).userData.garageName;
  let userID = JSON.parse(localStorage.getItem("user")).userData.userId;

  const onFinish = (values) => {
    // console.log("values", values);
    let addresss = {
      address_details: values.address_details,
      sub_district: values.sub_district,
      district: values.district,
      province: values.province,
      poscode: values.poscode,
    };
    let newAddress = JSON.stringify(addresss);
    let data = {
      party: "member",
      garageID: userID,
      member_tel: values.member_tel,
      member_name: values.member_name,
      member_ads: newAddress,
      shop_register: garageName,
    };
    // console.log("data", data);

    InsertMember(data).then((response) => {
      if (response) {
        if (response.code === 200) {
          Modal.info({
            title: "เรียบร้อยแล้ว",
            content: `สมัครสมาชิกให้ลูกค้าเรียบร้อยแล้ว`,
            onOk: () => {window.location.reload(false)}
          });
        } else {
          // console.log("response", response.message);
          Modal.info({
            title: "มีลูกค้าสมาชิกนี้แล้ว",
            content: `ลูกค้ารหัส ${values.member_tel} นี้ สมัครสมาชิกแล้ว กรุณาตรวจสอบอีกที`,
          });
        }
      }
    });

    // console.log("values", JSON.parse(data.memeber_ads));
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
            <UserAddOutlined style={{ color: "#a4b3b6", fontSize: "1000%" }} />

            <Title level={2} style={{ color: "#a4b3b6" }}>
              ลงทะเบียนลูกค้า
            </Title>
          </Col>
        </Col>

        <Col
          xs={{ span: 24 }}
          lg={{ span: 16 }}
          className="display-flex-center"
        >
          <Row>
            <Form onFinish={onFinish}>
              <Col span={16} offset={2}>
                <Divider orientation="left">
                  <b>ข้อมูลลูกค้า</b>
                </Divider>
                <Form.Item
                  label="หมายเลขโทรศัพท์"
                  name="member_tel"
                  tooltip="หมายเลขโทรศัพท์ของลูกค้าที่ใช้สมัครนี้
                  จะถูกนำไปใช้เป็นรหัสหลักของลูกค้าในการค้นหาการซ่อมในระบบต่อไป"
                  rules={[
                    {
                      required: true,
                      message: "กรุณากรอกหมายเลขโทรศัพท์ของลูกค้า!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                {/* <Text style={{ color: "red" }}>
                    *หมายเลขโทรศัพท์ของลูกค้าที่ใช้สมัครนี้
                    จะถูกนำไปใช้เป็นรหัสหลักของลูกค้าในการค้นหาการซ่อมในระบบต่อไป
                  </Text> */}
              </Col>

              <Col span={16} offset={2}>
                <Form.Item
                  label="ชื่อ-นามสกุล"
                  name="member_name"
                  rules={[
                    {
                      required: true,
                      message: "กรุณากรอก ชื่อ-นามสกุล ของลูกค้า!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col span={16} offset={2}>
                <Divider orientation="left">
                  <b>ข้อมูลที่อยู่ลูกค้า</b>
                </Divider>
                <Form.Item
                  label="รายละเอียดที่อยู่"
                  name="address_details"
                  rules={[
                    {
                      required: true,
                      message: "กรุณากรอกรายละเอียดที่อยู่ของลูกค้า!",
                    },
                  ]}
                >
                  <Input.TextArea showCount maxLength={100} />
                </Form.Item>
              </Col>

              <Col span={16} offset={2}>
                <Row>
                  <Col xs={24} lg={{ span: 10, offset: 1 }}>
                    <Form.Item
                      label="ตำบล"
                      name="sub_district"
                      rules={[
                        {
                          required: true,
                          message: "กรุณากรอกรายละเอียดที่อยู่ของลูกค้า!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} lg={{ span: 11, offset: 1 }}>
                    <Form.Item
                      label="อำเภอ"
                      name="district"
                      rules={[
                        {
                          required: true,
                          message: "กรุณากรอกรายละเอียดที่อยู่ของลูกค้า!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>

              <Col span={16} offset={2}>
                <Row>
                  <Col xs={24} lg={{ span: 10, offset: 1 }}>
                    <Form.Item
                      label="จังหวัด"
                      name="province"
                      rules={[
                        {
                          required: true,
                          message: "กรุณากรอกรายละเอียดที่อยู่ของลูกค้า!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} lg={{ span: 11, offset: 1 }}>
                    <Form.Item
                      label="รหัสไปรษณีย์"
                      name="poscode"
                      rules={[
                        {
                          required: true,
                          message: "กรุณากรอกรายละเอียดที่อยู่ของลูกค้า!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
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

import React, { useState } from "react";
// import axios from "axios";
import {
  Form,
  Input,
  Select,
  Row,
  Col,
  Button,
  Divider,
  TimePicker,
  Typography,
  Modal,
} from "antd";
import moment from "moment";

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

import { Registion } from "../../services";

let newLatLng = [{ lat: 15.118524429823255, lng: 104.9075726928711 }];

const onMarkerDragEnd = (event) => {
  newLatLng[0].lat = event.latLng.lat();
  newLatLng[0].lng = event.latLng.lng();
  // console.log("newLat", newLatLng[0].lat, "newLng", newLatLng[0].lng);
};

const MapWithAMarker = withScriptjs(
  withGoogleMap(() => (
    <GoogleMap defaultZoom={15} defaultCenter={newLatLng[0]}>
      <Marker
        draggable={true}
        position={newLatLng[0]}
        onDragEnd={(e) => onMarkerDragEnd(e)}
      />
    </GoogleMap>
  ))
);

const { Option } = Select;
const { Title } = Typography;

//Main Function
export default function RegistrationForm() {
  const [ontime, setOnTime] = useState();
  const [offtime, setOffTime] = useState();

  const [form] = Form.useForm();

  const onFinish = (values) => {
    const data = {
      party: "garage",
      garageID: values.userID,
      password: values.password,
      user_name: values.username,
      garage_name: values.garagename,
      email: values.email,
      garage_type: values.garagetype,
      address_number: values.addressnumber,
      moo: values.moo,
      alley: values.alley,
      road: values.road,
      sub_district: values.subdistrict,
      district: values.district,
      province: values.province,
      pos_code: values.poscode,
      address_map: [newLatLng[0].lat, newLatLng[0].lng],
      on_time: ontime,
      off_time: offtime,
      tel: values.phone,
      confirmation: "non-approved",
    };

    Registion(data).then((response) => {
      if (response) {
        if (response.code === 200) {
          Modal.info({
            title: "เรียบร้อยแล้ว",
            content: `ได้รับข้อมูลของร้านท่านแล้ว ระบบจะทำการตรวจสอบข้อมูลของร้านและยืนการเข้าร่วมกับระบบ โดยจะแจ้งไปยังอีเมลล์ของท่านที่ได้ลงทะเบียนไว้`,
            onOk: () => {
              window.location.reload(false);
            },
          });
        } else {
          Modal.info({
            title: "มีสมาชิกนี้แล้ว",
            content: `user ID นี้ สมัครสมาชิกแล้ว กรุณาตรวจสอบอีกที`,
          });
        }
      }
    });
  };

  const handleOnTime = (time, timeString) => {
    setOnTime(timeString);
  };

  const handleOffTime = (time, timeString) => {
    setOffTime(timeString);
  };

  return (
    <>
      <Row>
        <Col span={24}>
          <div style={{ padding: "2%" }}>
            <Title>ลงทะเบียนร้านซ่อม</Title>
          </div>
          <Divider orientation="left">
            <Title level={4}>รายละเอียดของร้าน</Title>
          </Divider>

          <Form
            form={form}
            name="register"
            onFinish={onFinish}
            scrollToFirstError
          >
            <div style={{ padding: "2% 10% 2% 10%" }}>
              <Row gutter={[0, 16]}>
                {/* User ID */}
                <Col
                  xs={24}
                  md={{ span: 11, offset: 1 }}
                  lg={{ span: 11, offset: 1 }}
                >
                  <Form.Item
                    name="userID"
                    label="User ID"
                    tooltip="User ID เพื่อใช้ในการเข้าระบบในครั้งต่อไป"
                    rules={[
                      {
                        required: true,
                        message: "กรุณาระบุ userID ของคุณ",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>

                {/* Password  รหัสผ่าน*/}
                <Col
                  xs={24}
                  md={{ span: 11, offset: 1 }}
                  lg={{ span: 11, offset: 1 }}
                >
                  <Form.Item
                    name="password"
                    label="รหัสผ่าน"
                    rules={[
                      {
                        required: true,
                        message: "กรุณาใส่รหัสผ่านของคุณ!",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input.Password minLength={6} />
                  </Form.Item>
                </Col>

                {/* confirm Password  ยืนยันรหัสผ่าน */}
                <Col
                  xs={24}
                  md={{ span: 11, offset: 1 }}
                  lg={{ span: 11, offset: 1 }}
                >
                  <Form.Item
                    name="confirm"
                    label="ยืนยันรหัสผ่าน"
                    dependencies={["password"]}
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: "กรุณายืนยันรหัสผ่านของคุณ!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }

                          return Promise.reject(
                            new Error("รหัสผ่านทั้งสองที่คุณป้อนไม่ตรงกัน!")
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password minLength={6} />
                  </Form.Item>
                </Col>

                {/* User Name  ชื่อ-นามสกุล */}
                <Col
                  xs={24}
                  md={{ span: 11, offset: 1 }}
                  lg={{ span: 11, offset: 1 }}
                >
                  <Form.Item
                    name="username"
                    label="ชื่อ-นามสกุล"
                    tooltip="ชื่อเจ้าของร้าน หรือผู้ที่ได้รับผิดชอบ"
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
                </Col>

                {/* Garage Name ชื่อร้านซ่อม */}
                <Col
                  xs={24}
                  md={{ span: 11, offset: 1 }}
                  lg={{ span: 11, offset: 1 }}
                >
                  <Form.Item
                    name="garagename"
                    label="ชื่อร้านซ่อม"
                    tooltip="ชื่อร้านซ่อม หรืออู่ซ่อมรถ"
                    rules={[
                      {
                        required: true,
                        message: "กรุณาระบุ ชื่อร้านซ่อม หรืออู่ซ่อมรถ ของคุณ!",
                        whitespace: true,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>

                {/* Gmail */}
                <Col
                  xs={24}
                  md={{ span: 11, offset: 1 }}
                  lg={{ span: 11, offset: 1 }}
                >
                  <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                      {
                        type: "email",
                        message: "ข้อมูลที่ป้อนไม่ถูกต้อง ตามรูปแบบ E-mail!",
                      },
                      {
                        required: true,
                        message: "กรุณาใส่อีเมลของคุณ!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>

                {/* Garage type ประเภทของร้านซ่อม */}
                <Col
                  xs={24}
                  md={{ span: 11, offset: 1 }}
                  lg={{ span: 11, offset: 1 }}
                >
                  <Form.Item
                    name="garagetype"
                    label="ประเภทของร้านซ่อม"
                    tooltip="เลือกประเภทของร้านซ่อม (สามารถเลือกได้มากกว่าหนึ่งประเภท)"
                    rules={[
                      {
                        required: true,
                        message: "กรุณาเลือกประเภทของร้านซ่อมของคุณ!",
                      },
                    ]}
                  >
                    <Select
                      mode="multiple"
                      allowClear
                      style={{ width: "100%" }}
                      placeholder="Please select"
                    >
                      <Option value="ศูนย์บริการรถยนต์">
                        ศูนย์บริการรถยนต์
                      </Option>
                      <Option value="อู่ซ่อมรถยนต์">อู่ซ่อมรถยนต์</Option>
                      <Option value="ศูนย์บริการรถจักรยานยนต์">
                        ศูนย์บริการรถจักรยานยนต์
                      </Option>
                      <Option value="อู่ซ่อมรถจักรยานยนต์">
                        อู่ซ่อมรถจักรยานยนต์
                      </Option>
                      <Option value="ร้านบริการซ่อมอุปกรณ์การเกษตร">
                        ร้านบริการซ่อมอุปกรณ์การเกษตร
                      </Option>
                    </Select>
                  </Form.Item>
                </Col>

                {/* หมายเลขโทรศัพท์ */}
                <Col
                  xs={24}
                  md={{ span: 11, offset: 1 }}
                  lg={{ span: 11, offset: 1 }}
                >
                  <Form.Item
                    name="phone"
                    label="หมายเลขโทรศัพท์"
                    rules={[
                      {
                        required: true,
                        message: "กรุณาใส่หมายเลขโทรศัพท์ของคุณ!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>

                {/* เวลาที่ร้านเปิด */}
                <Col
                  xs={24}
                  md={{ span: 11, offset: 1 }}
                  lg={{ span: 11, offset: 1 }}
                >
                  <Form.Item
                    style={{ marginTop: "20px" }}
                    label="เวลาที่ร้านเปิด-ปิด"
                    rules={[
                      {
                        // required: true,
                        // message: "กรุณาระบุเวลาเปิด-ปิดร้านของคุณ",
                      },
                    ]}
                  >
                    <Row>
                      <Col span={11}>
                        <TimePicker
                          defaultOpenValue={moment("00:00:00", "HH:mm:ss")}
                          onChange={handleOnTime}
                        />
                      </Col>
                      <Col span={2}>-</Col>
                      <Col span={11}>
                        <TimePicker
                          defaultOpenValue={moment("00:00:00", "HH:mm:ss")}
                          onChange={handleOffTime}
                        />
                      </Col>
                    </Row>
                  </Form.Item>
                </Col>
              </Row>
            </div>

            <Divider orientation="left">
              <Title level={4}>รายละเอียดที่อยู่ของร้าน</Title>
            </Divider>

            <div style={{ padding: "2% 10% 2% 10%" }}>
              <Row gutter={[0, 16]}>
                {/* Addess Number บ้านเลขที่*/}
                <Col
                  xs={24}
                  md={{ span: 11, offset: 1 }}
                  lg={{ span: 11, offset: 1 }}
                >
                  <Form.Item
                    name="addressnumber"
                    label="ตั้งอยู่เลขที่"
                    rules={[
                      {
                        required: true,
                        message: "กรุณาระที่อยู่ให้ครบ!",
                        whitespace: true,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>

                {/* หมู่ที่ */}
                <Col
                  xs={24}
                  md={{ span: 11, offset: 1 }}
                  lg={{ span: 11, offset: 1 }}
                >
                  <Form.Item
                    name="moo"
                    label="หมู่ที่"
                    rules={[
                      {
                        required: true,
                        message: "กรุณาระที่อยู่ให้ครบ!",
                        whitespace: true,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>

                {/* ตรอก/ซอย */}
                <Col
                  xs={24}
                  md={{ span: 11, offset: 1 }}
                  lg={{ span: 11, offset: 1 }}
                >
                  <Form.Item
                    name="alley"
                    label="ตรอก/ซอย"
                    rules={[
                      {
                        required: true,
                        message: "กรุณาระที่อยู่ให้ครบ!",
                        whitespace: true,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>

                {/* ถนน */}
                <Col
                  xs={24}
                  md={{ span: 11, offset: 1 }}
                  lg={{ span: 11, offset: 1 }}
                >
                  <Form.Item
                    name="road"
                    label="ถนน"
                    rules={[
                      {
                        required: true,
                        message: "กรุณาระที่อยู่ให้ครบ!",
                        whitespace: true,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>

                {/* ตำบล/แขวง */}
                <Col
                  xs={24}
                  md={{ span: 11, offset: 1 }}
                  lg={{ span: 11, offset: 1 }}
                >
                  <Form.Item
                    name="subdistrict"
                    label="ตำบล/แขวง"
                    rules={[
                      {
                        required: true,
                        message: "กรุณาระที่อยู่ให้ครบ!",
                        whitespace: true,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>

                {/* อำเภอ/เขต */}
                <Col
                  xs={24}
                  md={{ span: 11, offset: 1 }}
                  lg={{ span: 11, offset: 1 }}
                >
                  <Form.Item
                    name="district"
                    label="อำเภอ/เขต"
                    rules={[
                      {
                        required: true,
                        message: "กรุณาระที่อยู่ให้ครบ!",
                        whitespace: true,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>

                {/* จังหวัด */}
                <Col
                  xs={24}
                  md={{ span: 11, offset: 1 }}
                  lg={{ span: 11, offset: 1 }}
                >
                  <Form.Item
                    name="province"
                    label="จังหวัด"
                    rules={[
                      {
                        required: true,
                        message: "กรุณาระที่อยู่ให้ครบ!",
                        whitespace: true,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>

                {/* รหัสไปรษณีย์ */}
                <Col
                  xs={24}
                  md={{ span: 11, offset: 1 }}
                  lg={{ span: 11, offset: 1 }}
                >
                  <Form.Item
                    name="poscode"
                    label="รหัสไปรษณีย์"
                    rules={[
                      {
                        required: true,
                        message: "กรุณาระที่อยู่ให้ครบ!",
                        whitespace: true,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
            </div>

            <Divider orientation="left">
              <Title level={4}>เลือกตำแหน่งที่อยู่ของร้าน</Title>
            </Divider>

            <div style={{ padding: "2% 10% 2% 10%" }}>
              <Row gutter={[0, 16]}>
                <Col xs={24} lg={{ span: 16, offset: 1 }}>
                  <MapWithAMarker
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBKBdBAnDzrOkcfHq9InQFfYM7Inig-Zeg&v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: "100%" }} />}
                    containerElement={<div style={{ height: "450px" }} />}
                    mapElement={<div style={{ height: "100%" }} />}
                  />
                </Col>
              </Row>
            </div>
            <Col span={24}>
              <Form.Item>
                <Button
                  className="bt-them"
                  htmlType="submit"
                  style={{ marginTop: "30px" }}
                >
                  ยืนยันการสมัคร
                </Button>
              </Form.Item>
            </Col>
          </Form>
        </Col>
      </Row>
    </>
  );
}

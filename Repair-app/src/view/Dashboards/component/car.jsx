import React, { useEffect, useState } from "react";

import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Select,
  Divider,
  Modal,
  DatePicker,
} from "antd";

// import services
import {
  FetchThaiAddress,
  FetchMemberTel,
  InsertDetails,
} from "../../../services";

import Brand from "../repairDashboard/repairAdd/data/brand.json";

// const { Title, Text } = Typography;
const { Option } = Select;

export default function App(props) {
  const { typeSelect, checkLocal } = props;

  // UseState
  const [province, setProvinec] = useState([]);
  const [member, setMember] = useState([]);

  useEffect(() => {
    const getThaiAddress = async () => {
      await FetchThaiAddress().then((response) => {
        if (response) {
          setProvinec(response.data);
        }
      });
    };
    getThaiAddress();

    const getMemberTel = async () => {
      await FetchMemberTel().then((response) => {
        if (response) {
          // console.log("Member", response.data);
          response.data.forEach((element) => {
            setMember((arr) => [...arr, element.member_tel]);
          });
        }
      });
    };
    getMemberTel();
  }, []);

  // console.log("Member", member);

  const [form] = Form.useForm();
  const onFinish = (values) => {
    let dd = values.repair_date._d.getDate();
    let mm = values.repair_date._d.getMonth() + 1;
    let yyyy = values.repair_date._d.getFullYear();

    let newDate = `${dd}/${mm}/${yyyy}`;
    // dates;

    const data = {
      garageID: checkLocal.userData.userId,
      member_tel: values.member_tel,
      device_type: typeSelect,
      car_number: values.car_number,
      car_province: values.car_province,
      brand: values.brand,
      model: values.model,
      kilo_number: values.kilo_number,
      repair_date: newDate,
      repair_details: values.repair_details,

      status: "อยู่ระหว่างการซ่อม",
      price: 0,
      spare_parts_list: null,
      status_payment: "ยังไม่ได้ชำระ",
      equipment: null,
    };

    if (member.includes(values.member_tel) === true) {
      InsertDetails(data).then((response) => {
        Modal.info({
          title: "สำเร็จ",
          content: `เพิ่มการซ่อมสำเร็จ`,
          onOk: () => {
            setTimeout(() => {
              window.location.reload(false);
            }, 1);
          },
        });
      });
    } else {
      Modal.info({
        title: "ลูกค้ายังไม่ได้สมัครสมาชิก",
        content: `หมายเลข ${values.member_tel} นี้ ยังไม่ได้สมัครสมาชิก กรุณาสมัครสมาชิกก่อนเพิ่มการซ่อม `,
      });
    }
  };

  return (
    <>
      <Divider />
      <Row>
        <Col span={24}>
          <div className="div-content-main">
            <Form
              form={form}
              name="register"
              onFinish={onFinish}
              initialValues={{
                residence: ["zhejiang", "hangzhou", "xihu"],
                prefix: "86",
              }}
              scrollToFirstError
            >
              <div className="main-content-repair">
                {/* หมายเลขโทรศัพท์ของลูกค้า */}
                <Col
                  xs={{ span: 20, offset: 2 }}
                  md={{ span: 16, offset: 4 }}
                  xl={{ span: 12, offset: 6 }}
                >
                  <Form.Item
                    name="member_tel"
                    label="รหัสลูกค้า"
                    tooltip="หมายเลขโทรศัพท์ของลูกค้าที่สมัครสมาชิกไว้เรียบร้อยแล้ว"
                    rules={[
                      {
                        required: true,
                        message: "กรุณากรอกรหัสของลูกค้า!",
                        whitespace: true,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>

                <Row gutter={[0, 16]}>
                  {/* หมายเลขทะเบียนรถ */}
                  <Col
                    xs={24}
                    md={{ span: 11, offset: 1 }}
                    xl={{ span: 7, offset: 1 }}
                  >
                    <Form.Item
                      name="car_number"
                      label="ทะเบียนรถ"
                      tooltip="หมายเลขทะเบียนรถ"
                      rules={[
                        {
                          required: true,
                          message: "กรุณากรอกหมายเลขทะเบียนรถ!",
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
                    xl={{ span: 7, offset: 1 }}
                  >
                    <Form.Item
                      name="car_province"
                      label="จังหวัด"
                      tooltip="ทะเบียนจังหวัด"
                      rules={[
                        {
                          required: true,
                          message: "กรุณาเลือกทะเบียนจังหวัด!",
                          whitespace: true,
                        },
                      ]}
                    >
                      <Select
                        allowClear
                        style={{ width: "100%" }}
                        placeholder="เลือกจังหวัด"
                        // onChange={(e) => {
                        //   setTypeSelect(e);
                        // }}
                      >
                        {province.length !== 0 ? (
                          <>
                            {province.map((api, index) => (
                              <Option key={index} value={api.province}>
                                {api.province}
                              </Option>
                            ))}
                          </>
                        ) : null}
                      </Select>
                    </Form.Item>
                  </Col>

                  {/* ยี่ห้อ */}
                  <Col
                    xs={24}
                    md={{ span: 11, offset: 1 }}
                    xl={{ span: 7, offset: 1 }}
                  >
                    <Form.Item
                      name="brand"
                      label="ยี่ห้อ"
                      tooltip="ยี่ห้อของรถ"
                      rules={[
                        {
                          required: true,
                          message: "กรุณาเลือกยี่ห้อของรถ!",
                          whitespace: true,
                        },
                      ]}
                    >
                      <Select
                        allowClear
                        style={{ width: "100%" }}
                        placeholder="เลือกยี่ห้อ"
                      >
                        {Brand.length !== 0 ? (
                          <>
                            {Brand.type.car.map((brand, index) => (
                              <Option key={index} value={brand}>
                                {brand}
                              </Option>
                            ))}
                          </>
                        ) : null}
                      </Select>
                    </Form.Item>
                  </Col>

                  {/* รุ่น Model */}
                  <Col
                    xs={24}
                    md={{ span: 11, offset: 1 }}
                    xl={{ span: 7, offset: 1 }}
                  >
                    <Form.Item
                      name="model"
                      label="รุ่น"
                      tooltip="รุ่นของรถ"
                      rules={[
                        {
                          required: true,
                          message: "กรุณากรอกรุ่นของรถ!",
                          whitespace: true,
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>

                  {/* รุ่น Kilo Number */}
                  <Col
                    xs={24}
                    md={{ span: 11, offset: 1 }}
                    xl={{ span: 7, offset: 1 }}
                  >
                    <Form.Item
                      name="kilo_number"
                      label="หมายเลขกิโล"
                      tooltip="หมายเลขกิโลของรถ ณ วันที่ซ่อม"
                      rules={[
                        {
                          required: true,
                          message: "กรุณากรอกหมายเลขกิโล!",
                          whitespace: true,
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>

                  {/* วันที่ รับรถ */}
                  <Col
                    xs={24}
                    md={{ span: 11, offset: 1 }}
                    xl={{ span: 7, offset: 1 }}
                  >
                    <Form.Item
                      label="วันที่รับรถ"
                      name="repair_date"
                      tooltip="เลือกวันที่รับรถ"
                    >
                      <DatePicker />
                    </Form.Item>
                  </Col>

                  {/* รายละเอียดการซ่อมเบื้องต้น */}
                  <Col xs={4} md={4} xl={4}></Col>
                  <Col xs={16} md={16} xl={16}>
                    <Form.Item
                      name="repair_details"
                      label="รายละเอียดการซ่อมเบื้องต้น"
                      tooltip="รายละเอียดการซ่อมเบื้องต้น"
                    >
                      <Input.TextArea />
                    </Form.Item>
                    <Form.Item>
                      <Button className="bt-them" htmlType="submit">
                        เพิ่มการซ่อม
                      </Button>
                    </Form.Item>
                  </Col>
                  <Col xs={4} md={4} xl={4}></Col>
                </Row>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </>
  );
}

import React, { useEffect, useState } from "react";

import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Divider,
  DatePicker,
  Modal,
} from "antd";

// import services
import { FetchMemberTel, InsertDetails } from "../../../services";

// const { Title, Text } = Typography;

export default function App(props) {
  const { typeSelect, checkLocal } = props;

  // UseState
  const [member, setMember] = useState([]);

  useEffect(() => {
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
      equipment: values.equipment,
      brand: values.brand,
      repair_date: newDate,
      repair_details: values.repair_details,

      car_number: null,
      car_province: null,
      model: null,
      kilo_number: null,
      status: "อยู่ระหว่างการซ่อม",
      price: 0,
      spare_parts_list: null,
      status_payment: "ยังไม่ได้ชำระ",
    };

    // console.log('test data', data)

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
                  {/* ชนิดของอุปกรณ์ */}
                  <Col
                    xs={24}
                    md={{ span: 11, offset: 1 }}
                    xl={{ span: 7, offset: 1 }}
                  >
                    <Form.Item
                      name="equipment"
                      label="ประเภทอุปกรณ์"
                      tooltip="ประเภทของอุปกรณ์ เช่น เครื่องสูบน้ำ หรือเครื่องตัดหญ้า"
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

                  {/* ยี่ห้อ */}
                  <Col
                    xs={24}
                    md={{ span: 11, offset: 1 }}
                    xl={{ span: 7, offset: 1 }}
                  >
                    <Form.Item
                      name="brand"
                      label="ยี่ห้อ"
                      tooltip="ยี่ห้อของอุปกรณ์การเกษตร"
                      rules={[
                        {
                          required: true,
                          message: "กรุณาระบุยี่ห้อของอุปกรณ์การเกษตร!",
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
                      label="วันที่รับซ่อม"
                      name="repair_date"
                      tooltip="เลือกวันที่รับซ่อม"
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

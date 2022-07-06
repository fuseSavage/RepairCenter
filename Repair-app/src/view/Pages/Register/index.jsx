import React, { useState } from "react";

import { Row, Col, Typography, Checkbox, Form, Modal, Button } from "antd";

import { useHistory } from "react-router-dom";

const { Title, Text } = Typography;

export default function App() {
  let history = useHistory();

  const [chechBox, setCheckBox] = useState(false);

  const handleSubmit = () => {
    if (chechBox === false) {
      // alert("กรุณาอ่านข้อกำหนดและเงื่อนไขในการให้บริการ!!");
      Modal.info({
        title: "ข้อกำหนดและเงื่อนไข",
        content: `กรุณาอ่านข้อกำหนดและเงื่อนไขในการใช้บริการ`,
      });
    } else {
      history.push("/register/registion");
    }
  };

  return (
    <>
      <Row>
        <Col span={24} className="box-main-title">
          <Col className="box-register-title">
            <Title level={4}>
              เงื่อนไขการใช้บริการ และนโยบายความเป็นส่วนตัว
            </Title>

            <div className="div-register-text">
              <Title level={5}>เงื่อนไขการใช้บริการ </Title>
              <Text>
                ข้อตกลงให้การใช้บริการตามคําขอ
                เป็นไปตามข้อกําหนดและเงื่อนไขดังต่อไปนี้
              </Text>

              <div className="content-text">
                <Text strong style={{ color: "red" }}>
                  ข้อ 1. การตกลงยอมรับข้อกำหนดและเงื่อนไข
                </Text>
                <br />
                <Text style={{ marginTop: "8px" }}>
                  (1)
                  ผู้ใช้บริการทุกรายจะต้องใช้บริการตามข้อกำหนดที่ระบุไว้ในข้อกำหนดและเงื่อนไข
                  ผู้ใช้บริการจะไม่สามารถใช้บริการได้
                  เว้นเสียแต่ว่าผู้ใช้บริการได้ตกลงยอมรับข้อกำหนดและเงื่อนไข
                  การตกลงยอมรับดังกล่าวมีผลสมบูรณ์และเพิกถอนมิได้
                </Text>
                <br />
                <Text>
                  (2) กรณีมีข้อกำหนดและเงื่อนไขเพิ่มเติมสำหรับบริการ
                  ผู้ใช้บริการจะต้องปฏิบัติตามข้อกำหนดและเงื่อนไขเพิ่มเติมนั้นด้วยเช่นเดียวกับข้อกำหนดและเงื่อนไขนี้
                </Text>
              </div>

              <div className="content-text">
                <Text strong style={{ color: "red" }}>
                  ข้อ 2. การแก้ไขข้อกำหนดและเงื่อนไข
                </Text>
                <br />
                <Text style={{ marginTop: "8px" }}>
                  (1) ทางระบบ Repair Center ขอสงวนสิทธิในการแก้ไข เปลี่ยนแปลง
                  เพิ่มเติม ตัดทอน
                  บรรดาข้อกำหนดและเงื่อนไขการใช้บริการใดๆที่กำหนดไว้ ณ.ที่นี้
                  ผู้ใช้บริการมีหน้าที่ติดตามการแก้ไขเปลี่ยนแปลงต่างๆ อยู่เสมอ
                  และหากภายหลังการแก้ไขเปลี่ยนแปลง
                  ผู้ใช้บริการยังคงใช้บริการอยู่
                  ถือว่าผู้ใช้บริการได้อ่านและเข้าใจ
                  จึงได้ยอมรับตามข้อกำหนดและเงื่อนไขการใช้บริการที่ได้มีการเปลี่ยนแปลงนี้อย่างไม่มีเงื่อนไข
                  ผู้ใช้บริการไม่อาจอ้างเหตุในการไม่ทราบถึงการเปลี่ยนแปลงข้อกำหนดและเงื่อนการใช้บริการมาเป็นเหตุในการฝ่าฝืนข้อกำหนดและเงื่อนไขนี้ได้
                </Text>
              </div>

              <div className="content-text">
                <Form>
                  <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                      {
                        validator: (_, value) =>
                          value
                            ? Promise.resolve()
                            : Promise.reject(
                                new Error(
                                  "กรุณาคลิ๊กที่ช่องว่าง เพื่อยอมรับข้อตกลง"
                                )
                              ),
                      },
                    ]}
                  >
                    <Checkbox
                      onChange={(e) => {
                        setCheckBox(e.target.checked);
                      }}
                    >
                      <Text>
                        ฉันได้อ่านข้อกำหนดและเงื่อนไขในการให้บริการแล้ว
                        และยอมรับข้อกำหนดและเงื่อนไขทุกการ
                      </Text>
                    </Checkbox>
                  </Form.Item>
                </Form>
              </div>
              <div className="div-button-submit">
                <Button className="bt-them" onClick={handleSubmit}>
                  ยืนยัน
                </Button>
              </div>
            </div>
          </Col>
        </Col>
      </Row>
    </>
  );
}

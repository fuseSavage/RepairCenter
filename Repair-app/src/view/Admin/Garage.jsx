import React, { useState, useEffect } from "react";

import { Collapse, Col, Row, Typography, Divider, Avatar, Image } from "antd";

import { RightCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

// import services
import { FetchGarageAll } from "../../services";

// import Image
import GarageIcon from "../../assets/icons/garage.png";

const { Title, Text } = Typography;
const { Panel } = Collapse;

function Garage() {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    const getGarage = () => {
      FetchGarageAll().then((response) => {
        if (response.data) {
          setDatas(response.data);
          //  console.log('data', response.data)
        }
        // console.log('data', response)
      });
    };
    getGarage();

  }, []);

  // function callback(key) {
  //   // console.log(key);
  // }

  const genExtra = (id, data) => (
    <Link
      to={{
        pathname: "/admin/all-garage/detail",
        state: {
          garageID: id,
          data: data,
        },
      }}
    >
      <RightCircleOutlined />
    </Link>
  );

  // const detailGarage = (id) => {
  //   console.log("id", id);
  // };

  return (
    <>
      <Row className="div-p-5">
        <Col span={24}>
          <Title level={3}> รายชื่อร้านซ่อมทั้งหมด </Title>
        </Col>

        {/* defaultActiveKey={["0"]} */}

        <Col span={24}>
          <Collapse >
            {datas.length !== 0 ? (
              <>
                {datas.map((val, index) => {
                  return (
                    <>
                      <Panel
                        header={
                          <>
                            <Avatar
                              src={
                                <Image
                                  src={GarageIcon}
                                  style={{ width: 30, paddingRight: "3px" }}
                                />
                              }
                            />
                            {val.garage_name}
                          </>
                        }
                        key={index}
                        extra={genExtra(val.garageID, val)}
                      >
                        <Row gutter={[0, 16]} className="text-left">
                          <Divider orientation="left" plain>
                            รายละเอียดร้านซ่อม
                          </Divider>

                          <Col xs={24} lg={{ span: 7, offset: 1 }}>
                            <Text style={{ fontWeight: "bold" }}>
                              ชื่อร้าน :{" "}
                            </Text>
                            <Text>{val.garage_name} </Text>
                          </Col>

                          <Col xs={24} lg={{ span: 7, offset: 1 }}>
                            <Text style={{ fontWeight: "bold" }}>
                              ชื่อ-สกุล :{" "}
                            </Text>
                            <Text>{val.user_name} </Text>
                          </Col>

                          <Col xs={24} lg={{ span: 7, offset: 1 }}>
                            <Text style={{ fontWeight: "bold" }}>
                              E-Mail :{" "}
                            </Text>
                            <Text>{val.email} </Text>
                          </Col>

                          <Col xs={24} lg={{ span: 7, offset: 1 }}>
                            <Text style={{ fontWeight: "bold" }}>
                              ประเภทร้านซ่อม :{" "}
                            </Text>
                            <Text>
                              {JSON.parse(val.garage_type).join(",  ")}{" "}
                            </Text>
                          </Col>

                          <Col xs={24} lg={{ span: 7, offset: 1 }}>
                            <Text style={{ fontWeight: "bold" }}>
                              เวลาเปิด - ปิด :{" "}
                            </Text>
                            <Text>
                              {val.on_time} - {val.off_time}{" "}
                            </Text>
                          </Col>

                          <Col xs={24} lg={{ span: 7, offset: 1 }}>
                            <Text style={{ fontWeight: "bold" }}>
                              เบอร์โทรศัพท์ :{" "}
                            </Text>
                            <Text>{val.tel} </Text>
                          </Col>

                          <Col xs={24} lg={{ span: 15, offset: 1 }}>
                            <Text style={{ fontWeight: "bold" }}>
                              ที่อยู่ :{" "}
                            </Text>
                            <Text>
                              {val.address_number} หมู่ {val.moo} ซอย{" "}
                              {val.alley} ถนน {val.road} ต.{val.sub_district} อ.
                              {val.district} จ.{val.province} {val.pos_code}{" "}
                            </Text>
                          </Col>
                        </Row>
                        <Divider />
                      </Panel>
                    </>
                  );
                })}
              </>
            ) : null}
          </Collapse>
        </Col>
      </Row>
    </>
  );
}

export default Garage;

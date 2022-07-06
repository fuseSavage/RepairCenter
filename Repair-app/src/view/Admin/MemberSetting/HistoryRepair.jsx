import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { Card, Col, Row, Avatar, Image, Typography, Collapse } from "antd";

// import Service
import { FetchDetailByMember, FetchAllSpare } from "../../../services";

const { Text, Title } = Typography;
const { Panel } = Collapse;

function HistoryRepair() {
  let location = useLocation();
  const Ndata = location.state.data;

  //set useState
  const [datas, setDatas] = useState([]);
  const [spares, setSpares] = useState([]);

  // console.log("tel", Ndata.member_tel);

  useEffect(() => {
    let data = {
      member_tel: Ndata.member_tel,
    };
    const getDetailByMember = async () => {
      if (data.member_tel !== undefined) {
        await FetchDetailByMember(data).then(async (response) => {
          await setDatas(response.data);
          // console.log("data", response.data);
        });
      } else {
        setDatas([]);
      }
    };
    getDetailByMember();

    const getAllSpare = async () => {
      await FetchAllSpare().then((response) => {
        if (response.data) {
          setSpares(response.data);
        }

        // console.log("spares", response.data);
      });
    };
    getAllSpare();
  }, [Ndata]);

  return (
    <>
      <Row>
        <Col span={24} className="div-p-5 text-left">
          <Card
            title={
              <>
                <Avatar
                  src={<Image src={Ndata.imageUrl} style={{ width: 32 }} />}
                />{" "}
                <Text strong>{Ndata.member_name}</Text> {<br />}
              </>
            }
          >
            {datas.length !== 0 ? (
              <>
                {datas.map((val, index) => {
                  return (
                    <>
                      {/* defaultActiveKey={["1"]} */}
                      <Collapse>
                        <Panel
                          header={
                            <>
                              {val.device_type === "รถยนต์" ||
                              val.device_type === "รถจักรยานยนต์" ? (
                                <Col>
                                  <Row>
                                    <Title level={5}>{val.device_type}</Title>
                                  </Row>
                                  <Row>
                                    <Text>
                                      {val.car_number} {val.car_province}
                                    </Text>
                                  </Row>
                                </Col>
                              ) : (
                                <Col>
                                  <Row>
                                    <Title level={5}>{val.device_type}</Title>
                                  </Row>
                                  <Row>
                                    <Text>{val.equipment}</Text>
                                  </Row>
                                </Col>
                              )}
                            </>
                          }
                          key="1"
                          extra={
                            <>
                              <Col>
                                <Row>
                                  <Text>
                                    <b>รับซ่อมเมื่อ</b> {val.repair_date}
                                  </Text>
                                </Row>
                                <Row>
                                  <Text>{val.status}</Text>
                                </Row>
                              </Col>
                            </>
                          }
                        >
                          {/* Content */}
                          <div>
                            <Row gutter={[0, 16]}>
                              <Col xs={24} lg={{ span: 11, offset: 1 }}>
                                <Text>
                                  <b>ร้านซ่อม :</b> {val.garage_name}
                                </Text>
                              </Col>
                              <Col xs={24} lg={{ span: 11, offset: 1 }}>
                                <Text>
                                  <b>การซ่อมเบื้องต้น :</b> {val.repair_details}
                                </Text>
                              </Col>
                              <Col xs={24} lg={{ span: 16, offset: 1 }}>
                                <Text>
                                  <b>รายละเอียดการซ่อม</b>
                                </Text>
                                <br />
                                {spares.length !== 0 ? (
                                  <>
                                    {spares.map((data, index) => {
                                      return (
                                        <>
                                          {/* {val.detailsID} */}
                                          {/* {data.detailsID} */}
                                          {val.detailsID === data.detailsID ? (
                                            <>
                                              <Row>
                                                <Col
                                                  lg={{ span: 11, offset: 1 }}
                                                >
                                                  <Text>
                                                    -{" "}
                                                    {
                                                      JSON.parse(data.spare)
                                                        .spareName
                                                    }
                                                  </Text>
                                                </Col>
                                              </Row>
                                            </>
                                          ) : null}
                                        </>
                                      );
                                    })}
                                  </>
                                ) : null}
                              </Col>
                            </Row>
                          </div>
                        </Panel>
                      </Collapse>
                    </>
                  );
                })}
              </>
            ) : null}
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default HistoryRepair;

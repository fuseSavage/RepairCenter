import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Col, Row, Card, Typography, Avatar, Image } from "antd";

// import Service
import { FetchDetailByMember } from "../../../services";

import IconGarage from '../../../assets/icons/garage.png'

const { Text } = Typography;

export default function ContentSearch(props) {
  //set useState
  const [datas, setDatas] = useState([]);

  const { tel } = props;

  useEffect(() => {
    let data = {
      member_tel: tel,
    };
    const getDetailByMember = async () => {
      if (tel !== undefined) {
        await FetchDetailByMember(data).then(async (response) => {
          await setDatas(response.data);
          // console.log('data', response.data[0])
        });
      } else {
        setDatas([]);
      }
    };
    getDetailByMember();
  }, [tel]);

  console.log("datas", datas, "tel", tel);

  return (
    <>
      <Row gutter={[0, 16]}>
        {datas !== undefined ? (
          <>
            {datas.map((val, index) => {
              return (
                <Col
                  xs={24}
                  md={{ span: 11, offset: 1 }}
                  lg={{ span: 7, offset: 1 }}
                  className="border left"
                >
                  <Card
                    type="inner"
                    title={<> <Avatar
                      src={<Image src={IconGarage} style={{ width: 32 }} />}
                    /> {val.garage_name}    {val.repair_date}</>}
                    extra={
                      <Link
                        to={{
                          pathname: "/dashboard/search-repair/details",
                          state: {
                            detailID: val.detailsID,
                            memberTel: val.member_tel,
                          },
                        }}
                      >
                        <Text style={{ color: "blue" }}>เพิ่มเติม</Text>
                      </Link>
                    }
                  >
                    <Text>
                      <b>ประเภท : </b>
                      {val.device_type}
                    </Text>
                    <br />
                    {val.device_type === "รถยนต์" ||
                    val.device_type === "รถจักรยานยนต์" ? (
                      <>
                        <Text>
                          <b>ทะเบียนรถ : </b>
                          {val.car_number} {val.car_province}
                        </Text>
                        <br />
                        <Text>
                          <b>ยี่ห้อ / รุ่น : </b>
                          {val.brand} {val.model}
                        </Text>
                        <br />
                      </>
                    ) : (
                      <>
                        <Text>
                          <b>ชนิด : </b>
                          {val.equipment}
                        </Text>
                        <br />
                        <Text>
                          <b>ยี่ห้อ / รุ่น : </b>
                          {val.brand}
                        </Text>
                        <br />
                      </>
                    )}

                    <Text>
                      <b>การซ่อมเบื้องต้น : </b>
                      {val.repair_details}
                    </Text>
                  </Card>
                </Col>
              );
            })}
          </>
        ) : null}
      </Row>
    </>
  );
}

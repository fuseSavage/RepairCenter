import React, { useEffect, useState } from "react";

import { Col, Divider, Row, Typography, Avatar, Image } from "antd";
import { MobileOutlined, DollarOutlined } from "@ant-design/icons";

// import Service
import { FetctDetailByGarageID } from "../../../services";

// import { useLocation } from "react-router-dom";

const { Text, Title } = Typography;

export default function App(props) {
  const detailID = props;

  //set useState
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    const getDetailByGarage = async () => {
      await FetctDetailByGarageID(detailID).then(async (response) => {
        await setDatas(response.data[0]);
        // console.log('data', response.data[0])
      });
    };
    getDetailByGarage();
  }, [detailID]);

  // console.log(datas);

  return (
    <>
      <div className="div-title-detail">
        <Row gutter={[0, 32]} className="title-show-detail">
          <Col xs={24} md={{ span: 11, offset: 1 }} lg={{ span: 7, offset: 1 }}>
            <Text className="color-bfbf">ชื่ออุปกรณ์</Text>
            <Title level={4} className="color-fff">
              {/* <Text className="color-fff">{datas.brand} {datas.model}</Text> */}
              {datas.device_type === "รถจักรยานยนต์" ||
              datas.device_type === "รถยนต์" ? (
                <>
                  <Text className="color-fff">
                    {datas.brand} {datas.model}
                  </Text>
                </>
              ) : (
                <>
                  <Text className="color-fff">{datas.equipment}</Text>
                </>
              )}
            </Title>
            <Text className="color-fff">{datas.device_type}</Text>
          </Col>

          <Col xs={24} md={{ span: 11, offset: 1 }} lg={{ span: 7, offset: 1 }}>
            <Text className="color-bfbf">ทะเบียน / ชนิด</Text>
            {/* <Title level={4} className="color-fff">
              <Text className="color-fff">{datas.car_number}</Text>
            </Title>
            <Text className="color-fff">{datas.car_province}</Text> */}
            {datas.device_type === "รถจักรยานยนต์" ||
            datas.device_type === "รถยนต์" ? (
              <>
                <Title level={4} className="color-fff">
                  <Text className="color-fff">{datas.car_number}</Text>
                </Title>
                <Text className="color-fff">{datas.car_province}</Text>
              </>
            ) : (
              <>
                <Title level={4} className="color-fff">
                  <Text className="color-fff">{datas.equipment}</Text>
                </Title>
              </>
            )}
          </Col>

          <Col xs={24} md={{ span: 11, offset: 1 }} lg={{ span: 7, offset: 1 }}>
            <Text className="color-bfbf">ลูกค้า</Text>
            <br /> <br />
            <Avatar
              src={<Image src={datas.imageUrl} style={{ width: 32 }} />}
            />
            <Title level={4} className="color-fff">
              <Text className="color-fff">คุณ {datas.member_name}</Text>
            </Title>
            <Text className="color-fff">
              <MobileOutlined />
              {datas.member_tel}
            </Text>
          </Col>

          <Col xs={24} md={{ span: 11, offset: 1 }} lg={{ span: 7, offset: 1 }}>
            <Text className="color-bfbf">วันที่รับซ่อม</Text>
            <Title level={4} className="color-fff">
              <Text className="color-fff">{datas.repair_date}</Text>
            </Title>
          </Col>

          <Col xs={24} md={{ span: 11, offset: 1 }} lg={{ span: 7, offset: 1 }}>
            <Text className="color-bfbf">สถานะการซ่อม</Text>
            <Title level={4} className="color-fff">
              <Text className="color-fff">{datas.status}</Text>
            </Title>
          </Col>

          <Col xs={24} md={{ span: 11, offset: 1 }} lg={{ span: 7, offset: 1 }}>
            <Text className="color-bfbf">ยอดสุทธิ(บ.)</Text>
            <Title level={4} className="color-fff">
              <Text className="color-fff">{datas.price}</Text>
            </Title>
            <Text className="color-fff">
              <DollarOutlined /> {datas.status_payment}
            </Text>
          </Col>
        </Row>
      </div>
      <Divider />
      <div>
        <Row>
          <Col span={24}>
            <Title level={4}>รายละเอียดการซ่อมเบื้องต้น</Title>
            <Text>{datas.repair_details}</Text>
          </Col>
        </Row>
      </div>
    </>
  );
}

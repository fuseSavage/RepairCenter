import React, { useState, useEffect } from "react";

import {
  PageHeader,
  Button,
  Statistic,
  Row,
  Col,
  Modal,
} from "antd";

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

import { useLocation } from "react-router-dom";

// Import services
import { FetctDetailByGarage } from "../../services";

import IconCar from "../../assets/icons/car.png";

export default function GarageDetail() {
  let location = useLocation;
  const garageID = location().state;
  const garage = location().state.data;

  const [datas, setDatas] = useState([]);

  const [visible, setVisible] = useState(false);

  //   console.log(garage);

  useEffect(() => {
    const getDetailByGarage = async () => {
      await FetctDetailByGarage(garageID).then(async (response) => {
        await setDatas(response.data);
      });
    };
    getDetailByGarage();
  }, [garageID]);

  //   console.log(datas);

  let newData = [];
  let car = [];
  let moto = [];
  let arg = [];
  let succeed = [];
  let notSucceed = [];

  if (datas !== null) {
    for (let i = 0; i < datas.length; i++) {
      newData.push(datas[i]);

      if (datas[i].device_type === "รถยนต์") {
        car.push(datas[i]);
      }
      if (datas[i].device_type === "รถจักรยานยนต์") {
        moto.push(datas[i]);
      }
      if (datas[i].device_type === "อุปกรณ์การเกษตร") {
        arg.push(datas[i]);
      }

      if (datas[i].status === "สำเร็จ") {
        succeed.push(datas[i]);
      }
      if (datas[i].status === "อยู่ระหว่างการซ่อม") {
        notSucceed.push(datas[i]);
      }
    }
  }

  let newLatLng = [
    {
      lat: JSON.parse(garage.address_map)[0],
      lng: JSON.parse(garage.address_map)[1],
    },
  ];

  // console.log(newLatLng);

  const MapWithAMarker = withScriptjs(
    withGoogleMap(() => (
      <GoogleMap defaultZoom={15} defaultCenter={newLatLng[0]}>
        <Marker
          position={newLatLng[0]}
          icon={{
            url: IconCar,
            scaledSize: new window.google.maps.Size(40, 40),
          }}
        />
      </GoogleMap>
    ))
  );

  return (
    <>
      <Row className="div-p-5">
        <Col span={24} className="pageHeader" style={{ padding: "2%" }}>
          <PageHeader
            className="site-page-header"
            onBack={() => window.history.back()}
            title={garage.garage_name}
            subTitle="ข้อมูลการซ่อมของร้าน"
            extra={[
              <Button key="3" onClick={() => setVisible(true)}>
                ดูตำแหน่งของร้าน
              </Button>,
            ]}
          >
            <Row className="text-left" gutter={[0, 16]}>
           
              <Col sx={24} sm={24} lg={{ span: 11, offset: 1 }}>
                เจ้าของร้าน : คุณ {garage.user_name}
              </Col>
              <Col sx={24} sm={24} lg={{ span: 11, offset: 1 }}>
                ชื่อร้าน : {garage.garage_name}
              </Col>
              <Col sx={24} sm={24} lg={{ span: 11, offset: 1 }}>
                ประเภท : {JSON.parse(garage.garage_type).join(",  ")}
              </Col>
              <Col sx={24} sm={24} lg={{ span: 11, offset: 1 }}>
                เข้าร่วมระบบ : {garage.registration_date}
              </Col>

              <Statistic
                title="การซ่อมทั้งหมด"
                value={newData.length}
                style={{
                  margin: "0 20px",
                }}
              />
              <Statistic
                title="ที่สำเร็จ"
                value={succeed.length}
                style={{
                  margin: "0 20px",
                }}
              />
              <Statistic
                title="กำลังดำเนินการซ่อม"
                value={notSucceed.length}
                style={{
                  margin: "0 20px",
                }}
              />
              <br />
              <Statistic
                title="รถยนต์"
                value={car.length}
                style={{
                  margin: "0 20px",
                }}
              />
              <Statistic
                title="รถจักรยานยนต์"
                value={moto.length}
                style={{
                  margin: "0 20px",
                }}
              />
              <Statistic
                title="อุปกรณ์การเกษตร"
                value={arg.length}
                style={{
                  margin: "0 20px",
                }}
              />
            </Row>
          </PageHeader>
        </Col>
      </Row>

      <Modal
        title={garage.garage_name}
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={700}
      >
        <MapWithAMarker
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBYQsoMGSxKVOe6vilIiEedgPhRDjcPbC8&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: "100%" }} />}
          containerElement={<div style={{ height: "400px" }} />}
          mapElement={<div style={{ height: "100%" }} />}
        />
      </Modal>
    </>
  );
}

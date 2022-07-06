import React, { useEffect, useState } from "react";

import { Col, Row, Typography, Table, Divider, Avatar, Image } from "antd";
import { MobileOutlined } from "@ant-design/icons";

import { useLocation } from "react-router-dom";

// import Service
import { FetctDetailByGarageID, FetchSpareByDetailID } from "../../../services";


const { Text, Title } = Typography;
const { Column, ColumnGroup } = Table;

export default function App() {
  let location = useLocation();
  //   const detailID = props;
 
  const detailID = location.state;

  // console.log(detailID)

  //set useState
  const [datas, setDatas] = useState([]);
  const [dataSpare, setDataSpare] = useState([]);

  useEffect(() => {
    const getDetailByGarage = async () => {
      await FetctDetailByGarageID(detailID).then(async (response) => {
        if (response.data) {
           await setDatas(response.data[0]);
        // console.log('data', response)
        }
        // console.log('data', response)
       
      });
      await FetchSpareByDetailID(detailID).then((response) => {
        if (response.data) {
          setDataSpare(response.data);
        }
      });
    };
    getDetailByGarage();
  }, [detailID]);

  let listData = [];
  if (dataSpare.length !== 0) {
    for (let i = 0; i < dataSpare.length; i++) {
      let toarr = JSON.parse(dataSpare[i].spare);
      // console.log("toarr", toarr);
      let newData = {
        spareID: dataSpare[i].spareID,
        spareName: toarr.spareName,
        qty: toarr.qty,
        qtyPrice: toarr.qtyPrice,
        sumPrice: toarr.sumPrice,
      };

      listData.push(newData);
    }
  }

  // console.log('dataspare',dataSpare);

  // console.log('spare',listData);

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
            <Text className="color-bfbf">ร้านที่รับซ่อม</Text>
            <Title level={4} className="color-fff">
              <Text className="color-fff">{datas.garage_name}</Text>
            </Title>
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
        </Row>
      </div>

      <div>
        <Divider />
        <Row>
          <Col span={24}>
            <Title level={4}>รายละเอียดการซ่อมเบื้องต้น</Title>
            <Text>{datas.repair_details}</Text>
          </Col>
        </Row>
      </div>

      <div className="div-p-5" style={{padding: "2% 10% 2% 10%"}}>
        <Table
          dataSource={listData}
          scroll={{ x: 400 }}
          bordered
          className="border"
        >
          <ColumnGroup title="รายละเอียดการซ่อม">
            <Column
              title="ลำดับ"
              width={"10%"}
              render={(value, item, index) => index + 1}
            />
            <Column
              title="รายการซ่อม / อะไหล่"
              dataIndex="spareName"
              key="spareName"
              width={"50%"}
            />

            <Column title="จำนวน" dataIndex="qty" key="qty" width={"20%"} />

            {/* <Column
              title="ราคาต่อหน่วย"
              dataIndex="qtyPrice"
              key="qtyPrice"
              width={"12%"}
            /> */}
            {/* <Column
              title="ราคารวม"
              dataIndex="sumPrice"
              key="sumPrice"
              width={"10%"}
            /> */}
          </ColumnGroup>
        </Table>
      </div>
    </>
  );
}

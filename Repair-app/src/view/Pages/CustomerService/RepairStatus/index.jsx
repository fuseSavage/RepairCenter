import React, { useState } from "react";
import { Row, Col, Typography, Input, Table, Space, Modal } from "antd";

import { Link } from "react-router-dom";

// import Service
import { FetchDetailByMember } from "../../../../services";

const { Title, Text } = Typography;
const { Search } = Input;

export default function App() {
  //set useState
  const [datas, setDatas] = useState([]);

  const onSearch = (value) => {
    let data = {
      member_tel: value,
    };

    if (value !== undefined) {
      FetchDetailByMember(data).then(async (response) => {
        if (response.code === 200) {
          await setDatas(response.data);
          // console.log("data", response.data);
        } else {
          Modal.info({
            title: "ไม่มีหมายเลขสมาชิกนี้",
            content: `กรุณาตรวจสอบหมายเลขโทรศัพท์ หรือรหัสลูกค้าอีกครั้ง`,
          });
          setDatas([]);
        }
      });
    } else {
      setDatas([]);
    }
  };

  // console.log("datas", datas);

  let listData = [];

  if (datas.length !== 0) {
    for (let i = 0; i < datas.length; i++) {
      let newData = {
        detailsID: datas[i].detailsID,
        member_tel: datas[i].member_tel,
        member_name: datas[i].member_name,
        device_type: datas[i].device_type,
        repair_date: datas[i].repair_date,
        garage_name: datas[i].garage_name,
        status: datas[i].status,
        status_payment: datas[i].status_payment,
        equipment: datas[i].equipment,
        brand: datas[i].brand,
        car_number: datas[i].car_number,
        car_province: datas[i].car_province,
        price: datas[i].price,
      };
      listData.push(newData);
    }
  }

  const columns = [
    {
      title: "ประเภทอุปกรณ์",
      dataIndex: "device_type",
      key: "device_type",
    },

    {
      title: "ทะเบียน/ชนิด",
      render: (record) => {
        return (
          <>
            {record.device_type === "รถจักรยานยนต์" ||
            record.device_type === "รถยนต์" ? (
              <>
                <Space size="small">
                  <Text style={{ fontWeight: "bold" }}>
                    {record.car_number}
                  </Text>
                </Space>
                {<br />}
                <Text>{record.car_province}</Text>
              </>
            ) : (
              <>
                <Text>{record.equipment}</Text>
              </>
            )}
          </>
        );
      },
    },
    {
      title: "ร้านที่รับซ่อม",
      dataIndex: "garage_name",
      key: "garage_name",
    },
    {
      title: "วันที่รับซ่อม",
      dataIndex: "repair_date",
      key: "repair_date",
    },
    {
      title: "สถานะ",
      key: "status",
      render: (record) => {
        return (
          <>
            {record.status === "สำเร็จ" ? (
              <>
                <Text
                  style={{
                    color: "green",
                    backgroundColor: "#b7eb8f",
                    padding: "2px",
                  }}
                >
                  {record.status}
                </Text>
              </>
            ) : (
              <>
                <Text
                  style={{
                    color: "red",
                    backgroundColor: "#fff566",
                    padding: "2px",
                  }}
                >
                  {record.status}
                </Text>
              </>
            )}
          </>
        );
      },
    },
    {
      title: "การชำระเงิน",
      // dataIndex: "status_payment",
      key: "status_payment",
      render: (record) => {
        return (
          <>
            <Text style={{ color: "red", fontWeight: "bold" }}>
              {record.price}฿
            </Text>
             {" => "}
            <Text>
              {record.status_payment}
            </Text>
          </>
        );
      },
    },
    {
      title: "เพิ่มเติม",
      key: "detailsID",
      render: (record) => {
        return (
          <>
            <Link
              to={{
                pathname: "/dashboard/search-repair/details",
                state: {
                  detailID: record.detailsID,
                  memberTel: record.member_tel,
                },
              }}
            >
              <Text style={{ color: "blue" }}>
                {/* <ToolOutlined style={{fontSize: "200%"}} /> */}
                รายละเอียด
              </Text>
            </Link>
          </>
        );
      },
    },
  ];

  return (
    <>
      <Row gutter={[0, 32]}>
        <Col xs={{ span: 24 }} lg={{ span: 24 }} className="w-auto bg-freecar ">
          <Row className="div-p-5" gutter={[0, 32]}>
            <Col span={24}>
              <Title level={2}>
                <Text style={{ color: "#aaabb8" }}>เช็คสถานะการซ่อม</Text>
              </Title>
            </Col>

            <Col span={24}>
              <Text style={{ color: "#a4b3b6" }}>
                ระบบจะแสดงการซ่อมของลูกค้าทั้งหมด
                ที่ถูกเพิ่มไว้โดยร้านซ่อมที่เข้าร่วมกับระบบ
                โดยลูกค้าสามารถเช็คสถานะได้โดยการกรอกหมายเลขโทรศัพท์
                หรือรหัสของลูกค้า
              </Text>
            </Col>

            <Col span={24}>
              <Row>
                <Col xs={1} lg={{ span: 6 }}></Col>
                <Col xs={22} lg={{ span: 12 }}>
                  <Search
                    // style={{border: '1px solid yellow'}}
                    placeholder="กรอกหมายเลขโทรศัพท์ของลูกค้า"
                    allowClear
                    enterButton="ค้นหา"
                    size="large"
                    onSearch={onSearch}
                  />
                </Col>
                <Col xs={1} lg={{ span: 6 }}></Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>

      {datas.length !== 0 ? (
        <>
          <div className="div-p-5">
            <Table
              scroll={{ x: 500 }}
              bordered
              columns={columns}
              dataSource={listData}
            />
          </div>
        </>
      ) : null}
    </>
  );
}

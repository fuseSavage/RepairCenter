import React, { useState, useEffect } from "react";
import { Row, Col, Card, Typography, Divider } from "antd";

import { UserOutlined, ShopOutlined, AlertOutlined } from "@ant-design/icons";

// import services
import { FetchGarageAll, FetchMemberAll, FetchGarage } from "../../services";

import { Link } from "react-router-dom";

// Import Component
import Reported from "./Reported";
import Member from "./MemberSetting/Member";
import Garage from "./Garage";

import ChartsAllRepair from "../../view/widget/ChartsAllRepair";

const { Text } = Typography;

const gridStyle = {
  width: "100%",
  textAlign: "center",
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  borderRadius: "4%",
  backgroundColor: "#096dd9",
};

function Admin() {
  const [datas, setDatas] = useState([]);
  // const [report, setReport] = useState([]);
  const [member, setMember] = useState([]);
  const [garageAll, setGarageAll] = useState([]);

  useEffect(() => {
    const getGarage = async () => {
      await FetchGarageAll().then(async (response) => {
        if (response.code === 500) {
          console.log("data", response);
        } else {
          await setDatas(response.data);
          //  console.log('data', response.data)
        }
      });
    };
    getGarage();

    const getMember = async () => {
      await FetchMemberAll().then(async (response) => {
        if (response.code === 500) {
          console.log("data", response);
        } else {
          await setMember(response.data);
        }
        // console.log('data', response)
      });
    };
    getMember();

    const getGarageAll = async () => {
      await FetchGarage().then((response) => {
        if (response.code === 500) {
          console.log("data", response);
        } else {
          // console.log("data", response);
          setGarageAll(response.data);
        }
      });
    };
    getGarageAll();
  }, []);
  // console.log("data", datas);

  let non_approve = [];
  if (garageAll !== null) {
    garageAll.forEach((e) => {
      if (e.confirmation === "non-approved") {
        non_approve.push(e);
      }
    });
  }

  return (
    <>
      <div style={{ padding: "3% 2% 0 2%" }}>
        <Row gutter={[0, 16]}>
          <Col xs={{ span: 14, offset: 5 }} lg={{ span: 6, offset: 1 }}>
            <Link to={"/admin/all-garage"}>
              <Card.Grid hoverable={false} style={gridStyle}>
                <Row>
                  <Col span={8}>
                    <ShopOutlined
                      style={{ fontSize: "400%", color: "#ffff" }}
                    />
                  </Col>
                  <Col span={16}>
                    <Text style={{ color: "#bfbfbf" }}>จำนวนร้านซ่อม</Text>
                    <br />
                    <Text style={{ color: "#ffff", fontSize: "25px" }}>
                      {datas.length}
                    </Text>
                  </Col>
                </Row>
              </Card.Grid>
            </Link>
          </Col>
          <Col xs={{ span: 14, offset: 5 }} lg={{ span: 6, offset: 2 }}>
            <Link to={"/admin/all-member"}>
              <Card.Grid hoverable={false} style={gridStyle}>
                <Row>
                  <Col span={8}>
                    <UserOutlined
                      style={{ fontSize: "400%", color: "#ffff" }}
                    />
                  </Col>
                  <Col span={16}>
                    <Text style={{ color: "#bfbfbf" }}>ลูกค้าสมาชิก</Text>
                    <br />
                    <Text style={{ color: "#ffff", fontSize: "25px" }}>
                      {member.length}
                    </Text>
                  </Col>
                </Row>
              </Card.Grid>
            </Link>
          </Col>
          <Col xs={{ span: 14, offset: 5 }} lg={{ span: 6, offset: 2 }}>
            <Link to={"/admin/approve"}>
              {/* <Badge size="default" count={non_approve.length}> */}
              <Card.Grid hoverable={false} style={gridStyle}>
                <Row>
                  <Col span={8}>
                    <AlertOutlined
                      style={{ fontSize: "400%", color: "#ffff" }}
                    />
                  </Col>
                  <Col span={16}>
                    <Text style={{ color: "#bfbfbf" }}>
                      ร้านซ่อมที่ยังไม่อนุมัติ
                    </Text>
                    <br />
                    <Text style={{ color: "#ffff", fontSize: "25px" }}>
                      {non_approve.length}
                    </Text>
                  </Col>
                </Row>
              </Card.Grid>
              {/* </Badge> */}
            </Link>
          </Col>
        </Row>
      </div>

      <Divider />

      <div>
        <Row gutter={[0, 16]}>
          <Col xs={24} lg={{ span: 16 }}>
            {/* <Title level={4}>การซ่อมทั้งหมด</Title> */}
            <ChartsAllRepair />
          </Col>

          <Col
            style={{ height: "400px", overflowY: "scroll" }}
            className="pageHeader"
            xs={24}
            lg={{ span: 8 }}
          >
            <Reported />
          </Col>
        </Row>
      </div>

      <Divider />

      <div>
        <Row gutter={[0, 16]}>
          <Col
            style={{ height: "400px", overflowY: "scroll" }}
            xs={24}
            lg={{ span: 12 }}
          >
            <Garage />
          </Col>
          <Col
            style={{ height: "400px", overflowY: "scroll" }}
            xs={24}
            lg={{ span: 12 }}
          >
            <Member />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Admin;

import { React, useEffect, useState } from "react";

import { Link } from "react-router-dom";

// Import services
import {
  FetctDetailByGarage,
  // FetctMemberByGarage,
  FetchMemberAll,
} from "../../../services";

// import { useLocation } from "react-router-dom";

import { Row, Col, Divider, Result, Button, Statistic } from "antd";
import { PlusOutlined } from "@ant-design/icons";

//import Widget
import CanvasJSChart from "../../widget/widgetPie";
import ColumnJSChart from "../../widget/widgetColumn";

// const { Header } = Layout;

export default function Ecommerce() {
  // let location = useLocation();

  const [datas, setDatas] = useState([]);
  // const [member, setMember] = useState([]);
  const [allMember, setAllMember] = useState([]);

  // const  detailID  = location.state
  // console.log(detailID)

  useEffect(() => {
    const getDetailByGarage = async () => {
      let local = {
        garageID: JSON.parse(localStorage.getItem("user")).userData.userId,
      };
      // console.log("local", local);
      // console.log(local);
      await FetctDetailByGarage(local).then(async (response) => {
        await setDatas(response.data);
      });
    };

    // let data = {
    //   userId: JSON.parse(localStorage.getItem("user")).userData.userId,
    // };

    // const getMember = async () => {
    //   await FetctMemberByGarage(data).then(async (response) => {
    //     if (response.code === 500) {
    //       console.log("data", response);
    //     } else {
    //       await setMember(response.data);
    //     }
    //     // console.log('data', response.data)
    //   });
    // };

    const getMemberAll = async () => {
      await FetchMemberAll().then(async (response) => {
        await setAllMember(response.data);

        // console.log("data", response.data);
      });
    };

    getDetailByGarage();
    getMemberAll();
  }, []);

  let sumPrice = 0;
  let listAllMember = [];

  if (datas !== null) {
    for (let i = 0; i < datas.length; i++) {
      sumPrice = sumPrice + datas[i].price;
    }
  }

  // if (member !== null) {
  //   for (let i = 0; i < member.length; i++) {
  //     // console.log(member)
  //     listMember.push(member[i]);
  //   }
  // }

  if (allMember !== null) {
    for (let i = 0; i < allMember.length; i++) {
      // console.log(member)
      listAllMember.push(allMember[i]);
    }
  }

  let date = new Date();

  let dateNow = date.toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // console.log("member", member);

  return (
    <>
      {datas !== null ? (
        <>
          <Row gutter={[0, 16]} style={{ padding: "2%" }}>
            <Col xs={24} lg={{ span: 10, offset: 1 }}>
              <CanvasJSChart />
            </Col>
            <Col xs={24} lg={{ span: 10, offset: 2 }}>
              <ColumnJSChart />
            </Col>
          </Row>
          <Button className="bt-them" key="console">
            <Link to={"/dashboard/add-detail"}>
              <PlusOutlined /> เพิ่มการซ่อม
            </Link>
          </Button>
          <Divider />

          <Row>
            {/* <Col span={12}>
              <Row gutter={16}>
                <Col xs={24} lg={{ span: 11 }}>
                  <Statistic title="ปฏิทิน" value={dateNow} />
                </Col>
               
              </Row>
            </Col> */}

            <Col span={24}>
              <Row gutter={16}>
                <Col xs={24} lg={{ span: 8 }}>
                  <Statistic title="ปฏิทิน" value={dateNow} />
                </Col>
                <Col xs={24} lg={{ span: 8 }}>
                  <Link to={"/dashboard/member"}>
                    <Statistic
                      title="ลูกค้าทั้งหมดของระบบ"
                      value={listAllMember.length}
                    />
                  </Link>
                </Col>
                <Col xs={24} lg={{ span: 7, offset: 1 }}>
                  <Statistic
                    title="รายได้ทั้งหมดของร้าน (บาท)"
                    value={sumPrice}
                    precision={2}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </>
      ) : (
        <>
          <div className="display-flex-main">
            <div className="div-content-chart">
              <Row className="content-chart">
                <Col xs={24} lg={24} className="chart">
                  <Result
                    title="ร้านของคุณยังไม่มีการซ่อม"
                    extra={
                      <Button className="bt-them" key="console">
                        <Link to={"/dashboard/add-detail"}>
                          <PlusOutlined /> เพิ่มการซ่อม
                        </Link>
                      </Button>
                    }
                  />
                </Col>
              </Row>
            </div>
          </div>
        </>
      )}

      {/* <CanvasJSChart className="chart" data={location.state} /> */}
    </>
  );
}

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Col, Layout, Menu, Row, Typography, Avatar, Badge } from "antd";
import {
  HomeOutlined,
  SolutionOutlined,
  ToolOutlined,
  TeamOutlined,
  // SettingOutlined,
  CommentOutlined,
  LogoutOutlined,
  // DollarOutlined,
} from "@ant-design/icons";

// import services
import { sendLogout, FetchGarage } from "../../services";

const { Sider } = Layout;
// const { SubMenu } = Menu;
const { Title } = Typography;

export default function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [datas, setDatas] = useState([]);

  let garageName = JSON.parse(localStorage.getItem("user")).userData.userId;
  //    console.log("test Logout", garageName);

  useEffect(() => {
    const getGarage = async () => {
      await FetchGarage().then(async (response) => {
        if (response.code === 500) {
          console.log("data", response);
        } else {
          await setDatas(response.data);
        }
        // console.log('data', response)
      });
    };
    getGarage();
  }, []);

  let countNoti = [];

  if (datas !== null) {
    datas.forEach((e) => {
      if (e.confirmation === "non-approved") {
        countNoti.push(e.confirmation);
      }
    });
  }

  //   console.log("data", countNoti.length);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  const handleLogout = () => {
    // console.log("test Logout");
    sendLogout();
    setTimeout(() => {
      window.location.reload(false);
    }, 1000);
  };

  return (
    <>
      <div
        style={{
          mixHeight: 360,
          backgroundColor: "#001529",
          overflowY: "scroll",
        }}
      >
        <Sider
          theme="dark"
          collapsible
          collapsed={collapsed}
          onCollapse={onCollapse}
        >
          <Row className="display-flex-center">
            <Col>
              <Title level={5} style={{ color: "#ffbf00" }}>
                <Avatar
                  style={{
                    backgroundColor: "#ffbf00",
                    verticalAlign: "middle",
                  }}
                  size="large"
                  gap={"gap"}
                >
                  {garageName}
                </Avatar>{" "}
                &nbsp;
                {garageName}
              </Title>
            </Col>
          </Row>
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
          >
            <Menu.Item key="1" icon={<HomeOutlined />}>
              <Link to={"/admin/dashboard"}>หน้าแรก</Link>
            </Menu.Item>

            <Menu.Item key="3" icon={<ToolOutlined />}>
              <Link to={"/admin/all-garage"}>ร้านซ่อม</Link>
            </Menu.Item>

            <Menu.Item key="4" icon={<TeamOutlined />}>
              <Link to={"/admin/all-member"}>ลูกค้าสมาชิก</Link>
            </Menu.Item>

            <Menu.Item key="5" icon={<SolutionOutlined />}>
              <Badge count={countNoti.length}>
                <Link
                  to={"/admin/approve"}
                  style={{ color: "#f0f2f5", paddingRight: "20px" }}
                >
                  อนุมัติร้านซ่อม
                </Link>
              </Badge>
            </Menu.Item>

            <Menu.Item key="6" icon={<CommentOutlined />}>
              <Link to={"/admin/reported"}>การแจ้งปัญหา</Link>
            </Menu.Item>

            {/* 
            <Menu.Item key="10" icon={<DollarOutlined />}>
              <Link to={"/dashboard/payment"}>การชำระเงิน</Link>
            </Menu.Item> */}

            {/* <Menu.Item key="8" icon={<SettingOutlined />}>
              <Link to={"/dashboard/setting"}>ตั้งค่าบัญชี</Link>
            </Menu.Item> */}

            <Menu.Item
              onClick={handleLogout}
              key="11"
              icon={<LogoutOutlined />}
            >
              ออกจากระบบ
            </Menu.Item>
          </Menu>
        </Sider>
      </div>
    </>
  );
}

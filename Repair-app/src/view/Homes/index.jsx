import { React } from "react";
import { Layout, Row, Col, Button, Spin } from "antd";

import textrepair from "../../assets/images/repair.png";

import { useHistory } from "react-router-dom";

const { Header, Content, Footer } = Layout;

export default function App() {
  const history = useHistory();

  const clicklogo = () => {
    history.push("/");
  };

  const getstarted = () => {
    history.push("/dashboard");
  }

  return (
    <div className="home">
      <Header className="header-home" style={{ zIndex: 1 }}>
        <div>
          {/* <img src={logo} alt="Logo" width={30} height={30}/> */}
          <Row>
            <Col span={20}>
              <Row className="main-logo" onClick={clicklogo}>
                <div> Repair </div>&nbsp;
                <div className="logo"> Center</div>
              </Row>
            </Col>
          </Row>
        </div>
      </Header>
      <Content
        className="site-layout-background"
        style={{
          minHeight: 522,
        }}
      >
        <div className="home-content">
          <Col span={24}>
            <Row>
              <Col span={24}>
                <img className="img-repair" src={textrepair} alt="Logo" />
              </Col>
            </Row>

            <Row>
              <Col span={24}>
                <div className="text-discripttion">
                  <Spin />
                  ระบบจัดการร้านซ่อม รวบรวมร้านซ่อมทุกประเภทเข้ามาในระบบ
                  เพื่อง่ายต่อการซ่อมในครั้งถัดไป
                  <Spin />
                </div>
              </Col>
            </Row>

            <div className="pading">
              <Row>
                <Col span={24}>
                  <Button size="large" shape="round" onClick={getstarted}>
                    เริ่มต้นใช้งาน
                  </Button>
                </Col>
              </Row>
            </div>

            <Row>
              <Col span={24}>
                <div className="widget1"></div>
              </Col>
              <Col span={24}>
                <div className="widget2"></div>
              </Col>
            </Row>
          </Col>
        </div>
      </Content>
      <Footer className="footer-home" style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </div>
  );
}

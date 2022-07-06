import React, { useEffect, useState } from "react";
import { Col, Layout, Row } from "antd";
import { useHistory } from "react-router-dom";

const { Header } = Layout;

export default function App() {
  const history = useHistory();

  const [checkLocal, setChechLocal] = useState(null);

  useEffect(() => {
    // console.log("local", localStorage.getItem("user"));
    setChechLocal(JSON.parse(localStorage.getItem("user")));
  }, []);

  const clicklogo = () => {
    if (checkLocal === null) {
      history.push("/");
    } else {
      if (checkLocal.userData.userId === "admin") {
        history.push({
          pathname: "/admin/dashboard",
          state: checkLocal.userData.userId,
        });
      } else {
        history.push({
          pathname: "/dashboard",
          state: checkLocal.userData.userId,
        });
      }
  
      // console.log("test", checkLocal.userData.userId);
    }
  };
  // const onclickLogin = () => {
  //   console.log('click login')
  // }
  return (
    <Header className="header-home" style={{ zIndex: 1 }}>
      {/* <img src={logo} alt="Logo" width={30} height={30}/> */}
      <Row gutter={[32, 32]} justify="space-between">
        <Col span={15}>
          <Row>
            <Row className="main-logo" onClick={clicklogo}>
              Repair Center
            </Row>
          </Row>
        </Col>
      </Row>
    </Header>
  );
}

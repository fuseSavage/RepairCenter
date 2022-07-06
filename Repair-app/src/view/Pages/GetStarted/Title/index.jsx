import React, { useState, useEffect, useRef } from "react";

import { Link } from "react-router-dom";

import { Row, Col, Typography } from "antd";
import BIRDS from "vanta/dist/vanta.birds.min";

const { Title } = Typography;

function App() {
  const [vantaEffect, setVantaEffect] = useState(0);
  const myRef = useRef(null);
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        BIRDS({
          el: myRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          backgroundColor: 0xffffff,
          color1: 0x55505f,
          color2: 0x60931,
          birdSize: 0.7
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <Row ref={myRef} className="getstart-box">
      <div className="div-box-title">
        <Col span={24} className="getstart-box-title">
          <Title level={1}>Repair Center</Title>
          <Title level={2}>ระบบจัดการร้านซ่อมและศูนย์บริการ</Title>
          <Title level={3}>
            เพิ่มประสิทธิภาพ ลดระยะเวลา ยกระดับร้านซ่อมไปกับเรา
          </Title>
          <Row className="box-button">
            <Col
              xs={{ span: 11, offset: 1 }}
              lg={{ span: 10, offset: 2 }}
              className="bt-register"
            >
              <Link className="text-register" to={"/register"}>
                ลงทะเบียนใช้งานฟรี
              </Link>
            </Col>

            <Col
              xs={{ span: 11, offset: 1 }}
              lg={{ span: 10, offset: 2 }}
              className="bt-login"
            >
              <Link className="text-login" to={"/login"}>
                เข้าสู่ระบบ
              </Link>
            </Col>
          </Row>
        </Col>
      </div>
    </Row>
  );
}

export default App;

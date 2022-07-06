import React, { useState } from "react";
import { Col, Row, Typography, Input } from "antd";

// import { UserAddOutlined } from "@ant-design/icons";

// Import Component
import ContentSearch from '../component/ContentSearch'

const { Title, Text } = Typography;
const { Search } = Input;

export default function SearchMember() {
  const [tel, setTel] = useState();
  const onSearch = (value) => {
    // console.log('value', typeof(value));
    setTel(value);
  };

//   console.log(tel);

  return (
    <>
      <Row gutter={[0, 32]}>
        <Col xs={{ span: 24 }} lg={{ span: 24 }} className="w-auto bg-freecar ">
          <Row className="div-p-5" gutter={[0, 32]}>
            <Col span={24}>
              <Title level={2}>
                <Text style={{ color: "#aaabb8" }}>ค้นหาการซ่อมของลูกค้า</Text>
              </Title>
            </Col>
            <Col span={24}>
              <Text style={{ color: "#a4b3b6" }}>
                การค้นหาประวัติการซ่อมของลูกค้า
                เป็นการค้นหาทุกการซ่อมของลูกค้าครั้งก่อนหน้า
                โดยลูกค้าจะต้องเป็นลูกค้าสมาชิกเท่านั้น
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

        <Col span={24}>
          <ContentSearch tel={tel} />
        </Col>
      </Row>
    </>
  );
}

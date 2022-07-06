import React, { useState, useEffect } from "react";

import { Col, Row, Comment, List, Typography } from "antd";

import { FetchReportAll } from "../../services";

import { PhoneOutlined, UserOutlined, CarOutlined } from "@ant-design/icons";

// import IconGarage from "../../assets/icons/garage.png";
import IconMember from "../../assets/icons/profile.png";

const { Title } = Typography;

function Reported() {
  //set useState
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    const getAllReport = async () => {
      await FetchReportAll().then((response) => {
        if (response.data) {
          setDatas(response.data);
          //   console.log("report", response.data);
        }
      });
    };
    getAllReport();
  }, []);
  return (
    <>
      <Row className="text-left div-p-5">
        <Col>
          <Title level={3}>ปัญหาการใช้งาน</Title>
        </Col>

        <Col style={{ padding: "2%" }} span={24}>
          {datas.length !== 0 ? (
            <>
              <List
                className="comment-list"
                header={`${datas.length} ปัญหาที่แจ้งเข้ามา`}
                itemLayout="horizontal"
                dataSource={datas}
                renderItem={(item) => (
                  <li>
                    <Comment
                      actions={[
                        <span key="comment-basic-reply-to">
                          {item.party === "garage" ? (
                            <>
                             <CarOutlined /> ร้านซ่อม, <PhoneOutlined /> {item.report_tel}
                            </>
                          ) : (
                            <>
                             <UserOutlined /> ลูกค้า, <PhoneOutlined /> {item.report_tel}
                            </>
                          )}
                        </span>,
                      ]}
                      author={item.name}
                      avatar={IconMember}
                      content={item.report_detail}
                      datetime={item.report_date}
                    />
                  </li>
                )}
              />
            </>
          ) : null}
        </Col>
      </Row>
    </>
  );
}

export default Reported;

import React, { useState } from "react";

import { Row, Col, Typography, Image, Carousel } from "antd";

// Import Images 264098267_614589809650713_7432399148669275975_n.png
import Image1 from "../../../../assets/images/1.png";
import Image2 from "../../../../assets/images/2.png";
import Image3 from "../../../../assets/images/3.png";
import Image4 from "../../../../assets/images/4.png";
import Image5 from "../../../../assets/images/5.png";
import Image6 from "../../../../assets/images/6.png";
import Image7 from "../../../../assets/images/7.png";



const { Title } = Typography;

function App() {
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  const [visible4, setVisible4] = useState(false);
  const [visible5, setVisible5] = useState(false);
  const [visible6, setVisible6] = useState(false);
  const [visible7, setVisible7] = useState(false);


  return (
    <Row gutter={[16, 16]} className="content-box">
      <Col span={24} className="box-text-title">
        <Title level={4}>รูปตัวอย่างการใช้งาน</Title>
      </Col>

      <Col span={24}>
        <Carousel autoplay>
          {/* <div style={contentStyle}> */}
            <div  >
              <Image
                preview={{ visible1: false }}
                src={Image1}
                width={700}
                height={400}
                style={{border : '1px solid #333'}}
                onClick={() => setVisible1(true)}
              />
              <div style={{ display: "none" }}>
                <Image.PreviewGroup
                  preview={{
                    visible1,
                    onVisibleChange: (vis) => setVisible1(vis),
                  }}
                >
                  <Image src={Image1} />
                </Image.PreviewGroup>
              </div>
            </div>

            <div >
              <Image
                preview={{ visible2: false }}
                src={Image2}
                width={700}
                height={400}
                style={{border : '1px solid #333'}}
                onClick={() => setVisible2(true)}
              />
              <div style={{ display: "none" }}>
                <Image.PreviewGroup
                  preview={{
                    visible2,
                    onVisibleChange: (vis) => setVisible2(vis),
                  }}
                >
                  <Image src={Image2} />
                </Image.PreviewGroup>
              </div>
            </div>
            
            <div >
              <Image
                preview={{ visible3: false }}
                src={Image3}
                width={700}
                height={400}
                style={{border : '1px solid #333'}}
                onClick={() => setVisible3(true)}
              />
              <div style={{ display: "none" }}>
                <Image.PreviewGroup
                  preview={{
                    visible3,
                    onVisibleChange: (vis) => setVisible3(vis),
                  }}
                >
                  <Image src={Image3} />
                </Image.PreviewGroup>
              </div>
            </div>

            <div >
              <Image
                preview={{ visible4: false }}
                src={Image4}
                width={700}
                height={400}
                style={{border : '1px solid #333'}}
                onClick={() => setVisible4(true)}
              />
              <div style={{ display: "none" }}>
                <Image.PreviewGroup
                  preview={{
                    visible4,
                    onVisibleChange: (vis) => setVisible4(vis),
                  }}
                >
                  <Image src={Image4} />
                </Image.PreviewGroup>
              </div>
            </div>

            <div >
              <Image
                preview={{ visible5: false }}
                src={Image5}
                width={700}
                height={400}
                style={{border : '1px solid #333'}}
                onClick={() => setVisible5(true)}
              />
              <div style={{ display: "none" }}>
                <Image.PreviewGroup
                  preview={{
                    visible5,
                    onVisibleChange: (vis) => setVisible5(vis),
                  }}
                >
                  <Image src={Image5} />
                </Image.PreviewGroup>
              </div>
            </div>

            <div >
              <Image
                preview={{ visible6: false }}
                src={Image6}
                width={700}
                height={400}
                style={{border : '1px solid #333'}}
                onClick={() => setVisible6(true)}
              />
              <div style={{ display: "none" }}>
                <Image.PreviewGroup
                  preview={{
                    visible6,
                    onVisibleChange: (vis) => setVisible6(vis),
                  }}
                >
                  <Image src={Image6} />
                </Image.PreviewGroup>
              </div>
            </div>

            <div >
              <Image
                preview={{ visible7: false }}
                src={Image7}
                width={700}
                height={400}
                style={{border : '1px solid #333'}}
                onClick={() => setVisible7(true)}
              />
              <div style={{ display: "none" }}>
                <Image.PreviewGroup
                  preview={{
                    visible7,
                    onVisibleChange: (vis) => setVisible7(vis),
                  }}
                >
                  <Image src={Image7} />
                </Image.PreviewGroup>
              </div>
            </div>

        </Carousel>
      </Col>

      {/* <Col
        xs={{ span: 12, offset: 6 }}
        sm={{ span: 8, offset: 8 }}
        md={{ span: 6, offset: 4 }}
        lg={{ span: 5, offset: 1 }}
        xl={{ span: 4, offset: 2 }}
        className="Col-content"
      >
        <div>
          <Image
            preview={{ visible1: false }}
            width={200}
            src={reportImg}
            onClick={() => setVisible1(true)}
          />
          <div style={{ display: "none" }}>
            <Image.PreviewGroup
              preview={{ visible1, onVisibleChange: (vis) => setVisible1(vis) }}
            >
              <Image src={reportImg} />
            </Image.PreviewGroup>
          </div>
          <Text>รูปการเพิ่มรายละเอียดของการซ่อม</Text>
        </div>
      </Col>
      <Col
        xs={{ span: 12, offset: 6 }}
        sm={{ span: 8, offset: 8 }}
        md={{ span: 4, offset: 4 }}
        lg={{ span: 5, offset: 1 }}
        xl={{ span: 4, offset: 2 }}
        span={8}
        className="Col-content"
      >
        <div>
          <Image
            preview={{ visible2: false }}
            width={200}
            src={detailImg}
            onClick={() => setVisible2(true)}
          />
          <div style={{ display: "none" }}>
            <Image.PreviewGroup
              preview={{ visible2, onVisibleChange: (vis) => setVisible2(vis) }}
            >
              <Image src={detailImg} />
            </Image.PreviewGroup>
          </div>
          <Text>รูปแสดงหน้าหลักของระบบ</Text>
        </div>
      </Col>
      <Col
        xs={{ span: 12, offset: 6 }}
        sm={{ span: 8, offset: 8 }}
        md={{ span: 6, offset: 4 }}
        lg={{ span: 5, offset: 1 }}
        xl={{ span: 4, offset: 2 }}
        span={8}
        className="Col-content"
      >
        <div>
          <Image
            preview={{ visible3: false }}
            width={200}
            src={reportImg}
            onClick={() => setVisible3(true)}
          />
          <div style={{ display: "none" }}>
            <Image.PreviewGroup
              preview={{ visible3, onVisibleChange: (vis) => setVisible3(vis) }}
            >
              <Image src={reportImg} />
            </Image.PreviewGroup>
          </div>
          <Text>รูปแสดงรายละเอียดของร้าน</Text>
        </div>
      </Col>

      <Col
        xs={{ span: 12, offset: 6 }}
        sm={{ span: 8, offset: 8 }}
        md={{ span: 4, offset: 4 }}
        lg={{ span: 5, offset: 1 }}
        xl={{ span: 4, offset: 2 }}
        className="Col-content"
      >
        <div>
          <Image
            preview={{ visible4: false }}
            width={200}
            src={userUseImg}
            onClick={() => setVisible4(true)}
          />
          <div style={{ display: "none" }}>
            <Image.PreviewGroup
              preview={{ visible4, onVisibleChange: (vis) => setVisible4(vis) }}
            >
              <Image src={userUseImg} />
            </Image.PreviewGroup>
          </div>
          <Text>รูปหน้าบริการลูกค้า</Text>
        </div>
      </Col> */}
    </Row>
  );
}

export default App;

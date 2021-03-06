import React, { useState, useEffect } from "react";

import {
  Modal,
  Button,
  Input,
  Divider,
  Table,
  Typography,
  Row,
  Col,
  Space,
  Select,
} from "antd";

import {
  PlusCircleFilled,
  DeleteOutlined,
  ExclamationCircleOutlined,
  OrderedListOutlined,
  SaveOutlined,
} from "@ant-design/icons";

// import Service
import {
  FetchSpareByDetailID,
  InsertSpare,
  DeleteSpare,
  UpdateDetail,
} from "../../../services";

const { Column, ColumnGroup } = Table;
const { Text, Title } = Typography;
const { confirm } = Modal;
const { Option } = Select;

export default function SpareAdd(props) {
  const { detailID, memberTel, sandStatus, sandPayment } = props;

  // Set State
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [datas, setDatas] = useState([]);
  const [status, setStatus] = useState(sandStatus);
  const [payment, setPayment] = useState(sandPayment);

  // state spare
  const [spareName, setSpareName] = useState();
  const [qty, setQTY] = useState();
  const [qtyPrice, setQTYPrice] = useState();
  const [sumPrice, setSumPrice] = useState(0);

  useEffect(() => {
    const getSpare = async () => {
      let data = {
        detailID: detailID,
      };
      await FetchSpareByDetailID(data).then((response) => {
        if (response.data) {
          setDatas(response.data);
        }
      });
      setSumPrice(qty * qtyPrice);
    };
   
    getSpare();
  }, [detailID, qty, qtyPrice]);

  const showModal = () => {
    setVisible(true);
  };

  let listData = [];
  let sum = 0;
  if (datas.length !== 0) {
    for (let i = 0; i < datas.length; i++) {
      let toarr = JSON.parse(datas[i].spare);
      sum = sum + toarr.sumPrice;
      let newData = {
        spareID: datas[i].spareID,
        spareName: toarr.spareName,
        qty: toarr.qty,
        qtyPrice: toarr.qtyPrice,
        sumPrice: toarr.sumPrice,
      };

      listData.push(newData);
    }
  }


  const handleOk = () => {
    let listSpare = {
      spareName: spareName,
      qty: qty,
      qtyPrice: qtyPrice,
      sumPrice: sumPrice,
    };

    const data = {
      detailsID: detailID,
      memberTel: memberTel,
      spare: JSON.stringify(listSpare),
    };


    if (spareName === "" || spareName === null || spareName === undefined) {
      Modal.info({
        title: "????????????????????????????????????",
        content: `??????????????????????????????????????????????????????????????????`,
      });
    } else {
      InsertSpare(data);
    }

    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);

      setSpareName(null);
      setQTY();
      setQTYPrice();
      setSumPrice(0);
    }, 2000);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  function destroyAll() {
    Modal.destroyAll();
  }

  const handleDelete = (id) => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      content: <Button onClick={destroyAll}>??????????????? ok ????????????????????????????????????????????????</Button>,
      onOk() {
        DeleteSpare(id);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const handleSave = () => {
    let data = {
      status: status,
      status_payment: payment,
      sumPrice: sum,
      detailsID: detailID,
    };
    UpdateDetail(data);
    setTimeout(() => {
      window.location.reload(false);
    }, 1);
  };

  return (
    <>
      <Divider />

      <div className="div-p-5">
        <Button className="bt-them" onClick={showModal}>
          <Text className="color-fff-hover">
            <PlusCircleFilled /> ?????????????????????????????????????????????
          </Text>
        </Button>

        <Table
          dataSource={listData}
          scroll={{ x: 400 }}
          bordered
          className="border"
        >
          <ColumnGroup title="???????????????????????????????????????????????????">
            <Column
              title="???????????????"
              width={"10%"}
              render={(value, item, index) => index + 1}
            />
            <Column
              title="?????????????????????????????? / ??????????????????"
              dataIndex="spareName"
              key="spareName"
              width={"48%"}
            />

            <Column title="???????????????" dataIndex="qty" key="qty" width={"10%"} />

            <Column
              title="????????????????????????????????????"
              dataIndex="qtyPrice"
              key="qtyPrice"
              width={"12%"}
            />
            <Column
              title="?????????????????????"
              dataIndex="sumPrice"
              key="sumPrice"
              width={"10%"}
            />

            <Column
              title="????????????????????????"
              width={"10%"}
              key="spairID"
              render={(text, record, key) => (
                <Space size="middle">
                  <Button
                    className="bt-delete"
                    onClick={() => {
                      handleDelete(record.spareID);
                    }}
                  >
                    <DeleteOutlined />
                  </Button>
                </Space>
              )}
            />
          </ColumnGroup>
        </Table>
      </div>

      {/* ?????????????????????????????????????????? */}
      {listData.length !== 0 ? (
        <div>
          <Row gutter={[0, 16]}>
            <Col lg={{ span: 11, offset: 1 }}>
              <Title level={5}>
                <Text>
                  <OrderedListOutlined /> ??????????????????????????????????????????
                </Text>
              </Title>
              <div className="border">
                <Row style={{ marginTop: "10px" }}>
                  <Col span={11} offset={1}>
                    <Title level={5}>
                      <Text>??????????????????</Text>
                    </Title>
                  </Col>
                  <Col span={5} offset={1}>
                    <Title level={5}>
                      <Text>???????????????</Text>
                    </Title>
                  </Col>
                  <Col span={5} offset={1}>
                    <Title level={5}>
                      <Text>????????????</Text>
                    </Title>
                  </Col>

                  {listData.map((val) => {
                    return (
                      <>
                        <Col span={11} offset={1}>
                          {val.spareName}
                        </Col>
                        <Col span={5} offset={1}>
                          {val.qty}
                        </Col>
                        <Col span={5} offset={1}>
                          {val.sumPrice}
                        </Col>
                      </>
                    );
                  })}
                  <Divider />
                  <Col span={11} offset={1}>
                    <Title level={5}>
                      <Text>????????????????????????</Text>
                    </Title>
                  </Col>
                  <Col span={11} offset={1}>
                    <Title level={5}>
                      <Text style={{ color: "red" }}>{sum} ?????????</Text>
                    </Title>
                  </Col>
                </Row>
              </div>
            </Col>

            {/* ????????????????????????????????? Update Status */}
            <Col xs={24} sm={24} md={24} lg={{ span: 11, offset: 1 }}>
              <Title level={5}>
                <Text>
                  <SaveOutlined /> ?????????????????????????????????
                </Text>
              </Title>
              <div className="border">
                <Row style={{ marginTop: "5%" }}>
                  <Col span={10} offset={1}>
                    <Title level={5}>
                      <Text>????????????????????????????????????</Text>
                    </Title>

                    <div className="div-select">
                      <Select
                        allowClear
                        style={{ width: "100%" }}
                        defaultValue={sandStatus}
                        onChange={(e) => {
                          setStatus(e);
                        }}
                      >
                        <Option value="??????????????????????????????????????????????????????">
                          ??????????????????????????????????????????????????????
                        </Option>
                        <Option value="??????????????????">??????????????????</Option>
                      </Select>
                    </div>
                  </Col>

                  <Col span={11} offset={1}>
                    <Title level={5}>
                      <Text>?????????????????????????????????</Text>
                    </Title>

                    <div className="div-select">
                      <Select
                        allowClear
                        style={{ width: "100%" }}
                        defaultValue={sandPayment}
                        onChange={(e) => {
                          setPayment(e);
                        }}
                      >
                        <Option value="???????????????????????????????????????">???????????????????????????????????????</Option>
                        <Option value="????????????????????????">????????????????????????</Option>
                      </Select>
                    </div>
                  </Col>

                  <Divider />

                  <Col span={24}>
                    <Button className="bt-them" onClick={handleSave}>
                      <Text className="color-fff-hover">
                        <SaveOutlined /> ??????????????????
                      </Text>
                    </Button>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      ) : null}

      {/* Model Pop Up */}
      <Modal
        title="????????????????????????????????????????????? / ??????????????????"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={1000}
      >
        <Row>
          <Col lg={{ span: 11, offset: 1 }}>
            <Text>??????????????????</Text>
            <Input
              required={true}
              value={spareName}
              onChange={(e) => {
                setSpareName(e.target.value);
              }}
            />
          </Col>
          <Col lg={{ span: 3, offset: 1 }}>
            <Text>???????????????</Text>
            <Input
              required={true}
              type="number"
              value={qty}
              onChange={(e) => {
                setQTY(e.target.value);
              }}
            />
          </Col>
          <Col lg={{ span: 3, offset: 1 }}>
            <Text>????????????????????????????????????</Text>
            <Input
              required={true}
              type="number"
              value={qtyPrice}
              onChange={(e) => {
                setQTYPrice(e.target.value);
              }}
            />
          </Col>
          <Col lg={{ span: 3, offset: 1 }}>
            <Text>??????????????????</Text>
            <Input type="number" value={sumPrice} />
          </Col>
        </Row>
      </Modal>
    </>
  );
}

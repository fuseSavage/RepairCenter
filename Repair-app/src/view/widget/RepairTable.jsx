import React, { useState, useEffect } from "react";
import Highlighter from "react-highlight-words";

import {
  Table,
  Space,
  Typography,
  Row,
  Col,
  Input,
  Button,
  Avatar,
  Image,
} from "antd";
import { Link } from "react-router-dom";

import { SearchOutlined } from "@ant-design/icons";

// Import services
import { FetctDetailByGarage } from "../../services";

const { Text, Title } = Typography;

export default function App() {
  const [datas, setDatas] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  useEffect(() => {
    const getDetailByGarage = async () => {
      let local = {
        garageID: JSON.parse(localStorage.getItem("user")).userData.userId,
      };
      await FetctDetailByGarage(local).then(async (response) => {
        await setDatas(response.data);
      });
    };
    getDetailByGarage();
  }, []);


  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
          }}
          placeholder={`ค้นหา`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            ค้นหา
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            ล้าง
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const columns = [
    {
      title: "ชื่อลูกค้า",
      key: "member_name",
      ...getColumnSearchProps("member_name"),
      render: (record) => {
        return (
          <>
            <Row>
              <Col>
                <Avatar
                  src={<Image src={record.imageUrl} style={{ width: 32 }} />}
                />
              </Col>
              <Col offset={1}>
                <Row>
                  <Text strong>{record.userName}</Text>
                </Row>
                <Row>{record.member_name}</Row>
              </Col>
            </Row>
          </>
        );
      },
    },
    {
      title: "รหัสลูกค้า",
      dataIndex: "member_tel",
      key: "member_tel",
      ...getColumnSearchProps("member_tel"),
    },
    {
      title: "ประเภทการซ่อม",
      dataIndex: "device_type",
      key: "device_type",
      ...getColumnSearchProps("device_type"),
    },
    {
      title: "ทะเบียน/ชนิด",
      key: "detailsID",
      ...getColumnSearchProps("car_number"),
      render: (record) => {
        return (
          <>
            {record.device_type === "รถจักรยานยนต์" ||
            record.device_type === "รถยนต์" ? (
              <>
                <Space size="small">
                  <Text style={{ fontWeight: "bold" }}>
                    {record.car_number}
                  </Text>
                </Space>
                {<br />}
                <Text>{record.car_province}</Text>
              </>
            ) : (
              <>
                <Text>{record.equipment}</Text>
              </>
            )}
          </>
        );
      },
    },
    {
      title: "รายละเอียดการซ่อมเบื้องต้น",
      dataIndex: "repair_details",
      key: "repair_details",
    },
    {
      title: "วันที่รับซ่อม",
      dataIndex: "repair_date",
      key: "repair_date",
      ...getColumnSearchProps("repair_date"),
    },
    {
      title: "สถานะ",
      key: "status",
      ...getColumnSearchProps("status"),
      render: (record) => {
        return (
          <>
            {record.status === "สำเร็จ" ? (
              <>
                <Text
                  style={{
                    color: "green",
                    backgroundColor: "#b7eb8f",
                    padding: "2px",
                  }}
                >
                  {record.status}
                </Text>
              </>
            ) : (
              <>
                <Text
                  style={{
                    color: "red",
                    backgroundColor: "#fff566",
                    padding: "2px",
                  }}
                >
                  {record.status}
                </Text>
              </>
            )}
          </>
        );
      },
    },
    {
      title: "เพิ่มเติม",
      key: "detailsID",
      render: (record) => {
        return (
          <>
            <Link
              to={{
                pathname: "/dashboard/all-repair/detail",
                state: {
                  detailsID: record.detailsID,
                  memberTel: record.member_tel,
                  sandStatus: record.status,
                  sandPayment: record.status_payment
                },
              }}
            >
              <Text style={{ color: "blue" }}>
                จัดการงานซ่อม
              </Text>
            </Link>
          </>
        );
      },
    },
  ];

  return (
    <>
      <Row>
        <Col span={24} style={{ marginTop: "3%" }}>
          <Title level={3}>งานซ่อมทั้งหมดที่มี</Title>
        </Col>
      </Row>

      <div className="div-p-5">
        <Table
          scroll={{ x: 500 }}
          bordered
          columns={columns}
          dataSource={datas}
          className="border"
        />
      </div>
    </>
  );
}

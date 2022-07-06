import React, { useState, useEffect } from "react";
import Highlighter from "react-highlight-words";

import { Col, Row, Typography, Button, Table, Input, Space } from "antd";

import { SearchOutlined } from "@ant-design/icons";

import { Link } from "react-router-dom";

// import services
import { FetchGarage } from "../../../services";

const { Title, Text } = Typography;

function Approve() {
  const [datas, setDatas] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  useEffect(() => {
    const getGarage = async () => {
      await FetchGarage().then((response) => {
        if (response.code === 500) {
          console.log("data", response);
        } else {
          // console.log("data", response);
          setDatas(response.data);
        }
      });
    };
    getGarage();
  }, []);

  let non_approve = [];
  if (datas !== null) {
    datas.forEach((e) => {
      if (e.confirmation === "non-approved") {
        non_approve.push(e);
      }
    });
  }

  // console.log("non-approve", non_approve);

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
            // searchInput = node;
          }}
          placeholder={`ค้นหา ${dataIndex}`}
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
        // setTimeout(() => searchInput.select(), 100);
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
    // this.setState({
    //   searchText: selectedKeys[0],
    //   searchedColumn: dataIndex,
    // });
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    // this.setState({ searchText: "" });
    setSearchText("");
  };

  const columns = [
    {
      title: "ลำดับ",
      width: "5%",
      render: (value, item, index) => {
        return <>{index+1}</>;
      },
    },
    {
      title: "วันที่ลงทะเบียน",
      dataIndex: "registration_date",
      key: "registration_date",
      width: "10%",
      ...getColumnSearchProps("registration_date"),
    },
    {
      title: "ชื่อร้าน",
      dataIndex: "garage_name",
      key: "garage_name",
      width: "20%",
    },
    {
      title: "ประเภทร้านซ่อม",
      // dataIndex: "member_name",
      key: "garage_type",
      width: "35%",
      render: (record) => {
        return <>{JSON.parse(record.garage_type).join(",  ")} </>;
      },
    },

    {
      title: "การอนุมัติ",
      width: "10%",
      render: () => {
        return <><Text>ยังไม่อนุมัติ</Text></>;
      },
    },

    {
      title: "เพิ่มเติม",
      key: "garageID",
      width: "15%",
      render: (record) => {
        return (
          <>
            <Link
              to={{
                pathname: "/admin/approve/detail",
                state: {
                  data: record,
                },
              }}
            >
              <Text style={{ color: "blue" }}>
                {/* <ToolOutlined style={{fontSize: "200%"}} /> */}
                ดูรายละเอียดเพิ่มเติม
              </Text>
            </Link>
          </>
        );
      },
    },
  ];

  return (
    <>
      <Row style={{ padding: "3% 0 0 0" }}>
        <Col span={24}>
          <Title level={3}>อนุมัติร้านซ่อม</Title>
        </Col>
      </Row>
      <div className="div-p-5">
        <Table
          scroll={{ x: 500 }}
          bordered
          columns={columns}
          dataSource={non_approve}
        />
      </div>
    </>
  );
}

export default Approve;

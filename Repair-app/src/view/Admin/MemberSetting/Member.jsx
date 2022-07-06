import React, { useState, useEffect } from "react";

import { Table, Input, Button, Space, Row, Col, Typography, Avatar, Image } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

import { Link } from "react-router-dom";

// import Service
import { FetchMemberAll } from "../../../services";

const { Title, Text } = Typography

export default function Member() {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const [datas, setDatas] = useState([]);

  // let userId = JSON.parse(localStorage.getItem("user")).userData.userId;

  useEffect(() => {
    // let data = {
    //   userId: userId,
    // };
    const getMember = async () => {
      await FetchMemberAll().then(async (response) => {
        if (response.code === 500) {
          console.log("data", response);
        } else {
          await setDatas(response.data);
        }
        // console.log('data', response)
      });
    };
    getMember();
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
      title: "Line",
      width: "20%",
      render: (record) => {
        return (
          <>
            <Avatar
              src={<Image src={record.imageUrl} style={{ width: 32 }} />}
            /> {" "}
            <Text strong>{record.userName}</Text> {<br />}
          </>
        );
      },
    },
    {
      title: "หมายเลขสมาชิก",
      dataIndex: "member_tel",
      key: "member_tel",
      width: "20%",
      ...getColumnSearchProps("member_tel"),
    },
    {
      title: "ชื่อ",
      dataIndex: "member_name",
      key: "member_name",
      width: "20%",
      ...getColumnSearchProps("member_name"),
    },
    
    {
      title: "วันที่ลงทะเบียน",
      dataIndex: "registration_date",
      key: "registration_date",
      width: "20%",
      ...getColumnSearchProps("registration_date"),
    },

    {
        title: "ประวัติการซ่อม",
        key: "member_tel",
        width: "20%",
        render: (record) => {
            return (
              <>
                <Link
                  to={{
                    pathname: "/admin/all-member/repair-history",
                    state: {
                      data: record,
                    },
                  }}
                >
                  <Text style={{ color: "blue" }}>
                    {/* <ToolOutlined style={{fontSize: "200%"}} /> */}
                    ดูประวัติการซ่อม
                  </Text>
                </Link>
              </>
            );
          },
      },
   
    
  ];

  return (
    <>
    <Row style={{padding: "3% 0 0 0"}}>
      <Col span={24}>
        <Title level={3}>ลูกค้าทั้งหมด</Title>
      </Col>
    </Row>
      <div className="div-p-5">
        <Table
          scroll={{ x: 400 }}
          bordered
          columns={columns}
          dataSource={datas}
        />
      </div>
    </>
  );
}

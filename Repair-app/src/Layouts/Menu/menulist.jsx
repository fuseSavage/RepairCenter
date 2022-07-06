import React, { useState } from "react";

import { Layout, Menu } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  TeamOutlined,
  SearchOutlined,
  FileSearchOutlined,
  CommentOutlined,
  LoginOutlined
} from "@ant-design/icons";

import { Link } from "react-router-dom";

const { Sider } = Layout;
const { SubMenu } = Menu;

export default function App() {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  return (
    <>
      <div
        style={{
          mixHeight: 360,
          backgroundColor: "#001529",
          overflowY: "scroll",
        }}
      >
        <Sider
          theme="dark"
          collapsible
          collapsed={collapsed}
          onCollapse={onCollapse}
        >
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
          >
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              <Link to={"/"}>เริ่มต้นใช้งาน</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              <Link to={"/register"}>ลงทะเบียนร้านซ่อม</Link>
            </Menu.Item>
            <SubMenu key="sub1" icon={<TeamOutlined />} title="บริการลูกค้า">
              <Menu.Item key="8" icon={<SearchOutlined />}>
                <Link to={"/search"}>ค้นหาร้านซ่อม</Link>
              </Menu.Item>
              <Menu.Item key="6" icon={<FileSearchOutlined />}>
                <Link to={"/status"}>เช็คสถานะการซ่อม</Link>
              </Menu.Item>

              <Menu.Item key="9" icon={<CommentOutlined />}>
              <Link to={"/reported"}>แจ้งปัญหาการใช้งาน</Link>
            </Menu.Item>
            </SubMenu>

           

            <Menu.Item key="3" icon={<LoginOutlined />}>
              <Link to={"/login"}>เข้าสู่ระบบ</Link>
            </Menu.Item>
          </Menu>
        </Sider>
      </div>
    </>
  );
}

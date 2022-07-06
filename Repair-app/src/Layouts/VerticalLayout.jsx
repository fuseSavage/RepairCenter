import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { Layout } from "antd";

// import Component
import HeaderTap from "./Header/tabHeader";
import MenuList from "./Menu/menulist";
import MenuDashboard from "./Menu/menuDashboard";
import MenuAdmin from "./Menu/menuAdmin";

const { Content } = Layout;

export default function VerticalLayout(props) {
  const { children } = props;
  // let test = "";
  const history = useHistory();

  const [checkLocal, setChechLocal] = useState(null);

  useEffect(() => {
    // console.log("local", localStorage.getItem("user"));
    setChechLocal(JSON.parse(localStorage.getItem("user")));
  }, []);

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

  return (
    <>
      <HeaderTap
        className="site-layout-background"
        style={{
          padding: 0,
          position: "fixed",
          zIndex: 1,
          width: "100%",
        }}
      />

      {checkLocal === null ? (
        <Layout style={{ minHeight: "90vh", maxHeight: "90vh" }}>
          <MenuList />

          <Layout className="site-layout">
            <Content style={{ margin: "1vh 1vh" }}>
              <div
                className="site-layout-background"
                style={{ mixHeight: 360, overflowY: "scroll" }}
              >
                {children}
              </div>
            </Content>
            {/* <Footer className="footer">
              <p>Final Project ©2021 Developed by Chaiwat Singkibut</p>
            </Footer> */}
          </Layout>
        </Layout>
      ) : (
        <>
          {checkLocal.userData.userId === "admin" ? (
            <>
              <Layout
                style={{
                  minHeight: "90vh",
                  maxHeight: "90vh",
                  // paddingTop: "0.5vh",
                }}
              >
                <MenuAdmin />
                <Layout className="site-layout">
                  <Content style={{ margin: "1vh 1vh" }}>
                    <div
                      className="site-layout-background"
                      style={{ mixHeight: 360, overflowY: "scroll" }}
                    >
                      {children}
                    </div>
                  </Content>
                  {/* <Footer className="footer">
              <p>Final Project ©2021 Developed by Chaiwat Singkibut</p>
            </Footer> */}
                </Layout>
              </Layout>
            </>
          ) : (
            <>
              <Layout
                style={{
                  minHeight: "90vh",
                  maxHeight: "90vh",
                  // paddingTop: "0.5vh",
                }}
              >
                <MenuDashboard />
                <Layout className="site-layout">
                  <Content style={{ margin: "1vh 1vh" }}>
                    <div
                      className="site-layout-background"
                      style={{ mixHeight: 360, overflowY: "scroll" }}
                    >
                      {children}
                    </div>
                  </Content>
                  {/* <Footer className="footer">
              <p>Final Project ©2021 Developed by Chaiwat Singkibut</p>
            </Footer> */}
                </Layout>
              </Layout>
            </>
          )}
        </>
      )}
    </>
  );
}

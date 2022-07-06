import React from "react";

// import {  Modal, Button, Input } from "antd";

// import { MobileOutlined, DollarOutlined } from "@ant-design/icons";

import { useLocation } from "react-router-dom";

// Import Component
import TitleShowDetail from "../../component/TitleShowDetail";
import SpareAdd from "../../component/SpareAdd";

// const { Meta } = Card;
// const { Text, Title } = Typography;

export default function ShowDetail() {
  let location = useLocation();

  //use State

  const detailID = location.state.detailsID;
  const memberTel = location.state.memberTel;
  const sandStatus = location.state.sandStatus;
  const sandPayment = location.state.sandPayment;
    console.log('test', sandStatus, sandPayment);

  return (
    <>
      <TitleShowDetail detailID={detailID} />
      {/* Show Repair id = {detailID.detailsID} */}
      <SpareAdd detailID={detailID} memberTel={memberTel} sandStatus={sandStatus} sandPayment={sandPayment} />
    </>
  );
}

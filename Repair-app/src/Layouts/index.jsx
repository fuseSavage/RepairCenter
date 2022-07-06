import { React } from "react";

import { Layout } from "antd";


import TabHeader from "./tabHeader";
import MenuList from './menulist'

export default function App() {
  return (
    <Layout>
      <TabHeader />
      <MenuList />
    </Layout>
  );
}

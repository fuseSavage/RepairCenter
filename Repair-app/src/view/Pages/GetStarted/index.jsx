import React from "react";

import {  Divider } from "antd";

// Import Component
import Titles from "./Title";
import Contents from "./Contents";
import ContentImage from "./ContentImage";
import Footers from './Footers'

export default function App(props) {
  return (
    <>
      <Titles />
      <Divider />
      <Contents />
      <Divider />
      <ContentImage />
      <Footers />
    </>
  );
}

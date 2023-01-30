import type { MenuProps } from "antd";
import { Menu, Typography } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import GEN_CONFIG from "../../../constants/GEN_CONFIG.json";

import "./Sidebar.less";
import { items } from "./utils";

const { Title } = Typography;
const sidebarWidth = 285;
const sidebarHeight = "100%";
const genGrey5 = "#C5C8DF";

const Sidebar = () => {
  const { SIDEBAR } = GEN_CONFIG;
  const navigate = useNavigate();
  let location = useLocation();
  const [current, setCurrent] = useState("");

  useEffect(() => {
    const locationArray = location.pathname.split("/");
    const lastItem = locationArray[locationArray.length - 1];
    setCurrent(lastItem);
  }, []);

  const onClick: MenuProps["onClick"] = (e) => {
    const keyPathArray = e.keyPath;
    const singlePath = e.key;
    let multiPath = "";
    setCurrent(e.key);
    if (keyPathArray.length > 1) {
      multiPath += "/";
      for (let i = keyPathArray.length - 1; i >= 0; i--) {
        multiPath += i === 0 ? keyPathArray[i] : `${keyPathArray[i]}/`;
      }
      return navigate(multiPath);
    }
    return navigate("/" + singlePath);
  };

  return (
    <aside className="gen-sidebar">
      <div>
        <Title className="gen-sidebar__title text-24 text-mulish-bold text-black">
          {SIDEBAR.TITLE}
        </Title>
        <Title className="gen-sidebar__title__toggle text-24 text-mulish-bold text-black text-center">
          {`G`}
        </Title>
      </div>
      <Menu
        onClick={onClick}
        style={{
          width: sidebarWidth,
          height: sidebarHeight,
          backgroundColor: genGrey5,
        }}
        defaultOpenKeys={["sub1"]}
        selectedKeys={[current]}
        mode="inline"
        items={items}
      />
    </aside>
  );
};

export default Sidebar;

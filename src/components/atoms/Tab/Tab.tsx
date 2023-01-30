import { Tabs as AntdTabs } from "antd";

import { TabPaneProps } from "../../../types/tabs/tab-item.type";
import "~/styles/utils.less";
import "./Tab.less";

interface TabItemProps {
    items: TabPaneProps[]
}

const Tab = ({ items }: TabItemProps) => {
    
    return (
        <AntdTabs
            className="gen-tab"
            defaultActiveKey="1"
            items={items}
        />
    )
}

export default Tab;

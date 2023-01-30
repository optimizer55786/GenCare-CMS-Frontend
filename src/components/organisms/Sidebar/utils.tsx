import type { MenuProps } from "antd";
import { Typography } from "antd";

import SvgIcon from "../../../components/atoms/SvgIcon/SvgIcon";
import GEN_CONFIG from "../../../constants/GEN_CONFIG.json";

import "~/styles/utils.less";

type MenuItem = Required<MenuProps>["items"][number];
type ChilidItemType = { LABEL: string; KEY: string };

const { Text } = Typography;

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label: <Text className="text-16">{label}</Text>,
    type,
  } as MenuItem;
}

function getIcon(key: string) {
  return <SvgIcon name={key} width={16} height={16} />;
}

export const items: MenuItem[] = GEN_CONFIG.SIDEBAR.MENU.map(
  (item: {
    LABEL: string;
    KEY: string;
    ICON: string;
    CHILDREN?: ChilidItemType[] | undefined;
  }) => {
    let icon: React.ReactNode = getIcon(item.KEY);
    let children: { label: React.ReactNode; key: string }[];

    if (item.CHILDREN !== undefined) {
      children = item.CHILDREN.map((child) => ({
        label: <Text className="text-14">{child.LABEL}</Text>,
        key: child.KEY,
      }));
      return getItem(item.LABEL, item.KEY, icon, children);
    }

    return getItem(item.LABEL, item.KEY, icon);
  }
);

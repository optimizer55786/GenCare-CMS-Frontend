import Tab from "../../components/atoms/Tab/Tab";

import DailyFuelQueue from "./daily-fuel-queue/daily-fuel-queue.component";
import ContentCategoryQueue from "./content-category-queue/content-category-queue.component";
import Schedule from "./schedule/schedule.component";
import Settings from "./settings/settings.component";

import { TabPaneProps } from "../../types/tabs/tab-item.type";

const tabItems: Array<TabPaneProps> = [
  {
    label: "daily fuel queue",
    key: "1",
    children: <DailyFuelQueue />,
  },
  {
    label: "schedule",
    key: "2",
    children: <Schedule />,
  },
  {
    label: "content category queue",
    key: "3",
    children: <ContentCategoryQueue />,
  },
  {
    label: "setting",
    key: "4",
    children: <Settings />,
  },
];

export default function () {
  return <Tab items={tabItems} />;
}

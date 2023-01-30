import { Badge, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DataType } from "./Table";

const { Text } = Typography;

export const contentLibraryColumns: ColumnsType<DataType> = [
  {
    title: (
      <Text className="text-16 text-mulish-bold">International Title</Text>
    ),
    dataIndex: "name",
    key: "name",
    render: (text) => (
      //   <Link className="text-primary" to="/">
      <div>{text}</div>
      //   </Link>
    ),
  },
  {
    title: <Text className="text-16 text-mulish-bold">Group</Text>,
    dataIndex: "group",
    key: "group",
  },
  {
    title: <Text className="text-16 text-mulish-bold">Category</Text>,
    dataIndex: "category",
    key: "category",
  },
  {
    title: <Text className="text-16 text-mulish-bold">Level</Text>,
    dataIndex: "level",
    key: "level",
    render: (level) => {
      const elements: number[] = [];

      for (let i = 1; i <= level; i++) {
        elements.push(i);
      }

      return elements.map((el) => (
        <Badge className="level-badge" color="#F7B500" />
      ));
    },
  },
  {
    title: (
      <Text className="text-16 text-mulish-bold">
        In Daily Content <br /> Category Queue?
      </Text>
    ),
    dataIndex: "in_daily_content_category",
    key: "in_daily_content_category",
    render: (item) => {
      return <Text>{item ? "Yes" : "No"}</Text>;
    },
  },
  {
    title: <Text className="text-16 text-mulish-bold">Status</Text>,
    dataIndex: "status",
    key: "status",
    render: (text) => (
      <Badge color={text ? "#87bf4c" : "#c5c8df"} text="Active" />
    ),
  },
];

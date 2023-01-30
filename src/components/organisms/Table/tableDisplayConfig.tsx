import { Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { DataType } from "./Table";

const { Text } = Typography;

function renderContentLibraryData(data: DataType) {
  return Object.keys(data).map((key) => ({
    title: <Text className="text-16 text-mulish-bold">title</Text>,
    dataIndex: "international-title",
    key: "international-title",
    render: (text: any) => (
      <Link className="text-primary" to="/">
        {text}
      </Link>
    ),
  }));
}

export const tableColumnsConfig = (type: string, data: DataType[]) => {
  let customTableData: ColumnsType<DataType> = [];
  console.log(data);

  // if (type === "content-library") {
  //   customTableData = data.map((content) => renderContentLibraryData(content));
  // }
  return customTableData;
};

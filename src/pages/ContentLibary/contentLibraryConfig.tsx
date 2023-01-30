import { Dispatch, SetStateAction } from "react";
import { Badge, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import Input from "../../components/atoms/Input";
import "./index.less";
import { ContentLibraryDataType } from "./content-library.types";

const { Text } = Typography;

const filterData =
  (data: ContentLibraryDataType[], byParam: string) => (formatter: any) => {
    return Object.values(
      data.reduce((acc, obj: any) => ({ ...acc, [obj[byParam]]: obj }), {})
    ).map((item: any) => ({
      text: formatter(item),
      value: formatter(item),
    }));
  };

export const createColumnContent = (
  // tableData: DataType[],
  // value: string,
  // handleSearch: any

  tableData: ContentLibraryDataType[],
  value: string,
  handleSearch: any,
  setData: Dispatch<SetStateAction<ContentLibraryDataType[]>>,
  setDefaultData: Dispatch<SetStateAction<ContentLibraryDataType[]>>
): ColumnsType<ContentLibraryDataType> => {
  return [
    {
      title: (
        <Input
          value={value}
          className="search-by-keyword"
          placeholder="Search by internal title"
          onChange={handleSearch}
        />
      ),
      dataIndex: "internal_title",
      key: "internal_title",
      render: (text) => (
        <Link className="text-primary" to="/">
          {text}
        </Link>
      ),
      sorter: (a, b) => {
        if (a["internal_title"] > b["internal_title"]) {
          return 1;
        }
        if (a["internal_title"] < b["internal_title"]) {
          return -1;
        }
        return 0;
      },
    },
    {
      title: <Text className="text-16 text-mulish-bold">Group</Text>,
      dataIndex: "group_name",
      key: "group_name",
      sorter: (a, b) => {
        if (a["group_name"] > b["group_name"]) {
          return 1;
        }
        if (a["group_name"] < b["group_name"]) {
          return -1;
        }
        return 0;
      },
      filters: filterData(tableData, "group_name")((i: any) => i.group_name),
      onFilter: (value: string | number | boolean, record) =>
        record.group_name.toString().includes(value.toString()),
    },
    {
      title: <Text className="text-16 text-mulish-bold">Category</Text>,
      dataIndex: "category_name",
      key: "category_name",
      sorter: (a, b) => {
        if (a["category_name"] > b["category_name"]) {
          return 1;
        }
        if (a["category_name"] < b["category_name"]) {
          return -1;
        }
        return 0;
      },
      filters: filterData(
        tableData,
        "category_name"
      )((i: any) => i.category_name),
      onFilter: (value: string | number | boolean, record) =>
        record.category_name.toString().includes(value.toString()),
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
      sorter: (a, b) => {
        if (a["level"] > b["level"]) {
          return 1;
        }
        if (a["level"] < b["level"]) {
          return -1;
        }
        return 0;
      },

      filters: filterData(tableData, "level")((i: any) => i.level),
      onFilter: (value: string | number | boolean, record) =>
        record.level.toString().includes(value.toString()),
    },
    {
      title: (
        <Text className="text-14 text-mulish-bold">
          In Daily Content <br /> Category Queue?
        </Text>
      ),
      dataIndex: "in_daily_content_category",
      key: "in_daily_content_category",
      render: (item) => {
        return <Text>{item ? "Yes" : "No"}</Text>;
      },
      sorter: (a, b) =>
        a.in_daily_content_category.toString().length -
        b.in_daily_content_category.toString().length,
      filters: filterData(
        tableData,
        "in_daily_content_category"
      )((i: any) => (i.in_daily_content_category ? "Yes" : "No")),
      onFilter: (value: string | number | boolean, record) => {
        if (value === "Yes") {
          return record.in_daily_content_category;
        }
        return !record.in_daily_content_category;
      },
    },
    {
      title: <Text className="text-16 text-mulish-bold">Status</Text>,
      dataIndex: "status",
      key: "status",
      render: (text) => (
        <Badge
          color={text ? "#87bf4c" : "#c5c8df"}
          text={text ? "Active" : "Inactive"}
        />
      ),
      sorter: (a, b) => a.status.toString().length - b.status.toString().length,
      filters: filterData(
        tableData,
        "status"
      )((i: any) => (i.status ? "Active" : "Inactive")),
      onFilter: (value: string | number | boolean, record) => {
        if (value === "Active") {
          return record.status;
        }
        return !record.status;
      },
    },
  ];
};

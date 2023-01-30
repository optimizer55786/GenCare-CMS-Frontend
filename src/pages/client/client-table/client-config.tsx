import { Badge, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import Input from "../../../components/atoms/Input";
import { ClientDataType } from "./types";

const { Text } = Typography;

const filterData =
  (data: ClientDataType[], byParam: string) => (formatter: any) => {
    return Object.values(
      data.reduce((acc, obj: any) => ({ ...acc, [obj[byParam]]: obj }), {})
    ).map((item: any) => ({
      text: formatter(item),
      value: formatter(item),
    }));
  };

export const createColumnContent = (
  tableData: ClientDataType[],
  value: string,
  handleSearch: any
): ColumnsType<ClientDataType> => {
  return [
    {
      title: (
        <Input
          value={value}
          className="search-by-keyword"
          placeholder="Search by Client"
          onChange={handleSearch}
        />
      ),
      dataIndex: "client_name",
      key: "client_name",
      render: (text) => (
        <Link className="text-primary" to="/">
          {text}
        </Link>
      ),
      sorter: (a, b) => {
        if (a["client_name"] > b["client_name"]) {
          return 1;
        }
        if (a["client_name"] < b["client_name"]) {
          return -1;
        }
        return 0;
      },
    },
    {
      title: <Text className="text-16 text-mulish-bold">Industry</Text>,
      dataIndex: "industry_name",
      key: "industry_name",
      render: (text) => (
        <Link className="text-primary" to="/">
          {text}
        </Link>
      ),
      sorter: (a, b) => {
        if (a["industry_name"] > b["industry_name"]) {
          return 1;
        }
        if (a["industry_name"] < b["industry_name"]) {
          return -1;
        }
        return 0;
      },
    },
    {
      title: <Text className="text-16 text-mulish-bold">Location</Text>,
      dataIndex: "city_name",
      key: "city_name",
      render: (text: string, record) => (
        <Link className="text-primary" to="/">
          {record.city_name}, &nbsp;{record.country_name}
        </Link>
      ),
      sorter: (a, b) => {
        if (a["city_name"] > b["city_name"]) {
          return 1;
        }
        if (a["city_name"] < b["city_name"]) {
          return -1;
        }
        return 0;
      },
    },
    {
      title: <Text className="text-16 text-mulish-bold">Status</Text>,
      dataIndex: "published",
      key: "published",
      render: (text) => (
        <Badge
          color={text ? "#87bf4c" : "#c5c8df"}
          text={text ? "Active" : "Inactive"}
        />
      ),
      sorter: (a, b) =>
        a.published.toString().length - b.published.toString().length,
      filters: filterData(
        tableData,
        "status"
      )((i: any) => (i.status ? "Active" : "Inactive")),
      onFilter: (value: string | number | boolean, record) => {
        if (value === "Active") {
          return record.published;
        }
        return !record.published;
      },
    },
  ];
};

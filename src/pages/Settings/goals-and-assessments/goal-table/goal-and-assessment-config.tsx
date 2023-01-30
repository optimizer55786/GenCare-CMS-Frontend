import { Dispatch, SetStateAction } from "react";
import { Badge, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import Input from "../../../../components/atoms/Input";
import DeleteIcon from "../../../../components/atoms/SvgIcon/DeleteIcon";
import { toast } from "react-toastify";

import { GoalDataType } from "./types";
import { deleteGoalAndAssementById } from "../../../../services/request";

const { Text } = Typography;

const filterData =
  (data: GoalDataType[], byParam: string) => (formatter: any) => {
    return Object.values(
      data.reduce((acc, obj: any) => ({ ...acc, [obj[byParam]]: obj }), {})
    ).map((item: any) => ({
      text: formatter(item),
      value: formatter(item),
    }));
  };

export const createColumnContent = (
  tableData: GoalDataType[],
  value: string,
  handleSearch: any,
  setData: Dispatch<SetStateAction<GoalDataType[]>>,
  setDefaultData: Dispatch<SetStateAction<GoalDataType[]>>
): ColumnsType<GoalDataType> => {
  const handleDelete = async (recordId: any, text: any) => {
    try {
      await deleteGoalAndAssementById(recordId);
      toast(`✅ ${text} deleted successfully!`);
      const filteredData = tableData.filter((data) => data.id !== recordId);
      setData(filteredData);
      setDefaultData(filteredData);
      return;
    } catch (err) {
      console.log(err);
    }
  };
  return [
    {
      title: (
        <Input
          value={value}
          className="search-by-keyword"
          placeholder="Search by Goal"
          onChange={handleSearch}
        />
      ),
      dataIndex: "goal",
      key: "goal",
      render: (text, record) => (
        <div className="flex">
          <Link
            className="text-primary"
            to={`/settings/goals-and-assessments/edit/${record?.id}`}
          >
            {text}
          </Link>
          <div
            className="cursor-pointer"
            onClick={() => {
              handleDelete(record.id, text);
            }}
          >
            <DeleteIcon />
          </div>
        </div>
      ),
      sorter: (a, b) => {
        if (a["goal"] > b["goal"]) {
          return 1;
        }
        if (a["goal"] < b["goal"]) {
          return -1;
        }
        return 0;
      },
    },
    {
      title: (
        <Text className="text-14 text-mulish-bold">Onboarding Default</Text>
      ),
      dataIndex: "onboarding_default",
      key: "onboarding_default",
      render: (item) => {
        return <Text>{item ? "Yes" : "No"}</Text>;
      },
      sorter: (a, b) =>
        a.onboarding_default.toString().length -
        b.onboarding_default.toString().length,
      filters: filterData(
        tableData,
        "onboarding_default"
      )((i: any) => (i.onboarding_default ? "Yes" : "No")),
      onFilter: (value: string | number | boolean, record) => {
        if (value === "Yes") {
          return record.onboarding_default;
        }
        return !record.onboarding_default;
      },
    },
    {
      title: <Text className="text-16 text-mulish-bold">Status</Text>,
      dataIndex: "state",
      key: "state",
      render: (text) => (
        <Badge
          color={text ? "#87bf4c" : "#c5c8df"}
          text={text ? "Active" : "Inactive"}
        />
      ),
      sorter: (a, b) => a.state.toString().length - b.state.toString().length,
      filters: filterData(
        tableData,
        "status"
      )((i: any) => (i.status ? "Active" : "Inactive")),
      onFilter: (value: string | number | boolean, record) => {
        if (value === "Active") {
          return record.state;
        }
        return !record.state;
      },
    },
  ];
};

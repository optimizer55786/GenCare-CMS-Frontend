import { Pagination, Table as DefaultTable, Typography } from "antd";
import "~/styles/utils.less";
import "./Table.less";
import type { ColumnsType } from "antd/es/table";
import { GoalDataType } from "../../../pages/Settings/goals-and-assessments/goal-table/types";
import { GoalContentDataType } from "../../../pages/Settings/goal-content-template/goal-content-table/types";
export interface DataType {
  id?: number;
  key?: string;
  group_name?: string;
  internal_title?: string;
  level?: number;
  category_name?: string;
  in_daily_content_category?: boolean;
  industry?: string | number;
  location?: string;
  status?: boolean;
  goal?: string;
  state?: boolean;
  onboarding_default?: boolean;
}

interface Props {
  data: DataType[];
  columns: ColumnsType<any | DataType | GoalDataType | GoalContentDataType>;
  firstItemOnPage: number;
  lastItemOnPage: number;
  totalItems: number;
  pathSnippets: string;
  hasPagination?: boolean;
  pageIndex: number;
  pageSize: number;
  setPageIndex: React.Dispatch<React.SetStateAction<number>>;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
}

const { Text } = Typography;

const Table = ({
  data,
  pageIndex,
  pageSize,
  setPageSize,
  setPageIndex,
  columns,
}: Props) => {
  return (
    <div>
      <DefaultTable
        className="gen-table"
        pagination={{
          showTotal: (total, range) => (
            <Text className="gen-table__pagination-text text-14 text-grey-6 text-mulish-medium">
              Showing {range[0]} to {range[1]} of {total} Entries
            </Text>
          ),
          pageSize: pageSize,
          showSizeChanger: true,
          current: pageIndex,
          onChange: (pageNum, pageSize) => {
            setPageIndex(pageNum);
            setPageSize(pageSize);
          },
        }}
        columns={columns}
        dataSource={data}
      />
    </div>
  );
};

Table.defaultProps = {
  firstItemOnPage: 1,
  lastItemOnPage: 10,
  totalItems: 57,
  pathSnippets: "content-library",
};

export default Table;

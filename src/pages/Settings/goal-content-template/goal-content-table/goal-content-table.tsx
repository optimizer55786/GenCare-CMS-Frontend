import { useEffect, useState, ChangeEvent } from "react";
import ReusableTable from "../../../../components/organisms/Table/Table";
// import { useLocation } from "react-router-dom";
import { GoalContentDataType } from "./types";
import { getAllGoalContentTemplate } from "../../../../services/request";
import { createColumnContent } from "./goal-content-config";

function Table() {
  const [data, setData] = useState<GoalContentDataType[]>([]);
  const [defaultData, setDefaultData] = useState<GoalContentDataType[]>([]);
  // const location = useLocation();
  const [value, setValue] = useState("");
  // const pathSnippets = location.pathname.split("/").filter((i) => i)[0];
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  async function getData() {
    try {
      const { data } = await getAllGoalContentTemplate();
      setData(data);
      setDefaultData(data);
    } catch (error: any) {}
  }

  useEffect(() => {
    getData();

    return () => {
      null;
    };
  }, []);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const currValue = e.target.value;
    setValue(currValue);
    if (!currValue) {
      setData(defaultData);
      return;
    }
    const filteredData = defaultData.filter((entry) =>
      entry.internal_title.toLowerCase().includes(currValue.toLowerCase())
    );
    setData(filteredData);
  };

  return (
    <ReusableTable
      totalItems={data.length}
      hasPagination={true}
      data={data}
      // tableType={pathSnippets}
      pageIndex={pageIndex}
      pageSize={pageSize}
      setPageSize={setPageSize}
      setPageIndex={setPageIndex}
      columns={createColumnContent(
        data,
        value,
        handleSearchChange,
        setData,
        setDefaultData
      )}
    />
  );
}

export default Table;

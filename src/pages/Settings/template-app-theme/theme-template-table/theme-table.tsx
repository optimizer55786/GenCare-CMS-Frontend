import { useEffect, useState, ChangeEvent } from "react";
import ReusableTable from "../../../../components/organisms/Table/Table";
import { ThemeData } from "./types";
import { createColumnContent } from "./theme-template-config";
import { getThemeTemplate } from "../../../../services/request";
function Table() {
  const [data, setData] = useState<ThemeData[]>([]);
  const [defaultData, setDefaultData] = useState<ThemeData[]>([]);
  const [value, setValue] = useState("");
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  async function getData() {
    try {
      const { data } = await getThemeTemplate();
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
      entry.name.toLowerCase().includes(currValue.toLowerCase())
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

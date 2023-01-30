import { useEffect, useState, ChangeEvent } from "react";
import ReusableTable from "../../../components/organisms/Table/Table";
import { ClientDataType } from "./types";
import { createColumnContent } from "./client-config";
import { getClients } from "../../../services/request";

function Table() {
  const [data, setData] = useState<ClientDataType[]>([]);
  const [defaultData, setDefaultData] = useState<ClientDataType[]>([]);
  const [value, setValue] = useState("");
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  async function getData() {
    try {
      const { data } = await getClients();
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
      entry.client_name.toLowerCase().includes(currValue.toLowerCase())
    );
    setData(filteredData);
  };

  return (
    <ReusableTable
      totalItems={data.length}
      hasPagination={true}
      data={data}
      pageIndex={pageIndex}
      pageSize={pageSize}
      setPageSize={setPageSize}
      setPageIndex={setPageIndex}
      columns={createColumnContent(data, value, handleSearchChange)}
    />
  );
}

export default Table;

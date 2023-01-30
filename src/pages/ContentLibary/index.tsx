import { useEffect, useState, ChangeEvent } from "react";
// import { useLocation } from "react-router-dom";
import Table from "../../components/organisms/Table/Table";
import EmptyState from "./component/empty-state";
// import Modal from "react-modal";
// import Table from "~/components/organisms/Table/Table";
import GroupSelector from "./component/group-selector";
import AddAction, { EditAction } from "./component/action-modals";
import Modal from "../../components/atoms/Modal";
import { Button } from "antd";
import ShadowContainer from "../../components/organisms/ShadowContainer/ShadowContainer";
import { createColumnContent } from "./contentLibraryConfig";
import { getContentLibrary } from "../../services/request";
import { ContentLibraryDataType } from "./content-library.types";

export default function () {
  const [data, setData] = useState<ContentLibraryDataType[]>([]);
  const [defaultData, setDefaultData] = useState<ContentLibraryDataType[]>([]);
  // const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");
  // const pathSnippets = location.pathname.split("/").filter((i) => i)[0];
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  async function getData() {
    try {
      const { data } = await getContent();
      setData(data);
      setDefaultData(data);
    } catch (error: any) {}
  }

  async function getContent() {
    let response = await getContentLibrary();
    return response;
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

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Modal isOpen={isOpen}>
        <GroupSelector onClick={closeModal} />
      </Modal>
      {!defaultData.length ? (
        <>
          <ShadowContainer>
            <EmptyState onClick={openModal} />
          </ShadowContainer>
        </>
      ) : (
        <div className="body-container">
          <div className="modalopen">
            <Button type="primary" shape="round" block onClick={openModal}>
              Add content
            </Button>
          </div>

          <ShadowContainer>
            <Table
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
          </ShadowContainer>
        </div>
      )}
    </>
  );
}

const customStyle = {
  content: {
    top: "50%",
    left: "50%",
    width: "auto",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    padding: 0,
    transform: "translate(-50%, -50%)",
  },
  overlay: {
    backgroundColor: "#4A4A4AE6",
  },
};

import { Button } from "antd";
import { FileTextOutlined } from "@ant-design/icons";
import { CategoryType } from "../../content-category-queue.type";

import SvgIcon from "../../../../../components/atoms/SvgIcon/SvgIcon";
import "~/styles/utils.less";
import "./empty-queue.less";

interface EmptyQueueProps {
  selectCategory: (category: CategoryType, title: string) => void;
  selected: CategoryType | undefined;
  title: string;
}

const EmptyQueue = ({ selected, title, selectCategory }: EmptyQueueProps) => {
  const addContentToQueue = (): void => {};

  return (
    <>
      <div className="content-category-queue-header text-24">
        <span className="content-category-queue-header-prefix text-capitalize">
          {title}
        </span>
        <span className="content-category-queue-header-title text-capitalize">
          {` / ${selected?.name} Content Category Queue`}
        </span>
      </div>

      <div className="content-category-queue-empty-content text-24">
        <div>
          <SvgIcon name="sticky_note" color="#C5C8DF" width={63} height={63} />
        </div>

        <div className="content-category-queue-no-title ">
          No content has been added yet
        </div>

        <div>
          <Button
            className="add-content-btn"
            block
            type="primary"
            shape="round"
            size="middle"
            onClick={addContentToQueue}
          >
            add all content of this content category to queue
          </Button>
        </div>
      </div>
    </>
  );
};

export default EmptyQueue;

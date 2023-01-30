import { useEffect, useState } from "react";
import { Input, Button, Popover, Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Flipper, Flipped } from "react-flip-toolkit";
import {
  DragDropContext,
  Draggable,
  DraggingStyle,
  Droppable,
  DropResult,
  NotDraggingStyle,
} from "react-beautiful-dnd";
import * as _ from "lodash";

import DragDropComponent from "~/components/templates/dragdrop/dragdrop.component";
import SvgIcon from "~/components/atoms/SvgIcon/SvgIcon";
import { CategoryType } from "../../content-category-queue.type";
import { Item } from "./content-category-queue-item.type";
import ContentCategoryItem from "./content-category-item.component";

const LOADMORE = "Load More";
const grid = 25;

const mockData: Array<Item> = [
  {
    id: "item-0",
    content:
      "In hopes of finding out the truth, he entered the one-room library.",
    active: true,
  },
  {
    id: "item-1",
    content:
      "He wondered why at 18 he was old enough to go to war, but not old enough to buy cigarettes.",
    active: true,
  },
  {
    id: "item-2",
    content: "The father died during childbirth.",
    active: false,
  },
  {
    id: "item-3",
    content:
      "The Guinea fowl flies through the air with all the grace of a turtle.",
    active: true,
  },
  {
    id: "item-4",
    content: "Garlic ice-cream was her favorite.",
    active: true,
  },
];

const moreMockData: Array<Item> = [
  {
    id: "item-0",
    content:
      "In hopes of finding out the truth, he entered the one-room library.",
    active: true,
  },
  {
    id: "item-1",
    content:
      "He wondered why at 18 he was old enough to go to war, but not old enough to buy cigarettes.",
    active: true,
  },
  {
    id: "item-2",
    content: "The father died during childbirth.",
    active: false,
  },
  {
    id: "item-3",
    content:
      "The Guinea fowl flies through the air with all the grace of a turtle.",
    active: true,
  },
  {
    id: "item-4",
    content: "Garlic ice-cream was her favorite.",
    active: true,
  },
  {
    id: "item-5",
    content:
      "In hopes of finding out the truth, he entered the one-room library.",
    active: true,
  },
  {
    id: "item-6",
    content:
      "He wondered why at 18 he was old enough to go to war, but not old enough to buy cigarettes.",
    active: true,
  },
  {
    id: "item-7",
    content: "The father died during childbirth.",
    active: false,
  },
  {
    id: "item-8",
    content:
      "The Guinea fowl flies through the air with all the grace of a turtle.",
    active: true,
  },
  {
    id: "item-9",
    content: "Garlic ice-cream was her favorite.",
    active: true,
  },
];

const reorder = (
  list: Item[],
  startIndex: number,
  endIndex: number
): Item[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const getListStyle = (isDraggingOver: boolean): React.CSSProperties => ({
  background: isDraggingOver ? "white" : "white",
  width: "100%",
});

const getItemStyle = (
  isDragging: boolean,
  draggableStyle: DraggingStyle | NotDraggingStyle | undefined
): React.CSSProperties => ({
  userSelect: "none",
  margin: `${grid}px 0 ${grid}px 0`,
  background: isDragging ? "lightgreen" : "white",
  ...draggableStyle,
});

interface CategoryItemsProps {
  selected: CategoryType | undefined;
  title: string;
}

const ContentCategoryQueueItem = ({ selected, title }: CategoryItemsProps) => {
  const [state, setState] = useState<Array<Item>>(mockData);
  const [filteredState, setFilteredState] = useState<Array<Item>>(mockData);
  const [statusFilter, setStatusFilter] = useState<string>("Status");
  const [searchKey, setSearchKey] = useState<string>("");
  const [spinFlag, setSpinFlag] = useState<boolean>(false);

  const onDragEnd = (result: DropResult): void => {
    if (!result.destination) {
      return;
    }
    const items: Item[] = reorder(
      filteredState,
      result.source.index,
      result.destination.index
    );
    setFilteredState(items);
  };

  const StatusList = (
    <div>
      <p
        onClick={() => {
          setStatusFilter("Status");
        }}
      >
        All
      </p>
      <p
        onClick={() => {
          setStatusFilter("Active");
        }}
      >
        Active
      </p>
      <p
        onClick={() => {
          setStatusFilter("Inactive");
        }}
      >
        Inactive
      </p>
    </div>
  );

  const getMoreItems = () => {
    setSpinFlag(true);
    setTimeout(() => {
      setSearchKey("");
      setStatusFilter("Status");
      setFilteredState(moreMockData);
      setSpinFlag(false);
    }, 1000);
  };

  useEffect(() => {
    // let tempArray = _.cloneDeep(state);
    let tempArray: Array<Item> = _.filter(state, (item) => {
      let statusFlag = true;
      switch (statusFilter) {
        case "Status":
          statusFlag = true;
          break;
        case "Active":
          statusFlag = item.active;
          break;
        case "Inactive":
          statusFlag = !item.active;
          break;
      }
      const searchTerm = searchKey.trim();
      return (
        statusFlag && (!searchTerm || item.content.indexOf(searchTerm) > -1)
      );
    });
    setFilteredState(tempArray);
  }, [searchKey, statusFilter]);

  return (
    <>
      <div className="content-category-queue-content-header text-24">
        <span className="content-category-queue-header-prefix">{title}</span>
        <span className="content-category-queue-header-title">
          {` / ${selected?.name} Content Category Queue`}
        </span>
      </div>

      <div className="toolbar-container">
        <Input
          allowClear
          size={"large"}
          value={searchKey}
          prefix={<SearchOutlined />}
          placeholder="Search by keyword"
          className="search-input"
          onChange={(e) => setSearchKey(e.target.value)}
        />
        <Popover placement="bottom" content={StatusList} trigger="click">
          <Button type="primary" className="status-button">
            <SvgIcon
              name="Group 7"
              width={20}
              height={20}
              className="status-icon"
            />
            <span className="status-button-content">{statusFilter}</span>
          </Button>
        </Popover>
      </div>

      <DragDropComponent
        onDragEnd={onDragEnd}
        grid={grid}
        getListStyle={getListStyle}
        filteredState={filteredState}
        spring={{ stiffness: 280, damping: 22 }}
        getItemStyle={getItemStyle}
      >
        {filteredState.map((item, index) => {
          return (
            <ContentCategoryItem
              key={index}
              filteredLength={filteredState.length}
              content={item.content}
              hideUp={index == 0}
              hideDown={index === filteredState.length - 1}
              isActive={item.active}
              moveUp={() => {
                let currentIndex = filteredState.findIndex(
                  (jsonItem, i) => item.id === jsonItem.id
                );
                setFilteredState(reorder(filteredState, currentIndex, 0));
              }}
              moveDown={() => {
                let currentIndex = filteredState.findIndex(
                  (jsonItem, i) => item.id === jsonItem.id
                );
                setFilteredState(
                  reorder(filteredState, currentIndex, filteredState.length)
                );
              }}
              moveMultiStep={(destination: number) => {
                let currentIndex = filteredState.findIndex(
                  (jsonItem, i) => item.id === jsonItem.id
                );
                setFilteredState(
                  reorder(filteredState, currentIndex, destination - 1)
                );
              }}
              changeActiveStatus={() => {
                let tempArray = _.cloneDeep(filteredState);
                tempArray[index].active = !tempArray[index].active;
                setFilteredState(tempArray);
                setState(tempArray);
              }}
            />
          );
        })}
      </DragDropComponent>

      <div className="load-more-btn-container">
        {spinFlag ? (
          <Spin />
        ) : (
          <button className="load-more-btn" onClick={getMoreItems}>
            {LOADMORE}
          </button>
        )}
      </div>
    </>
  );
};

export default ContentCategoryQueueItem;

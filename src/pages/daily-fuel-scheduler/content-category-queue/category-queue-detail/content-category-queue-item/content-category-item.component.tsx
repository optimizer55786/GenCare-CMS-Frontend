import { useState } from "react";
import { Popover, InputNumber, Button, notification } from "antd";
import Card from "antd/lib/card/Card";
import classNames from "classnames";
import SvgIcon from "../../../../../components/atoms/SvgIcon/SvgIcon";

import "./content-category-item.less";

interface Props {
  content: string;
  hideUp?: boolean;
  hideDown?: boolean;
  isActive?: boolean;
  moveUp: () => void;
  moveDown: () => void;
  moveMultiStep: (position: number) => void;
  changeActiveStatus: () => void;
  filteredLength: number;
}

export default function ({
  content,
  hideDown = false,
  hideUp = false,
  isActive = true,
  moveUp,
  moveDown,
  moveMultiStep,
  changeActiveStatus,
  filteredLength,
}: Props) {
  const [openInputPopUp, setOpenInputPopUp] = useState(false);
  const [position, setPosition] = useState<number>(1);
  const activeClasses = classNames(
    { card: isActive == true },
    { "plus-minus-icon-no-active": isActive == false }
  );

  const openNotification = () => {
    notification.error({
      message: "Sorry...",
      description: "The input number is out of valid range!",
      onClick: () => {
        console.log("Notification Clicked!");
      },
      className: "custom-class",
      style: {
        width: 600,
      },
    });
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpenInputPopUp(newOpen);
  };

  const moveByInput = () => {
    setOpenInputPopUp(false);
    if (position <= 0) {
      openNotification();
      setPosition(1);
      moveUp();
    } else if (position > filteredLength) {
      openNotification();
      setPosition(filteredLength);
      moveDown();
    } else {
      moveMultiStep(position);
    }
  };

  const SelectPosition = (
    <>
      <InputNumber
        defaultValue={3}
        value={position}
        onChange={(v: number | null) => {
          v && setPosition(v);
        }}
        onPressEnter={() => moveByInput()}
      />
      <Button
        onClick={() => {
          moveMultiStep(position);
          setOpenInputPopUp(false);
        }}
        type="default"
      >
        Move
      </Button>
    </>
  );

  return (
    <Card hoverable className={activeClasses}>
      <div className="container">
        <div style={{ display: "flex" }}>
          <div className="drap-drop-wrapper">
            <SvgIcon
              name={"drag-n-drop"}
              width={20}
              height={32}
              className={"drap-drop-icon"}
            />
          </div>
          <div className={"wave-icon"}>
            <SvgIcon name={"content-type-video"} width={20} height={20} />
          </div>
          <div className={"wave-icon"}>{content}</div>
        </div>
        <div style={{ display: "flex" }}>
          <div className="move-to">
            <div className="move-to-content">
              <span className="move-to-title">{"move to"}</span>
              {!hideDown && (
                <SvgIcon
                  onClick={moveDown}
                  name={"move-to-bottom"}
                  width={30}
                  height={32}
                  className={"move-to-icon"}
                />
              )}
              {!hideUp && (
                <SvgIcon
                  onClick={moveUp}
                  name={"move-to-top"}
                  width={30}
                  height={32}
                  className={"move-to-icon"}
                />
              )}
              <div className="move-to-position-wrapper">
                <Popover
                  placement="bottom"
                  title={"Enter postion number"}
                  content={SelectPosition}
                  trigger="click"
                  open={openInputPopUp}
                  onOpenChange={handleOpenChange}
                >
                  <span className="position-input-icon">
                    <SvgIcon
                      name={"Group 7"}
                      width={18}
                      height={22}
                      className={"move-to-icon"}
                      onClick={() => setOpenInputPopUp(true)}
                    />
                  </span>
                </Popover>
                <div className="order-number">{"#"}</div>
              </div>
            </div>
          </div>
          <SvgIcon
            name={isActive ? "Path 420" : "remove circle outline"}
            width={20}
            height={20}
            className={"plus-minus-icon"}
            onClick={changeActiveStatus}
          />
        </div>
      </div>
    </Card>
  );
}

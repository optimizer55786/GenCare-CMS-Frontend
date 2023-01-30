import { Button as DefaultButton } from "antd";
import classNames from "classnames";
import { ReactNode } from "react";
import "../../../styles/utils.less";
import "./Button.less";

interface Props {
  type: "link" | "primary" | "primaryGreen" | "primaryLarge";
  children: ReactNode;
  icon: ReactNode | "-";
  selected: boolean;
  onClick?: () => void;
  htmlType: "button" | "submit";
}

type buttonTypes = "primary" | "ghost" | "dashed" | "link" | "text" | "default";
type buttonShapeTypes = "default" | "circle" | "round";

const Button = ({ type, icon, onClick, children, htmlType }: Props) => {
  // antd button classes
  let defaultButtonType: buttonTypes = "primary";
  let defaultButtonShape: buttonShapeTypes = "default";
  let sharedClasses = classNames("text-mulish-medium", {
    "button-large": type === "primaryLarge",
    "button-link": type === "link",
  });

  switch (type) {
    case "primary":
      defaultButtonType = "primary";
      defaultButtonShape = "round";
      break;
    case "primaryLarge":
      defaultButtonType = "primary";
      break;
    case "link":
      defaultButtonType = "link";
      break;
    default:
      break;
  }

  return (
    <div className={sharedClasses}>
      <DefaultButton
        className={sharedClasses}
        type={defaultButtonType}
        block={type === "primaryLarge"}
        icon={icon}
        htmlType={htmlType}
        shape={defaultButtonShape}
        onClick={onClick}
      >
        {children}
      </DefaultButton>
    </div>
  );
};

Button.defaultProps = {
  type: "primary",
  icon: null,
  selected: false,
};

export default Button;

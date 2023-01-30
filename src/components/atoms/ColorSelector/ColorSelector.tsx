import FloatingInput from "../FloatingInput/FloatingInput";
import "./ColorSelector.less";
import React, { useState } from "react";
import { ColorSelectorTypes } from "./ColorSelector.types";

function ColorSelector({
  title,
  onChange,
  onBlur,
  name,
  value,
}: ColorSelectorTypes) {
  const placeHolderColor = "#7ECD99";
  const [color, setColor] = useState<string>(placeHolderColor);

  function changeColor(e: React.ChangeEvent<HTMLInputElement>) {
    setColor(e.target.value);
  }

  return (
    <div className="color-selector-container">
      <div className="color-selector-input ">
        <FloatingInput
          minLength={1}
          maxLength={9}
          placeholder={title}
          onChange={onChange ? onChange : changeColor}
          onBlur={onBlur}
          value={value}
          name={name}
        />
      </div>

      <div
        style={{ backgroundColor: value ? value : color }}
        className="color-picker"
        color="red"
      ></div>
    </div>
  );
}

export default ColorSelector;

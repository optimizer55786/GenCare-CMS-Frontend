import React from "react";
import "./FloatingInput.less";
import { FloatingInputProps } from "./FloatingInput.types";

function FloatingInput({
  placeholder,
  value,
  className,
  onChange,
  onBlur,
  name,
  min,
  max,
  id,
  type = "text",
  disabled,
  ...props
}: FloatingInputProps) {
  return (
    <>
      <div className={["inputField", className].join(" ")}>
        <input
          type={type}
          placeholder=" "
          value={value}
          name={name}
          list="fruits"
          onChange={onChange}
          onBlur={onBlur}
          min={min}
          id={id}
          max={max}
          disabled={disabled}
          {...props}
        />
        <span>{placeholder}</span>
      </div>
    </>
  );
}

export default FloatingInput;

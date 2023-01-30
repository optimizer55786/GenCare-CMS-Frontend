import React from "react";
import "./Input.less";
import { InputProps } from "./Input.types";

function Input({
  placeholder,
  onChange,
  value = "Smile at a stranger",
  onBlur,
  name,
}: InputProps) {
  return (
    <>
      <div className="inputField">
        <input
          type="text"
          placeholder=" "
          name={name}
          value={value}
          list="fruits"
          onChange={onChange}
          onBlur={onBlur}
        />
        <span>{placeholder}</span>
      </div>
      {/* <datalist className='datalist' id='fruits'>
				<option>Apple</option>
				<option>Banana</option>
				<option>Orange</option>
				<option>Pineapple</option>
				<option>Kiwi</option>
			</datalist> */}
    </>
  );
}

export default Input;

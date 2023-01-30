import { EditorProps } from "./editor.types";

function Editor({
  placeholder,
  value,
  onChange,
  onBlur,
  name,
  min,
  max,
  id,
  disabled,
  ...props
}: EditorProps) {
  return (
    <>
      <div className="inputField">
        <input
          type="text"
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

export default Editor;

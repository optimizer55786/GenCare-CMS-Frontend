import FloatingInput from "../FloatingInput/FloatingInput";
import ico from "~/assets/icons/drag-n-drop.svg";
import trashIco from "~/assets/icons/section-delete.svg";

export default function CleanMiniDragable({
  placeholder = "Answer",
  onChange,
  index,
  removeOption,
  name = "answer_text",
  value = "",
  formik,
  onBlur,
}: CleanMiniDraggableProps) {
  // console.log("formik", formik);
  return (
    <div className="mini-dragable-group">
      <div className="mini-dragable-container">
        <div className="mini-drag-ico">
          <img src={ico} />
        </div>
        <div className="mini-dragable-content-container">
          <div className="mini-dragable-content">
            <div className="answer-input">
              <FloatingInput
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                id={index}
                onBlur={onBlur}
              />
              {/* {formik?.touched?.privacies[index]?.description ? (
                <div className="error">
                  {formik?.errors?.privacies[index]?.description}
                </div>
              ) : null} */}
            </div>
          </div>
        </div>
      </div>

      <div onClick={() => removeOption(index)} className="trash-container">
        <img src={trashIco} />
      </div>
    </div>
  );
}

type CleanMiniDraggableProps = {
  placeholder: string;
  onChange: any;
  index?: string;
  removeOption: any;
  name: string;
  value: string;
  formik: any;
  onBlur: any;
};

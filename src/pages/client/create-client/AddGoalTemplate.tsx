import React, { SetStateAction } from "react";
import closeIco from "../../../assets/icons/close.svg";
// import search from "../../../assets/icons/Path 420.svg";
import greencheck from "../../../assets/icons/selected.svg";
import refresh from "../../../assets/icons/file-upload-replace.svg";
import "./PopUp.less";
import { Button } from "antd";
import { FormikProps } from "formik";
import { SlimGoalContent } from "./Onboarding";

interface AddGoalContentProps {
  close: () => void;
  templates: SlimGoalContent[];
  formik: FormikProps<any>;
  setGoalContentText: React.Dispatch<SetStateAction<string>>;
}

function AddGoalContent({
  close,
  formik,
  templates,
  setGoalContentText,
}: AddGoalContentProps) {
  return (
    <div className="popup-body">
      <div className="popup-header">
        <div>Set Goals Content Template</div>
        <img onClick={close} src={closeIco} />
      </div>

      <div className="popup-search">
        <input type="text" />
      </div>
      <div className="popup-list-group">
        {templates.map((template, index) => {
          return (
            <div
              key={index}
              id={template.id.toString()}
              className="popup-list-item cursor-pointer"
              onClick={() => {
                setGoalContentText(template.internal_title);
                formik.setFieldValue("onboarding_set_goal", template.id);
              }}
            >
              {template.internal_title}{" "}
              <img
                src={
                  formik.values.onboarding_set_goal === template.id
                    ? greencheck
                    : refresh
                }
              />
            </div>
          );
        })}
        {/* <div className="popup-list-item">
          5 Question Onboarding <img src={refresh} />
        </div>
        <div className="popup-list-item">
          2 Question Onboarding - I am, Age <img src={refresh} />
        </div>
        <div className="popup-list-item">
          3 Question Onboarding - Age, Relationship, Minority{" "}
          <img src={refresh} />
        </div> */}
      </div>
      <div className="p-20 close-popup">
        <Button onClick={close} type="primary" shape="round" size="large">
          Close
        </Button>
      </div>
    </div>
  );
}

function OldAddGoalContent({ close, formik, templates }: AddGoalContentProps) {
  return (
    <div className="popup-body">
      <div className="popup-header">
        <div>Set Goals Content Template</div>
        <img onClick={close} src={closeIco} />
      </div>

      <div className="popup-search">
        <input type="text" />
      </div>
      <div className="popup-list-group">
        <div className="popup-list-item">
          5 Question Onboarding <img src={refresh} />
        </div>
        <div className="popup-list-item">
          2 Question Onboarding - I am, Age <img src={refresh} />
        </div>
        <div className="popup-list-item">
          3 Question Onboarding - Age, Relationship, Minority{" "}
          <img src={refresh} />
        </div>
      </div>
      <div className="p-20 close-popup">
        <Button onClick={close} type="primary" shape="round" size="large">
          Close
        </Button>
      </div>
    </div>
  );
}

export default AddGoalContent;

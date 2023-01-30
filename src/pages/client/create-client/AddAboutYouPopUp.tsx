import React, { SetStateAction } from "react";
import closeIco from "../../../assets/icons/close.svg";
// import search from "../../../assets/icons/Path 420.svg";
import greencheck from "../../../assets/icons/selected.svg";
import refresh from "../../../assets/icons/file-upload-replace.svg";
import "./PopUp.less";
import { Button } from "antd";
import { SlimAboutYou } from "./Onboarding";
import { FormikProps } from "formik";

interface AddAboutYouPopUpProps {
  close: () => void;
  templates: SlimAboutYou[];
  formik: FormikProps<any>;
  setAboutYouText: React.Dispatch<SetStateAction<string>>;
}

function AddAboutYouPopUp({
  close,
  templates,
  formik,
  setAboutYouText,
}: AddAboutYouPopUpProps) {
  return (
    <div className="popup-body">
      <div className="popup-header">
        <div>Add About You</div> <img onClick={close} src={closeIco} />
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
                setAboutYouText(template.internal_title);
                formik.setFieldValue("onboarding_about_you", template.id);
              }}
            >
              {template.internal_title}{" "}
              <img
                src={
                  formik.values.onboarding_about_you === template.id
                    ? greencheck
                    : refresh
                }
              />
            </div>
          );
        })}
      </div>
      <div className="p-20 close-popup">
        <Button onClick={close} type="primary" shape="round" size="large">
          Close
        </Button>
      </div>
    </div>
  );
}

function OldAddAboutYouPopUp({ close }: AddAboutYouPopUpProps) {
  return (
    <div className="popup-body">
      <div className="popup-header">
        <div>Add About You</div> <img onClick={close} src={closeIco} />
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

export default AddAboutYouPopUp;

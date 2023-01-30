import React, { SetStateAction } from "react";
import closeIco from "../../../assets/icons/close.svg";
// import search from "../../../assets/icons/Path 420.svg";
import greencheck from "../../../assets/icons/selected.svg";
import refresh from "../../../assets/icons/file-upload-replace.svg";
import "./PopUp.less";
import { Button } from "antd";
import { FormikProps } from "formik";
import { SlimGoalAndAssessment } from "./Onboarding";

interface AddGoalAndAssessmentProps {
  close: () => void;
  templates: SlimGoalAndAssessment[];
  formik: FormikProps<any>;
  setGoalAndAssessmentText: React.Dispatch<
    SetStateAction<SlimGoalAndAssessment[]>
  >;
}

function AddGoal({
  close,
  formik,
  templates,
  setGoalAndAssessmentText,
}: AddGoalAndAssessmentProps) {
  return (
    <div className="popup-body">
      <div className="popup-header">
        <div>Goals</div>
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
                let newCopy = formik.values.onboarding_your_goal.slice();
                if (newCopy.includes(template.id)) {
                  newCopy = newCopy.filter((goal: any) => goal !== template.id);
                  setGoalAndAssessmentText((templates) => {
                    let newTemplates = templates.slice();
                    newTemplates = newTemplates.filter(
                      (temp) => temp.id !== template.id
                    );
                    return newTemplates;
                  });
                } else {
                  newCopy.push(template.id);
                  setGoalAndAssessmentText((templates) => {
                    let newTemplate = templates.slice();
                    return [...newTemplate, template];
                  });
                }

                formik.setFieldValue("onboarding_your_goal", newCopy);
              }}
            >
              {template.goal}{" "}
              <img
                src={
                  formik.values.onboarding_your_goal.includes(template.id)
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
function OldAddGoal({ close }: AddGoalAndAssessmentProps) {
  return (
    <div className="popup-body">
      <div className="popup-header">
        <div>Goals</div>
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

export default AddGoal;

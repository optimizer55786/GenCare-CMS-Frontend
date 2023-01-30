import { useRef, useEffect, useState } from "react";
import "./Onboarding.less";
import PageContainer from "../../../components/atoms/PageContainer/PageContainer";

import edit from "../../../assets/icons/action-edit.svg";
import ShadowContainer from "../../../components/organisms/ShadowContainer/ShadowContainer";
import deactivate from "../../../assets/icons/action-deactivate.svg";
import PopUp from "../../../components/atoms/PopUp/PopUp";
// import AddAboutYouPopUp from "./AddAboutYouPopUp";
import { Button } from "antd";
import AddGoal from "./AddGoal";
import AddGoalTemplate from "./AddGoalTemplate";
import AddAboutYouPopUp from "./AddAboutYouPopUp";
import { FormikProps } from "formik";
import { initialValuesType } from "../types";
import {
  getAllAboutYouTemplate,
  getAllGoalsAndAssessments,
  getAllGoalContentTemplate,
} from "../../../services/request";

type OnboardingProps = {
  formik: FormikProps<initialValuesType>;
};

export type SlimAboutYou = {
  id: number;
  internal_title: string;
};

export type SlimGoalAndAssessment = {
  id: number;
  goal: string;
  onboarding_default: boolean;
};

export type SlimGoalContent = {
  id: number;
  internal_title: string;
};

function Onboarding({ formik }: OnboardingProps) {
  const [aboutYouTemplates, setAboutYouTemplates] = useState<SlimAboutYou[]>(
    []
  );
  const [goalAndAssessmentTemplate, setGoalAndAssessmentTemplate] = useState<
    SlimGoalAndAssessment[]
  >([]);
  const [goalContentTemplates, setGoalContentTemplates] = useState<
    SlimGoalContent[]
  >([]);
  const [aboutYouOpen, setAboutYouOpen] = useState<boolean>(false);
  const [goalOpen, setGoalOpen] = useState<boolean>(false);
  const [goalOpenTemplate, setGoalOpenTemplate] = useState<boolean>(false);
  const [aboutYouText, setAboutYouText] = useState<string>("");
  const [goalContentText, setGoalContentText] = useState<string>("");
  const [goalAndAssementText, setGoalAndAssessmentText] = useState<
    SlimGoalAndAssessment[]
  >([]);

  useEffect(() => {
    getAboutYou();
    getGoalAndAssessment();
    getGoalContent();
  }, []);

  const getAboutYou = async () => {
    try {
      let { data } = await getAllAboutYouTemplate();
      setAboutYouTemplates(data);
      if (data.length) {
        setAboutYouText(data[0].internal_title);
      }
    } catch (err) {}
  };

  const getGoalAndAssessment = async () => {
    try {
      let { data } = await getAllGoalsAndAssessments();
      setGoalAndAssessmentTemplate(data);
    } catch (err) {}
  };

  const getGoalContent = async () => {
    try {
      let { data } = await getAllGoalContentTemplate();
      setGoalContentTemplates(data);
      if (data.length) setGoalContentText(data[0].internal_title);
    } catch (err) {}
  };

  const hideAboutYou = () => {
    setAboutYouOpen(false);
  };

  const handleAboutYouChange = (newOpen: boolean) => {
    setAboutYouOpen(newOpen);
  };

  const hideGoal = () => {
    setGoalOpen(false);
  };

  const handleOpenGoalChange = (newOpen: boolean) => {
    setGoalOpen(newOpen);
  };

  const hideGoalTemplate = () => {
    setGoalOpenTemplate(false);
  };

  const handleOpenGoalTemplateChange = (newOpen: boolean) => {
    setGoalOpenTemplate(newOpen);
  };
  return (
    <ShadowContainer>
      <>
        <PageContainer>
          <p className="text-20  text-black text-mulish-bold">
            ABOUT YOU (Questions)
          </p>
          <div className="about-you-question">
            <div>{aboutYouText}</div>
            <PopUp
              button={<img src={edit} />}
              content={
                <AddAboutYouPopUp
                  templates={aboutYouTemplates}
                  formik={formik}
                  setAboutYouText={setAboutYouText}
                  close={hideAboutYou}
                />
              }
              open={aboutYouOpen}
              handleOpenChange={handleAboutYouChange}
            />
          </div>
        </PageContainer>

        <PageContainer>
          <p className="text-20  text-black text-mulish-bold">
            SET GOAL (Content)
          </p>
          <div className="about-you-question">
            <div>{goalContentText}</div>
            <PopUp
              button={<img src={edit} />}
              content={
                <AddGoalTemplate
                  templates={goalContentTemplates}
                  formik={formik}
                  setGoalContentText={setGoalContentText}
                  close={hideGoalTemplate}
                />
              }
              open={goalOpenTemplate}
              handleOpenChange={handleOpenGoalTemplateChange}
            />
          </div>
        </PageContainer>

        <PageContainer>
          <p className="text-20  text-black text-mulish-bold">
            YOUR GOAL (Goals)
          </p>
          <div>
            {goalAndAssementText.length
              ? goalAndAssementText.map((ass) => (
                  <div className="single-goals-item">
                    <div className="round-icon">
                      <div className="inner-ico"></div>
                    </div>
                    <div className="text-18">{ass.goal}</div>
                    {/* <img src={edit} />
                    <img src={deactivate} /> */}
                  </div>
                ))
              : null}
            {/* <div className="single-goals-item">
              <div className="round-icon">
                <div className="inner-ico"></div>
              </div>
              <div className="text-18">Less Stress</div>
              <img src={edit} />
              <img src={deactivate} />
            </div>
            <div className="single-goals-item">
              <div className="round-icon">
                <div className="inner-ico"></div>
              </div>
              <div className="text-18">Feel Happier</div>
              <img src={edit} />
              <img src={deactivate} />
            </div>
            <div className="single-goals-item">
              <div className="round-icon">
                <div className="inner-ico"></div>
              </div>
              <div className="text-18">Lower Anxiety</div>
              <img src={edit} />
              <img src={deactivate} />
            </div>
            <div className="single-goals-item">
              <div className="round-icon">
                <div className="inner-ico"></div>
              </div>
              <div className="text-18">Stronger Purpose</div>
              <img src={edit} />
              <img src={deactivate} />
            </div>
            <div className="single-goals-item">
              <div className="round-icon">
                <div className="inner-ico"></div>
              </div>
              <div className="text-18">Imposter Syndrome</div>
              <img src={edit} />
              <img src={deactivate} />
            </div> */}
          </div>
          <PopUp
            button={
              <div className="text-primary text-mulish-bold cursor-pointer">
                + add/edit goal
              </div>
            }
            content={
              <AddGoal
                formik={formik}
                templates={goalAndAssessmentTemplate}
                setGoalAndAssessmentText={setGoalAndAssessmentText}
                close={hideGoal}
              />
            }
            open={goalOpen}
            handleOpenChange={handleOpenGoalChange}
          />
        </PageContainer>
      </>
    </ShadowContainer>
  );
}

export default Onboarding;

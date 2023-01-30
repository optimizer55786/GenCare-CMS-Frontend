import {
  ChangeEvent,
  useEffect,
  useRef,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import "../index.less";
import { toast } from "react-toastify";
import { QuestionProps } from "../create-about-you";
import {
  CollapsedDragable,
  DraggableType,
  FullDragable,
} from "../../../../components/atoms/Dragable/Dragable";
import ShadowContainer from "../../../../components/organisms/ShadowContainer/ShadowContainer";
import Tab from "../../../../components/atoms/Tab/Tab";
import { Button } from "antd";
import Settings from "../Settings";
import { TabPaneProps } from "../../../../types/tabs/tab-item.type";
import FloatingInput from "../../../../components/atoms/FloatingInput/FloatingInput";
import { useNavigate, useParams } from "react-router-dom";
import {
  getAboutYouTemplateById,
  updateAboutYouTemplateById,
} from "../../../../services/request";

export interface Settings {
  name: string;
  state: boolean;
}

const createTabItems = (
  questions: any,
  addQuestion: () => void,
  handleQuestion: (event: ChangeEvent<HTMLInputElement>) => void,
  setDraggableQuestionsArray: Dispatch<SetStateAction<DraggableType[]>>,
  setSettings: Dispatch<SetStateAction<Settings[]>>,
  settings: Settings[]
): Array<TabPaneProps> => {
  return [
    {
      label: "QUESTIONS",
      key: "1",
      children: (
        <Question
          handleQuestion={handleQuestion}
          questions={questions}
          addQuestion={addQuestion}
          setDraggableQuestionsArray={setDraggableQuestionsArray}
        />
      ),
    },
    {
      label: "SETTINGS",
      key: "2",
      children: <Settings settings={settings} setSettings={setSettings} />,
    },
  ];
};

export default function () {
  const [internalTitle, setInternalTitle] = useState("");
  const [onboardingDefault, setOnboardingDefault] = useState(true);
  const navigate = useNavigate();
  const [settings, setSettings] = useState<Settings[]>([]);

  const [draggableQuestionsArray, setDraggableQuestionsArray] = useState<
    DraggableType[]
  >([]);
  const params = useParams();
  const { templateId } = params;

  useEffect(() => {
    if (!templateId) {
      navigate(-1);
      return;
    } else {
      getAboutYouById(templateId);
    }
  }, [templateId]);

  async function getAboutYouById(id: any) {
    try {
      const response = await getAboutYouTemplateById(id);
      const draggables = response.data.questions.map(
        (question: any) => question.data
      );
      setInternalTitle(response.data.internal_title);
      setDraggableQuestionsArray(draggables);
      setSettings(response.data.settings);
    } catch (err) {
      console.log(err);
    }
  }

  const addQuestion = () => {
    return setDraggableQuestionsArray((s: any) => {
      return [
        ...s,
        {
          question: "",
          short_description: " ",
          answerd: [],
          type_of_answer: "",
          category: "",
          display_answer_as: "",
          why_do_you_ask: "",
          select_style: "",
        },
      ];
    });
  };

  const handleQuestionChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const index = e.target.id;
    setDraggableQuestionsArray((s: any) => {
      const newArr = s.slice();
      newArr[index][e.target.name] = e.target.value;
      return newArr;
    });
  };

  const handleInternalTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInternalTitle(e.target.value);
  };

  const handleOnboardingDefault = (e: ChangeEvent<HTMLInputElement>) => {
    setOnboardingDefault(e.target.value === "true" ? true : false);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      let mappedQuestions = draggableQuestionsArray.map((question) => {
        return { data: question, order: 1 };
      });
      const composedData = {
        id: templateId,
        internal_title: internalTitle,
        questions: mappedQuestions,
        onboarding_default: onboardingDefault,
        settings,
        state: true,
      };
      await updateAboutYouTemplateById(composedData);
      toast(`✅ ${internalTitle} updated successfully!`);
      navigate("/settings/about-you-templates");
    } catch (err: any) {
      if (err.response) {
        console.log("err", err);
        toast("❌ Server error");
        return;
      }
      toast("❌ Unable to submit check internet");
    }
  };
  const RadioButtonsRef = useRef<HTMLInputElement>(null);
  const ButtonsRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <div className="title-input-group">
        <div className="title-input">
          <FloatingInput
            placeholder={"Internal Title *"}
            value={internalTitle}
            name="internal_title"
            onChange={handleInternalTitleChange}
          />
        </div>

        <div>
          <Button onClick={handleSubmit} className="title-btn" shape="round">
            Publish template
          </Button>
        </div>
      </div>
      <div className="question-radio-group">
        <div className="question-radio-title text-18 text-mulish-bold ">
          Onboarding Default
        </div>
        <div className="radio-group">
          <div className="single-radio-group">
            <input
              type="radio"
              value={true.toString()}
              name="onboarding_default"
              checked={onboardingDefault}
              onChange={handleOnboardingDefault}
              ref={RadioButtonsRef}
            />
            <label
              onClick={() => {
                if (RadioButtonsRef.current !== null)
                  RadioButtonsRef.current.click();
              }}
              className="cursor-pointer"
            >
              Yes
            </label>
          </div>

          <div className="single-radio-group">
            <input
              type="radio"
              value={false.toString()}
              name="onboarding_default"
              checked={!onboardingDefault}
              onChange={handleOnboardingDefault}
              ref={ButtonsRef}
            />
            <label
              onClick={() => {
                if (ButtonsRef.current !== null) ButtonsRef.current.click();
              }}
              className="cursor-pointer"
            >
              No
            </label>
          </div>
        </div>
      </div>
      <div className="tab-container">
        <Tab
          items={createTabItems(
            draggableQuestionsArray,
            addQuestion,
            handleQuestionChange,
            setDraggableQuestionsArray,
            setSettings,
            settings
          )}
        />
      </div>
    </>
  );
}

function Question({
  handleQuestion,
  questions,
  setDraggableQuestionsArray,
  addQuestion,
}: QuestionProps) {
  return (
    <div>
      <ShadowContainer>
        <>
          {questions.map((question: any, index) => {
            return (
              <FullDragable
                handleQuestionChange={handleQuestion}
                values={question}
                key={index}
                questionIndex={index}
                setDraggableQuestionsArray={setDraggableQuestionsArray}
              />
            );
          })}

          <div
            onClick={addQuestion}
            className="add-question-container text-primary text-mulish-bold"
          >
            + add question
          </div>
        </>
      </ShadowContainer>
    </div>
  );
}

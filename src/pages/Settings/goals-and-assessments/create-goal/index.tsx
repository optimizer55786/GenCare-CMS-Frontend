import { ChangeEvent, useState, Dispatch, SetStateAction } from "react";
import "../index.less";
import { toast } from "react-toastify";
import {
  FullDragable,
  DraggableType,
} from "../../../../components/atoms/Dragable/Dragable";
import ShadowContainer from "../../../../components/organisms/ShadowContainer/ShadowContainer";
import Tab from "../../../../components/atoms/Tab/Tab";
import { Button } from "antd";
import Settings from "../Settings";
import { TabPaneProps } from "../../../../types/tabs/tab-item.type";
import FloatingInput from "../../../../components/atoms/FloatingInput/FloatingInput";
import { createGoalAndAssessment } from "../../../../services/request";
import { useNavigate } from "react-router-dom";
interface AssessmentQuestionProps {
  questions: DraggableType[];
  addQuestion: () => void;
  setDraggableQuestionsArray: Dispatch<SetStateAction<DraggableType[]>>;
  // goal: string;
  // handleGoal: () => void;
  handleQuestion: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface Settings {
  name: string;
  state: boolean;
}

const createTabItems = (
  questions: DraggableType[],
  addQuestion: () => void,
  handleQuestion: (event: ChangeEvent<HTMLInputElement>) => void,
  setDraggableQuestionsArray: Dispatch<SetStateAction<DraggableType[]>>,
  setSettings: Dispatch<SetStateAction<Settings[]>>,
  settings: Settings[]
): Array<TabPaneProps> => {
  return [
    {
      label: "ASSESSMENT QUESTIONS",
      key: "1",
      children: (
        <AssessmentQuestion
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
  const [goal, setGoal] = useState("");
  const navigate = useNavigate();
  const [settings, setSettings] = useState<Settings[]>([
    {
      name: "Allow the user to go back and forth between the questions to edit answers",
      state: false,
    },
  ]);

  const [draggableQuestionsArray, setDraggableQuestionsArray] = useState<
    DraggableType[]
  >([
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
  ]);

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

  const handleGoalChange = (e: ChangeEvent<HTMLInputElement>) => {
    setGoal(e.target.value);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      let mappedQuestions = draggableQuestionsArray.map((question) => {
        return { data: question, order: 1 };
      });
      const composedData = {
        goal,
        questions: {
          questions: mappedQuestions,
          what_type_of_scoring: "By Question Category",
        },
        onboarding_default: true,
        settings,
        state: true,
      };
      await createGoalAndAssessment(composedData);
      toast(`✅ ${goal} created successfully!`);
      navigate("/settings/goals-and-assessments/");
    } catch (err: any) {
      if (err.response) {
        console.log("err", err);
        toast("❌ Server error");
        return;
      }
      toast("❌ Unable to submit check internet");
    }
  };

  return (
    <>
      <div className="title-input-group">
        <div className="title-input">
          <FloatingInput
            placeholder={"Goal *"}
            value={goal}
            onChange={handleGoalChange}
            name="goal"
          />
        </div>
        <div>
          <Button onClick={handleSubmit} className="title-btn" shape="round">
            publish
          </Button>
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

function AssessmentQuestion({
  questions,
  addQuestion,
  handleQuestion,
  setDraggableQuestionsArray,
}: AssessmentQuestionProps) {
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

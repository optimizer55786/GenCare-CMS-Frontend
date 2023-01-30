import GoalTable from "./goal-table";
import { Button } from "antd";
import { Link } from "react-router-dom";
import ShadowContainer from "../../../../components/organisms/ShadowContainer/ShadowContainer";
import "./index.less";

export default function () {
  return (
    <div>
      <div className="add-goal-btn-container">
        <Link to="/settings/goals-and-assessments/create">
          <Button type="primary" shape="round">
            add goal
          </Button>
        </Link>
      </div>
      <ShadowContainer>
        <GoalTable />
      </ShadowContainer>
    </div>
  );
}

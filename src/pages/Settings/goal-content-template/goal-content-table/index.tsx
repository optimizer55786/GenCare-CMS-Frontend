import GoalTable from "./goal-content-table";
import { Button } from "antd";
import { Link } from "react-router-dom";
import ShadowContainer from "../../../../components/organisms/ShadowContainer/ShadowContainer";
import "./index.less";

export default function () {
  return (
    <div>
      <div className="add-goal-btn-container">
        <Link to="/settings/goal-content-templates/create">
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

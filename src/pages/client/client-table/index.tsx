import GoalTable from "./client-table";
import { Button } from "antd";
import { Link } from "react-router-dom";
import ShadowContainer from "../../../components/organisms/ShadowContainer/ShadowContainer";
import "./index.less";

export default function () {
  return (
    <div>
      <div className="add-goal-btn-container">
        <Link to="/clients/create">
          <Button type="primary" shape="round">
            add client
          </Button>
        </Link>
      </div>
      <ShadowContainer>
        <GoalTable />
      </ShadowContainer>
    </div>
  );
}

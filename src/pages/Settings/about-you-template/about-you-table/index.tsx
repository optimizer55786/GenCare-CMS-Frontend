import AboutYouTable from "./about-you-table";
import { Button } from "antd";
import { Link } from "react-router-dom";
import ShadowContainer from "../../../../components/organisms/ShadowContainer/ShadowContainer";
import "./index.less";

export default function () {
  return (
    <div>
      <div className="add-goal-btn-container">
        <Link to="/settings/about-you-templates/create">
          <Button type="primary" shape="round">
            add template
          </Button>
        </Link>
      </div>
      <ShadowContainer>
        <AboutYouTable />
      </ShadowContainer>
    </div>
  );
}

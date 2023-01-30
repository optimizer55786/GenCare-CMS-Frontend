import Header from "../../../components/organisms/Header/Header";
import Sidebar from "../../../components/organisms/Sidebar";
import "./Panel.less";

type Props = {
  children: React.ReactNode[] | React.ReactNode;
};

const Panel = ({ children }: Props) => {
  return (
    <div className="gen-panel-template">
      <Sidebar />
      <div className="gen-panel-template__content">
        <Header />
        <div className="gen-panel-template__content-container">{children}</div>
      </div>
    </div>
  );
};

export default Panel;

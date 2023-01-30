import React from "react";
import "./empty-state.less";
import icon from "../../../assets/icons/receipt.png";

function EmptyState({ onClick }: EmptyStateProps) {
  return (
    <div className="empty-main-container">
      <div className="empty-container">
        <img src={icon} alt="icon" className="empty-icon" />
        <p className="empty-title">No content has been add yet</p>
        <div className="empty-btn-container">
          <button onClick={onClick} className="btn">
            add content
          </button>
        </div>
      </div>
    </div>
  );
}

interface EmptyStateProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}
export default EmptyState;

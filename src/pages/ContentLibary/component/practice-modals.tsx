import React from "react";
import Input from "./Input";
import "./ActionModals.less";
import icon from "../../../assets/icons/content-group-other.svg";

function AddPractice() {
  return (
    <div className="add-action-container">
      <div className="add-modal-title-container">
        <div className="add-modal-title">
          <div className="add-modal-title-text">
            Add Practice to Content Library
          </div>
          <span className="title-icon">
            <img src={icon} />
            Other
          </span>
        </div>
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 14 14"
          >
            <path
              id="close"
              d="M12.3,13.707,7,8.412l-5.3,5.3A1,1,0,1,1,.292,12.3L5.588,7,.292,1.7A1,1,0,0,1,1.7.292L7,5.588l5.3-5.3A1,1,0,0,1,13.708,1.7L8.412,7l5.3,5.3A1,1,0,1,1,12.3,13.707Z"
              fill="#888"
            />
          </svg>
        </span>
      </div>
      <div className="action-input">
        <Input placeholder={"Action Category"} />
        <div className="datalist">
          <p className="datalist-item">Add “Smile at a stranger”</p>
        </div>
      </div>

      <div className="action-second-section">
        <div className="action-input">
          <Input placeholder={"Action"} />
          <div className="datalist">
            <p className="datalist-item">Add “Smile at a stranger”</p>
          </div>
        </div>
        <div>
          <p className="action-radio-title">Active in Daily Queue?</p>
          <div className="radio-group">
            <div className="single-radio-group">
              <input type="radio" />
              <label>Yes</label>
            </div>

            <div className="single-radio-group">
              <input type="radio" />
              <label>No</label>
            </div>

            <div className="single-radio-group">
              <input type="radio" />
              <label>Don’t Add to Daily Queue</label>
            </div>
          </div>
        </div>

        <button className="submit-details-btn">save</button>
      </div>
    </div>
  );
}

export default AddPractice;

export function EditPractice() {
  return (
    <div className="add-action-container">
      <div className="add-modal-title-container">
        <div className="add-modal-title">
          <div className="add-modal-title-text">
            Edit Practice in Content Library
          </div>
          <span className="title-icon">
            <img src={icon} />
            Other
          </span>
        </div>
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 14 14"
          >
            <path
              id="close"
              d="M12.3,13.707,7,8.412l-5.3,5.3A1,1,0,1,1,.292,12.3L5.588,7,.292,1.7A1,1,0,0,1,1.7.292L7,5.588l5.3-5.3A1,1,0,0,1,13.708,1.7L8.412,7l5.3,5.3A1,1,0,1,1,12.3,13.707Z"
              fill="#888"
            />
          </svg>
        </span>
      </div>
      <div>
        <div className="action-input">
          <Input placeholder={"Action"} />
          <div className="datalist">
            <p className="datalist-item">Add “Smile at a stranger”</p>
          </div>
        </div>
        <div>
          <p className="action-radio-title">Active in Daily Queue?</p>
          <div className="radio-group">
            <div className="single-radio-group">
              <input type="radio" />
              <label>Yes</label>
            </div>

            <div className="single-radio-group">
              <input type="radio" />
              <label>No</label>
            </div>

            <div className="single-radio-group">
              <input type="radio" />
              <label>Don’t Add to Daily Queue</label>
            </div>
          </div>
        </div>

        <button className="submit-details-btn">save</button>
      </div>
    </div>
  );
}

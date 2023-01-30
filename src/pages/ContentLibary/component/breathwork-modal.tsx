import React, { useRef } from "react";
import "./breathwork-modal.less";
import icon from "../../../assets/icons/content-group-care.svg";
import uploadicon from "../../../assets/icons/upload.svg";
import { Formik, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { ActionModalProps } from "./action-modal.types";
import FloatingInput from "../../../components/atoms/FloatingInput/FloatingInput";
import FileUpload from "../../../components/atoms/FileUpload/FileUpload";
import Tags from "../../../components/Tags/Tags";
import { createBreathwork } from "../../../services/request";
import { useNavigate } from "react-router-dom";
function AddBreathwork({
  closeModal,
  CardId,
  currentModalId,
  setCurrentModalId,
}: ActionModalProps) {
  const YesRef = useRef<HTMLInputElement>(null);
  const DontAddRef = useRef<HTMLInputElement>(null);
  const NoRef = useRef<HTMLInputElement>(null);
  const CloseRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    internal_title: Yup.string().required("required"),
    thumbnail_image: Yup.string().required("required"),
    public_title: Yup.string().required("required"),
    description: Yup.string().required("required"),
    duration: Yup.number().required("required"),
    url: Yup.string().required("required"),
    tags: Yup.array().of(Yup.string()).required("tags required"),
    add_to_daily_fuel_queue: Yup.number()
      .min(1, "required")
      .required("required"),
  });
  const initialBreathWorkValues = {
    group: 2,
    category: 3,
    internal_title: "",
    thumbnail_image: "",
    public_title: "",
    description: "",
    content_type: 1,
    duration: 0,
    url: "",
    tags: [],
    add_to_daily_fuel_queue: 1,
  };
  return (
    <>
      {currentModalId === CardId ? (
        <Formik
          onSubmit={async (values) => {
            try {
              await createBreathwork(values);
              if (CloseRef.current !== null) {
                CloseRef.current.click();
              }
              window.location.href = "/content-library";
              toast(
                `✅  Breathwork ${values.internal_title} created successfully`
              );
            } catch (err: any) {
              console.log(err.response);
              if (err.response) {
                toast(` ❌ Server error, try again!`);
                return;
              }
              console.log(err);
              return toast(
                ` ❌ Error creating goal content, check internet & try again!`
              );
            }
          }}
          initialValues={initialBreathWorkValues}
          validationSchema={validationSchema}
        >
          {(formik) => {
            return (
              <form onSubmit={formik.handleSubmit}>
                <div className="add-action-container">
                  <div className="add-modal-title-container">
                    <div className="add-modal-title">
                      <div className="add-modal-title-text">
                        Add Breathwork to Content Library
                      </div>
                      <span className="title-icon">
                        <img src={icon} />
                        Care
                      </span>
                    </div>
                    <span ref={CloseRef} onClick={closeModal}>
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
                  <div className="breathwork-modal-input">
                    <FloatingInput
                      placeholder="Internal Title"
                      value={formik.values.internal_title}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="internal_title"
                    />
                    <ErrorMessage
                      component="div"
                      className="error"
                      name="internal_title"
                    />
                  </div>
                  <div>
                    <p>Thumbnail Image</p>
                    <FileUpload
                      setFieldValue={formik.setFieldValue}
                      name={"thumbnail_image"}
                    />
                    <ErrorMessage
                      component="div"
                      className="error"
                      name={"thumbnail_image"}
                    />
                  </div>
                  <div className="breathwork-modal-input">
                    <FloatingInput
                      placeholder="Public Title"
                      value={formik.values.public_title}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="public_title"
                    />
                    <ErrorMessage
                      component="div"
                      className="error"
                      name="public_title"
                    />
                  </div>
                  <div className="breathwork-modal-input">
                    <FloatingInput
                      placeholder="Description"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="description"
                    />
                    <ErrorMessage
                      component="div"
                      className="error"
                      name="description"
                    />
                  </div>
                  <div className="breathwork-modal-input">
                    <FloatingInput
                      placeholder="Duration"
                      value={formik.values.duration}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="duration"
                    />
                    <ErrorMessage
                      component="div"
                      className="error"
                      name="description"
                    />
                  </div>
                  <div className="breathwork-modal-input">
                    <FloatingInput
                      placeholder="Video URL"
                      value={formik.values.url}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="url"
                    />
                    <ErrorMessage
                      component="div"
                      className="error"
                      name="url"
                    />
                  </div>
                  <div>
                    <p>Tags</p>
                    <Tags formik={formik} name="tags" />
                    <ErrorMessage
                      component="div"
                      className="error"
                      name="tags"
                    />
                  </div>
                  <div className="question-radio-title text-18 text-mulish-bold ">
                    Active in Daily Queue? *
                  </div>
                  <div className="radio-group">
                    <div className="single-radio-group">
                      <input
                        ref={YesRef}
                        type="radio"
                        value={1}
                        checked={
                          Number(formik.values.add_to_daily_fuel_queue) === 1
                        }
                        name="add_to_daily_fuel_queue"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <label
                        onClick={() => {
                          if (YesRef.current !== null) YesRef.current.click();
                        }}
                        className="cursor-pointer"
                      >
                        Yes
                      </label>
                    </div>

                    <div className="single-radio-group">
                      <input
                        type="radio"
                        ref={NoRef}
                        value={2}
                        checked={
                          Number(formik.values.add_to_daily_fuel_queue) === 2
                        }
                        name="add_to_daily_fuel_queue"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <label
                        onClick={() => {
                          if (NoRef.current !== null) NoRef.current.click();
                        }}
                        className="cursor-pointer"
                      >
                        No
                      </label>
                    </div>

                    <div className="single-radio-group">
                      <input
                        type="radio"
                        value={3}
                        checked={
                          Number(formik.values.add_to_daily_fuel_queue) === 3
                        }
                        name="add_to_daily_fuel_queue"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        ref={DontAddRef}
                      />
                      <label
                        onClick={() => {
                          if (DontAddRef.current !== null)
                            DontAddRef.current.click();
                        }}
                        className="cursor-pointer"
                      >
                        Don’t Add to Daily Queue
                      </label>
                    </div>
                  </div>
                  <ErrorMessage
                    component="div"
                    className="error"
                    name="add_to_daily_fuel_queue"
                  />
                  <button type="submit" className="submit-details-btn">
                    save
                  </button>
                </div>
              </form>
            );
          }}
        </Formik>
      ) : null}
    </>
  );
}

export default AddBreathwork;

import { useRef, useState, useEffect } from "react";
import Input from "./Input";
import "./action-modals.less";
import { Formik } from "formik";
import icon from "../../../assets/icons/content-group-other.svg";
import { ActionModalProps } from "./action-modal.types";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import * as _ from "lodash";
import { toast } from "react-toastify";
import {
  createAction,
  getActionById,
  updateActionById,
} from "../../../services/request";

type initialActionValuesType = {
  name?: string;
  group?: number;
  category?: number;
  add_to_daily_fuel_queue?: number;
};

function AddAction({
  closeModal,
  CardId,
  currentModalId,
  setCurrentModalId,
}: ActionModalProps) {
  const YesRef = useRef<HTMLInputElement>(null);
  const NoRef = useRef<HTMLInputElement>(null);
  const DontAddRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const CloseRef = useRef<HTMLInputElement>(null);

  const initialValues: initialActionValuesType = {
    name: "",
    group: 4,
    category: 18,
    add_to_daily_fuel_queue: 0,
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
    add_to_daily_fuel_queue: Yup.number()
      .min(1, "required")
      .required("required"),
  });
  return (
    <>
      {currentModalId === CardId ? (
        <Formik
          initialValues={initialValues}
          onSubmit={async (values) => {
            try {
              await createAction(values);
              if (CloseRef.current !== null) {
                CloseRef.current.click();
              }
              toast(`✅  Action ${values.name} created successfully`);
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
          validationSchema={validationSchema}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit}>
              <div className="add-action-container">
                <div className="add-modal-title-container">
                  <div className="add-modal-title">
                    <div className="add-modal-title-text">
                      Add Action to Content Library
                    </div>
                    <span className="title-icon">
                      <img src={icon} />
                      Other
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
                <div className="action-input">
                  <Input
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    name={"name"}
                    placeholder={"Action *"}
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div className="error">{formik.errors.name}</div>
                  ) : null}
                </div>

                <div className="action-second-section">
                  {/* <div className="action-input">
                    <Input placeholder={"Action"} />
                    <div className="datalist">
                      <p className="datalist-item">Add “Smile at a stranger”</p>
                    </div>
                  </div> */}
                  <div>
                    <p className="action-radio-title">Active in Daily Queue?</p>
                    <div className="radio-group">
                      <div className="single-radio-group">
                        <input
                          name={"add_to_daily_fuel_queue"}
                          ref={YesRef}
                          value={1}
                          type="radio"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                        />
                        <label
                          onClick={() => {
                            if (YesRef.current !== null) {
                              YesRef.current.click();
                            }
                          }}
                        >
                          Yes
                        </label>
                      </div>

                      <div className="single-radio-group">
                        <input
                          name={"add_to_daily_fuel_queue"}
                          ref={NoRef}
                          value={2}
                          type="radio"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                        />
                        <label
                          onClick={() => {
                            if (NoRef.current !== null) {
                              NoRef.current.click();
                            }
                          }}
                        >
                          No
                        </label>
                      </div>

                      <div className="single-radio-group">
                        <input
                          name={"add_to_daily_fuel_queue"}
                          ref={DontAddRef}
                          value={3}
                          type="radio"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                        />
                        <label
                          onClick={() => {
                            if (DontAddRef.current !== null) {
                              DontAddRef.current.click();
                            }
                          }}
                        >
                          Don’t Add to Daily Queue
                        </label>
                      </div>
                    </div>
                    {formik.touched.add_to_daily_fuel_queue &&
                    formik.errors.add_to_daily_fuel_queue ? (
                      <div className="error">
                        {formik.errors.add_to_daily_fuel_queue}
                      </div>
                    ) : null}
                  </div>

                  <button type="submit" className="submit-details-btn">
                    save
                  </button>
                </div>
              </div>
            </form>
          )}
        </Formik>
      ) : null}
    </>
  );
}

export function EditAction({
  closeModal,
  CardId,
  currentModalId,
  setCurrentModalId,
}: // recordId,
ActionModalProps) {
  const YesRef = useRef<HTMLInputElement>(null);
  const NoRef = useRef<HTMLInputElement>(null);
  const DontAddRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const CloseRef = useRef<HTMLInputElement>(null);
  const [currentAction, setCurrentAction] = useState<initialActionValuesType>(
    {}
  );

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let res = await getActionById(1);
    setCurrentAction(res.data);
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
    add_to_daily_fuel_queue: Yup.number()
      .min(1, "required")
      .required("required"),
  });
  if (_.isEmpty(currentAction))
    return (
      <>
        {currentModalId === CardId ? (
          <Formik
            initialValues={currentAction}
            onSubmit={async (values) => {
              try {
                await updateActionById(values);
                if (CloseRef.current !== null) {
                  CloseRef.current.click();
                }
                toast(`✅  Action ${values.name} updated successfully`);
                navigate("/content-library");
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
            validationSchema={validationSchema}
          >
            {(formik) => (
              <form onSubmit={formik.handleSubmit}>
                <div className="add-action-container">
                  <div className="add-modal-title-container">
                    <div className="add-modal-title">
                      <div className="add-modal-title-text">
                        Add Action to Content Library
                      </div>
                      <span className="title-icon">
                        <img src={icon} />
                        Other
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
                  <div className="action-input">
                    <Input
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.name}
                      name={"name"}
                      placeholder={"Action *"}
                    />
                    {formik.touched.name && formik.errors.name ? (
                      <div className="error">{formik.errors.name}</div>
                    ) : null}
                  </div>

                  <div className="action-second-section">
                    {/* <div className="action-input">
                    <Input placeholder={"Action"} />
                    <div className="datalist">
                      <p className="datalist-item">Add “Smile at a stranger”</p>
                    </div>
                  </div> */}
                    <div>
                      <p className="action-radio-title">
                        Active in Daily Queue?
                      </p>
                      <div className="radio-group">
                        <div className="single-radio-group">
                          <input
                            name={"add_to_daily_fuel_queue"}
                            ref={YesRef}
                            value={1}
                            type="radio"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                          />
                          <label
                            onClick={() => {
                              if (YesRef.current !== null) {
                                YesRef.current.click();
                              }
                            }}
                          >
                            Yes
                          </label>
                        </div>

                        <div className="single-radio-group">
                          <input
                            name={"add_to_daily_fuel_queue"}
                            ref={NoRef}
                            value={2}
                            type="radio"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                          />
                          <label
                            onClick={() => {
                              if (NoRef.current !== null) {
                                NoRef.current.click();
                              }
                            }}
                          >
                            No
                          </label>
                        </div>

                        <div className="single-radio-group">
                          <input
                            name={"add_to_daily_fuel_queue"}
                            ref={DontAddRef}
                            value={3}
                            type="radio"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                          />
                          <label
                            onClick={() => {
                              if (DontAddRef.current !== null) {
                                DontAddRef.current.click();
                              }
                            }}
                          >
                            Don’t Add to Daily Queue
                          </label>
                        </div>
                      </div>
                      {formik.touched.add_to_daily_fuel_queue &&
                      formik.errors.add_to_daily_fuel_queue ? (
                        <div className="error">
                          {formik.errors.add_to_daily_fuel_queue}
                        </div>
                      ) : null}
                    </div>

                    <button type="submit" className="submit-details-btn">
                      save
                    </button>
                  </div>
                </div>
              </form>
            )}
          </Formik>
        ) : null}
      </>
    );
  else return null;
}

export default AddAction;

// export function EditAction() {
//   return (
//     <div className="add-action-container">
//       <div className="add-modal-title-container">
//         <div className="add-modal-title">
//           <div className="add-modal-title-text">
//             Edit Action in Content Library
//           </div>
//           <span className="title-icon">
//             <img src={icon} />
//             Other
//           </span>
//         </div>
//         <span>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="14"
//             height="14"
//             viewBox="0 0 14 14"
//           >
//             <path
//               id="close"
//               d="M12.3,13.707,7,8.412l-5.3,5.3A1,1,0,1,1,.292,12.3L5.588,7,.292,1.7A1,1,0,0,1,1.7.292L7,5.588l5.3-5.3A1,1,0,0,1,13.708,1.7L8.412,7l5.3,5.3A1,1,0,1,1,12.3,13.707Z"
//               fill="#888"
//             />
//           </svg>
//         </span>
//       </div>
//       <div>
//         <div className="action-input">
//           <Input placeholder={"Action"} />
//           <div className="datalist">
//             <p className="datalist-item">Add “Smile at a stranger”</p>
//           </div>
//         </div>
//         <div>
//           <p className="action-radio-title">Active in Daily Queue?</p>
//           <div className="radio-group">
//             <div className="single-radio-group">
//               <input type="radio" />
//               <label>Yes</label>
//             </div>

//             <div className="single-radio-group">
//               <input type="radio" />
//               <label>No</label>
//             </div>

//             <div className="single-radio-group">
//               <input type="radio" />
//               <label>Don’t Add to Daily Queue</label>
//             </div>
//           </div>
//         </div>

//         <button className="submit-details-btn">save</button>
//       </div>
//     </div>
//   );
// }

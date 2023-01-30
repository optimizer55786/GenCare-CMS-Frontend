import { useRef, useEffect, useState } from "react";
import "../index.less";
import ShadowContainer from "../../../../components/organisms/ShadowContainer/ShadowContainer";
import { Button } from "antd";
import FloatingInput from "../../../../components/atoms/FloatingInput/FloatingInput";
import FileUpload from "../../../../components/atoms/FileUpload/FileUpload";
import * as Yup from "yup";
import { Formik } from "formik";
import {
  getGoalContentTemplateById,
  updateGoalContentTemplateById,
} from "../../../../services/request";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import * as _ from "lodash";
import { GoalContentDataType } from "../goal-content-table/types";

export default function () {
  const [initialValues, setInitialValues] = useState<GoalContentDataType>();
  const navigate = useNavigate();
  const params = useParams();
  const { goalTemplateId } = params;
  useEffect(() => {
    if (!goalTemplateId) {
      navigate(-1);
      return;
    } else {
      getGoalContentById(goalTemplateId);
    }
  }, [goalTemplateId]);

  async function getGoalContentById(id: any) {
    try {
      const response = await getGoalContentTemplateById(id);
      console.log(response.data);
      setInitialValues(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  const playRef = useRef<HTMLInputElement>(null);
  const playAutoRef = useRef<HTMLInputElement>(null);

  const validationSchema = Yup.object({
    internal_title: Yup.string().required("Required"),
    title: Yup.string().required("Required"),
    icon_url: Yup.string(),
    subtitle: Yup.string().required("Required"),
    url: Yup.string().required("Required"),
    cover_image: Yup.string(),
    button_title: Yup.string().required("Required"),
    play_automatically: Yup.boolean(),
    show_button_after_video_stops_playing: Yup.boolean(),
    onboarding_default: Yup.boolean(),
    state: Yup.boolean(),
  });

  if (!_.isEmpty(initialValues)) {
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          try {
            await updateGoalContentTemplateById(values);
            toast(
              `✅  Goal Content ${values.internal_title} updated successfully`
            );
            navigate("/settings/goal-content-templates");
          } catch (err: any) {
            console.log(err.response);
            if (err.response) {
              toast(` ❌ Server error, try again!`);
              return;
            }
            console.log(err);
            return toast(
              ` ❌ Error updating goal content, check internet & try again!`
            );
          }
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <div className="title-input-group">
              <div className="title-input">
                <FloatingInput
                  placeholder={"Internal Title *"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.internal_title}
                  name="internal_title"
                />
                {formik.touched.internal_title &&
                formik.errors.internal_title ? (
                  <div className="error">{formik.errors.internal_title}</div>
                ) : null}
              </div>
              <div>
                <Button htmlType="submit" className="title-btn" shape="round">
                  Publish Goal content
                </Button>
              </div>
            </div>
            <div>
              <ShadowContainer>
                <>
                  <div className="input-container">
                    <FloatingInput
                      placeholder={"Title"}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.title}
                      name="title"
                    />
                    {formik.touched.title && formik.errors.title ? (
                      <div className="error">{formik.errors.title}</div>
                    ) : null}
                    <FloatingInput
                      placeholder={"Subtitle"}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.subtitle}
                      name="subtitle"
                    />
                    {formik.touched.subtitle && formik.errors.subtitle ? (
                      <div className="error">{formik.errors.subtitle}</div>
                    ) : null}
                    <FloatingInput
                      placeholder={"Video URL"}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.url}
                      name="url"
                    />
                    {formik.touched.url && formik.errors.url ? (
                      <div className="error">{formik.errors.url}</div>
                    ) : null}
                  </div>

                  <div>
                    <p>Video Cover Image</p>
                    <FileUpload
                      name={"cover_image"}
                      setFieldValue={formik.setFieldValue}
                    />
                    {formik.touched.cover_image && formik.errors.cover_image ? (
                      <div className="error">{formik.errors.cover_image}</div>
                    ) : null}
                  </div>
                  <div style={{ width: "427px" }}>
                    <FloatingInput
                      placeholder={"Button Title"}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.button_title}
                      name="button_title"
                    />
                    {formik.touched.button_title &&
                    formik.errors.button_title ? (
                      <div className="error">{formik.errors.button_title}</div>
                    ) : null}
                  </div>

                  <div className="checkbox-group">
                    <div>
                      <input
                        ref={playAutoRef}
                        type="checkbox"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.play_automatically.toString()}
                        checked={formik.values.play_automatically}
                        name="play_automatically"
                      />
                      {formik.touched.play_automatically &&
                      formik.errors.play_automatically ? (
                        <div className="error">
                          {formik.errors.play_automatically}
                        </div>
                      ) : null}
                      <label
                        className="cursor-pointer"
                        onClick={() => {
                          if (playAutoRef.current !== null) {
                            playAutoRef.current.click();
                            return;
                          }
                        }}
                      >
                        Play video automatically
                      </label>
                    </div>
                    <div>
                      <input
                        ref={playRef}
                        type="checkbox"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.show_button_after_video_stops_playing.toString()}
                        checked={
                          formik.values.show_button_after_video_stops_playing
                        }
                        name="show_button_after_video_stops_playing"
                      />
                      {formik.touched.show_button_after_video_stops_playing &&
                      formik.errors.show_button_after_video_stops_playing ? (
                        <div className="error">
                          {formik.errors.show_button_after_video_stops_playing}
                        </div>
                      ) : null}
                      <label
                        className="cursor-pointer"
                        onClick={() => {
                          if (playRef.current !== null) {
                            playRef.current.click();
                          }
                        }}
                      >
                        Show button after video stops playing
                      </label>
                    </div>
                  </div>
                </>
              </ShadowContainer>
            </div>
          </form>
        )}
      </Formik>
    );
  } else return null;
}

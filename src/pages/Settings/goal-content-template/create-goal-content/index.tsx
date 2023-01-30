import { useRef } from "react";
import "../index.less";
import ShadowContainer from "../../../../components/organisms/ShadowContainer/ShadowContainer";
import { Button } from "antd";
import FloatingInput from "../../../../components/atoms/FloatingInput/FloatingInput";
import FileUpload from "../../../../components/atoms/FileUpload/FileUpload";
import * as Yup from "yup";
import { useFormik } from "formik";
import { serialize } from "object-to-formdata";
import { createGoalContentTemplate } from "../../../../services/request";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function () {
  const navigate = useNavigate();
  const initialValues = {
    internal_title: "",
    title: "",
    icon_url: "https://res.cloudinary.com/boye.png",
    subtitle: "",
    url: "",
    cover_image: "https://wistia.com/123456.jpg",
    button_title: "",
    play_automatically: false,
    show_button_after_video_stops_playing: false,
    onboarding_default: false,
    state: true,
  };

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
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
    }),
    onSubmit: async (values) => {
      try {
        const formData = serialize(values);
        await createGoalContentTemplate(formData);
        toast(`✅  Goal Content ${values.internal_title} created successfully`);
        navigate("/settings/goal-content-templates");
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
    },
  });

  const playRef = useRef<HTMLInputElement>(null);
  const playAutoRef = useRef<HTMLInputElement>(null);

  return (
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
          {formik.touched.internal_title && formik.errors.internal_title ? (
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
              {formik.touched.button_title && formik.errors.button_title ? (
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
                    if (playAutoRef.current !== null)
                      playAutoRef.current.click();
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
                  checked={formik.values.show_button_after_video_stops_playing}
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
                    if (playRef.current !== null) playRef.current.click();
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
  );
}

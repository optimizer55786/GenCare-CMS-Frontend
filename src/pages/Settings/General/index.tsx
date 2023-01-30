import "./index.less";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import ShadowContainer from "../../../components/organisms/ShadowContainer/ShadowContainer";
import Button from "../../../components/atoms/Button";
import FloatingInput from "../../../components/atoms/FloatingInput/FloatingInput";
import { getGeneralSettings } from "../../../services/request";
import { toast } from "react-toastify";
import { updateGeneralSettingsById } from "../../../services/request";

type SingleSetting = {
  id?: number;
  type: string;
  recommended_dimensions: string;
  max_size: number;
  allowed_types: string;
};

type SingleSettingProps = {
  setting: SingleSetting;
  index?: number;
};

const SingleSeting = ({ setting }: SingleSettingProps) => {
  const validationSchema = Yup.object().shape({
    id: Yup.number(),
    type: Yup.string().required(),
    recommended_dimensions: Yup.string().required(),
    max_size: Yup.string().max(5).required(),
    allowed_types: Yup.string().required(),
  });
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={setting}
      onSubmit={async (values) => {
        try {
          let { data } = await updateGeneralSettingsById(values);
          console.log("updated", data);
          toast(`✅ general settings updated  successfully!`);
          return;
        } catch (err: any) {
          if (err.response) {
            toast("❌ Server issues, try again");
            return;
          }
          toast("❌  Unable to reach server check internet");
        }
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <div className="settings-select-group">
            <p className="text-16 text-black text-mulish-bold ">
              {formik.values.type}
            </p>
            <div className="settings-input">
              <FloatingInput
                placeholder={"Thumbnail Recommended dimensions"}
                name="recommended_dimensions"
                value={formik.values.recommended_dimensions}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.recommended_dimensions &&
              formik.errors.recommended_dimensions ? (
                <div className="error">
                  {formik.errors.recommended_dimensions}
                </div>
              ) : null}
            </div>
            <div className="settings-input">
              <FloatingInput
                placeholder={"Thumbnail Max Size"}
                name="max_size"
                value={formik.values.max_size}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.max_size && formik.errors.max_size ? (
                <div className="error">{formik.errors.max_size}</div>
              ) : null}
            </div>
            <div className="settings-input">
              <FloatingInput
                placeholder={"Thumbnail Allowed Types"}
                name="allowed_types"
                value={formik.values.allowed_types}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.allowed_types && formik.errors.allowed_types ? (
                <div className="error">{formik.errors.allowed_types}</div>
              ) : null}
            </div>
          </div>
          <Button type="primary" htmlType="submit">
            save
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default function () {
  const [settings, setSettings] = useState<SingleSetting[]>();
  useEffect(() => {
    getSettings();
  }, []);

  const getSettings = async () => {
    try {
      let { data } = await getGeneralSettings();
      setSettings(data);
      return;
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <ShadowContainer>
      <div className="general-settings-container">
        {settings?.map((setting, index: number) => {
          return <SingleSeting setting={setting} index={index} key={index} />;
        })}
        {/* ================ */}
        {/* <div className="settings-select-group">
          <p className="text-16 text-black text-mulish-bold ">Cover Image</p>

          <div className="settings-input">
            <FloatingInput placeholder={"Cover Image Recommended dimensions"} />
          </div>
          <div className="settings-input">
            <FloatingInput placeholder={"Cover Max Size"} />
          </div>
          <div className="settings-input">
            <FloatingInput placeholder={"Cover Image Allowed Types"} />
          </div>
        </div> */}
        {/* =============== */}
        {/* <div className="settings-select-group">
          <p className="text-16 text-black text-mulish-bold ">Animation</p>

          <div className="settings-input">
            <FloatingInput placeholder={"Animation Recommended dimensions"} />
          </div>
          <div className="settings-input">
            <FloatingInput placeholder={"Animation Max Size"} />
          </div>
          <div className="settings-input">
            <FloatingInput placeholder={"Animation Allowed Types"} />
          </div>
        </div> */}
        {/* ================ */}
      </div>
    </ShadowContainer>
  );
}

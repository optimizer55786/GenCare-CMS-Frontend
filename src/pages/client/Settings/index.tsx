import ShadowContainer from "../../../components/organisms/ShadowContainer/ShadowContainer";
import FileUpload from "../../../components/atoms/FileUpload/FileUpload";
import PageContainer from "../../../components/atoms/PageContainer/PageContainer";
import "./index.less";
import FloatingInput from "../../../components/atoms/FloatingInput/FloatingInput";
import { FormikProps } from "formik";
import { useState, useEffect, useRef } from "react";
import { initialValuesType } from "../types";
import {
  getThemeTemplate,
  getAllTourText,
  getPrivacyDetails,
} from "../../../services/request";
import {
  ReusableTemplateFunction,
  Tour,
} from "../../Settings/tour-text-template/create-tour";
import { ReusablePrivacyComponent } from "../../Settings/privacy-details-template/create-privacy-details";

type SettingsProps = {
  formik: FormikProps<initialValuesType>;
};
export default function ({ formik }: SettingsProps) {
  const [themes, setThemes] = useState<any[]>();

  const getData = async () => {
    try {
      let { data } = await getThemeTemplate();
      setThemes(data);
    } catch (err: any) {
      console.log(err);
    }
  };

  const getTourTemplates = async () => {
    const response = await getAllTourText();
    if (formik)
      formik.setFieldValue("settings.app_intro_tour.tour_pages", response.data);
  };

  const getPrivacyTemplates = async () => {
    const response = await getPrivacyDetails();
    if (formik)
      formik.setFieldValue("settings.privacy_details_page", response.data[0]);
  };

  useEffect(() => {
    getData();
    getTourTemplates();
    getPrivacyTemplates();
  }, []);

  const DisplayByGenieRef = useRef<HTMLInputElement>(null);

  return (
    <ShadowContainer>
      <>
        <PageContainer>
          <p className="text-18 text-mulish-bold">THEME</p>

          <div className="pb-20 client-settings-upload-group flex">
            <div>
              <p>Logo</p>
              <FileUpload
                setFieldValue={formik.setFieldValue}
                name="settings.theme.logo_url"
              />
            </div>
            <div>
              <p>App Icon</p>
              <FileUpload
                setFieldValue={formik.setFieldValue}
                name="settings.theme.app_icon_url"
              />
            </div>
          </div>
          <select
            onChange={(event) => {
              formik.setFieldValue(
                "settings.theme.theme_name",
                Number(event.target.value)
              );
            }}
            className="theme-template-select"
          >
            <option>Theme Name</option>
            {themes?.map((theme, index) => {
              return (
                <option key={index + 1} value={theme.id}>
                  {theme.name}
                </option>
              );
            })}
          </select>
        </PageContainer>
        <PageContainer>
          <p className="text-18 text-mulish-bold">APP INTRO & TOUR</p>
          <div className="title-input">
            <FloatingInput
              placeholder={"App Description text *"}
              value={formik.values.settings.app_intro_tour.app_description_text}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name={"settings.app_intro_tour.app_description_text"}
            />
            {/* {formik.touched.client_name && formik.errors.client_name ? (
                    <div className="error">{formik.errors.client_name}</div>
                  ) : null} */}
          </div>
          <div className="display-by-genie">
            {/* <div> */}
            <input
              ref={DisplayByGenieRef}
              type="checkbox"
              name="settings.app_intro_tour.display_powered_by_genie"
              value={formik.values.settings.app_intro_tour.display_powered_by_genie.toString()}
              checked={
                formik.values.settings.app_intro_tour.display_powered_by_genie
              }
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="by-genie"
            />
            <label
              onClick={() => {
                if (DisplayByGenieRef.current)
                  DisplayByGenieRef.current.click();
              }}
              className="text-18 text-mulish-medium"
            >
              Display Powered by Genie
            </label>
            {/* </div> */}
          </div>

          {formik.values.settings.app_intro_tour.tour_pages.map(
            (tour, index) => {
              return (
                <ReusableTemplateFunction
                  formik={formik}
                  key={index}
                  index={index}
                />
              );
            }
          )}
        </PageContainer>
        <PageContainer>
          <p className="text-18 text-mulish-bold">LOGIN OPTIONS</p>
          <div>Type of login *</div>
          <div className="radio-group">
            <div className="single-radio-group">
              <input type="radio" name="type-of-login" />
              <label className="cursor-pointer text-18 text-mulish-medium ">
                Single Sign On (SSO)
              </label>
            </div>

            <div className="single-radio-group">
              <input type="radio" name="type-of-login" />
              <label className="cursor-pointer text-18 text-mulish-medium ">
                Standard Login
              </label>
            </div>
          </div>
          <div className="login-option-container">
            SINGLE SIGN ON (SSO) SETTINGS TBD
          </div>
        </PageContainer>
        <PageContainer>
          <ReusablePrivacyComponent formik={formik} />
        </PageContainer>
        {/* </form> */}
        {/* );
        }} */}
      </>
    </ShadowContainer>
  );
}

import "./index.less";
import ColorSelector from "../../../components/atoms/ColorSelector/ColorSelector";
import { Button } from "antd";
import { ThemeData } from "./theme-template-table/types";
import {
  createThemeTemplate,
  getThemeFonts,
  updateThemeTemplateById,
} from "../../../services/request";
import { Formik } from "formik";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import FileUpload from "../../../components/atoms/FileUpload/FileUpload";
import FloatingInput from "../../../components/atoms/FloatingInput/FloatingInput";
import { useNavigate } from "react-router-dom";

type Fonts = {
  id: number;
  name: string;
};

export const SingleTheme = ({ theme }: SingleThemeProps) => {
  const [fonts, setFonts] = useState<Fonts[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    getFonts();
  }, []);

  const getFonts = async () => {
    try {
      let { data } = await getThemeFonts();
      setFonts(data);
      return;
    } catch (err) {
      console.log(err);
    }
  };
  const validationSchema = Yup.object().shape({
    id: Yup.number(),
    name: Yup.string().required("required"),
    grow_header_dark_color: Yup.string()
      .min(1, "minimum one char")
      .max(9)
      .required("required"),
    grow_header_light_color: Yup.string().min(1).max(9).required("required"),
    grow_background_color: Yup.string().min(1).max(9).required("required"),
    grow_icons_color: Yup.string().min(1).max(9).required("required"),
    grow_buttons_selected_color: Yup.string()
      .min(1)
      .max(9)
      .required("required"),
    grow_buttons_unselected_color: Yup.string()
      .min(1)
      .max(9)
      .required("required"),
    grow_menu_selected_color: Yup.string().min(1).max(9).required("required"),
    care_header_dark_color: Yup.string().min(1).max(9).required("required"),
    care_header_light_color: Yup.string().min(1).max(9).required("required"),
    care_background_color: Yup.string().min(1).max(9).required("required"),
    care_icons_color: Yup.string().min(1).max(9).required("required"),
    care_buttons_selected_color: Yup.string()
      .min(1)
      .max(9)
      .required("required"),
    care_buttons_unselected_color: Yup.string()
      .min(1)
      .max(9)
      .required("required"),
    care_menu_selected_color: Yup.string().min(1).max(9).required("required"),
    care_checkbox_color: Yup.string().min(1).max(9).required("required"),
    daily_fuel_header_dark_color: Yup.string()
      .min(1)
      .max(9)
      .required("required"),
    daily_fuel_header_light_color: Yup.string()
      .min(1)
      .max(9)
      .required("required"),
    daily_fuel_background_color: Yup.string()
      .min(1)
      .max(9)
      .required("required"),
    daily_fuel_icons_color: Yup.string().min(1).max(9).required("required"),
    daily_fuel_buttons_selected_color: Yup.string()
      .min(1)
      .max(9)
      .required("required"),
    daily_fuel_buttons_unselected_color: Yup.string()
      .min(1)
      .max(9)
      .required("required"),
    daily_fuel_menu_selected_color: Yup.string()
      .min(1)
      .max(9)
      .required("required"),
    daily_fuel_checkbox_color: Yup.string().min(1).max(9).required("required"),
    journey_header_dark_color: Yup.string().min(1).max(9).required("required"),
    journey_header_light_color: Yup.string().min(1).max(9).required("required"),
    journey_background_color: Yup.string().min(1).max(9).required("required"),
    journey_icons_color: Yup.string().min(1).max(9).required("required"),
    journey_buttons_selected_color: Yup.string()
      .min(1)
      .max(9)
      .required("required"),
    journey_buttons_unselected_color: Yup.string()
      .min(1)
      .max(9)
      .required("required"),
    journey_menu_selected_color: Yup.string()
      .min(1)
      .max(9)
      .required("required"),
    me_onboarding_header_dark_color: Yup.string()
      .min(1)
      .max(9)
      .required("required"),
    me_onboarding_header_light_color: Yup.string()
      .min(1)
      .max(9)
      .required("required"),
    me_onboarding_background_color: Yup.string()
      .min(1)
      .max(9)
      .required("required"),
    me_onboarding_icons_color: Yup.string().min(1).max(9).required("required"),
    me_onboarding_buttons_selected_color: Yup.string()
      .min(1)
      .max(9)
      .required("required"),
    me_onboarding_buttons_unselected_color: Yup.string()
      .min(1)
      .max(9)
      .required("required"),
    me_onboarding_menu_selected_color: Yup.string()
      .min(1)
      .max(9)
      .required("required"),
    me_onboarding_checkbox_color: Yup.string()
      .min(1)
      .max(9)
      .required("required"),
    me_onboarding_action_button_color: Yup.string()
      .min(1)
      .max(9)
      .required("required"),
    me_onboarding_background_image_url: Yup.string().required("required"),
    circle_chart_first_filled_color: Yup.string()
      .min(1)
      .max(9)
      .required("required"),
    circle_chart_second_filled_color: Yup.string()
      .min(1)
      .max(9)
      .required("required"),
    circle_chart_third_filled_color: Yup.string()
      .min(1)
      .max(9)
      .required("required"),
    circle_chart_not_filled_color: Yup.string()
      .min(1)
      .max(9)
      .required("required"),
    first_font: Yup.number().min(1, "first font required").required("required"),
    second_font: Yup.number()
      .min(1, "second font required")
      .required("required"),
    third_font: Yup.number().min(1, "third font required").required("required"),
    header_image_url: Yup.string().required("required"),
    color_scheme: Yup.string(),
  });

  return (
    <Formik
      initialValues={theme}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        try {
          if (values.id) {
            await updateThemeTemplateById(values);
            toast(`✅ general settings updated  successfully!`);
            navigate("/settings/template-app-theme");
            return;
          } else {
            await createThemeTemplate(values);
            toast(`✅ general settings updated  successfully!`);
            navigate("/settings/template-app-theme");
            return;
          }
        } catch (err: any) {
          if (err.response) {
            toast("❌ Server issues, try again");
            return;
          }
          toast("❌  Unable to reach server check internet");
        }
      }}
    >
      {(formik) => {
        return (
          <form onSubmit={formik.handleSubmit}>
            <div>
              <FloatingInput
                placeholder={"Name *"}
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="error">{formik.errors.name}</div>
              ) : null}
            </div>
            <div className="text-black text-mulish-bold text-24">
              GROW COLORS
            </div>
            <div className="theme-selector-group">
              <div className="single-selector-group">
                <div>
                  <ColorSelector
                    name={"grow_header_dark_color"}
                    value={formik.values.grow_header_dark_color}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    title="Header Dark Color"
                  />
                  {formik.touched.grow_header_dark_color &&
                  formik.errors.grow_header_dark_color ? (
                    <div className="error">
                      {formik.errors.grow_header_dark_color}
                    </div>
                  ) : null}
                </div>
                <div>
                  <ColorSelector
                    name={"grow_header_light_color"}
                    value={formik.values.grow_header_light_color}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    title="Header Light Color"
                  />
                  {formik.touched.grow_header_light_color &&
                  formik.errors.grow_header_light_color ? (
                    <div className="error">
                      {formik.errors.grow_header_light_color}
                    </div>
                  ) : null}
                </div>
                <div>
                  <ColorSelector
                    name={"grow_background_color"}
                    value={formik.values.grow_background_color}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    title="Background Color"
                  />
                  {formik.touched.grow_background_color &&
                  formik.errors.grow_background_color ? (
                    <div className="error">
                      {formik.errors.grow_background_color}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="single-selector-group">
                <div>
                  <ColorSelector
                    name={"grow_icons_color"}
                    value={formik.values.grow_icons_color}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    title="Icons Color"
                  />
                  {formik.touched.grow_icons_color &&
                  formik.errors.grow_icons_color ? (
                    <div className="error">
                      {formik.errors.grow_icons_color}
                    </div>
                  ) : null}
                </div>
                <div>
                  <ColorSelector
                    name={"grow_buttons_selected_color"}
                    value={formik.values.grow_buttons_selected_color}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    title="Buttons Selected Color"
                  />
                  {formik.touched.grow_buttons_selected_color &&
                  formik.errors.grow_buttons_selected_color ? (
                    <div className="error">
                      {formik.errors.grow_buttons_selected_color}
                    </div>
                  ) : null}
                </div>
                <div>
                  <ColorSelector
                    name={"grow_buttons_unselected_color"}
                    value={formik.values.grow_buttons_unselected_color}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    title="Buttons Not Selected"
                  />
                  {formik.touched.grow_buttons_unselected_color &&
                  formik.errors.grow_buttons_unselected_color ? (
                    <div className="error">
                      {formik.errors.grow_buttons_unselected_color}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="single-selector-group">
                <div>
                  <ColorSelector
                    name={"grow_menu_selected_color"}
                    value={formik.values.grow_menu_selected_color}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    title="Menu Selected Color"
                  />
                  {formik.touched.grow_menu_selected_color &&
                  formik.errors.grow_menu_selected_color ? (
                    <div className="error">
                      {formik.errors.grow_menu_selected_color}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="text-black text-mulish-bold text-24">
              CARE COLORS
            </div>
            <div className="theme-selector-group">
              <div className="single-selector-group">
                <div>
                  <ColorSelector
                    name={"care_header_dark_color"}
                    value={formik.values.care_header_dark_color}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    title="Header Dark Color"
                  />
                  {formik.touched.care_header_dark_color &&
                  formik.errors.care_header_dark_color ? (
                    <div className="error">
                      {formik.errors.care_header_dark_color}
                    </div>
                  ) : null}
                </div>
                <div>
                  <ColorSelector
                    name={"care_header_light_color"}
                    value={formik.values.care_header_light_color}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    title="Header Light Color"
                  />
                  {formik.touched.care_header_light_color &&
                  formik.errors.care_header_light_color ? (
                    <div className="error">
                      {formik.errors.care_header_light_color}
                    </div>
                  ) : null}
                </div>
                <div>
                  <ColorSelector
                    name={"care_background_color"}
                    value={formik.values.care_background_color}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    title="Background Color"
                  />
                  {formik.touched.care_background_color &&
                  formik.errors.care_background_color ? (
                    <div className="error">
                      {formik.errors.care_background_color}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="single-selector-group">
                <div>
                  <ColorSelector
                    name={"care_icons_color"}
                    value={formik.values.care_icons_color}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    title="Icons Color"
                  />
                  {formik.touched.care_icons_color &&
                  formik.errors.care_icons_color ? (
                    <div className="error">
                      {formik.errors.care_icons_color}
                    </div>
                  ) : null}
                </div>
                <div>
                  <ColorSelector
                    name={"care_buttons_selected_color"}
                    value={formik.values.care_buttons_selected_color}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    title="Buttons Selected Color"
                  />
                  {formik.touched.care_buttons_selected_color &&
                  formik.errors.care_buttons_selected_color ? (
                    <div className="error">
                      {formik.errors.care_buttons_selected_color}
                    </div>
                  ) : null}
                </div>
                <div>
                  <ColorSelector
                    name={"care_buttons_unselected_color"}
                    value={formik.values.care_buttons_unselected_color}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    title="Buttons Not Selected"
                  />
                  {formik.touched.care_buttons_unselected_color &&
                  formik.errors.care_buttons_unselected_color ? (
                    <div className="error">
                      {formik.errors.care_buttons_unselected_color}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="single-selector-group">
                <div>
                  <ColorSelector
                    name={"care_menu_selected_color"}
                    value={formik.values.care_menu_selected_color}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    title="Menu Selected Color"
                  />
                  {formik.touched.care_menu_selected_color &&
                  formik.errors.care_menu_selected_color ? (
                    <div className="error">
                      {formik.errors.care_menu_selected_color}
                    </div>
                  ) : null}
                </div>
                <div>
                  <ColorSelector
                    name={"care_checkbox_color"}
                    value={formik.values.care_checkbox_color}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    title="Checkbox Color"
                  />
                  {formik.touched.care_checkbox_color &&
                  formik.errors.care_checkbox_color ? (
                    <div className="error">
                      {formik.errors.care_checkbox_color}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="text-black text-mulish-bold text-24">
              DAILY FUEL COLORS
            </div>
            <div className="theme-selector-group">
              <div className="single-selector-group">
                <div>
                  <ColorSelector
                    name={"daily_fuel_header_dark_color"}
                    value={formik.values.daily_fuel_header_dark_color}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    title="Header Dark Color"
                  />
                  {formik.touched.daily_fuel_header_dark_color &&
                  formik.errors.daily_fuel_header_dark_color ? (
                    <div className="error">
                      {formik.errors.daily_fuel_header_dark_color}
                    </div>
                  ) : null}
                </div>
                <div>
                  <ColorSelector
                    name={"daily_fuel_header_light_color"}
                    value={formik.values.daily_fuel_header_light_color}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    title="Header Light Color"
                  />
                  {formik.touched.daily_fuel_header_light_color &&
                  formik.errors.daily_fuel_header_light_color ? (
                    <div className="error">
                      {formik.errors.daily_fuel_header_light_color}
                    </div>
                  ) : null}
                </div>
                <div>
                  <ColorSelector
                    name={"daily_fuel_background_color"}
                    value={formik.values.daily_fuel_background_color}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    title="Background Color"
                  />
                  {formik.touched.daily_fuel_background_color &&
                  formik.errors.daily_fuel_background_color ? (
                    <div className="error">
                      {formik.errors.daily_fuel_background_color}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="single-selector-group">
                <div>
                  <ColorSelector
                    name={"daily_fuel_icons_color"}
                    value={formik.values.daily_fuel_icons_color}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    title="Icons Color"
                  />
                  {formik.touched.daily_fuel_icons_color &&
                  formik.errors.daily_fuel_icons_color ? (
                    <div className="error">
                      {formik.errors.daily_fuel_icons_color}
                    </div>
                  ) : null}
                </div>
                <div>
                  <ColorSelector
                    name={"daily_fuel_buttons_selected_color"}
                    value={formik.values.daily_fuel_buttons_selected_color}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    title="Buttons Selected Color"
                  />
                  {formik.touched.daily_fuel_buttons_selected_color &&
                  formik.errors.daily_fuel_buttons_selected_color ? (
                    <div className="error">
                      {formik.errors.daily_fuel_buttons_selected_color}
                    </div>
                  ) : null}
                </div>
                <div>
                  <ColorSelector
                    name={"daily_fuel_buttons_unselected_color"}
                    value={formik.values.daily_fuel_buttons_unselected_color}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    title="Buttons Not Selected"
                  />
                  {formik.touched.daily_fuel_buttons_unselected_color &&
                  formik.errors.daily_fuel_buttons_unselected_color ? (
                    <div className="error">
                      {formik.errors.daily_fuel_buttons_unselected_color}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="single-selector-group">
                <div>
                  <ColorSelector
                    name={"daily_fuel_menu_selected_color"}
                    value={formik.values.daily_fuel_menu_selected_color}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    title="Menu Selected Color"
                  />
                  {formik.touched.daily_fuel_menu_selected_color &&
                  formik.errors.daily_fuel_menu_selected_color ? (
                    <div className="error">
                      {formik.errors.daily_fuel_menu_selected_color}
                    </div>
                  ) : null}
                </div>
                <div>
                  <ColorSelector
                    name={"daily_fuel_checkbox_color"}
                    value={formik.values.daily_fuel_checkbox_color}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    title="Checkbox Color"
                  />
                  {formik.touched.daily_fuel_checkbox_color &&
                  formik.errors.daily_fuel_checkbox_color ? (
                    <div className="error">
                      {formik.errors.daily_fuel_checkbox_color}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="text-black text-mulish-bold text-24">
              JOURNEY COLORS
            </div>
            <div className="theme-selector-group">
              <div className="single-selector-group">
                <div>
                  <ColorSelector
                    name={"journey_header_dark_color"}
                    value={formik.values.journey_header_dark_color}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    title="Header Dark Color"
                  />
                  {formik.touched.journey_header_dark_color &&
                  formik.errors.journey_header_dark_color ? (
                    <div className="error">
                      {formik.errors.journey_header_dark_color}
                    </div>
                  ) : null}
                </div>
                <div>
                  <ColorSelector
                    name={"journey_header_light_color"}
                    value={formik.values.journey_header_light_color}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    title="Header Light Color"
                  />
                  {formik.touched.journey_header_light_color &&
                  formik.errors.journey_header_light_color ? (
                    <div className="error">
                      {formik.errors.journey_header_light_color}
                    </div>
                  ) : null}
                </div>
                <div>
                  <ColorSelector
                    name={"journey_background_color"}
                    value={formik.values.journey_background_color}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    title="Background Color"
                  />
                  {formik.touched.journey_background_color &&
                  formik.errors.journey_background_color ? (
                    <div className="error">
                      {formik.errors.journey_background_color}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="single-selector-group">
                <div>
                  <ColorSelector
                    name={"journey_icons_color"}
                    value={formik.values.journey_icons_color}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    title="Icons Color"
                  />
                  {formik.touched.journey_icons_color &&
                  formik.errors.journey_icons_color ? (
                    <div className="error">
                      {formik.errors.journey_icons_color}
                    </div>
                  ) : null}
                </div>
                <div>
                  <ColorSelector
                    name={"journey_buttons_selected_color"}
                    value={formik.values.journey_buttons_selected_color}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    title="Buttons Selected Color"
                  />
                  {formik.touched.journey_buttons_selected_color &&
                  formik.errors.journey_buttons_selected_color ? (
                    <div className="error">
                      {formik.errors.journey_buttons_selected_color}
                    </div>
                  ) : null}
                </div>
                <div>
                  <ColorSelector
                    name={"journey_buttons_unselected_color"}
                    value={formik.values.journey_buttons_unselected_color}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    title="Buttons Not Selected"
                  />
                  {formik.touched.journey_buttons_unselected_color &&
                  formik.errors.journey_buttons_unselected_color ? (
                    <div className="error">
                      {formik.errors.journey_buttons_unselected_color}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="single-selector-group">
                <div>
                  <ColorSelector
                    name={"journey_menu_selected_color"}
                    value={formik.values.journey_menu_selected_color}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    title="Menu Selected Color"
                  />
                  {formik.touched.journey_menu_selected_color &&
                  formik.errors.journey_menu_selected_color ? (
                    <div className="error">
                      {formik.errors.journey_menu_selected_color}
                    </div>
                  ) : null}
                </div>
                <div>
                  <ColorSelector
                    name={"journey_checkbox_color"}
                    value={formik.values.journey_checkbox_color}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    title="Checkbox Color"
                  />
                  {formik.touched.journey_checkbox_color &&
                  formik.errors.journey_checkbox_color ? (
                    <div className="error">
                      {formik.errors.journey_checkbox_color}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="text-black text-mulish-bold text-24">
              ME & ONBOARDING COLORS
            </div>
            <div className="theme-selector-group">
              <div className="single-selector-group">
                <div>
                  <ColorSelector
                    name={"me_onboarding_header_dark_color"}
                    value={formik.values.me_onboarding_header_dark_color}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    title="Header Dark Color"
                  />
                  {formik.touched.me_onboarding_header_dark_color &&
                  formik.errors.me_onboarding_header_dark_color ? (
                    <div className="error">
                      {formik.errors.me_onboarding_header_dark_color}
                    </div>
                  ) : null}
                </div>
                <div>
                  <ColorSelector
                    name={"me_onboarding_header_light_color"}
                    value={formik.values.me_onboarding_header_light_color}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    title="Header Light Color"
                  />
                  {formik.touched.me_onboarding_header_light_color &&
                  formik.errors.me_onboarding_header_light_color ? (
                    <div className="error">
                      {formik.errors.me_onboarding_header_light_color}
                    </div>
                  ) : null}
                </div>
                <div>
                  <ColorSelector
                    name={"me_onboarding_background_color"}
                    value={formik.values.me_onboarding_background_color}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    title="Background Color"
                  />
                  {formik.touched.me_onboarding_background_color &&
                  formik.errors.me_onboarding_background_color ? (
                    <div className="error">
                      {formik.errors.me_onboarding_background_color}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="single-selector-group">
                <div>
                  <ColorSelector
                    name={"me_onboarding_icons_color"}
                    value={formik.values.me_onboarding_icons_color}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    title="Icons Color"
                  />
                  {formik.touched.me_onboarding_icons_color &&
                  formik.errors.me_onboarding_icons_color ? (
                    <div className="error">
                      {formik.errors.me_onboarding_icons_color}
                    </div>
                  ) : null}
                </div>
                <div>
                  <ColorSelector
                    name={"me_onboarding_buttons_selected_color"}
                    value={formik.values.me_onboarding_buttons_selected_color}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    title="Buttons Selected Color"
                  />
                  {formik.touched.me_onboarding_buttons_selected_color &&
                  formik.errors.me_onboarding_buttons_selected_color ? (
                    <div className="error">
                      {formik.errors.me_onboarding_buttons_selected_color}
                    </div>
                  ) : null}
                </div>
                <div>
                  <ColorSelector
                    name={"me_onboarding_buttons_unselected_color"}
                    value={formik.values.me_onboarding_buttons_unselected_color}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    title="Buttons Not Selected"
                  />
                  {formik.touched.me_onboarding_buttons_unselected_color &&
                  formik.errors.me_onboarding_buttons_unselected_color ? (
                    <div className="error">
                      {formik.errors.me_onboarding_buttons_unselected_color}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="single-selector-group">
                <div>
                  <ColorSelector
                    name={"me_onboarding_menu_selected_color"}
                    value={formik.values.me_onboarding_menu_selected_color}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    title="Menu Selected Color"
                  />
                  {formik.touched.me_onboarding_menu_selected_color &&
                  formik.errors.me_onboarding_menu_selected_color ? (
                    <div className="error">
                      {formik.errors.me_onboarding_menu_selected_color}
                    </div>
                  ) : null}
                </div>
                <div>
                  <ColorSelector
                    name={"me_onboarding_checkbox_color"}
                    value={formik.values.me_onboarding_checkbox_color}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    title="Checkbox Color"
                  />
                  {formik.touched.me_onboarding_checkbox_color &&
                  formik.errors.me_onboarding_checkbox_color ? (
                    <div className="error">
                      {formik.errors.me_onboarding_checkbox_color}
                    </div>
                  ) : null}
                </div>
                <div>
                  <ColorSelector
                    name={"me_onboarding_action_button_color"}
                    value={formik.values.me_onboarding_action_button_color}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    title="Action Button Color"
                  />
                  {formik.touched.me_onboarding_action_button_color &&
                  formik.errors.me_onboarding_action_button_color ? (
                    <div className="error">
                      {formik.errors.me_onboarding_action_button_color}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="theme-file-upload">
                <p>Onboarding Background Image</p>
                <FileUpload
                  name={"me_onboarding_background_image_url"}
                  setFieldValue={formik.setFieldValue}
                />
                {formik.touched.me_onboarding_background_image_url &&
                formik.errors.me_onboarding_background_image_url ? (
                  <div className="error">
                    {formik.errors.me_onboarding_background_image_url}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="text-black text-mulish-bold text-24">
              CIRCLE CHART COLORS
            </div>
            <div className="theme-selector-group">
              <div className="single-selector-group">
                <div>
                  <ColorSelector
                    name={"circle_chart_first_filled_color"}
                    value={formik.values.circle_chart_first_filled_color}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    title="First Circle Filled Color"
                  />
                  {formik.touched.circle_chart_first_filled_color &&
                  formik.errors.circle_chart_first_filled_color ? (
                    <div className="error">
                      {formik.errors.circle_chart_first_filled_color}
                    </div>
                  ) : null}
                </div>
                <div>
                  <ColorSelector
                    name={"circle_chart_second_filled_color"}
                    value={formik.values.circle_chart_second_filled_color}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    title="Second Circle Filled Color"
                  />
                  {formik.touched.circle_chart_second_filled_color &&
                  formik.errors.circle_chart_second_filled_color ? (
                    <div className="error">
                      {formik.errors.circle_chart_second_filled_color}
                    </div>
                  ) : null}
                </div>
                <div>
                  <ColorSelector
                    name={"circle_chart_third_filled_color"}
                    value={formik.values.circle_chart_third_filled_color}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    title="Third Circle Filled Color"
                  />
                  {formik.touched.circle_chart_third_filled_color &&
                  formik.errors.circle_chart_third_filled_color ? (
                    <div className="error">
                      {formik.errors.circle_chart_third_filled_color}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="single-selector-group">
                <div>
                  <ColorSelector
                    name={"circle_chart_not_filled_color"}
                    value={formik.values.circle_chart_not_filled_color}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    title="Not Filled Color"
                  />
                  {formik.touched.circle_chart_not_filled_color &&
                  formik.errors.circle_chart_not_filled_color ? (
                    <div className="error">
                      {formik.errors.circle_chart_not_filled_color}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="theme-template-bottom">
              {fonts.length ? (
                <>
                  <div>
                    <select
                      name={"first_font"}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.first_font}
                      className="theme-template-select"
                    >
                      <option value={""}>Select First Font</option>
                      {fonts.map((font, index) => {
                        return (
                          <option value={font.id} key={index}>
                            {font.name}
                          </option>
                        );
                      })}
                    </select>
                    {formik.touched.first_font && formik.errors.first_font ? (
                      <div className="error">{formik.errors.first_font}</div>
                    ) : null}
                  </div>
                  <div>
                    <select
                      name={"second_font"}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.second_font}
                      className="theme-template-select"
                    >
                      <option value={""}>Select Second Font</option>
                      {fonts.map((font, index) => {
                        return (
                          <option value={font.id} key={index}>
                            {font.name}
                          </option>
                        );
                      })}
                    </select>
                    {formik.touched.second_font && formik.errors.second_font ? (
                      <div className="error">{formik.errors.second_font}</div>
                    ) : null}
                  </div>
                  <div>
                    <select
                      name={"third_font"}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.third_font}
                      className="theme-template-select"
                    >
                      <option>Select Third Font</option>
                      {fonts.map((font, index) => {
                        return (
                          <option value={font.id} key={index}>
                            {font.name}
                          </option>
                        );
                      })}
                    </select>
                    {formik.touched.third_font && formik.errors.third_font ? (
                      <div className="error">{formik.errors.third_font}</div>
                    ) : null}
                  </div>
                </>
              ) : null}

              <div className="theme-template-file-upload-group">
                <div className="theme-file-upload">
                  <p>Header Image</p>
                  <FileUpload
                    setFieldValue={formik.setFieldValue}
                    name="header_image_url"
                  />
                  {formik.touched.header_image_url &&
                  formik.errors.header_image_url ? (
                    <div className="error">
                      {formik.errors.header_image_url}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <Button htmlType="submit" shape="round" type="primary" size="large">
              save
            </Button>
          </form>
        );
      }}
    </Formik>
  );
};

type SingleThemeProps = {
  theme: ThemeData;
};

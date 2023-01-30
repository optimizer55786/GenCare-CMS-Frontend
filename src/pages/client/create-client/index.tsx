import "./index.less";
import Tab from "../../../components/atoms/Tab/Tab";
import { TabPaneProps } from "../../../types/tabs/tab-item.type";
import Details from "./Details";
import Onboarding from "./Onboarding";
import { Button } from "antd";
import Settings from "../Settings";
import { Formik, FormikProps } from "formik";
import * as Yup from "yup";
import { initialValuesType } from "../types";
import { toast } from "react-toastify";
import FloatingInput from "../../../components/atoms/FloatingInput/FloatingInput";
import { createClient } from "../../../services/request";
import { Navigate, useNavigate } from "react-router-dom";

export const createTabItems = (
  formik: FormikProps<initialValuesType>
): Array<TabPaneProps> => {
  return [
    {
      label: "DETAILS",
      key: "1",
      children: <Details formik={formik} />,
    },
    {
      label: "ONBOARDING",
      key: "2",
      children: <Onboarding formik={formik} />,
    },
    {
      label: "SETTINGS",
      key: "3",
      children: <Settings formik={formik} />,
    },
  ];
};

const validationSchema = Yup.object().shape({
  client_name: Yup.string().required("client name is required"),
  industry: Yup.number()
    .min(0, "industry is required")
    .required("industry is required"),
  city: Yup.number().min(0, "city is required").required("city is required"),
  short_description: Yup.string().required("description is required"),
  country: Yup.number()
    .min(0, "country is required")
    .required("country is required"),
  settings: Yup.object().shape({
    theme: Yup.object().shape({
      logo_url: Yup.string().required(),
      app_icon_url: Yup.string().required(),
      theme_name: Yup.number().required(),
    }),
  }),
  tags: Yup.array().of(Yup.string()).required("Provide at least one tag"),
});

export default function () {
  const navigate = useNavigate();
  return (
    <div className="tab-container">
      <Formik
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          try {
            await createClient(values);
            toast(`✅ client created  successfully!`);
            navigate("/clients");
            return;
          } catch (err: any) {
            if (err.response) {
              toast("❌ Server issues, try again");
              return;
            }
            toast("❌  Unable to reach server check internet");
          }
        }}
        initialValues={initialValues}
        validateOnBlur={true}
      >
        {(formik) => {
          return (
            <form onSubmit={formik.handleSubmit}>
              <div className="title-input-group">
                <div className="title-input">
                  <FloatingInput
                    placeholder={"Client Name *"}
                    value={formik.values.client_name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name={"client_name"}
                  />
                  {formik.touched.client_name && formik.errors.client_name ? (
                    <div className="error">{formik.errors.client_name}</div>
                  ) : null}
                </div>
                <div>
                  <Button htmlType="submit" className="title-btn" shape="round">
                    publish
                  </Button>
                </div>
              </div>
              <Tab items={createTabItems(formik)} />
            </form>
          );
        }}
      </Formik>
    </div>
  );
}

const initialValues: initialValuesType = {
  client_name: "",
  published: true,
  industry: 0,
  country: 0,
  city: 0,
  onboarding_about_you: 0,
  onboarding_set_goal: 0,
  onboarding_your_goal: [],
  number_employees: 0,
  contact_title: 1,
  contact_name: "",
  contact_email: "",
  contact_phone: "",
  settings: {
    theme: {
      logo_url: "",
      app_icon_url: "",
      theme_name: 1,
    },
    app_intro_tour: {
      app_description_text: "",
      display_powered_by_genie: true,
      tour_pages: [],
    },
    login_options: {
      type_of_login: {
        single_sign_on: true,
        standard_login: false,
      },
      single_sign_on_setting: {},
    },
    privacy_details_page: {},
  },
};

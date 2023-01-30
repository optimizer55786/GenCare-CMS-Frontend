import Tab from "../../../components/atoms/Tab/Tab";
import { createTabItems } from "../create-client";
import { initialValuesType } from "../types";
import { Formik } from "formik";

export default function () {
  return (
    <div>
      <Formik
        onSubmit={(values) => console.log(values)}
        initialValues={initialValues}
      >
        {(formik) => {
          return (
            <form action="">
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

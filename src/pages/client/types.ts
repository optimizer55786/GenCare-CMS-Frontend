import { Tour } from "../Settings/tour-text-template/create-tour";
export type InnerTheme = {
  logo_url?: string;
  app_icon_url?: string;
  theme_name?: number;
};

type InnerAppTour = {
  app_description_text: string;
  display_powered_by_genie: true;
  tour_pages: Tour[];
};

type TypeOfLogin = {
  single_sign_on: boolean;
  standard_login: boolean;
};

type InnerLoginOptions = {
  type_of_login: TypeOfLogin;
  single_sign_on_setting: any;
};
type InnerPrivacy = {};

export type Settings = {
  theme?: InnerTheme;
  app_intro_tour: InnerAppTour;
  login_options?: InnerLoginOptions;
  privacy_details_page?: InnerPrivacy;
};

export type initialValuesType = {
  id?: number;
  client_name: string;
  published: boolean;
  industry: number;
  city: number;
  country: number;
  short_description?: string;
  tags?: string[];
  settings: Settings;
  industry_name?: string;
  country_name?: string;
  city_name?: string;
  number_employees?: number;
  contact_title?: number;
  contact_name?: string;
  contact_email?: string;
  contact_phone?: string;
  onboarding_about_you: number;
  onboarding_set_goal: number;
  onboarding_your_goal: number[];
};

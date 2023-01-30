import ShadowContainer from "../../../../components/organisms/ShadowContainer/ShadowContainer";
import "../index.less";
import { SingleTheme } from "../single-theme";

export default function () {
  return (
    <>
      <ShadowContainer>
        <SingleTheme theme={initialValues} />
      </ShadowContainer>
    </>
  );
}

const initialValues = {
  name: "",
  grow_header_dark_color: "#7ECD99",
  grow_header_light_color: "#BDF0CF",
  grow_background_color: "#E6F8F0",
  grow_icons_color: "#BDF0CF",
  grow_buttons_selected_color: "#5CB179",
  grow_buttons_unselected_color: "#FFFFFF",
  grow_menu_selected_color: "#7ECD99",
  care_header_dark_color: "#7ECD99",
  care_header_light_color: "#BDF0CF",
  care_background_color: "#E6F8F0",
  care_icons_color: "#BDF0CF",
  care_buttons_selected_color: "#5CB179",
  care_buttons_unselected_color: "#FFFFFF",
  care_menu_selected_color: "#7ECD99",
  care_checkbox_color: "#7ECD99",
  daily_fuel_header_dark_color: "#7ECD99",
  daily_fuel_header_light_color: "#BDF0CF",
  daily_fuel_background_color: "#E6F8F0",
  daily_fuel_icons_color: "#BDF0CF",
  daily_fuel_buttons_selected_color: "#5CB179",
  daily_fuel_buttons_unselected_color: "#FFFFFF",
  daily_fuel_menu_selected_color: "#7ECD99",
  daily_fuel_checkbox_color: "#7ECD99",
  journey_header_dark_color: "#7ECD99",
  journey_header_light_color: "#BDF0CF",
  journey_background_color: "#E6F8F0",
  journey_icons_color: "#BDF0CF",
  journey_buttons_selected_color: "#5CB179",
  journey_buttons_unselected_color: "#FFFFFF",
  journey_menu_selected_color: "#7ECD99",
  journey_checkbox_color: "#7ECD99",
  me_onboarding_header_dark_color: "#7ECD99",
  me_onboarding_header_light_color: "#BDF0CF",
  me_onboarding_background_color: "#E6F8F0",
  me_onboarding_icons_color: "#BDF0CF",
  me_onboarding_buttons_selected_color: "#5CB179",
  me_onboarding_buttons_unselected_color: "#FFFFFF",
  me_onboarding_menu_selected_color: "#7ECD99",
  me_onboarding_checkbox_color: "#7ECD99",
  me_onboarding_action_button_color: "#7ECD99",
  me_onboarding_background_image_url: "",
  circle_chart_first_filled_color: "#7ECD99",
  circle_chart_second_filled_color: "#BDF0CF",
  circle_chart_third_filled_color: "#E6F8F0",
  circle_chart_not_filled_color: "#BDF0CF",
  first_font: 0,
  second_font: 0,
  third_font: 0,
  header_image_url: "",
  color_scheme: "www.westia.com/image.svg",
  onboarding_default: false,
  state: false,
};

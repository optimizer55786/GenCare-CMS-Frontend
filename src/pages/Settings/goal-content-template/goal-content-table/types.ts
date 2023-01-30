export interface GoalContentDataType {
  id?: number;
  key?: string;
  title?: string;
  internal_title: string;
  state: boolean;
  onboarding_default: boolean;
  subtitle: string;
  url?: string;
  cover_image?: string;
  button_title?: string;
  play_automatically: boolean;
  show_button_after_video_stops_playing: boolean;
}

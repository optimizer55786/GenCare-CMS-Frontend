export interface InputProps {
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  placeholder: String;
  name?: string;
  value?: string;
}

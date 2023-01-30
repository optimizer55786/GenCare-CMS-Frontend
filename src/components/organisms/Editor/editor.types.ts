export interface EditorProps {
  onChange?: any;
  placeholder: String;
  value?: string | number | readonly string[];
  onBlur?: any;
  min?: number;
  max?: number;
  name?: string;
  minLength?: number;
  maxLength?: number;
  id?: string;
  disabled?: boolean;
}

import { ChangeEventHandler } from 'react';
import { Input } from 'antd';
import './index.less';

interface MyInputProps {
  className: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
  value: number | string;
}

function MyInput({
  className,
  onChange,
  placeholder,
  value,
  ...props
}: MyInputProps) {
  return (
    <Input
      className={className}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
}

export default MyInput;

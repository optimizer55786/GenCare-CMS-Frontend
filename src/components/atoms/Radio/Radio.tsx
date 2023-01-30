import { Radio as DefaultRadio, Typography, Row } from "antd";
import "~/styles/utils.less";
import "./Radio.less";

export interface RadioPropsType {
  title: string;
  item: Array<any>;
}

interface RadioProps {
  radioItems: RadioPropsType;
  defaultValue: Number;
  onChange: (event: any) => void;
}

const { Text } = Typography;

const Radios = ({ radioItems, defaultValue, onChange }: RadioProps) => {
  return (
    <div>
      <DefaultRadio.Group
        onChange={onChange}
        value={defaultValue}
        className="gen-radio"
      >
        <Row>
          <Text className="gen-radio__title-text text-16">
            {radioItems.title}
          </Text>
        </Row>
        <div className="gen-radio-container">
          {radioItems.item.map((each: any, index: number) => {
            return (
              <DefaultRadio
                className="gen-radio__label-text"
                key={`radio_${index}`}
                value={each.value}
              >
                {each.label}
              </DefaultRadio>
            );
          })}
        </div>
      </DefaultRadio.Group>
    </div>
  );
};

export default Radios;

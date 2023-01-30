import { useState } from "react";
import Radios from "../../../components/atoms/Radio/Radio";
import SubPanelBoard from "../../../components/templates/sub-panel/sub-panel.component";

import { skipSetItem, addNewSetItem } from "./settings.items";

const Settings = () => {
  const [skipDefaultValue, setSkipDefaultValue] = useState<number>(1);
  const [addNewSetDefaultValue, setAddNewSetDefaultValue] = useState<number>(1);

  const setSkipValue = (event: any) => {
    setSkipDefaultValue(event.target.value);
  };

  const setAddNewSetValue = (event: any) => {
    setAddNewSetDefaultValue(event.target.value);
  };

  return (
    <SubPanelBoard>
      <div className="daily-scheduler-setting-container">
        <Radios
          radioItems={skipSetItem}
          onChange={setSkipValue}
          defaultValue={skipDefaultValue}
        />
        <Radios
          radioItems={addNewSetItem}
          onChange={setAddNewSetValue}
          defaultValue={addNewSetDefaultValue}
        />
      </div>
    </SubPanelBoard>
  );
};

export default Settings;

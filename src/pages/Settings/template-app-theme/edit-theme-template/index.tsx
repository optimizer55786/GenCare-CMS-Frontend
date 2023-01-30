import { useEffect, useState } from "react";
import ShadowContainer from "../../../../components/organisms/ShadowContainer/ShadowContainer";
import "../index.less";
import { useParams, useNavigate } from "react-router-dom";
import { SingleTheme } from "../single-theme";
import { getThemeTemplateById } from "../../../../services/request";
import * as _ from "lodash";
import { ThemeData } from "../theme-template-table/types";

export default function () {
  const params = useParams();
  const navigate = useNavigate();
  const { themeId } = params;
  const [template, setTemplate] = useState<ThemeData>();

  useEffect(() => {
    if (!themeId) {
      navigate(-1);
      return;
    } else {
      getSingleTemplate(themeId);
    }
  }, [themeId]);

  const getSingleTemplate = async (id: string) => {
    try {
      let { data } = await getThemeTemplateById(id);
      setTemplate(data);
      return;
    } catch (err: any) {
      console.log(err.message);
    }
  };
  return (
    <>
      <ShadowContainer>
        <>{_.isEmpty(template) ? null : <SingleTheme theme={template} />}</>
      </ShadowContainer>
    </>
  );
}

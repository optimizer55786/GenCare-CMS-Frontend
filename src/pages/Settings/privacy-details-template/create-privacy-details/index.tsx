import { useState, useEffect } from "react";
import { Button } from "antd";
import { Formik, FormikProps } from "formik";
import FloatingInput from "../../../../components/atoms/FloatingInput/FloatingInput";
import PageContainer from "../../../../components/atoms/PageContainer/PageContainer";
import ShadowContainer from "../../../../components/organisms/ShadowContainer/ShadowContainer";
import "./index.less";
import * as Yup from "yup";
import {
  updatePrivacyDetailsById,
  getPrivacyDetails,
  createPrivacyDetails,
} from "../../../../services/request";
import CleanMiniDragable from "../../../../components/atoms/Dragable/CleanMiniDraggable";
import { toast } from "react-toastify";

type PrivacyDetails = {
  id?: number;
  header_text: string;
  short_description: string;
  privacies: Privacy[];
  url_privacy_policy: string;
  url_terms_of_service: string;
  button_title: string;
};

type Privacy = {
  order: number;
  description: string;
};

export default function () {
  const [privacies, setPrivacies] = useState<PrivacyDetails[]>([]);
  const initialState = {
    header_text: "",
    short_description: "",
    privacies: [],
    url_privacy_policy: "",
    url_terms_of_service: "",
    button_title: "",
  };

  useEffect(() => {
    getPrivacy();
  }, []);

  const getPrivacy = async () => {
    try {
      let { data } = await getPrivacyDetails();
      setPrivacies(data);
    } catch (err) {
      console.log("err");
    }
  };

  return (
    <ShadowContainer>
      <PageContainer>
        {privacies.length ? (
          privacies.map((privacy, index) => {
            return <PrivacyComponent initialState={privacy} key={index} />;
          })
        ) : (
          <PrivacyComponent initialState={initialState} />
        )}
      </PageContainer>
    </ShadowContainer>
  );
}

type PrivacyComponentProps = {
  initialState: PrivacyDetails;
};

type ReusablePrivacyComponentProps = {
  formik: FormikProps<any>;
};

const PrivacyComponent = ({ initialState }: PrivacyComponentProps) => {
  const validationSchema = Yup.object().shape({
    header_text: Yup.string().required("Required"),
    short_description: Yup.string().required("Required"),
    privacies: Yup.array()
      .of(
        Yup.object({
          order: Yup.number(),
          description: Yup.string().required("required"),
        })
      )
      .required("required"),
    url_privacy_policy: Yup.string().required(),
    url_terms_of_service: Yup.string().required(),
    button_title: Yup.string().required(),
  });
  return (
    <Formik
      onSubmit={async (values) => {
        try {
          if (values.id) {
            let { data } = await updatePrivacyDetailsById(values);
            console.log("updated", data);
            toast(`✅ privacy updated  successfully!`);
            return;
          } else {
            let { data } = await createPrivacyDetails(values);
            console.log("created", data);
            toast(`✅ privacy created  successfully!`);
            return;
            return;
          }
        } catch (err: any) {
          if (err.response) {
            toast("❌ Server issues, try again");
            return;
          }
          toast("❌  Unable to reach server check internet");
        }
      }}
      initialValues={initialState}
      validationSchema={validationSchema}
    >
      {(formik) => {
        return (
          <form onSubmit={formik.handleSubmit}>
            <p className="text-black text-mulish-bold text-uppercase text-20 ">
              PRIVACY DETAILS PAGE
            </p>
            <div className="tour-single-input">
              <FloatingInput
                placeholder={"Header Text *"}
                name="header_text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.header_text}
              />
              {formik.touched.header_text && formik.errors.header_text ? (
                <div className="error">{formik.errors.header_text}</div>
              ) : null}
            </div>
            <div className="tour-single-input">
              <FloatingInput
                placeholder={"Short Description *"}
                name="short_description"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.short_description}
              />
              {formik.touched.short_description &&
              formik.errors.short_description ? (
                <div className="error">{formik.errors.short_description}</div>
              ) : null}
            </div>

            <div>
              {formik?.values.privacies?.map((privacy, index) => {
                return (
                  <CleanMiniDragable
                    index={index.toString()}
                    placeholder={`Privacy Option ${index + 1}`}
                    key={index}
                    name={`privacies[${index}].description`}
                    value={formik.values.privacies[index].description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    formik={formik}
                    removeOption={(index: number) => {
                      let privacyCopy = formik.values.privacies.slice();
                      privacyCopy.splice(index, 1);
                      formik.setFieldValue("privacies", privacyCopy);
                    }}
                  />
                );
              })}
              <div
                onClick={() => {
                  const privacyCopy = formik.values.privacies.slice();
                  const newPrivacies = [
                    ...privacyCopy,
                    {
                      order: privacyCopy.length + 1,
                      description: " ",
                    },
                  ];
                  formik.setFieldValue("privacies", newPrivacies);
                }}
                className="cursor-pointer text-primary text-18 text-mulish-bold"
              >
                + add privacy option
              </div>
            </div>
            <div className="privacy-policy-bottom">
              <div>
                <FloatingInput
                  placeholder={"URL To Privacy Policy *"}
                  name="url_privacy_policy"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.url_privacy_policy}
                />
                {formik.touched.url_privacy_policy &&
                formik.errors.url_privacy_policy ? (
                  <div className="error">
                    {formik.errors.url_privacy_policy}
                  </div>
                ) : null}
              </div>
              <div>
                <FloatingInput
                  placeholder={"URL To Terms of Service *"}
                  name="url_terms_of_service"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.url_terms_of_service}
                />
                {formik.touched.url_terms_of_service &&
                formik.errors.url_terms_of_service ? (
                  <div className="error">
                    {formik.errors.url_terms_of_service}
                  </div>
                ) : null}
              </div>
              <div>
                <FloatingInput
                  placeholder={"Action Button Title *"}
                  name="button_title"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.button_title}
                />
                {formik.touched.button_title && formik.errors.button_title ? (
                  <div className="error">{formik.errors.button_title}</div>
                ) : null}
              </div>
            </div>
            <Button htmlType="submit" size="large" shape="round" type="primary">
              save
            </Button>
          </form>
        );
      }}
    </Formik>
  );
};

export const ReusablePrivacyComponent = ({
  formik,
}: ReusablePrivacyComponentProps) => {
  return (
    <>
      <p className="text-black text-mulish-bold text-uppercase text-20 ">
        PRIVACY DETAILS PAGE
      </p>
      <div className="tour-single-input">
        <FloatingInput
          placeholder={"Header Text *"}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="settings.privacy_details_page.header_text"
          value={formik.values.settings.privacy_details_page.header_text}
        />
        {/* {formik.touched.header_text && formik.errors.header_text ? (
          <div className="error">{formik.errors.header_text}</div>
        ) : null} */}
      </div>
      <div className="tour-single-input">
        <FloatingInput
          placeholder={"Short Description *"}
          // name="short_description"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          // value={formik.values.short_description}
          name="settings.privacy_details_page.short_description"
          value={formik.values.settings.privacy_details_page.short_description}
        />
        {/* {formik.touched.short_description && formik.errors.short_description ? (
          <div className="error">{formik.errors.short_description}</div>
        ) : null} */}
      </div>

      <div>
        {formik?.values.settings.privacy_details_page.privacies?.map(
          (privacy: any, index: number) => {
            return (
              <CleanMiniDragable
                index={index.toString()}
                placeholder={`Privacy Option ${index + 1}`}
                key={index}
                name={`settings.privacy_details_page.privacies[${index}].description`}
                value={
                  formik.values.settings.privacy_details_page.privacies[index]
                    .description
                }
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                formik={formik}
                removeOption={(index: number) => {
                  let privacyCopy =
                    formik.values.settings.privacy_details_page.privacies.slice();
                  privacyCopy.splice(index, 1);
                  formik.setFieldValue(
                    "settings.privacy_details_page.privacies",
                    privacyCopy
                  );
                }}
              />
            );
          }
        )}
        <div
          onClick={() => {
            const privacyCopy =
              formik.values.settings.privacy_details_page.privacies.slice();
            const newPrivacies = [
              ...privacyCopy,
              {
                order: privacyCopy.length + 1,
                description: " ",
              },
            ];
            formik.setFieldValue(
              "settings.privacy_details_page.privacies",
              newPrivacies
            );
          }}
          className="cursor-pointer text-primary text-18 text-mulish-bold"
        >
          + add privacy option
        </div>
      </div>
      <div className="privacy-policy-bottom">
        <div>
          <FloatingInput
            placeholder={"URL To Privacy Policy *"}
            name="settings.privacy_details_page.url_privacy_policy"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={
              formik.values.settings.privacy_details_page.url_privacy_policy
            }
          />
          {/* {formik.touched.url_privacy_policy &&
          formik.errors.url_privacy_policy ? (
            <div className="error">{formik.errors.url_privacy_policy}</div>
          ) : null} */}
        </div>
        <div>
          <FloatingInput
            placeholder={"URL To Terms of Service *"}
            name="settings.privacy_details_page.url_terms_of_service"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={
              formik.values.settings.privacy_details_page.url_terms_of_service
            }
          />
          {/* {formik.touched.url_terms_of_service &&
          formik.errors.url_terms_of_service ? (
            <div className="error">{formik.errors.url_terms_of_service}</div>
          ) : null} */}
        </div>
        <div>
          <FloatingInput
            placeholder={"Action Button Title *"}
            name="settings.settings.privacy_details_page.button_title"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.settings.privacy_details_page.button_title}
          />
          {/* {formik.touched.button_title && formik.errors.button_title ? (
            <div className="error">{formik.errors.button_title}</div>
          ) : null} */}
        </div>
      </div>
    </>
  );
};

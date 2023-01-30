import { Button } from "antd";
import { useState, useEffect, useRef } from "react";
import ShadowContainer from "../../../../components/organisms/ShadowContainer/ShadowContainer";
import FloatingInput from "../../../../components/atoms/FloatingInput/FloatingInput";
import FileUpload from "./../../../../components/atoms/FileUpload/FileUpload";
import "./index.less";
import PageContainer from "../../../../components/atoms/PageContainer/PageContainer";
import { getAllTourText } from "../../../../services/request";
import { Formik, FormikProps, ErrorMessage } from "formik";
import {
  updateTourTextById,
  createTourText,
} from "../../../../services/request";
import * as _ from "lodash";
import { toast } from "react-toastify";
import * as Yup from "yup";

export type Tour = {
  id?: string;
  header_text: string;
  short_description: string;
  type_of_interaction: string;
  url: string;
  cover_image: string;
  play_automatically: boolean;
  button_title: string;
};
export default function () {
  const [tours, setTours] = useState<Tour[]>([]);

  useEffect(() => {
    getTemplates();
  }, []);

  const getTemplates = async () => {
    const response = await getAllTourText();
    setTours(response.data);
  };

  return (
    <ShadowContainer>
      <>
        {tours.map((tour, index) => {
          return <TemplateFunction template={tour} key={index} index={index} />;
        })}
      </>
    </ShadowContainer>
  );
}

const TemplateFunction = ({ template, index }: TemplateFunctionProps) => {
  const validationSchema = Yup.object({
    header_text: Yup.string().required("Required!"),
    short_description: Yup.string().required("Required!"),
    type_of_interaction: Yup.number().min(1).max(4).required("required"),
    url: Yup.mixed(),
    cover_image: Yup.mixed(),
    play_automatically: Yup.boolean(),
    button_title: Yup.string(),
  });

  const handleSubmit = async (values: Tour) => {
    try {
      if (values.id) {
        await updateTourTextById(values);
        toast(`✅ tour updated successfully!`);
        return;
      } else {
        await createTourText(values);
        toast(`✅ general settings updated  successfully!`);
        return;
      }
    } catch (err: any) {
      if (err.response) {
        toast("❌ Server issues, try again");
        return;
      }
      toast("❌  Unable to reach server check internet");
    }
  };

  const AnimationRef = useRef<HTMLInputElement>(null);
  const ImageRef = useRef<HTMLInputElement>(null);
  const NoneRef = useRef<HTMLInputElement>(null);
  const VideoRef = useRef<HTMLInputElement>(null);
  const PlayVideoRef = useRef<HTMLInputElement>(null);

  if (!_.isEmpty(template)) {
    const initialValues: Tour = {
      ...template,
      type_of_interaction: convertEnumToId(
        template.type_of_interaction
      ).toString(),
    };
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <PageContainer>
              <p className="text-black text-mulish-bold text-uppercase text-20 ">
                TOUR PAGE {index + 1}
              </p>
              <div className="tour-single-input">
                <FloatingInput
                  name="header_text"
                  placeholder={"Header Text *"}
                  value={formik.values.header_text}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.header_text && formik.errors.header_text ? (
                  <div className="error">{formik.errors.header_text}</div>
                ) : null}
              </div>
              <div className="tour-single-input">
                <FloatingInput
                  name="short_description"
                  placeholder={"Short Description *"}
                  value={formik.values.short_description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.short_description &&
                formik.errors.short_description ? (
                  <div className="error">{formik.errors.short_description}</div>
                ) : null}
              </div>
              <p>Type of interaction *</p>
              <div className="radio-group text-16">
                <div className="single-radio-group">
                  <input
                    ref={VideoRef}
                    type="radio"
                    value={1}
                    checked={Number(formik.values.type_of_interaction) === 1}
                    name="type_of_interaction"
                    onChange={formik.handleChange}
                  />
                  <label
                    onClick={() => {
                      if (VideoRef.current !== null) VideoRef.current.click();
                    }}
                    className="cursor-pointer"
                  >
                    Video
                  </label>
                </div>

                <div className="single-radio-group">
                  <input
                    ref={AnimationRef}
                    type="radio"
                    value={2}
                    onChange={formik.handleChange}
                    checked={Number(formik.values.type_of_interaction) === 2}
                    name="type_of_interaction"
                  />
                  <label
                    onClick={() => {
                      if (AnimationRef.current !== null)
                        AnimationRef.current.click();
                    }}
                    className="cursor-pointer"
                  >
                    Animation
                  </label>
                </div>

                <div className="single-radio-group">
                  <input
                    type="radio"
                    value={3}
                    name="type_of_interaction"
                    ref={ImageRef}
                    onChange={formik.handleChange}
                    checked={Number(formik.values.type_of_interaction) === 3}
                  />
                  <label
                    onClick={() => {
                      if (ImageRef.current !== null) ImageRef.current.click();
                    }}
                    className="cursor-pointer"
                  >
                    Image
                  </label>
                </div>
                <div className="single-radio-group">
                  <input
                    type="radio"
                    value={4}
                    name="type_of_interaction"
                    ref={NoneRef}
                    onChange={formik.handleChange}
                    checked={Number(formik.values.type_of_interaction) === 4}
                  />
                  <label
                    onClick={() => {
                      if (NoneRef.current !== null) NoneRef.current.click();
                    }}
                    className="cursor-pointer"
                  >
                    None
                  </label>
                </div>
              </div>
              {formik.touched.type_of_interaction &&
              formik.errors.type_of_interaction ? (
                <div className="error">{formik.errors.type_of_interaction}</div>
              ) : null}
              {Number(formik.values.type_of_interaction) === 1 && (
                <>
                  <div className="tour-single-input">
                    <FloatingInput
                      placeholder={"Video URL *"}
                      value={formik.values.url}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="url"
                    />
                    {formik.touched.url && formik.errors.url ? (
                      <div className="error">{formik.errors.url}</div>
                    ) : null}
                  </div>
                  <div className="tour-media-upload-container">
                    <div>
                      <p>Video Cover Image *</p>
                      <FileUpload
                        setFieldValue={formik.setFieldValue}
                        name="cover_image"
                        myPlaceholder={formik.values.cover_image}
                      />
                      {formik.touched.cover_image &&
                      formik.errors.cover_image ? (
                        <div className="error">{formik.errors.cover_image}</div>
                      ) : null}
                    </div>
                    <div className="automatic-checkbox">
                      {/* <div> */}
                      <input
                        ref={PlayVideoRef}
                        type="checkbox"
                        name="play_automatically"
                        value={formik.values.play_automatically.toString()}
                        checked={formik.values.play_automatically}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <label
                        onClick={() => {
                          if (PlayVideoRef.current !== null)
                            PlayVideoRef.current.click();
                        }}
                        className="text-18 text-mulish-medium"
                      >
                        Play video automatically
                      </label>
                      {/* </div> */}
                    </div>
                  </div>
                </>
              )}

              <div className="tour-single-input">
                <FloatingInput
                  placeholder={"Action Button Title *"}
                  value={formik.values.button_title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="button_title"
                />
              </div>
              <div>
                <Button htmlType="submit" shape="round" type="primary">
                  save
                </Button>
              </div>
            </PageContainer>
          </form>
        )}
      </Formik>
    );
  }

  return null;
};

export const ReusableTemplateFunction = ({
  formik,
  index,
}: ReusableTemplateFunctionProps) => {
  const AnimationRef = useRef<HTMLInputElement>(null);
  const ImageRef = useRef<HTMLInputElement>(null);
  const NoneRef = useRef<HTMLInputElement>(null);
  const VideoRef = useRef<HTMLInputElement>(null);
  const PlayVideoRef = useRef<HTMLInputElement>(null);
  return (
    <PageContainer>
      <p className="text-black text-mulish-bold text-uppercase text-20 ">
        TOUR PAGE {index + 1}
      </p>
      <div className="tour-single-input">
        <FloatingInput
          name={`settings.app_intro_tour.tour_pages[${index}].header_text`}
          value={
            formik.values.settings.app_intro_tour.tour_pages[index].header_text
          }
          placeholder={"Header Text *"}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <ErrorMessage
          component="div"
          className="error"
          name={`settings.app_intro_tour.tour_pages[${index}].header_text`}
        />
      </div>
      <div className="tour-single-input">
        <FloatingInput
          placeholder={"Short Description *"}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name={`settings.app_intro_tour.tour_pages[${index}].short_description`}
          value={
            formik.values.settings.app_intro_tour.tour_pages[index]
              .short_description
          }
        />
        <ErrorMessage
          component="div"
          className="error"
          name={`settings.app_intro_tour.tour_pages[${index}].short_description`}
        />
      </div>
      <p>Type of interaction *</p>
      <div className="radio-group text-16">
        <div className="single-radio-group">
          <input
            ref={VideoRef}
            type="radio"
            value={1}
            checked={
              Number(
                formik.values.settings.app_intro_tour.tour_pages[index]
                  .type_of_interaction
              ) === 1
            }
            name={`settings.app_intro_tour.tour_pages[${index}].type_of_interaction`}
            // onChange={formik.handleChange}
            onChange={(event) => {
              formik.setFieldValue(
                `settings.app_intro_tour.tour_pages[${index}].type_of_interaction`,
                Number(event.target.value)
              );
            }}
          />
          <label
            onClick={() => {
              if (VideoRef.current !== null) VideoRef.current.click();
            }}
            className="cursor-pointer"
          >
            Video
          </label>
        </div>

        <div className="single-radio-group">
          <input
            ref={AnimationRef}
            type="radio"
            value={2}
            onChange={(event) => {
              formik.setFieldValue(
                `settings.app_intro_tour.tour_pages[${index}].type_of_interaction`,
                Number(event.target.value)
              );
            }}
            checked={
              Number(
                formik.values.settings.app_intro_tour.tour_pages[index]
                  .type_of_interaction
              ) === 2
            }
            name={`settings.app_intro_tour.tour_pages[${index}].type_of_interaction`}
          />
          <label
            onClick={() => {
              if (AnimationRef.current !== null) AnimationRef.current.click();
            }}
            className="cursor-pointer"
          >
            Animation
          </label>
        </div>

        <div className="single-radio-group">
          <input
            type="radio"
            value={3}
            name={`settings.app_intro_tour.tour_pages[${index}].type_of_interaction`}
            ref={ImageRef}
            onChange={(event) => {
              formik.setFieldValue(
                `settings.app_intro_tour.tour_pages[${index}].type_of_interaction`,
                Number(event.target.value)
              );
            }}
            checked={
              Number(
                formik.values.settings.app_intro_tour.tour_pages[index]
                  .type_of_interaction
              ) === 3
            }
          />
          <label
            onClick={() => {
              if (ImageRef.current !== null) ImageRef.current.click();
            }}
            className="cursor-pointer"
          >
            Image
          </label>
        </div>
        <div className="single-radio-group">
          <input
            type="radio"
            value={4}
            name={`settings.app_intro_tour.tour_pages[${index}].type_of_interaction`}
            ref={NoneRef}
            onChange={(event) => {
              formik.setFieldValue(
                `settings.app_intro_tour.tour_pages[${index}].type_of_interaction`,
                Number(event.target.value)
              );
            }}
            checked={
              Number(
                formik.values.settings.app_intro_tour.tour_pages[index]
                  .type_of_interaction
              ) === 4
            }
          />
          <label
            onClick={() => {
              if (NoneRef.current !== null) NoneRef.current.click();
            }}
            className="cursor-pointer"
          >
            None
          </label>
        </div>
      </div>
      <ErrorMessage
        component="div"
        className="error"
        name={`settings.app_intro_tour.tour_pages[${index}].type_of_interaction`}
      />
      {Number(
        formik.values.settings.app_intro_tour.tour_pages[index]
          .type_of_interaction
      ) === 1 && (
        <>
          <div className="tour-single-input">
            <FloatingInput
              placeholder={"Video URL *"}
              value={
                formik.values.settings.app_intro_tour.tour_pages[index].url
              }
              name={`settings.app_intro_tour.tour_pages[${index}].url`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <ErrorMessage
              component="div"
              className="error"
              name={`settings.app_intro_tour.tour_pages[${index}].url`}
            />
          </div>
          <div className="tour-media-upload-container">
            <div>
              <p>Video Cover Image *</p>
              <FileUpload
                setFieldValue={formik.setFieldValue}
                name={`settings.app_intro_tour.tour_pages[${index}].cover_image`}
              />
              <ErrorMessage
                component="div"
                className="error"
                name={`settings.app_intro_tour.tour_pages[${index}].cover_image`}
              />
            </div>
            <div className="automatic-checkbox">
              <input
                ref={PlayVideoRef}
                type="checkbox"
                value={
                  formik.values.settings.app_intro_tour.tour_pages[index]
                    .play_automatically
                }
                name={`settings.app_intro_tour.tour_pages[${index}].play_automatically`}
                checked={
                  formik.values.settings.app_intro_tour.tour_pages[index]
                    .play_automatically
                }
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label
                onClick={() => {
                  if (PlayVideoRef.current !== null)
                    PlayVideoRef.current.click();
                }}
                className="text-18 text-mulish-medium"
              >
                Play video automatically
              </label>
            </div>
            <ErrorMessage
              component="div"
              className="error"
              name={`settings.app_intro_tour.tour_pages[${index}].play_automatically`}
            />
          </div>
        </>
      )}

      <div className="tour-single-input">
        <FloatingInput
          placeholder={"Action Button Title *"}
          // value={formik.values.button_title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          // name="button_title"
          value={
            formik.values.settings.app_intro_tour.tour_pages[index].button_title
          }
          name={`settings.app_intro_tour.tour_pages[${index}].button_title`}
        />
      </div>
    </PageContainer>
  );
};

const tourEnums: TourEnum[] = [
  {
    name: "Video",
    id: 1,
  },
  {
    name: "Animation",
    id: 2,
  },
  {
    name: "Image",
    id: 3,
  },
  {
    name: "None",
    id: 4,
  },
];

type TourEnum = {
  id: number;
  name: string;
};

function convertEnumToId(en: string): number {
  let tour = tourEnums.find((tour) => tour.name === en);
  if (tour) return Number(tour.id);
  return 1;
}

// type Template = {
//   header_text: string;
//   short_description: string;
//   type_of_interaction: number;
//   url?: string;
//   cover_image?: string;
//   play_automatically?: boolean;
//   button_title: string;
// };

type TemplateFunctionProps = {
  template: Tour;
  index: number;
};

type ReusableTemplateFunctionProps = {
  formik: FormikProps<any>;
  index: number;
};

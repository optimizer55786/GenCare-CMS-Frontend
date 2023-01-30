import FormList from "antd/lib/form/FormList";
import { ErrorMessage, FormikProps } from "formik";
import { useState, useEffect } from "react";
import FloatingInput from "../../../components/atoms/FloatingInput/FloatingInput";
import ShadowContainer from "../../../components/organisms/ShadowContainer/ShadowContainer";
import Tags from "../../../components/Tags/Tags";
import AddAboutYouPopUp from "./AddAboutYouPopUp";
import "./Details.less";
import { initialValuesType } from "../types";
import {
  getIndustries,
  getCities,
  getCountries,
} from "../../../services/request";

type DetailsProps = {
  formik: FormikProps<initialValuesType>;
};

type IndustryType = {
  id: number;
  name: string;
};
type CityType = {
  id: number;
  name: string;
  country: number;
  country_name?: string;
};

type CountryType = {
  id: number;
  name: string;
};

function Details({ formik }: DetailsProps) {
  const [industries, setIndustries] = useState<IndustryType[]>([]);
  const [cities, setCities] = useState<CityType[]>([]);
  const [countries, setCountries] = useState<CountryType[]>([]);
  async function getIndustryData() {
    try {
      const { data } = await getIndustries();
      setIndustries(data);
    } catch (error: any) {}
  }
  async function getCityData() {
    try {
      const { data } = await getCities();
      setCities(data);
    } catch (error: any) {}
  }

  async function getCountryData() {
    try {
      const { data } = await getCountries();
      setCountries(data);
    } catch (error: any) {}
  }

  useEffect(() => {
    getIndustryData();
    getCityData();
    getCountryData();
  }, []);

  return (
    <ShadowContainer>
      <div>
        <div className="client-details-select-group">
          <div className="client-details-select">
            <select
              name="industry"
              onBlur={formik.handleBlur}
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                formik.setFieldValue("industry", Number(event.target.value));
              }}
              value={Number(formik.values.industry)}
            >
              <option value={0}>Select Industry</option>
              {industries.map((industry, index) => {
                return (
                  <option key={index} value={Number(industry.id)}>
                    {industry.name}
                  </option>
                );
              })}
            </select>
            {formik.touched.industry && formik.errors.industry ? (
              <div className="error">{formik.errors.industry}</div>
            ) : null}
          </div>
          <div className="client-details-select">
            <select
              name="city"
              onBlur={formik.handleBlur}
              // onChange={formik.handleChange}
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                formik.setFieldValue("city", Number(event.target.value));
              }}
              value={Number(formik.values.city)}
            >
              <option value={0}>Select City</option>
              {cities.map((city, index) => {
                return (
                  <option key={index} value={Number(city.id)}>
                    {city.name}
                  </option>
                );
              })}
            </select>
            {formik.touched.city && formik.errors.city ? (
              <div className="error">{formik.errors.city}</div>
            ) : null}
          </div>
          <div className="client-details-select">
            <select
              name="country"
              onBlur={formik.handleBlur}
              // onChange={formik.handleChange}
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                formik.setFieldValue("country", Number(event.target.value));
              }}
              value={Number(formik.values.country)}
            >
              <option value={0}>Select Country</option>
              {countries.map((country, index) => {
                return (
                  <option key={index} value={Number(country.id)}>
                    {country.name}
                  </option>
                );
              })}
            </select>
            {formik.touched.country && formik.errors.country ? (
              <div className="error">{formik.errors.country}</div>
            ) : null}
          </div>
        </div>
        <div>
          <p>Tags</p>
          <div>
            <Tags formik={formik} name="tags" />
            {formik.touched.tags && formik.errors.tags ? (
              <div className="error">{formik.errors.tags}</div>
            ) : null}
          </div>
        </div>
        <div className="description-container">
          <div>
            <FloatingInput
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.short_description}
              name="short_description"
              placeholder={"Short Description"}
            />
            <ErrorMessage
              component="div"
              className="error"
              name={"short_description"}
            />
          </div>
          <div>
            <FloatingInput
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type={"number"}
              value={formik.values.number_employees}
              name="number_employees"
              placeholder={"Number of Employees"}
            />
            <ErrorMessage
              component="div"
              className="error"
              name={"number_employees"}
            />
          </div>
          <div>
            <FloatingInput
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.contact_name}
              name="contact_name"
              placeholder={"Contact Name"}
            />
            <ErrorMessage
              component="div"
              className="error"
              name={"contact_name"}
            />
          </div>
          <div>
            <FloatingInput
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.contact_email}
              name="contact_email"
              placeholder={"Contact Email"}
            />
            <ErrorMessage
              component="div"
              className="error"
              name={"contact_email"}
            />
          </div>
          <div>
            <FloatingInput
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.contact_phone}
              name="contact_phone"
              placeholder={"Contact Phone"}
            />
            <ErrorMessage
              component="div"
              className="error"
              name={"contact_phone"}
            />
          </div>
        </div>

        {/* <AddAboutYouPopUp /> */}
      </div>
    </ShadowContainer>
  );
}

export default Details;

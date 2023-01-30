import FloatingInput from "../../../../components/atoms/FloatingInput/FloatingInput";
import { Button } from "antd";
import React, { ChangeEvent, useState, Dispatch, SetStateAction } from "react";
import "./index.less";
import ShadowContainer from "../../../../components/organisms/ShadowContainer/ShadowContainer";
import Tab from "../../../../components/atoms/Tab/Tab";
import { TabPaneProps } from "../../../../types/tabs/tab-item.type";
import Details from "./Details";
import Content from "./Content";
import Settings from "./Settings";
import { Formik, FormikProps } from "formik";
import { initialValuesType } from "../types";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createGrowCourse } from "../../../../services/request";
import * as Yup from "yup";

const createTabItems = (
	formik: FormikProps<initialValuesType>
): Array<TabPaneProps> => {
	return [
		{
			label: "DETAILS",
			key: "1",
			children: <Details formik={formik} />,
		},
		{
			label: "CONTENT",
			key: "2",
			children: <Content formik={formik} />,
		},
		{
			label: "SETTINGS",
			key: "3",
			children: <Settings formik={formik} />,
		},
	];
};

const validationSchema = Yup.object().shape({
	internal_title: Yup.string().required("client name is required"),
	industry: Yup.number()
		.min(0, "industry is required")
		.required("industry is required"),
	city: Yup.number().min(0, "city is required").required("city is required"),
	public_title: Yup.string().required("Public Title is required"),
	short_description: Yup.string().required(
		"Short description Title is required"
	),
	benefit_1: Yup.string().required("Benefit 1 is required"),
	benefit_2: Yup.string().required("Benefit 2 is required"),
	benefit_3: Yup.string().required("Benefit 3 is required"),
	long_description: Yup.string().required("Long Description is required"),
	thumbnail_image: Yup.string().required("required"),
	cover_image: Yup.string().required("required"),
	settings: Yup.object().shape({
		state: Yup.boolean().required("State is required"),
	}),
	content: Yup.array(),
	add_to_daily_fuel_queue: Yup.number().min(1, "required").required("required"),
	tags: Yup.array().of(Yup.string()).required("Provide at least one tag"),
});

export default function () {
	const navigate = useNavigate();
	return (
		<>
			<Formik
				onSubmit={async (values) => {
					try {
						await createGrowCourse(values);
						toast(`✅ Course created  successfully!`);
						navigate("/content-library");
						return;
					} catch (err: any) {
						if (err.response) {
							toast("❌ Server issues, try again");
							return;
						}
						toast("❌  Unable to reach server check internet");
					}
				}}
				initialValues={initialValues}
				validationSchema={validationSchema}>
				{(formik) => {
					return (
						<>
							<div className='title-input-group'>
								<div className='title-input-container'>
									<div className='title-input'>
										<FloatingInput
											placeholder={"Internal Title *"}
											value={formik.values.internal_title}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											name='internal_title'
										/>
									</div>
									<div>
										<select className='group-swap-select'>
											<option>Goal *</option>
										</select>
									</div>
								</div>

								<div>
									<Button htmlType='submit' className='title-btn' shape='round'>
										publish
									</Button>
								</div>
							</div>
							<div className='tab-container'>
								<Tab items={createTabItems(formik)} />
							</div>
						</>
					);
				}}
			</Formik>
		</>
	);
}

const initialValues: initialValuesType = {
	group: 1,
	category: 1,
	internal_title: "",
	published: true,
	tags: [],
	public_title: "",
	short_description: "",
	benefit_1: "",
	benefit_2: "",
	benefit_3: "",
	long_description: "",
	cover_image: "",
	thumbnail_image: "",
	add_to_daily_fuel_queue: 2,
	content: [],
	settings: [
		{
			state: true,
		},
	],
};

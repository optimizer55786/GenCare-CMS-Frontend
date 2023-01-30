import React, { useRef, useState } from "react";
import "../../component/affirmation-modal.less";
import { Formik, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { createCareCategory } from "../../../../services/request";
import FloatingInput from "../../../../components/atoms/FloatingInput/FloatingInput";
import FileUpload from "../../../../components/atoms/FileUpload/FileUpload";
import Tags from "../../../../components/Tags/Tags";
import Editor from "../../../../components/organisms/Editor/index";
import { ModalContentProps } from "../../component/modal-content.types";

export function AddMixed({
	setContentType,
	contentType,
	categoryId,
	contentTypeID,
	closeModal,
}: ModalContentProps) {
	const YesRef = useRef<HTMLInputElement>(null);
	const DontAddRef = useRef<HTMLInputElement>(null);
	const NoRef = useRef<HTMLInputElement>(null);
	const CloseRef = useRef<HTMLDivElement>(null);

	function swapContentType(e: any) {
		setContentType(e.target.value);
	}

	const navigate = useNavigate();
	const validationSchema = Yup.object().shape({
		internal_title: Yup.string().required("required"),
		public_title: Yup.string().required("required"),
		thumbnail_image: Yup.string().required("required"),
		cover_image: Yup.string().required("required"),
		content: Yup.string().required("required"),
		tags: Yup.array().of(Yup.string()).required("tags required"),
		add_to_daily_fuel_queue: Yup.number()
			.min(1, "required")
			.required("required"),
	});

	const initialValues = {
		group: 1,
		category: categoryId,
		content_type: contentTypeID,
		internal_title: "",
		public_title: "",
		alternative_text: null,
		content: "",
		tags: [],
		thumbnail_image: "",
		cover_image: "",
		add_to_daily_fuel_queue: 1,
	};

	return (
		<>
			{contentType === "3" ? (
				<Formik
					onSubmit={async (values) => {
						console.log(values);
						try {
							await createCareCategory(values);
							if (CloseRef.current !== null) {
								CloseRef.current.click();
							}
							toast(
								`✅  Mixed Content ${values.internal_title} created successfully`
							);
							closeModal();
						} catch (err: any) {
							console.log(err.response);
							if (err.response) {
								toast(` ❌ Server error, try again!`);
								return;
							}
							console.log(err);
							return toast(
								` ❌ Error creating content, check internet & try again!`
							);
						}
					}}
					initialValues={initialValues}
					validationSchema={validationSchema}>
					{(formik) => {
						return (
							<form onSubmit={formik.handleSubmit}>
								<div className='add-action-container'>
									<div>
										<select
											onChange={swapContentType}
											className='group-swap-select'>
											<option disabled>Content Type *</option>
											<option value='1'>Video</option>
											<option value='2'>Audio</option>
											<option selected value='3'>
												Mixed
											</option>
											<option value='4'>SlideShow</option>
										</select>
									</div>

									<div className='breathwork-modal-input'>
										<FloatingInput
											placeholder='Internal Title *'
											value={formik.values.internal_title}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											name='internal_title'
										/>
										<ErrorMessage
											component='div'
											className='error'
											name='internal_title'
										/>
									</div>

									<div className='breathwork-modal-input'>
										<FloatingInput
											placeholder='Public Title *'
											value={formik.values.public_title}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											name='public_title'
										/>
										<ErrorMessage
											component='div'
											className='error'
											name='public_title'
										/>
									</div>

									<div>
										Content
										<Editor
											placeholder={"content"}
											value={formik.values.content}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											name='content'
										/>
									</div>

									<div>
										<p>Tags</p>
										<div>
											<Tags formik={formik} name='tags' />
											<ErrorMessage
												component='div'
												className='error'
												name='tags'
											/>
										</div>
									</div>
									<div className='flex'>
										<div>
											<p>Cover Image</p>
											<FileUpload
												setFieldValue={formik.setFieldValue}
												name={"cover_image"}
											/>
											<ErrorMessage
												component='div'
												className='error'
												name={"cover_image"}
											/>
										</div>
										<div>
											<p>Thumbnail Image</p>
											<FileUpload
												setFieldValue={formik.setFieldValue}
												name={"thumbnail_image"}
											/>
											<ErrorMessage
												component='div'
												className='error'
												name={"thumbnail_image"}
											/>
										</div>
									</div>

									<div className='question-radio-title text-18 text-mulish-bold '>
										Active in Daily Queue? *
									</div>
									<div className='radio-group'>
										<div className='single-radio-group'>
											<input
												ref={YesRef}
												type='radio'
												value={1}
												name='active_in_daily_queue'
												checked={
													Number(formik.values.add_to_daily_fuel_queue) === 1
												}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
											/>
											<label
												onClick={() => {
													if (YesRef.current !== null) YesRef.current.click();
												}}
												className='cursor-pointer'>
												Yes
											</label>
										</div>

										<div className='single-radio-group'>
											<input
												type='radio'
												value={2}
												name='active_in_daily_queue'
												checked={
													Number(formik.values.add_to_daily_fuel_queue) === 2
												}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												ref={NoRef}
											/>
											<label
												onClick={() => {
													if (NoRef.current !== null) NoRef.current.click();
												}}
												className='cursor-pointer'>
												No
											</label>
										</div>

										<div className='single-radio-group'>
											<input
												type='radio'
												ref={DontAddRef}
												value={3}
												name='active_in_daily_queue'
												checked={
													Number(formik.values.add_to_daily_fuel_queue) === 3
												}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
											/>
											<label
												onClick={() => {
													if (DontAddRef.current !== null)
														DontAddRef.current.click();
												}}
												className='cursor-pointer'>
												Don’t Add to Daily Queue
											</label>
										</div>
									</div>
									<button type='submit' className='submit-details-btn'>
										save
									</button>
								</div>
							</form>
						);
					}}
				</Formik>
			) : null}
		</>
	);
}

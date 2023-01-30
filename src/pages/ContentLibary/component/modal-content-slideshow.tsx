import React, { useRef, useState } from "react";
import "./affirmation-modal.less";
import icon from "../../../assets/icons/content-group-care.svg";
import { ActionModalProps } from "./action-modal.types";
import { Formik, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { createCareSlideShow } from "../../../services/request";
import FloatingInput from "../../../components/atoms/FloatingInput/FloatingInput";
import FileUpload from "../../../components/atoms/FileUpload/FileUpload";
import Tags from "./../../../components/Tags/Tags";
import ico from "../../../assets/icons/drag-n-drop.svg";
import Editor from "./../../../components/organisms/Editor/index";
import { ModalContentProps } from "./modal-content.types";

export function AddSlideShow({
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
		images: Yup.array().of(Yup.object()).required("Images required"),
		// required_to_complete: Yup.boolean().required("required"),
		tags: Yup.array().of(Yup.string()).required("tags required"),
		add_to_daily_fuel_queue: Yup.number()
			.min(1, "required")
			.required("required"),
	});

	const initialValues = {
		group: 2,
		category: categoryId,
		content_type: contentTypeID,
		internal_title: "",
		public_title: "",
		content: "",
		images: [{ order: 1, name: "", url: "" }],
		tags: [],
		thumbnail_image: "",
		cover_image: "",
		// required_to_complete: true,
		add_to_daily_fuel_queue: 1,
	};

	return (
		<>
			{contentType === "4" ? (
				<Formik
					onSubmit={async (values) => {
						try {
							await createCareSlideShow(values);
							if (CloseRef.current !== null) {
								CloseRef.current.click();
							}
							toast(
								`✅  SlideShow ${values.internal_title} created successfully`
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
						const addImage = (event: React.MouseEvent<HTMLDivElement>) => {
							console.log("clicked");
							let imagesCopy = formik.values.images.slice();
							imagesCopy.push({
								order: imagesCopy.length + 1,
								name: "",
								url: "",
							});
							formik.setFieldValue("images", imagesCopy);
							console.log(imagesCopy);
						};
						return (
							<form onSubmit={formik.handleSubmit}>
								<div>
									<select
										onChange={swapContentType}
										className='group-swap-select'>
										<option disabled>Content Type *</option>
										<option value='1'>Video</option>
										<option value='2'>Audio</option>
										<option value='3'>Mixed</option>
										<option selected value='4'>
											SlideShow
										</option>
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
									<div>
										Content
										<Editor
											placeholder={"content"}
											// value={formik.values.content}
											value={formik.values.content}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											name='content'
										/>
									</div>
								</div>
								<div className='slideshow-group-container'>
									{formik.values.images.map((image, index) => {
										return (
											<div key={index} className='slideshow-main-container'>
												<div className='slideshow-drag-ico'>
													<img src={ico} />
												</div>
												<div className='slideshow-main-content'>
													<div>
														<p className='text-18 text-mulish-bold'>
															Image {image.order}
														</p>
														<FileUpload
															size='small'
															name={`${image.url}`}
															setFieldValue={formik.setFieldValue}
														/>
														<ErrorMessage
															component='div'
															className='error'
															name={"images"}
														/>
													</div>
												</div>
											</div>
										);
									})}
								</div>
								<div
									onClick={addImage}
									className='add-slide text-primary text-16 text-mulish-bold'>
									+ add image
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
											checked={
												Number(formik.values.add_to_daily_fuel_queue) === 1
											}
											name='add_to_daily_fuel_queue'
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
											ref={NoRef}
											value={2}
											checked={
												Number(formik.values.add_to_daily_fuel_queue) === 2
											}
											name='add_to_daily_fuel_queue'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
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
											value={3}
											checked={
												Number(formik.values.add_to_daily_fuel_queue) === 3
											}
											name='add_to_daily_fuel_queue'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											ref={DontAddRef}
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
								<ErrorMessage
									component='div'
									className='error'
									name='add_to_daily_fuel_queue'
								/>
								<button type='submit' className='submit-details-btn'>
									save
								</button>
							</form>
						);
					}}
				</Formik>
			) : null}
		</>
	);
}

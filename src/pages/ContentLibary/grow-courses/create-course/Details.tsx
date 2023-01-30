import React, { useRef } from "react";
import { FormikProps, ErrorMessage } from "formik";
import FileUpload from "../../../../components/atoms/FileUpload/FileUpload";
import FloatingInput from "../../../../components/atoms/FloatingInput/FloatingInput";
import ShadowContainer from "../../../../components/organisms/ShadowContainer/ShadowContainer";
import Tags from "../../../../components/Tags/Tags";
import "./Details.less";
import { initialValuesType } from "../types";

type DetailsProps = {
	formik: FormikProps<initialValuesType>;
};

function Details({ formik }: DetailsProps) {
	const YesRef = useRef<HTMLInputElement>(null);
	const DontAddRef = useRef<HTMLInputElement>(null);
	const NoRef = useRef<HTMLInputElement>(null);
	return (
		<ShadowContainer>
			<>
				<div className='grow-tag-container'>
					<p>Tags</p>
					<div>
						<Tags formik={formik} name={"tags"} />
					</div>
					<ErrorMessage component='div' className='error' name={"tags"} />
				</div>
				<div className='grow-course-input'>
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
						name={"public_title"}
					/>
				</div>
				<div className='grow-course-input'>
					<FloatingInput
						placeholder='Short Description *'
						value={formik.values.short_description}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						name='short_description'
					/>
					<ErrorMessage
						component='div'
						className='error'
						name={"short_description"}
					/>
				</div>
				<div className='grow-course-input'>
					<FloatingInput
						placeholder={"Benefit #1 *"}
						value={formik.values.benefit_1}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						name='benefit_1'
					/>
					<ErrorMessage component='div' className='error' name={"benefit_1"} />
				</div>
				<div className='grow-course-input'>
					<FloatingInput
						placeholder={"Benefit #2 *"}
						value={formik.values.benefit_2}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						name='benefit_2'
					/>
					<ErrorMessage component='div' className='error' name={"benefit_2"} />
				</div>
				<div className='grow-course-input'>
					<FloatingInput
						placeholder={"Benefit #3 *"}
						value={formik.values.benefit_3}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						name='benefit_3'
					/>
					<ErrorMessage component='div' className='error' name={"benefit_3"} />
				</div>
				<div>
					<p>Long Description</p>
					<FloatingInput
						placeholder='Long Description *'
						value={formik.values.long_description}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						name='long_description'
					/>
					<ErrorMessage
						component='div'
						className='error'
						name={"long_description"}
					/>
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
						<p>Thumbnail *</p>
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
							checked={Number(formik.values.add_to_daily_fuel_queue) === 1}
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
							checked={Number(formik.values.add_to_daily_fuel_queue) === 2}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							name='active_in_daily_queue'
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
							value={3}
							name='active_in_daily_queue'
							ref={DontAddRef}
							checked={Number(formik.values.add_to_daily_fuel_queue) === 3}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
						<label
							onClick={() => {
								if (DontAddRef.current !== null) DontAddRef.current.click();
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
				<button className='submit-details-btn'>save</button>
			</>
		</ShadowContainer>
	);
}

export default Details;

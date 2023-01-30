import { Button } from "antd";
import { FormikProps } from "formik";
import ShadowContainer from "../../../../components/organisms/ShadowContainer/ShadowContainer";
import { initialValuesType } from "../types";
import "./Settings.less";

type SettingsProps = {
	formik: FormikProps<initialValuesType>;
};
function Settings({ formik }: SettingsProps) {
	return (
		<ShadowContainer>
			<div className='checkbox-main-container'>
				<div className='grow-course-settings-checkbox checkbox-container'>
					<input
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						name='state'
						type='checkbox'
						value={"true"}
					/>
					<div className='cursor-pointer text-16 text-mulish-medium'>
						Users can see all upcoming content in all tab
					</div>
				</div>
				<div className='grow-course-settings-checkbox checkbox-container'>
					<input
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						name='state'
						type='checkbox'
						value={"true"}
					/>
					<div className='cursor-pointer text-16 text-mulish-medium'>
						Users can’t take action on it until the actual day
					</div>
				</div>{" "}
				<div className='grow-course-settings-checkbox checkbox-container'>
					<input
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						name='state'
						type='checkbox'
						value={"true"}
					/>
					<div className='cursor-pointer text-16 text-mulish-medium'>
						Users must do all steps in order
					</div>
				</div>{" "}
				<div className='grow-course-settings-checkbox checkbox-container'>
					<input
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						name='state'
						type='checkbox'
						value={"true"}
					/>
					<div className='cursor-pointer text-16 text-mulish-medium'>
						Don’t display results and actions
					</div>
				</div>
				<div className='grow-course-settings-checkbox checkbox-container'>
					<input
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						name='state'
						type='checkbox'
						value={"true"}
					/>
					<div className='cursor-pointer text-16 text-mulish-medium'>
						Don’t offer end of journey assessment
					</div>
				</div>
				<Button
					className='grow-course-settings-checkbox-btn'
					shape='round'
					type='primary'>
					save
				</Button>
			</div>
		</ShadowContainer>
	);
}

export default Settings;

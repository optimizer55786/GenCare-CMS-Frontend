import React, { SetStateAction, Dispatch, useRef } from "react";
import icon from "../../../../assets/icons/content-group-care.svg";
import ShadowContainer from "../../../../components/organisms/ShadowContainer/ShadowContainer";
import { Formik, FormikProps } from "formik";
import { toast } from "react-toastify";
import { ReusableFullDragable } from "../../../../components/atoms/Dragable/Dragable";
import Tags from "../../../../components/Tags/Tags";
import FloatingInput from "../../../../components/atoms/FloatingInput/FloatingInput";
import { useNavigate } from "react-router-dom";
import { createQuizOrQuestion } from "../../../../services/request";

function index({ CardId, currentModalId, closeModal }: QuizOrQuestionProps) {
	const navigate = useNavigate();
	const initialValues: initialQuizOrQuestionType = {
		id: 1,
		questions: [
			{
				order: 1,
				data: {
					question: "",
					short_description: "",
					active_in_daily_queue: "",
					type_of_answer: "",
					answerd: [],
					display_answer_as: "",
					select_style: "",
					display_correct_answer: "",
				},
			},
		],
		quiz_name: "Stress Quizz",
		group: 4,
		category: 1,
		display_survey_results_after_completion: 1,
		tags: ["Happiness", "Motivation"],
		group_name: "Other",
		category_name: "Course",
	};

	return (
		<>
			{currentModalId === CardId ? (
				<Formik
					onSubmit={async (values) => {
						try {
							await createQuizOrQuestion(values);
							toast(`✅ quiz or question created successfully!`);
							closeModal();
						} catch (err: any) {
							if (err.response) {
								console.log("err", err);
								toast("❌ Server error");
								return;
							}
							toast("❌ Unable to submit check internet");
						}
					}}
					initialValues={initialValues}>
					{(formik) => {
						const addQuestion = (event: React.MouseEvent<HTMLDivElement>) => {
							let questionsCopy = formik.values.questions.slice();
							questionsCopy.push({
								order: questionsCopy.length + 1,
								data: {
									question: "",
									short_description: "",
									active_in_daily_queue: "",
									type_of_answer: "",
									answerd: [],
									display_answer_as: "",
									select_style: "",
									display_correct_answer: "",
								},
							});
							formik.setFieldValue("questions", questionsCopy);
						};
						const addOption = (index: number, type_of_answer: string) => {
							let questionsCopy = formik.values.questions.slice();
							questionsCopy[index].data.answerd.push({
								type_of_answer_name: type_of_answer,
								answer_text: "",
								answer_icon: " ",
								answer_score: 0.0,
								answer_correct: false,
								answer_editable: true,
								answer_erasable: true,
								answer_addnew: true,
								answer_display_editing_controls: false,
								answer_minimum_characters_to_achieve_the_score: null,
							});
							formik.setFieldValue("questions", questionsCopy);
						};
						const removeOption = (
							questionIndex: number,
							optionIndex: number
						) => {
							let questionsCopy =
								formik.values.questions[questionIndex].data.answerd.slice();
							questionsCopy.splice(optionIndex, 1);
							formik.setFieldValue(
								`questions[${questionIndex}].data.answerd`,
								questionsCopy
							);
						};

						const YesRef = useRef<HTMLInputElement>(null);
						const NoRef = useRef<HTMLInputElement>(null);
						return (
							<form onSubmit={formik.handleSubmit}>
								<div className='add-action-container'>
									<div className='add-modal-title-container'>
										<div className='add-modal-title'>
											<div className='add-modal-title-text'>
												Add Quiz or Question to Content Library
											</div>
											<span className='title-icon'>
												<img src={icon} />
												Care
											</span>
										</div>
										<span onClick={closeModal}>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												width='14'
												height='14'
												viewBox='0 0 14 14'>
												<path
													id='close'
													d='M12.3,13.707,7,8.412l-5.3,5.3A1,1,0,1,1,.292,12.3L5.588,7,.292,1.7A1,1,0,0,1,1.7.292L7,5.588l5.3-5.3A1,1,0,0,1,13.708,1.7L8.412,7l5.3,5.3A1,1,0,1,1,12.3,13.707Z'
													fill='#888'
												/>
											</svg>
										</span>
									</div>
									<QuizOrQuestion
										addQuestion={addQuestion}
										formik={formik}
										addOption={addOption}
										removeOption={removeOption}
									/>
									<div>
										<FloatingInput
											placeholder={"Quiz name"}
											name='quiz_name'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.quiz_name}
										/>
									</div>
									<div className='question-radio-group'>
										<div className='question-radio-title text-18 text-mulish-bold '>
											Display Results After Completion *
										</div>
										<div className='radio-group'>
											<div className='single-radio-group'>
												<input
													ref={YesRef}
													type='radio'
													value={1}
													checked={
														Number(
															formik.values
																.display_survey_results_after_completion
														) === 1
													}
													name={`display_survey_results_after_completion`}
													onChange={formik.handleChange}
												/>
												<label
													onClick={() => {
														if (YesRef.current !== null) {
															YesRef.current.click();
														}
													}}
													className='cursor-pointer'>
													Yes
												</label>
											</div>

											<div className='single-radio-group'>
												<input
													type='radio'
													value={2}
													checked={
														Number(
															formik.values
																.display_survey_results_after_completion
														) === 2
													}
													name={`display_survey_results_after_completion`}
													onChange={formik.handleChange}
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
										</div>
									</div>
									<Tags formik={formik} name='tags' />
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

function QuizOrQuestion({
	formik,
	addQuestion,
	addOption,
	removeOption,
}: QuizOrQuestionChildProps) {
	return (
		<div>
			{/* <ShadowContainer> */}
			<>
				{formik.values.questions.map((question, index: number) => {
					return (
						<ReusableFullDragable
							key={index}
							index={index}
							question={question}
							formik={formik}
							addOption={addOption}
							removeOption={removeOption}
						/>
					);
				})}

				<div
					onClick={addQuestion}
					className='add-question-container text-primary text-mulish-bold'>
					+ add question
				</div>
			</>
			{/* </ShadowContainer> */}
		</div>
	);
}

type QuizOrQuestionProps = {
	CardId: string;
	currentModalId: string;
	closeModal: any;
	formik?: FormikProps<initialQuizOrQuestionType>;
	setCurrentModalId: Dispatch<SetStateAction<string>>;
};

type QuizOrQuestionChildProps = {
	addQuestion: (event: React.MouseEvent<HTMLDivElement>) => void;
	formik: FormikProps<initialQuizOrQuestionType>;
	addOption: (index: number, text: string) => void;
	removeOption: (questionIndex: number, optionIndex: number) => void;
};

type Answer = {
	type_of_answer_name: string;
	answer_text: string;
	answer_editable: boolean;
	answer_erasable: boolean;
	answer_addnew: boolean;
	answer_score: number;
	answer_correct: boolean;
	answer_icon: string;
	answer_minimum_characters_to_achieve_the_score?: number | null;
	answer_display_editing_controls: boolean;
};

type Data = {
	question: string;
	short_description: string;
	active_in_daily_queue: string;
	type_of_answer: string;
	answerd: Answer[];
	display_answer_as: string;
	select_style: string;
	display_correct_answer: string;
};

export type QuestionType = {
	order: number;
	data: Data;
};

type initialQuizOrQuestionType = {
	id: number;
	questions: QuestionType[];
	quiz_name: string;
	group: number;
	category: number;
	display_survey_results_after_completion: number;
	tags: string[];
	group_name: string;
	category_name: string;
};

export default index;

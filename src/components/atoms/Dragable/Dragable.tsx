import React, {
	useState,
	useEffect,
	ChangeEvent,
	useRef,
	Dispatch,
	SetStateAction,
} from "react";
import "./Dragable.less";
import ico from "../../../assets/icons/drag-n-drop.svg";
import trashIco from "../../../assets/icons/section-delete.svg";
import uploadIco from "../../../assets/icons/upload.svg";
import FloatingInput from "../FloatingInput/FloatingInput";
import { Button } from "antd";
import { FormikProps } from "formik";
import {
	getQuestionCategoryAndTypeofAnswer,
	getTypeOfAnswerOptions,
} from "../../../services/request";
import {
	SingleSelectCompoundComponent,
	MultiSelectCompoundComponent,
	TextCompoundComponent,
} from "./compounds";
import { QuestionType as ReusableQuestionType } from "../../../pages/ContentLibary/modal-contents/quiz-or-question";
import { MiniFileUpload } from "../FileUpload/FileUpload";

export function CollapsedDragable({
	questionNumber,
	handleOpen,
	question,
	typeofAnswer = "Short Text",
	answerCount = 1,
}: CollapsedDraggableProps) {
	return (
		<div className='colapsed dragable-container'>
			<div onClick={handleOpen} className='drag-ico'>
				<img src={ico} />
			</div>
			<div className='dragable-content'>
				<p className='text-mulish-bold text-16'>Question {questionNumber}</p>
				<p className='text-mulish-bold text-16'>{question}</p>

				<div className='question-type-group'>
					<p className='text-16 text-mulish-medium'>{typeofAnswer}</p>.
					<p className='text-16 text-mulish-medium'>{answerCount} answers</p>
				</div>
				<div className='question-type-group'>
					<p
						onClick={handleOpen}
						className='text-primary text-mulish-bold text-16 cursor-pointer'>
						edit
					</p>
					<p className='text-primary text-mulish-bold text-16'>delete</p>
				</div>
			</div>
		</div>
	);
}

export function FullDragable({
	handleQuestionChange,
	values,
	setDraggableQuestionsArray,
	questionIndex,
}: FullDraggableProps) {
	const questionNumber = questionIndex + 1;
	const [open, setOpen] = useState<Boolean>(false);
	const handleOpen = () => setOpen(!open);
	const [draggableOptionsArray, setDraggableOptionsArray] = useState<
		DraggableOptionType[]
	>([]);
	const [questionCategoryAndAnswerTypes, setQuestionCategoryAndAnswerTypes] =
		useState<QuestionCategoryAndAnswerTypes>({});

	useEffect(() => {
		getQuestionCategory();
	}, []);

	async function getQuestionCategory() {
		let response = await getQuestionCategoryAndTypeofAnswer();
		setQuestionCategoryAndAnswerTypes(response.data);
	}

	const addOption = (type_of_answer: string) => {
		setDraggableQuestionsArray((prev: any) => {
			const newArr = prev.slice();
			newArr[questionIndex]["answerd"] = [
				...newArr[questionIndex]["answerd"],
				{
					type_of_answer_name: type_of_answer,
					answer_text: "",
					answer_icon: " ",
					answer_score: 0.0,
					answer_correct: true,
					answer_editable: true,
					answer_erasable: true,
					answer_addnew: true,
					answer_minimum_characters_to_achieve_the_score: null,
				},
			];
			return newArr;
		});
	};

	const removeOption = (optionIndex: number) => {
		setDraggableQuestionsArray((prev: any) => {
			const newArr = prev.slice();
			newArr[questionIndex]["answerd"] = [
				...newArr[questionIndex]["answerd"],
			].filter((data, index) => index !== optionIndex);
			return newArr;
		});
	};

	const handleOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		const index = Number(e.target.id);
		setDraggableQuestionsArray((prev: any) => {
			const newArr = prev.slice();
			newArr[questionIndex]["answerd"][index][e.target.name] = e.target.value;
			return newArr;
		});
	};

	const handleTypeOfAnswerOptions = async (
		e: ChangeEvent<HTMLSelectElement>
	) => {
		e.preventDefault();
		let response = await getTypeOfAnswerOptions(e.target.value);
		setDraggableOptionsArray(response.data);
		setDraggableQuestionsArray((prev: any) => {
			const newArr = prev.slice();
			newArr[questionIndex]["answerd"] = response.data;
			return newArr;
		});
	};

	//Refs for radio buttons to be clicked from their labels
	const textAndEmojiRef = useRef<HTMLInputElement>(null);
	const EmojiRef = useRef<HTMLInputElement>(null);
	const TextOnlyRef = useRef<HTMLInputElement>(null);
	const RadioButtonsRef = useRef<HTMLInputElement>(null);
	const ButtonsRef = useRef<HTMLInputElement>(null);
	return (
		<div>
			{open ? (
				<div className='full-dragable dragable-container'>
					<div onClick={handleOpen} className='drag-ico'>
						<img src={ico} />
					</div>
					<div className='dragable-content'>
						<p className='text-mulish-bold text-16'>
							Question {questionNumber}
						</p>
						<div className='question-floating-input'>
							<FloatingInput
								id={questionIndex.toString()}
								value={values.question}
								name='question'
								placeholder={"Question"}
								onChange={handleQuestionChange}
							/>
						</div>
						<div className='question-floating-input'>
							<FloatingInput
								id={questionIndex.toString()}
								name='short_description'
								placeholder={"Short Description"}
								value={values.short_description}
								onChange={handleQuestionChange}
							/>
						</div>
						<div className='question-floating-input'>
							<FloatingInput
								placeholder={"“Why do you ask?”"}
								id={questionIndex.toString()}
								name='why_do_you_ask'
								value={values.why_do_you_ask}
								onChange={handleQuestionChange}
							/>
						</div>

						<div className='question-select'>
							<div>
								<select
									value={values.category}
									name='category'
									onChange={handleQuestionChange}
									className='group-swap-select'
									id={questionIndex.toString()}>
									<option>Select Category</option>
									{questionCategoryAndAnswerTypes.question_category?.length
										? questionCategoryAndAnswerTypes.question_category.map(
												(question: QuestionType, index: number) => {
													return (
														<option key={index} value={question.name}>
															{question.name}
														</option>
													);
												}
										  )
										: null}
								</select>
							</div>
							<div>
								<select
									value={values.type_of_answer}
									name='type_of_answer'
									onChange={(event) => {
										handleQuestionChange(event);
										handleTypeOfAnswerOptions(event);
									}}
									id={questionIndex.toString()}
									className='group-swap-select'>
									<option>Select Type of Answer</option>

									{questionCategoryAndAnswerTypes.type_of_answer
										? questionCategoryAndAnswerTypes.type_of_answer.map(
												(type_of_answer: any, key: number) => {
													return (
														<option key={key} value={type_of_answer.name}>
															{type_of_answer.name}
														</option>
													);
												}
										  )
										: null}
								</select>
							</div>
						</div>

						<div className=''>
							{values?.answerd?.map((option, optionIndex) => {
								return (
									<MiniDragable
										option={option}
										handleOptionChange={handleOptionChange}
										key={optionIndex}
										index={optionIndex.toString()}
										removeOption={removeOption}
									/>
								);
							})}
						</div>
						{!values?.answerd?.length || values?.answerd[0]?.answer_addnew ? (
							<p
								onClick={() => addOption(values.type_of_answer)}
								className='text-16 text-mulish-bold text-primary add-option-container'>
								+ add answer option
							</p>
						) : null}

						<div>
							<div className='question-radio-group'>
								<div className='question-radio-title text-18 text-mulish-bold '>
									Display answer as
								</div>
								<div className='radio-group'>
									<div className='single-radio-group'>
										<input
											ref={textAndEmojiRef}
											type='radio'
											value={"Text and emoji"}
											checked={values.display_answer_as === "Text and emoji"}
											name='display_answer_as'
											onChange={handleQuestionChange}
											id={questionIndex.toString()}
										/>
										<label
											onClick={() => {
												if (textAndEmojiRef.current !== null) {
													textAndEmojiRef.current.click();
												}
											}}
											className='cursor-pointer'>
											Text and emoji
										</label>
									</div>

									<div className='single-radio-group'>
										<input
											type='radio'
											value={"Emoji only"}
											checked={values.display_answer_as === "Emoji only"}
											name='display_answer_as'
											onChange={handleQuestionChange}
											id={questionIndex.toString()}
											ref={EmojiRef}
										/>
										<label
											onClick={() => {
												if (EmojiRef.current !== null) EmojiRef.current.click();
											}}
											className='cursor-pointer'>
											Emoji only
										</label>
									</div>

									<div className='single-radio-group'>
										<input
											type='radio'
											value={"Text only"}
											name='display_answer_as'
											checked={values.display_answer_as === "Text only"}
											onChange={handleQuestionChange}
											id={questionIndex.toString()}
											ref={TextOnlyRef}
										/>
										<label
											onClick={() => {
												if (TextOnlyRef.current !== null)
													TextOnlyRef.current.click();
											}}
											className='cursor-pointer'>
											Text only
										</label>
									</div>
								</div>
							</div>
							<div className='question-radio-group'>
								<div className='question-radio-title text-18 text-mulish-bold '>
									Select Style
								</div>
								<div className='radio-group'>
									<div className='single-radio-group'>
										<input
											type='radio'
											value={"Radio Buttons"}
											name='select_style'
											checked={values.select_style === "Radio Buttons"}
											onChange={handleQuestionChange}
											id={questionIndex.toString()}
											ref={RadioButtonsRef}
										/>
										<label
											onClick={() => {
												if (null !== RadioButtonsRef.current) {
													RadioButtonsRef.current.click();
												}
											}}
											className='cursor-pointer'>
											Radio buttons
										</label>
									</div>

									<div className='single-radio-group'>
										<input
											type='radio'
											value={"Buttons"}
											name='select_style'
											checked={values.select_style === "Buttons"}
											onChange={handleQuestionChange}
											id={questionIndex.toString()}
											ref={ButtonsRef}
										/>
										<label
											onClick={() => {
												if (ButtonsRef.current !== null)
													ButtonsRef.current.click();
											}}
											className='cursor-pointer'>
											Buttons
										</label>
									</div>
								</div>
							</div>

							<div className='question-submit-btn'>
								<Button onClick={handleOpen} type='primary' shape='round'>
									save & close
								</Button>
							</div>
						</div>
					</div>
				</div>
			) : (
				<CollapsedDragable
					handleOpen={handleOpen}
					question={values.question}
					questionNumber={questionNumber}
					typeofAnswer={values.type_of_answer}
					answerCount={values.answerd?.length}
				/>
			)}
		</div>
	);
}

type ReusableFullDraggableProps = {
	index: number;
	formik: FormikProps<any>;
	question: ReusableQuestionType;
	addOption: (index: number, text: string) => void;
	removeOption: (questionIndex: number, optionIndex: number) => void;
};

export function ReusableFullDragable({
	question,
	formik,
	index,
	addOption,
	removeOption,
}: ReusableFullDraggableProps) {
	const questionNumber = question.order;
	const [open, setOpen] = useState<Boolean>(false);
	const handleOpen = () => setOpen(!open);
	const [questionCategoryAndAnswerTypes, setQuestionCategoryAndAnswerTypes] =
		useState<QuestionCategoryAndAnswerTypes>({});

	useEffect(() => {
		getQuestionCategory();
	}, []);

	async function getQuestionCategory() {
		let response = await getQuestionCategoryAndTypeofAnswer();
		setQuestionCategoryAndAnswerTypes(response.data);
	}

	const handleTypeOfAnswerOptions = async (
		e: ChangeEvent<HTMLSelectElement>
	) => {
		e.preventDefault();
		let response = await getTypeOfAnswerOptions(e.target.value);
		formik.setFieldValue(`questions[${index}].data.answerd`, response.data);
	};

	//Refs for radio buttons to be clicked from their labels
	const YesRef = useRef<HTMLInputElement>(null);
	const NoRef = useRef<HTMLInputElement>(null);
	const DontAddRef = useRef<HTMLInputElement>(null);

	return (
		<div>
			{open ? (
				<div className='full-dragable dragable-container'>
					<div onClick={handleOpen} className='drag-ico'>
						<img src={ico} />
					</div>
					<div className='dragable-content'>
						<p className='text-mulish-bold text-16'>
							Question {questionNumber}
						</p>
						<div className='question-floating-input'>
							<FloatingInput
								value={formik.values.questions[index].data.question}
								name={`questions[${index}].data.question`}
								placeholder={"Question *"}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
						</div>
						<div className='question-floating-input'>
							<FloatingInput
								name={`questions[${index}].data.short_description`}
								placeholder={"Short Description"}
								value={formik.values.questions[index].data.short_description}
								onChange={formik.handleChange}
							/>
						</div>
						<div className='question-radio-group'>
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
											Number(
												formik.values.questions[index].data
													.active_in_daily_queue
											) === 1
										}
										name={`questions[${index}].data.active_in_daily_queue`}
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
												formik.values.questions[index].data
													.active_in_daily_queue
											) === 2
										}
										name={`questions[${index}].data.active_in_daily_queue`}
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

								<div className='single-radio-group'>
									<input
										type='radio'
										value={3}
										checked={
											Number(
												formik.values.questions[index].data
													.active_in_daily_queue
											) === 3
										}
										name={`questions[${index}].data.active_in_daily_queue`}
										onChange={formik.handleChange}
										ref={DontAddRef}
									/>
									<label
										onClick={() => {
											if (DontAddRef.current !== null)
												DontAddRef.current.click();
										}}
										className='cursor-pointer'>
										Don't Add to Daily Queue
									</label>
								</div>
							</div>
						</div>

						<div className='question-select'>
							<div>
								<select
									value={formik.values.questions[index].data.type_of_answer}
									name={`questions[${index}].data.type_of_answer`}
									onChange={(event) => {
										formik.handleChange(event);
										handleTypeOfAnswerOptions(event);
									}}
									className='group-swap-select'>
									<option>Select Type of Answer</option>

									{questionCategoryAndAnswerTypes.type_of_answer
										? questionCategoryAndAnswerTypes.type_of_answer.map(
												(type_of_answer: any, key: number) => {
													return (
														<option key={key} value={type_of_answer.name}>
															{type_of_answer.name}
														</option>
													);
												}
										  )
										: null}
								</select>
							</div>
						</div>

						<div className=''>
							{formik.values?.questions[index].data.answerd?.map(
								(option: any, optionIndex: number) => {
									return (
										<SingleSelectMiniDragable
											option={option}
											questionIndex={index}
											handleOptionChange={formik.handleChange}
											key={optionIndex}
											formik={formik}
											index={optionIndex}
											removeOption={removeOption}
											typeofAnswer={
												formik.values.questions[index].data.type_of_answer
											}
										/>
									);
								}
							)}
						</div>
						{formik.values?.questions[index]?.data.answerd[0]?.answer_addnew ||
						formik.values?.questions[index]?.data.type_of_answer.includes(
							"Select"
						) ? (
							<p
								onClick={() =>
									addOption(
										index,
										formik.values.questions[index].data.type_of_answer
									)
								}
								className='text-16 text-mulish-bold text-primary add-option-container'>
								+ add answer option
							</p>
						) : null}

						<MultiSelectCompoundComponent
							answerType={formik.values.questions[index].data.type_of_answer}
							formik={formik}
							index={index}
						/>

						<SingleSelectCompoundComponent
							answerType={formik.values.questions[index].data.type_of_answer}
							formik={formik}
							index={index}
						/>

						<TextCompoundComponent
							answerType={formik.values.questions[index].data.type_of_answer}
							formik={formik}
							index={index}
						/>

						<div className='question-submit-btn'>
							<Button onClick={handleOpen} type='primary' shape='round'>
								save & close
							</Button>
						</div>
					</div>
				</div>
			) : (
				<CollapsedDragable
					handleOpen={handleOpen}
					question={formik.values.questions[index].data.question}
					questionNumber={questionNumber}
					typeofAnswer={formik.values.questions[index].data.type_of_answer}
					answerCount={formik.values.questions[index].data.answerd.length}
				/>
			)}
		</div>
	);
}

export function MiniDragable({
	option,
	handleOptionChange,
	index,
	removeOption,
}: MiniDraggableProps) {
	return (
		<div className='mini-dragable-group'>
			<div className='mini-dragable-container'>
				<div className='mini-drag-ico'>
					<img src={ico} />
				</div>
				<div className='mini-dragable-content-container'>
					<div className='mini-dragable-content'>
						<div className='answer-input'>
							<FloatingInput
								placeholder={"Answer"}
								name='answer_text'
								value={option.answer_text}
								onChange={handleOptionChange}
								id={index}
								disabled={option.answer_editable ? false : true}
							/>
						</div>
						<div className='score-input'>
							<FloatingInput
								placeholder={"Score"}
								name='answer_score'
								value={option.answer_score}
								onChange={handleOptionChange}
								id={index}
								disabled={option.answer_editable ? false : true}
							/>
						</div>
						<div className='mini-draable-upload'>
							<img src={uploadIco} alt='upload' /> icon
						</div>
					</div>
				</div>
			</div>

			<div onClick={() => removeOption(index)} className='trash-container'>
				<img src={trashIco} />
			</div>
		</div>
	);
}

export function SingleSelectMiniDragable({
	option,
	handleOptionChange,
	questionIndex,
	index,
	removeOption,
	formik,
	typeofAnswer,
}: SingleSelectDraggableProps) {
	const CorrectRef = useRef<HTMLInputElement>(null);
	if (typeofAnswer.includes("Text")) return null;
	return (
		<div className='mini-dragable-group'>
			<div className='mini-dragable-container'>
				<div className='mini-drag-ico'>
					<img src={ico} />
				</div>
				<div className='mini-dragable-content-container'>
					<div className='mini-dragable-content'>
						<div className='answer-input'>
							<FloatingInput
								placeholder={"Answer"}
								name={`questions[${questionIndex}].data.answerd[${index}].answer_text`}
								value={
									formik.values.questions[questionIndex].data.answerd[index]
										.answer_text
								}
								onChange={handleOptionChange}
								disabled={option.answer_editable ? false : true}
							/>
						</div>
						<div className='score-input'>
							<FloatingInput
								placeholder={"Score"}
								name={`questions[${questionIndex}].data.answerd[${index}].answer_score`}
								value={
									formik.values.questions[questionIndex].data.answerd[index]
										.answer_score
								}
								onChange={handleOptionChange}
								disabled={option.answer_editable ? false : true}
							/>
						</div>
						<div className='single-radio-group'>
							<input
								type={typeofAnswer === "Multi-Select" ? "checkbox" : "radio"}
								// value={true.toString()}
								checked={option.answer_correct}
								// name={`correct_answer`}
								name={`questions[${questionIndex}].data.answerd[${index}].answer_correct`}
								value={
									formik.values.questions[questionIndex].data.answerd[index]
										.answer_correct
								}
								onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
									if (typeofAnswer === "Multi-Select") {
										return formik.handleChange(event);
									}

									let answersCopy = formik.values.questions[
										questionIndex
									].data.answerd.map((answer: any, answerIndex: number) => {
										if (answerIndex === index) {
											answer.answer_correct = true;
										} else {
											answer.answer_correct = false;
										}
										return answer;
									});
									formik.setFieldValue(
										`questions[${questionIndex}].data.answerd[${index}].answer_correct`,
										answersCopy
									);
								}}
								ref={CorrectRef}
							/>
							<label
								onClick={() => {
									if (CorrectRef.current !== null) CorrectRef.current.click();
								}}
								className='cursor-pointer'>
								Correct
							</label>
						</div>
						{/* <div className="mini-draable-upload">
              <img src={uploadIco} alt="upload" /> icon
            </div> */}
						<MiniFileUpload
							size='xsmall'
							name={`questions[${questionIndex}].data.answerd[${index}].answer_icon`}
							setFieldValue={formik.setFieldValue}
						/>
					</div>
				</div>
			</div>
			{option.answer_erasable ? (
				<div
					onClick={() => removeOption(questionIndex, index)}
					className='trash-container'>
					<img src={trashIco} />
				</div>
			) : null}
		</div>
	);
}

type MiniDraggableProps = {
	option: Option;
	handleOptionChange?: any;
	index?: string;
	removeOption?: any;
	questionIndex?: number;
};
type SingleSelectDraggableProps = {
	option: Option;
	handleOptionChange?: any;
	index: number;
	removeOption?: any;
	questionIndex: number;
	formik: FormikProps<any>;
	typeofAnswer: string;
};

type Option = {
	id?: string;
	answer_text: string;
	answer_editable: boolean;
	answer_erasable?: boolean;
	answer_score?: number;
	answer_correct?: boolean;
	correct?: boolean;
	icon?: string;
	minimum_characters_to_achieve_the_score?: number;
	display_editing_controls?: number;
};

type QuestionCategoryAndAnswerTypes = {
	question_category?: QuestionType[];
	type_of_answer?: QuestionType[];
};

type QuestionType = {
	name: string;
};

export interface DraggableType {
	id?: number | string;
	question: string;
	short_description?: string;
	answerd?: Answer[];
	type_of_answer: string;
	category?: string;
	display_answer_as?: string;
	why_do_you_ask?: string;
	select_style?: string;
}

type Answer = {
	answer: string;
	score: number;
	correct: boolean;
	icon_url: string;
	answer_addnew: boolean;
	answer_text: string;
	answer_editable: boolean;
};

type CollapsedDraggableProps = {
	questionNumber?: number;
	handleOpen?: any;
	question?: string;
	typeofAnswer?: string;
	answerCount?: number;
};

interface DraggableOptionType {
	id: string | number;
	option: string;
	icon: string;
}

interface FullDraggableProps {
	handleQuestionChange: any;
	values: DraggableType;
	setDraggableQuestionsArray: Dispatch<SetStateAction<any>>;
	questionIndex: number;
}

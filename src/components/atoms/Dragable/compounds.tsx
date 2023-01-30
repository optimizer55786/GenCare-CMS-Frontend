import { FormikProps } from "formik";
import { useRef } from "react";
import { CheckerArray } from "./utils";
import "./compound.less";
import FloatingInput from "../FloatingInput/FloatingInput";
type SingleSelectCompoundComponentProps = {
	formik: FormikProps<any>;
	index: number;
	answerType: string;
};

export const SingleSelectCompoundComponent = ({
	formik,
	index,
	answerType,
}: SingleSelectCompoundComponentProps) => {
	const textAndEmojiRef = useRef<HTMLInputElement>(null);
	const EmojiRef = useRef<HTMLInputElement>(null);
	const TextOnlyRef = useRef<HTMLInputElement>(null);
	const RadioButtonsRef = useRef<HTMLInputElement>(null);
	const ButtonsRef = useRef<HTMLInputElement>(null);

	const CorrectYesRef = useRef<HTMLInputElement>(null);
	const CorrectNoRef = useRef<HTMLInputElement>(null);
	if (CheckerArray.includes(answerType)) return null;
	return (
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
							checked={
								formik.values.questions[index].data.display_answer_as ===
								"Text and emoji"
							}
							name={`questions[${index}].data.display_answer_as`}
							onChange={formik.handleChange}
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
							checked={
								formik.values.questions[index].data.display_answer_as ===
								"Emoji only"
							}
							name={`questions[${index}].data.display_answer_as`}
							onChange={formik.handleChange}
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
							checked={
								formik.values.questions[index].data.display_answer_as ===
								"Text only"
							}
							name={`questions[${index}].data.display_answer_as`}
							onChange={formik.handleChange}
							ref={TextOnlyRef}
						/>
						<label
							onClick={() => {
								if (TextOnlyRef.current !== null) TextOnlyRef.current.click();
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
							checked={
								formik.values.questions[index].data.select_style ===
								"Radio Buttons"
							}
							name={`questions[${index}].data.select_style`}
							onChange={formik.handleChange}
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
							checked={
								formik.values.questions[index].data.select_style === "Buttons"
							}
							name={`questions[${index}].data.select_style`}
							onChange={formik.handleChange}
							ref={ButtonsRef}
						/>
						<label
							onClick={() => {
								if (ButtonsRef.current !== null) ButtonsRef.current.click();
							}}
							className='cursor-pointer'>
							Buttons
						</label>
					</div>
				</div>
			</div>
			<div className='question-radio-group'>
				<div className='question-radio-title text-18 text-mulish-bold '>
					Display Correct Answer *
				</div>
				<div className='radio-group'>
					<div className='single-radio-group'>
						<input
							ref={CorrectYesRef}
							type='radio'
							value={"Yes"}
							checked={
								formik.values.questions[index].data.display_correct_answer ===
								"Yes"
							}
							name={`questions[${index}].data.display_correct_answer`}
							onChange={formik.handleChange}
						/>
						<label
							onClick={() => {
								if (null !== CorrectYesRef.current) {
									CorrectYesRef.current.click();
								}
							}}
							className='cursor-pointer'>
							Yes
						</label>
					</div>

					<div className='single-radio-group'>
						<input
							type='radio'
							value={"No"}
							checked={
								formik.values.questions[index].data.display_correct_answer ===
								"No"
							}
							name={`questions[${index}].data.display_correct_answer`}
							onChange={formik.handleChange}
							ref={CorrectNoRef}
						/>
						<label
							onClick={() => {
								if (CorrectNoRef.current !== null) CorrectNoRef.current.click();
							}}
							className='cursor-pointer'>
							No
						</label>
					</div>
				</div>
			</div>
		</div>
	);
};

export const MultiSelectCompoundComponent = ({
	formik,
	index,
	answerType,
}: SingleSelectCompoundComponentProps) => {
	const textAndEmojiRef = useRef<HTMLInputElement>(null);
	const EmojiRef = useRef<HTMLInputElement>(null);
	const TextOnlyRef = useRef<HTMLInputElement>(null);
	const RadioButtonsRef = useRef<HTMLInputElement>(null);
	const ButtonsRef = useRef<HTMLInputElement>(null);

	const CorrectYesRef = useRef<HTMLInputElement>(null);
	const CorrectNoRef = useRef<HTMLInputElement>(null);
	if (answerType !== "Multi-Select") return null;
	return (
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
							checked={
								formik.values.questions[index].data.display_answer_as ===
								"Text and emoji"
							}
							name={`questions[${index}].data.display_answer_as`}
							onChange={formik.handleChange}
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
							checked={
								formik.values.questions[index].data.display_answer_as ===
								"Emoji only"
							}
							name={`questions[${index}].data.display_answer_as`}
							onChange={formik.handleChange}
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
							checked={
								formik.values.questions[index].data.display_answer_as ===
								"Text only"
							}
							name={`questions[${index}].data.display_answer_as`}
							onChange={formik.handleChange}
							ref={TextOnlyRef}
						/>
						<label
							onClick={() => {
								if (TextOnlyRef.current !== null) TextOnlyRef.current.click();
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
							value={"Checkboxes"}
							checked={
								formik.values.questions[index].data.select_style ===
								"Checkboxes"
							}
							name={`questions[${index}].data.select_style`}
							onChange={formik.handleChange}
							ref={RadioButtonsRef}
						/>
						<label
							onClick={() => {
								if (null !== RadioButtonsRef.current) {
									RadioButtonsRef.current.click();
								}
							}}
							className='cursor-pointer'>
							Checkboxes
						</label>
					</div>

					<div className='single-radio-group'>
						<input
							type='radio'
							value={"Buttons"}
							checked={
								formik.values.questions[index].data.select_style === "Buttons"
							}
							name={`questions[${index}].data.select_style`}
							onChange={formik.handleChange}
							ref={ButtonsRef}
						/>
						<label
							onClick={() => {
								if (ButtonsRef.current !== null) ButtonsRef.current.click();
							}}
							className='cursor-pointer'>
							Buttons
						</label>
					</div>
				</div>
			</div>
			<div className='question-radio-group'>
				<div className='question-radio-title text-18 text-mulish-bold '>
					Display Correct Answer *
				</div>
				<div className='radio-group'>
					<div className='single-radio-group'>
						<input
							ref={CorrectYesRef}
							type='radio'
							value={"Yes"}
							checked={
								formik.values.questions[index].data.display_correct_answer ===
								"Yes"
							}
							name={`questions[${index}].data.display_correct_answer`}
							onChange={formik.handleChange}
						/>
						<label
							onClick={() => {
								if (null !== CorrectYesRef.current) {
									CorrectYesRef.current.click();
								}
							}}
							className='cursor-pointer'>
							Yes
						</label>
					</div>

					<div className='single-radio-group'>
						<input
							type='radio'
							value={"No"}
							checked={
								formik.values.questions[index].data.display_correct_answer ===
								"No"
							}
							name={`questions[${index}].data.display_correct_answer`}
							onChange={formik.handleChange}
							ref={CorrectNoRef}
						/>
						<label
							onClick={() => {
								if (CorrectNoRef.current !== null) CorrectNoRef.current.click();
							}}
							className='cursor-pointer'>
							No
						</label>
					</div>
				</div>
			</div>
		</div>
	);
};

export const TextCompoundComponent = ({
	formik,
	index,
	answerType,
}: SingleSelectCompoundComponentProps) => {
	if (!answerType.includes("Text")) return null;
	return (
		<div>
			{formik.values.questions[index].data.answerd.length ? (
				<div className='TextCompoundComponent_input-group'>
					<div className='TextCompoundComponent-score-input'>
						<FloatingInput
							value={
								formik.values.questions[index].data.answerd[0].answer_score
							}
							name={`questions[${index}].data.answerd[0].answer_score`}
							placeholder={"Score"}
							type='number'
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
					</div>

					<div className='TextCompoundComponent-Minimum_Characters-input'>
						<FloatingInput
							value={
								formik.values.questions[index].data.answerd[0]
									.answer_minimum_characters_to_achieve_the_score
							}
							type='number'
							name={`questions[${index}].data.answerd[0].answer_minimum_characters_to_achieve_the_score`}
							placeholder={"Minimum Characters to Achieve the Score"}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
					</div>
				</div>
			) : null}
		</div>
	);
};

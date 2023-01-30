import { FormikProps } from "formik";
import ShadowContainer from "../../../../components/organisms/ShadowContainer/ShadowContainer";
import CourseDraggables from "../component/CourseDraggables";
import "./Content.less";

import videoico from "../../../../assets/icons/video.svg";
import contentico from "../../../../assets/icons/content.svg";
import actionico from "../../../../assets/icons/action.svg";
import quizico from "../../../../assets/icons/quiz.svg";
import PopUp from "../../../../components/atoms/PopUp/PopUp";
import { useState } from "react";
import AddGoalTemplate from "../../../client/create-client/AddGoalTemplate";
import { initialValuesType } from "../types";

type ContentProps = {
	formik: FormikProps<initialValuesType>;
};
function Content({ formik }: ContentProps) {
	// const [contentOpen, setContentOpen] = useState(false);
	// const hideContent = () => {
	// 	setContentOpen(false);
	// };

	// const handleOpenContentChange = (newOpen: boolean) => {
	// 	setContentOpen(newOpen);
	// };
	return (
		<div>
			<ShadowContainer>
				<>
					{/* Lesson Component */}
					<LessonComponent
						listItems={
							<>
								<SingleModuleItem
									itemIcon={videoico}
									itemText='Introduction to the Course - Get Ready
									to Set Incredible Boundaries with EASE'
								/>
								<SingleModuleItem
									itemIcon={contentico}
									itemText='Boundaries Definition & Myths and Getting Clear on the Fear'
								/>
								<SingleModuleItem
									itemIcon={contentico}
									itemText='Difficulties with Boundaries, Boundary Injuries, Say No by saying YES!!'
								/>
								<SingleModuleItem
									itemIcon={actionico}
									itemText='Write down 3 boundaries you want to work on'
								/>
								<SingleModuleItem
									itemIcon={quizico}
									itemText='Do you think you can set boundaries now?'
								/>
							</>
						}
						// contentOpen={contentOpen}
						// handleOpenContentChange={handleOpenContentChange}
						lessonTitle={"Getting Started"}
						lessonNumber={1}
					/>

					{/* Module Component */}
					<ModuleComponent moduleTitle={"Reduce Stress"} moduleNumber={1} />

					{/* Content Component */}
					<ContentComponent contentTitle={"Content"} contentNumber={1} />
					<div
						// onClick={addQuestion}
						className='add-courseitem-container text-primary text-mulish-bold'>
						+ add content
					</div>
					<div
						// onClick={addQuestion}
						className='add-courseitem-container text-primary text-mulish-bold'>
						+ add lesson
					</div>
					<div
						// onClick={addQuestion}
						className='add-courseitem-container text-primary text-mulish-bold'>
						+ add module
					</div>
				</>
			</ShadowContainer>
		</div>
	);
}

export default Content;

type LessonComponentProps = {
	formik?: FormikProps<initialValuesType>;
	lessonTitle: string;
	lessonNumber: number;
	listItems?: React.ReactNode;
	// contentOpen: boolean;
	// handleOpenContentChange: (newOpen: boolean) => void;
};

function LessonComponent({
	lessonTitle,
	lessonNumber,
	listItems,
}: // contentOpen,
// handleOpenContentChange,
LessonComponentProps) {
	const [contentOpen, setContentOpen] = useState(false);
	const hideContent = () => {
		setContentOpen(false);
	};

	const handleOpenContentChange = (newOpen: boolean) => {
		setContentOpen(newOpen);
	};
	return (
		<CourseDraggables>
			<div className='grow-course-content-lesson'>
				<p className='text-mulish-bold text-18'>
					Lesson {lessonNumber}: {lessonTitle}
				</p>

				<div className='lesson-list-group'>{listItems}</div>

				<div>
					<PopUp
						button={
							<p className='text-primary text-mulish-bold text-16'>
								+ add content
							</p>
						}
						// content={
						// 	<AddGoalTemplate formik={formik} close={hideContent} />
						// }
						open={contentOpen}
						handleOpenChange={handleOpenContentChange}
					/>
				</div>
			</div>
		</CourseDraggables>
	);
}

type ModuleComponentProps = {
	formik?: FormikProps<initialValuesType>;
	moduleTitle: string;
	moduleNumber: number;
	// contentOpen: boolean;
	// handleOpenContentChange: (newOpen: boolean) => void;
};

function ModuleComponent({ moduleTitle, moduleNumber }: ModuleComponentProps) {
	return (
		<>
			<div>
				<CourseDraggables>
					<>
						<div className='module-component-group'>
							<div className='grow-course-content-module'>
								<p className='text-mulish-bold text-18'>
									Module {moduleNumber}: {moduleTitle}
								</p>
								<LessonComponent
									listItems={
										<>
											<SingleModuleItem
												itemIcon={contentico}
												itemText='Difficulties with Boundaries, Boundary Injuries, Say No by saying YES!!'
											/>
										</>
									}
									// contentOpen={contentOpen}
									// handleOpenContentChange={handleOpenContentChange}
									lessonTitle={"lesson"}
									lessonNumber={1}
								/>
							</div>
							<div className='add-courseitem-container text-primary text-mulish-bold'>
								+ add lesson
							</div>
						</div>
					</>
				</CourseDraggables>
			</div>
		</>
	);
}

type ContentComponentProps = {
	formik?: FormikProps<initialValuesType>;
	contentTitle: string;
	contentNumber?: number;
	// contentOpen: boolean;
	// handleOpenContentChange: (newOpen: boolean) => void;
};

function ContentComponent({
	contentTitle,
	contentNumber,
}: ContentComponentProps) {
	return (
		<div>
			<CourseDraggables>
				<>
					<div className='grow-course-content-module'>
						<p className='text-mulish-bold text-18'>Content</p>
						<p className='lesson-list'>
							<img src={contentico} /> Boundaries Definition & Myths and Getting
							Clear on the Fear
						</p>
					</div>
				</>
			</CourseDraggables>
		</div>
	);
}

type singleModuleItemProps = {
	itemIcon: string;
	itemText: string;
};

function SingleModuleItem({ itemIcon, itemText }: singleModuleItemProps) {
	return (
		<p className='lesson-list'>
			<img src={itemIcon} /> {itemText}
		</p>
	);
}

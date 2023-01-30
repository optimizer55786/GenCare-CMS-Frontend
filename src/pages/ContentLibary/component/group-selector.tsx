import React, { useState } from "react";
import "./group-selector.less";
import SelectorCard from "./selector-sard";
import { GroupSelectorProps } from "./group-selector.types";
import AddQuizOrQuestion from "../modal-contents/quiz-or-question";
import AddAction from "./action-modals";
import AddPractice from "./practice-modals";
import AddBreathwork from "./breathwork-modal";
import AddBinauralBeats from "./binaural-beats-modal";
import AddCalmingVideo from "./calming-video-modal";
import AddAffirmation from "./affirmation-modal";
import AddMeditation from "./meditation-modal";
import AddMindfulness from "./mindfulness-modal";
import AddContent from "./add-content-modal";
import AddGrowContent from "../grow-content";
import { useNavigate } from "react-router-dom";

function GroupSelector({ onClick }: GroupSelectorProps) {
	const [swapModal, setSwapModal] = useState("");
	const [currentModalId, setCurrentModalId] = useState("");
	return (
		<div className='selector-container'>
			<Grow
				currentModalId={currentModalId}
				setCurrentModalId={setCurrentModalId}
				CardId={"grow"}
				closeModal={onClick}
			/>
			<SelectedGroup
				currentModalId={currentModalId}
				setCurrentModalId={setCurrentModalId}
				CardId={""}
				closeModal={onClick}
			/>
			<Care
				currentModalId={currentModalId}
				setCurrentModalId={setCurrentModalId}
				CardId={"care"}
				closeModal={onClick}
			/>
			<DailyFuel
				currentModalId={currentModalId}
				setCurrentModalId={setCurrentModalId}
				CardId={"dailyfuel"}
				closeModal={onClick}
			/>
			<Other
				currentModalId={currentModalId}
				setCurrentModalId={setCurrentModalId}
				closeModal={onClick}
				CardId={"other"}
			/>
			<AddAction
				currentModalId={currentModalId}
				closeModal={onClick}
				setCurrentModalId={setCurrentModalId}
				CardId={"addaction"}
			/>
			<AddBreathwork
				currentModalId={currentModalId}
				closeModal={onClick}
				setCurrentModalId={setCurrentModalId}
				CardId={"addbreathwork"}
			/>
			<AddBinauralBeats
				currentModalId={currentModalId}
				closeModal={onClick}
				setCurrentModalId={setCurrentModalId}
				CardId={"addbinauralbeats"}
			/>
			<AddCalmingVideo
				currentModalId={currentModalId}
				closeModal={onClick}
				setCurrentModalId={setCurrentModalId}
				CardId={"addcalmingvideo"}
			/>
			<AddAffirmation
				currentModalId={currentModalId}
				closeModal={onClick}
				setCurrentModalId={setCurrentModalId}
				CardId={"addaffirmation"}
			/>
			<AddMeditation
				currentModalId={currentModalId}
				closeModal={onClick}
				setCurrentModalId={setCurrentModalId}
				CardId={"addmeditation"}
			/>
			<AddMindfulness
				currentModalId={currentModalId}
				closeModal={onClick}
				setCurrentModalId={setCurrentModalId}
				CardId={"addmindfulness"}
			/>

			<AddContent
				currentModalId={currentModalId}
				closeModal={onClick}
				setCurrentModalId={setCurrentModalId}
				CardId={"addcontent"}
			/>
			<AddQuizOrQuestion
				currentModalId={currentModalId}
				closeModal={onClick}
				setCurrentModalId={setCurrentModalId}
				CardId={"addquizorquestion"}
			/>
			<AddGrowContent
				currentModalId={currentModalId}
				closeModal={onClick}
				setCurrentModalId={setCurrentModalId}
				CardId={"addgrowcontent"}
			/>
		</div>
	);
}

export default GroupSelector;

function SelectedGroup({
	closeModal,
	CardId,
	currentModalId,
	setCurrentModalId,
}: GroupsCard) {
	function changeValue(e: any) {
		console.log(e.target.value);
		setCurrentModalId(e.target.value);
	}

	return (
		<>
			{currentModalId === CardId ? (
				<>
					<div className='title-container'>
						<p className='selector-modal-title'>
							Add Content to Content Library
						</p>
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
					<p className='group-title-text'>Select the content group</p>
					<div className='selector-group'>
						<div className='group-one'>
							<SelectorCard
								onClick={() => setCurrentModalId("grow")}
								title='grow'
							/>
							<SelectorCard
								onClick={() => setCurrentModalId("care")}
								title='care'
							/>
						</div>
						<div className='group-one'>
							<SelectorCard
								onClick={() => setCurrentModalId("dailyfuel")}
								title='Daily fuel'
							/>
							<SelectorCard
								onClick={() => setCurrentModalId("other")}
								title='other'
							/>
						</div>
					</div>
				</>
			) : null}
		</>
	);
}

interface GroupsCard {
	closeModal?: React.MouseEventHandler<HTMLDivElement>;
	currentModalId: string;
	setCurrentModalId: React.Dispatch<React.SetStateAction<string>>;
	CardId: string;
}

function Grow({
	closeModal,
	CardId,
	currentModalId,
	setCurrentModalId,
}: GroupsCard) {
	function changeValue(e: any) {
		console.log(e.target.value);
		setCurrentModalId(e.target.value);
	}

	const navigate = useNavigate();
	return (
		<>
			{currentModalId === CardId ? (
				<>
					<div className='title-container'>
						<p className='selector-modal-title'>
							Add Content to Content Library
						</p>
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
					<select className='group-swap-select' onChange={changeValue}>
						<option value={""}>Content Group *</option>
						<option selected value={"grow"}>
							Grow
						</option>
						<option value={"care"}>Care</option>
						<option value={"dailyfuel"}>Daily fuel</option>
						<option value={"other"}>Other</option>
					</select>
					<div className='group-item'>
						<div className='group-one'>
							<SelectorCard
								title='COURSE'
								onClick={() => navigate("add-course")}
							/>
							<SelectorCard
								title='CONTENT'
								onClick={() => setCurrentModalId("addgrowcontent")}
							/>
						</div>
					</div>
				</>
			) : null}
		</>
	);
}

function Care({
	closeModal,
	CardId,
	currentModalId,
	setCurrentModalId,
}: GroupsCard) {
	function changeValue(e: any) {
		// console.log(e.target.value);
		setCurrentModalId(e.target.value);
	}

	return (
		<>
			{currentModalId === CardId ? (
				<>
					<div className='title-container'>
						<p className='selector-modal-title'>
							Add Content to Content Library
						</p>
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
					<select className='group-swap-select' onChange={changeValue}>
						<option>Content Group *</option>
						<option value={"grow"}>Grow</option>
						<option selected value={"care"}>
							Care
						</option>
						<option value={"dailyfuel"}>Daily fuel</option>
						<option value={"other"}>Other</option>
					</select>
					<div className='group-item'>
						<div className='group-one'>
							<SelectorCard
								title='BREATHWORKS'
								onClick={() => setCurrentModalId("addbreathwork")}
							/>
							<SelectorCard
								onClick={() => setCurrentModalId("addmeditation")}
								title='MEDITATION'
							/>
							<SelectorCard
								onClick={() => setCurrentModalId("addmindfulness")}
								title='MINDFULLNESS'
							/>
						</div>
						<div className='group-one'>
							<SelectorCard
								title='AFFIRMATION'
								onClick={() => setCurrentModalId("addaffirmation")}
							/>

							<SelectorCard
								title='CALMING VIDEO'
								onClick={() => setCurrentModalId("addcalmingvideo")}
							/>
							<SelectorCard
								title='BINAURAL BEATS'
								onClick={() => setCurrentModalId("addbinauralbeats")}
							/>
						</div>
						<div className='group-one'>
							<SelectorCard
								title='CONTENT'
								onClick={() => setCurrentModalId("addcontent")}
							/>
						</div>
					</div>
				</>
			) : null}
		</>
	);
}

function DailyFuel({
	closeModal,
	currentModalId,
	setCurrentModalId,
	CardId,
}: GroupsCard) {
	function changeValue(e: any) {
		// console.log(e.target.value);
		setCurrentModalId(e.target.value);
	}

	return (
		<>
			{currentModalId === CardId ? (
				<>
					<div className='title-container'>
						<p className='selector-modal-title'>
							Add Content to Content Library
						</p>
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
					<select className='group-swap-select' onChange={changeValue}>
						<option>Content Group *</option>
						<option value={"grow"}>Grow</option>
						<option value={"care"}>Care</option>
						<option selected value={"dailyfuel"}>
							Daily fuel
						</option>
						<option value={"other"}>Other</option>
					</select>
					<div className='group-item'>
						<div className='group-one'>
							<SelectorCard title='DAILY HEALING DIARY' />
							<SelectorCard title='DAILY AUDIO' />
							<SelectorCard title='DAILY “MEME”' />
						</div>
						<div className='group-one'>
							<SelectorCard title='SCENARIO CARDS' />
							<SelectorCard title='PLAYLIST' />
							<SelectorCard title='SPECIAL GUEST' />
						</div>
					</div>
				</>
			) : null}
		</>
	);
}

function Other({
	closeModal,
	CardId,
	currentModalId,
	setCurrentModalId,
}: GroupsCard) {
	function changeValue(e: any) {
		setCurrentModalId(e.target.value);

		// closeModal();
	}
	const navigate = useNavigate();

	if (currentModalId === CardId) {
		return (
			<>
				<div className='title-container'>
					<p className='selector-modal-title'>Add Content to Content Library</p>
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
				<select className='group-swap-select' onChange={changeValue}>
					<option>Content Group *</option>
					<option value={"grow"}>Grow</option>
					<option value={"care"}>Care</option>
					<option value={"dailyfuel"}>Daily fuel</option>
					<option selected value={"other"}>
						Other
					</option>
				</select>

				<div className='group-item'>
					<div className='group-one'>
						<SelectorCard
							title='JOURNEY'
							onClick={() => navigate("add-journey")}
						/>
						<SelectorCard
							title='ACTION'
							onClick={() => setCurrentModalId("addaction")}
						/>
						<SelectorCard title='FLOW' onClick={() => navigate("add-flow")} />
					</div>
					<div className='group-one'>
						<SelectorCard
							onClick={() => setCurrentModalId("addquizorquestion")}
							title='QUIZ OR QUESTION'
						/>
					</div>
				</div>
			</>
		);
	} else return <></>;
}

import React, { useState } from "react";
import "../component/breathwork-modal.less";
import icon from "../../../assets/icons/content-group-grow.svg";
import { AddVideo } from "./components/modal-content-video";
import { AddAudio } from "./components/modal-content-audio";
import { AddMixed } from "./components/modal-content-mixed";
import { AddSlideShow } from "./components/modal-content-slideshow";
import { ActionModalProps } from "../component/action-modal.types";
export default function ({
	closeModal,
	CardId,
	currentModalId,
	setCurrentModalId,
}: ActionModalProps) {
	const [contentType, setContentType] = useState("1");
	return (
		<>
			{currentModalId === CardId ? (
				<>
					<div className='add-action-container'>
						<div className='add-modal-title-container'>
							<div className='add-modal-title'>
								<div className='add-modal-title-text'>
									Add Grow Content to Content Library
								</div>
								<span className='title-icon'>
									<img src={icon} />
									Grow
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
						<AddVideo
							setContentType={setContentType}
							categoryId={2}
							contentTypeID={1}
							contentType={contentType}
							closeModal={closeModal}
						/>
						<AddAudio
							setContentType={setContentType}
							categoryId={2}
							contentTypeID={2}
							contentType={contentType}
							closeModal={closeModal}
						/>
						<AddMixed
							setContentType={setContentType}
							categoryId={2}
							contentTypeID={3}
							contentType={contentType}
							closeModal={closeModal}
						/>
						<AddSlideShow
							setContentType={setContentType}
							categoryId={2}
							contentTypeID={4}
							contentType={contentType}
							closeModal={closeModal}
						/>
					</div>
				</>
			) : null}
		</>
	);
}

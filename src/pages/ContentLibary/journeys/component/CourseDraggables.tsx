import React from "react";
import "./CourseDraggables.less";
import ico from "../../../../assets/icons/drag-n-drop.svg";

type CourseDraggablesProps = {
	children: React.ReactElement;
};

function CourseDraggables({ children }: CourseDraggablesProps) {
	return (
		<div className='grow-course-draggable-container'>
			<div className='grow-course-draggable-group'>
				<div className='grow-course-draggable-side'>
					<img src={ico} />
				</div>
				<div className='grow-course-draggable-content'>{children}</div>
			</div>
		</div>
	);
}

export default CourseDraggables;

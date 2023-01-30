import React, { useState } from "react";
import { ModalProps } from "./Modal.types";
import Modal from "react-modal";

export default function ({ children, isOpen }: ModalProps) {
	// const [isOpen, setIsOpen] = useState(isOpen);
	// function openModal() {
	// 	setIsOpen(true);
	// }
	// function closeModal() {
	// 	setIsOpen(false);
	// }

	const customStyle = {
		content: {
			zIndex: 999,
			top: "50%",
			left: "50%",
			width: "auto",
			right: "auto",
			bottom: "auto",
			marginRight: "-50%",
			padding: "32px",
			transform: "translate(-50%, -50%)",
		},
		overlay: {
			backgroundColor: "#4A4A4AE6",
		},
	};
	return (
		<>
			<Modal
				shouldCloseOnOverlayClick={true}
				ariaHideApp={false}
				style={customStyle}
				isOpen={isOpen}>
				{children}
			</Modal>
		</>
	);
}

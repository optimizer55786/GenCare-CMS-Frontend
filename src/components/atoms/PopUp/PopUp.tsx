import { Button, Popover } from "antd";
import React, { useState } from "react";

interface PopupProps {
	handleOpenChange: (event: any) => void;
	content?: React.ReactNode;
	open: boolean;
	button: React.ReactNode;
}

function PopUp({ handleOpenChange, content, open, button }: PopupProps) {
	// const [open, setOpen] = useState(false);

	// const hide = () => {
	// 	setOpen(false);
	// };

	// const handleOpenChange = (newOpen: boolean) => {
	// 	setOpen(newOpen);
	// };

	return (
		<Popover
			content={content}
			// title='Title'
			trigger='click'
			open={open}
			onOpenChange={handleOpenChange}>
			{button}
			{/* <Button type='primary'>Click me</Button> */}
		</Popover>
	);
}

export default PopUp;

import React from "react";
import "./selector-card.less";
import { SelectorCardProps } from "./selector-card.types";

function SelectorCard({ title, onClick }: SelectorCardProps) {
	return (
		<div onClick={onClick} className='selector-card-container'>
			{title}
		</div>
	);
}

export default SelectorCard;

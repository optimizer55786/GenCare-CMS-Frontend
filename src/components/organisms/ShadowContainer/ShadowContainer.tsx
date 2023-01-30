import React from "react";
import { ShadowContainerProps } from "./ShadowContainer.types";
import "./ShadowContainer.less";

function ShadowContainer({ children }: ShadowContainerProps) {
	return <div className='overlay-container'>{children}</div>;
}

export default ShadowContainer;

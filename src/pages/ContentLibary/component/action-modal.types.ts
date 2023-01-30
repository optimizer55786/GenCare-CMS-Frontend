export interface ActionModalProps {
	closeModal?: React.MouseEventHandler<HTMLDivElement>;
	currentModalId: string;
	setCurrentModalId: React.Dispatch<React.SetStateAction<string>>;
	CardId: string;
}

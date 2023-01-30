export interface ModalContentProps {
	setContentType: React.Dispatch<React.SetStateAction<string>>;
	contentType: string;
	categoryId: Number;
	contentTypeID: Number;
	closeModal?: any;
}

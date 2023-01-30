import { PageContainerType } from "./PageContainer.types";
import "./PageContainer.less";
function PageContainer({ children }: PageContainerType) {
	return (
		<div className='page-container-group-main-container'>
			<div className='page-container-group-side'></div>
			<div className='page-container-group-body'>{children}</div>
		</div>
	);
}

export default PageContainer;

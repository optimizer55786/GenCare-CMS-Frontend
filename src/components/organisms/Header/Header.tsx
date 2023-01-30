import { DownOutlined } from "@ant-design/icons";
import { Avatar, Badge, Breadcrumb, Button, Space, Typography } from "antd";
import classNames from "classnames";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SvgIcon from "../../../components/atoms/SvgIcon/SvgIcon";
import "../../../styles/utils.less";
import "./Header.less";
import growicon from "../../../assets/icons/content-group-grow.svg";
import journeyicon from "../../../assets/icons/content-group-journey.svg";
import othericon from "../../../assets/icons/content-group-other.svg";

const breadcrumbNameMap: Record<string, string> = {
	"/dashboard": "Dashboard",
	"/content-library": "Content Library",
	"/content-library/add-course": "Add Course",
	"/content-library/add-journey": "Add Journey",
	"/content-library/add-flow": "Add Flow",
	"/daily-fuel-scheduler": "Daily Fuel Scheduler",
	"/onboarding": "Onboarding",
	"/clients": "Clients",
	"/clients/create": "Create Client",
	"/settings": "Settings",
	"/settings/goals-and-assessments": "Goals And Assessments",
	"/settings/goals-and-assessments/create": "Create Goals And Assessments",
	"/settings/goals-and-assessments/edit": "Edit Goals And Assessments",
	"/settings/about-you-templates": "About You Templates",
	"/settings/about-you-templates/create": "Create About You Templates",
	"/settings/about-you-templates/edit": "Edit About You Templates",
	"/settings/goal-content-templates": " Goal Content Templates",
	"/settings/goal-content-templates/create": "Set Goal Content Templates",
	"/settings/goal-content-templates/edit": "Edit Goal Content Templates",
	"/settings/privacy-details-templates": "Privacy Details Templates",
	"/settings/tour-text-template": "Tour Text Template",
	"/settings/template-app-theme": "Template App Theme",
	"/settings/general": "General",
};

const { Text } = Typography;

const Header = () => {
	const location = useLocation();
	const pathSnippet = location.pathname.split("/")[2];
	const pathSnippets = location.pathname.split("/").filter((i) => i);
	const [notification, setNotification] = useState(0);
	const [user, setUser] = useState("Nelly");

	const extraBreadcrumbItems = pathSnippets.map((_, index) => {
		const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
		const className = classNames("text-16", { disabled: url === "/settings" });
		return (
			<>
				<Breadcrumb.Item key={url}>
					<Link className={className} to={url}>
						{breadcrumbNameMap[url]}{" "}
					</Link>
				</Breadcrumb.Item>
			</>
		);
	});

	return (
		<Space className='gen-header'>
			<div className='breadcrumb-ico-group'>
				<Breadcrumb>{extraBreadcrumbItems}</Breadcrumb>
				{pathSnippet === "add-course" && (
					<>
						<span className='breadcrumb-title-icon'>
							<img src={growicon} />
							Care
						</span>
					</>
				)}
				{pathSnippet === "add-journey" && (
					<>
						<span className='breadcrumb-title-icon'>
							<img src={journeyicon} />
							Journey
						</span>
					</>
				)}
				{pathSnippet === "add-flow" && (
					<>
						<span className='breadcrumb-title-icon'>
							<img src={othericon} />
							Other
						</span>
					</>
				)}
			</div>

			<Space direction='vertical'>
				<Space>
					<Badge count={notification}>
						<Avatar
							style={{ backgroundColor: "#EBECEE" }}
							icon={
								<SvgIcon name='bell' height={20} width={20} color='#171d3c' />
							}
							shape='circle'
							size={38}
						/>
					</Badge>
					<Avatar shape='circle' size={38} />
					<Text>{user}</Text>
					<Button
						type='link'
						icon={<DownOutlined className='gen-header__chevron-down' />}
					/>
				</Space>

				<div className='gen-header__btn-container'>
					{/* <Button
            className="gen-header__add-client-btn"
            block
            type="primary"
            shape="round"
          >
            add new client
          </Button> */}
				</div>
			</Space>
		</Space>
	);
};

export default Header;

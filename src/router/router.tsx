import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/error/error";
import Index from "../pages/Index";
import App from "../App";
import ContentLibrary from "../pages/ContentLibary";
import Client from "../pages/client";
import DailyFuelScheduler from "../pages/daily-fuel-scheduler/daily-fuel-scheduler-index";
import GoalsAndAssement from "../pages/Settings/goals-and-assessments";
import GoalContent from "../pages/Settings/goal-content-template";
import AboutYouTemplate from "../pages/Settings/about-you-template";
import TemplateAppTheme from "../pages/Settings/template-app-theme";
import TourTextTemplate from "../pages/Settings/tour-text-template/create-tour";
import PrivacyDetails from "../pages/Settings/privacy-details-template/create-privacy-details";
import ContentLibraryCourse from "../pages/ContentLibary/grow-courses/create-course";
import ContentLibraryJourney from "../pages/ContentLibary/journeys/create-journey";
import ContentLibraryFlow from "../pages/ContentLibary/flow/create-flow";
import General from "../pages/Settings/General";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{ index: true, element: <Index /> },
			{
				path: "/dashboard",
				element: <div>dashboard</div>,
			},
			{
				path: "/content-library",
				element: <ContentLibrary />,
			},
			{
				path: "/content-library/add-course",
				element: <ContentLibraryCourse />,
			},
			{
				path: "/content-library/add-journey",
				element: <ContentLibraryJourney />,
			},
			{
				path: "/content-library/add-flow",
				element: <ContentLibraryFlow />,
			},
			{
				path: "/daily-fuel-scheduler",
				element: <DailyFuelScheduler />,
			},
			{
				path: "/onboarding",
				element: <div>onboarding</div>,
			},
			{
				path: "/clients",
				element: <Client.ClientTable />,
			},
			{
				path: "/clients/create",
				element: <Client.CreateClient />,
			},
			{
				path: "/settings/goals-and-assessments",
				element: <GoalsAndAssement.GoalTable />,
			},
			{
				path: "/settings/goals-and-assessments/create",
				element: <GoalsAndAssement.CreateGoal />,
			},
			{
				path: "/settings/goals-and-assessments/edit/:goalId",
				element: <GoalsAndAssement.EditGoal />,
			},

			{
				path: "/settings/about-you-templates",
				element: <AboutYouTemplate.AboutYouTable />,
			},
			{
				path: "/settings/about-you-templates/create",
				element: <AboutYouTemplate.CreateAboutYou />,
			},
			{
				path: "/settings/about-you-templates/edit/:templateId",
				element: <AboutYouTemplate.EditAboutYou />,
			},
			{
				path: "/settings/goal-content-templates",
				element: <GoalContent.GoalContentTable />,
			},
			{
				path: "/settings/goal-content-templates/create",
				element: <GoalContent.CreateGoalContent />,
			},
			{
				path: "/settings/goal-content-templates/edit/:goalTemplateId",
				element: <GoalContent.EditGoalContent />,
			},
			{
				path: "/settings/tour-text-template",
				element: <TourTextTemplate />,
			},
			{
				path: "/settings/privacy-details-templates",
				element: <PrivacyDetails />,
			},
			{
				path: "/settings/general",
				element: <General />,
			},
			{
				path: "/settings/tour-text-template",
				element: <TourTextTemplate />,
			},
			{
				path: "/settings/privacy-details-templates",
				element: <PrivacyDetails />,
			},
			{
				path: "/settings/template-app-theme",
				element: <TemplateAppTheme.ThemeTemplateTable />,
			},
			{
				path: "/settings/template-app-theme/create",
				element: <TemplateAppTheme.CreateThemeTemplate />,
			},
			{
				path: "/settings/template-app-theme/edit/:themeId",
				element: <TemplateAppTheme.EditThemeTemplate />,
			},
			{
				path: "/settings/general",
				element: <General />,
			},
		],
	},
]);

export default router;

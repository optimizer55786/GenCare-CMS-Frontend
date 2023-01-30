import http, { formdataHttp } from "./http";

export function uploadImage(data: any) {
	return formdataHttp.post(`/imageupload/`, data);
}

export function getQuestionCategoryAndTypeofAnswer() {
	return http.get("/questioncategoryandtypeofanswer/");
}

export function getTypeOfAnswerOptions(type: string) {
	return http.get(`/answersgroups/?type_of_answer=${type}`);
}

export function createGoalAndAssessment(data: any) {
	return http.post(`/goalsandassessments/`, data);
}

// Goals and Assessment services
export function getAllGoalsAndAssessments() {
	return http.get(`/goalsandassessments/`);
}

export function getGoalAndAssessmentById(id: any) {
	return http.get(`/goalsandassessments/${id}/`);
}

export function updateGoalAndAssementById(data: any) {
	return http.put(`/goalsandassessments/${data.id}/`, data);
}

export function deleteGoalAndAssementById(id: any) {
	return http.delete(`/goalsandassessments/${id}/`);
}

// About you template services
export function createAboutYouTemplate(data: any) {
	return http.post(`/aboutyoutemplates/`, data);
}

export function getAllAboutYouTemplate() {
	return http.get(`/aboutyoutemplates/`);
}

export function getAboutYouTemplateById(id: any) {
	return http.get(`/aboutyoutemplates/${id}/`);
}

export function updateAboutYouTemplateById(data: any) {
	return http.put(`/aboutyoutemplates/${data.id}/`, data);
}

export function deleteAboutYouTemplateById(id: any) {
	return http.delete(`/aboutyoutemplates/${id}/`);
}

// Goal Content template services
export function createGoalContentTemplate(data: any) {
	return formdataHttp.post(`/goalcontenttemplate/`, data);
}

export function getAllGoalContentTemplate() {
	return http.get(`/goalcontenttemplate/`);
}

export function getGoalContentTemplateById(id: any) {
	return http.get(`/goalcontenttemplate/${id}/`);
}

export function updateGoalContentTemplateById(data: any) {
	return http.put(`/goalcontenttemplate/${data.id}/`, data);
}

export function deleteGoalContentTemplateById(id: any) {
	return http.delete(`/goalcontenttemplate/${id}/`);
}

// Tour text template services
export function createTourText(data: any) {
	return formdataHttp.post(`/tourtexttemplate/`, data);
}

export function getAllTourText() {
	return http.get(`/tourtexttemplate/`);
}

export function updateTourTextById(data: any) {
	return http.put(`/tourtexttemplate/${data.id}/`, data);
}

// Privacy details services
export function createPrivacyDetails(data: any) {
	return http.post(`/tourtexttemplate/`, data);
}

export function updatePrivacyDetailsById(data: any) {
	return http.put(`/privacydetailstemplate/${data.id}/`, data);
}

export function getPrivacyDetails() {
	return http.get(`/privacydetailstemplate/`);
}

//General Settings Service
export function getGeneralSettings() {
	return http.get(`/generalsettings/`);
}

export function updateGeneralSettingsById(data: any) {
	return http.put(`/generalsettings/${data.id}/`, data);
}

// Theme app template services
export function getThemeTemplate() {
	return http.get(`/appthemetemplates/`);
}

export function getThemeTemplateById(id: any) {
	return http.get(`/appthemetemplates/${id}/`);
}

export function createThemeTemplate(data: any) {
	return http.post(`/appthemetemplates/`, data);
}

export function updateThemeTemplateById(data: any) {
	return http.put(`/appthemetemplates/${data.id}/`, data);
}
export function deleteThemeTemplateById(id: any) {
	return http.delete(`/appthemetemplates/${id}/`);
}

// Font services
export function getThemeFonts() {
	return http.get(`/fonts/`);
}

//Content Library Service
export function getContentLibrary() {
	return http.get("/contentlibrary/");
}

//Industries Module service
export function getIndustries() {
	return http.get("/industries/");
}

//Cities Module service
export function getCities() {
	return http.get("/cities/");
}

//Countries Module service
export function getCountries() {
	return http.get("/countries/");
}

//Action Module service
export function createAction(data: any) {
	return http.post("/addactions/", data);
}

export function getActions() {
	return http.get("/addactions/");
}

export function getActionById(id: any) {
	return http.get(`/addactions/${id}/`);
}

export function updateActionById(data: any) {
	return http.put(`/addactions/${data.id}/`, data);
}

export function deleteActionById(id: any) {
	return http.delete(`/addactions/${id}/`);
}

// Care Module Services

//1. Breathwork
export function createBreathwork(data: any) {
	return http.post("/breathwork/", data);
}

export function getBreathwork() {
	return http.get("/breathwork/");
}

//2. Contenttypemediaoverall
export function createCareCategory(data: any) {
	return http.post("/contenttypemediaoverall/", data);
}

// Care content slideshow
export function createCareSlideShow(data: any) {
	return http.post("/slideshow/", data);
}

// Care content slideshow
export function createGrowCourse(data: any) {
	return http.post("/addcourse/", data);
}

//Clients Module service
export function getClients() {
	return http.get("/clients/");
}

export function createClient(data: any) {
	return http.post("/clients/", data);
}

export function getClientById(id: any) {
	return http.get(`/clients/${id}/`);
}

export function updateClientById(data: any) {
	return http.put(`/clients/${data.id}/`, data);
}

export function deleteClientById(id: any) {
	return http.delete(`/clients/${id}/`);
}

//Quiz or Question Module service
export function getQuizOrQuestion() {
	return http.get("/quizorquestions/");
}

export function createQuizOrQuestion(data: any) {
	return http.post("/quizorquestions/", data);
}

export function getQuizOrQuestionById(id: any) {
	return http.get(`/quizorquestions/${id}/`);
}

export function updateQuizOrQuestionById(data: any) {
	return http.put(`/quizorquestions/${data.id}/`, data);
}

export function deleteQuizOrQuestionById(id: any) {
	return http.delete(`/quizorquestions/${id}/`);
}

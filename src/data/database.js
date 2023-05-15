// TODO: change to auth server url
let authServerUrl;
if (import.meta.env.VITE_DEPLOY === 'true') {
	authServerUrl =
		'https://portfolio-auth-server-git-development-raymondleemv.vercel.app';
} else if (import.meta.env.PROD) {
	authServerUrl = 'https://portfolio-auth-server.raymondleemv.com';
} else {
	authServerUrl = 'http://localhost:3001';
}

async function getData(url) {
	let response = fetch(url);
	let apiData = await response;
	return await apiData.json();
}

async function fetchAuthServer(url, data = {}) {
	let fetchOptions = {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	};
	let response = await fetch(authServerUrl + url, fetchOptions);
	return response;
}

async function addProject(data) {
	return await fetchAuthServer(`/api/projects/add`, data);
}

async function editProject(data) {
	return await fetchAuthServer(`/api/projects/edit`, data);
}

async function deleteProject(data) {
	return await fetchAuthServer(`/api/projects/delete`, data);
}

async function getCareers() {
	return await getData(
		'https://portfolio-backend-khaki-three.vercel.app/api/careers'
	);
}

async function addCareer(data) {
	return await fetchAuthServer(`/api/careers/add`, data);
}

async function editCareer(data) {
	return await fetchAuthServer(`/api/careers/edit`, data);
}

async function deleteCareer(data) {
	return await fetchAuthServer(`/api/careers/delete`, data);
}

async function getProjects() {
	return await getData(
		'https://portfolio-backend-khaki-three.vercel.app/api/projects'
	);
}

async function getSkills() {
	return await getData(
		'https://portfolio-backend-khaki-three.vercel.app/api/skills'
	);
}

async function addSkill(data) {
	return await fetchAuthServer(`/api/skills/add`, data);
}

async function editSkill(data) {
	return await fetchAuthServer(`/api/skills/edit`, data);
}

async function deleteSkill(data) {
	return await fetchAuthServer(`/api/skills/delete`, data);
}

export {
	getCareers,
	getProjects,
	getSkills,
	addProject,
	deleteProject,
	editProject,
	addCareer,
	deleteCareer,
	editCareer,
	addSkill,
	deleteSkill,
	editSkill,
	authServerUrl,
	fetchAuthServer,
};

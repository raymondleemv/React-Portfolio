async function getData(url) {
	let response = fetch(url);
	let apiData = await response;
	return await apiData.json();
}

async function getCareers() {
	return await getData('/careers.json');
}

async function getProjects() {
	return await getData('/projects.json');
}

async function getSkills() {
	return await getData('/skills.json');
}

export { getCareers, getProjects, getSkills };

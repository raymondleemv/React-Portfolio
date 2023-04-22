async function getData(url) {
	let response = fetch(url);
	let apiData = await response;
	return await apiData.json();
}

async function getCareers() {
	return await getData('http://localhost:5173/careers.json');
}

async function getProjects() {
	return await getData('http://localhost:5173/projects.json');
}

async function getSkills() {
	return await getData('http://localhost:5173/skills.json');
}

export { getCareers, getProjects, getSkills };

async function getData(url) {
	let response = fetch(url);
	let apiData = await response;
	return await apiData.json();
}

async function getCareers() {
	return await getData(
		'https://portfolio-backend-khaki-three.vercel.app/api/careers'
	);
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

export { getCareers, getProjects, getSkills };

import './Project.css';
import { useEffect, useState } from 'react';
import { getProjects } from '../data/database';
import { projectInit } from '../js/Portfolio';

export default function Project() {
	const [data, setData] = useState([]);
	useEffect(() => {
		const getData = async () => {
			let projects = await getProjects();
			setData(projects);
		};
		getData();
	}, []);

	useEffect(() => {
		projectInit();
	}, [data]);

	return (
		<section id="projects">
			<h2 className="section-title">Projects</h2>
			<div id="projects-container">
				<div id="projects-image-container">
					{data.map((project, i) => {
						return (
							<img
								key={'project image ' + i}
								className="project-image"
								src={project.photo}
								alt={'This is the ' + project.title + ' project image'}
							/>
						);
					})}
				</div>
				<div id="projects-description-container">
					<div id="project-number-container">
						<p id="current-project-number"></p>
						<p id="total-project-number"></p>
					</div>
					<div id="projects-description-content-container">
						<div id="projects-description-content">
							{data.map((project, i) => {
								return (
									<div
										className="project-description"
										key={'project-description ' + i}
									>
										<h3 className="section-subtitle">{project.title}</h3>
										<p>{project.content}</p>
										<div className="project-description-links">
											{project.url && (
												<a className="button" href={project.url}>
													Visit
												</a>
											)}
											<a
												className="logo github-logo"
												href={project.github}
												target="_blank"
											></a>
										</div>
									</div>
								);
							})}
						</div>
						<div id="projects-description-arrows">
							<button
								className="arrow"
								id="projects-description-prev-btn"
							></button>
							<button id="projects-description-next-btn"></button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

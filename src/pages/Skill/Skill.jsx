import './Skill.css';
import { useState, useEffect } from 'react';
import { getSkills } from '../../data/database';

export default function Skill() {
	const [data, setData] = useState([]);
	useEffect(() => {
		const getData = async () => {
			let skills = await getSkills();
			setData(skills);
		};
		getData();
	}, []);
	return (
		<section id="skills" className="flex-center flex-column">
			<h2 className="section-title">Skills</h2>
			<div id="skills-content-container">
				<div id="hard-skills-container" className="flex-center">
					{data.map((skill, i) => {
						return (
							<div
								className="hard-skills-content"
								key={'hard-skills-content ' + i}
							>
								<img
									alt={'This is the ' + skill.name + ' skill icon'}
									src={skill.photo}
								/>
								<p>{skill.name}</p>
							</div>
						);
					})}
				</div>
			</div>
			<div className="separating-line"></div>
		</section>
	);
}

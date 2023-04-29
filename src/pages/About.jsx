import './About.css';
import HoverCard from '../components/HoverCard';
import { useEffect, useState } from 'react';
import { getCareers } from '../data/database';

export default function About() {
	const [educationData, setEducationData] = useState([]);
	const [experienceData, setExperienceData] = useState([]);

	useEffect(() => {
		const getData = async () => {
			let json = await getCareers();
			let educationDataArr = [];
			let experienceDataArr = [];
			for (let career of json) {
				if (career.career_type === 'Education') {
					educationDataArr.push(career);
				} else if (career.career_type === 'Experience') {
					experienceDataArr.push(career);
				}
			}
			setEducationData(educationDataArr);
			setExperienceData(experienceDataArr);
		};
		getData();
	}, []);

	const checkCareerExtraInfo = (career) => {
		let info = { title: career.career };
		let start = career.career.indexOf('(');
		if (start !== -1) {
			info.title = career.career.substr(0, start - 1);
			info.description = career.career.substr(
				start + 1,
				career.career.length - start - 2
			);
		}
		return info;
	};

	return (
		<section id="about">
			<h2 className="section-title">About Raymond</h2>
			<div id="about-content" className="flex-center">
				<div className="flex-center flex-column">
					<p id="about-content-intro">
						I have always enjoyed coding and solving puzzles in my free time
						when I were young, and here I am now! Becoming a Full Stack Web
						Developer based in Toronto, Ontario.
					</p>
					<div id="about-buttons" className="flex-center">
						<a id="about-work-button" href="#projects" className="button">
							View My Work
						</a>
						<a id="about-contact-button" href="#contact" className="button">
							Contact Me
						</a>
					</div>
				</div>
				<img
					id="about-self-portrait"
					src="images/about/raymond.JPG"
					alt="This is a picture of Raymond"
				/>
				<img
					src="images/about/soft-skills.png"
					alt="This is a pentagon graph showing Raymond's soft skills"
				/>
			</div>
			<h3 className="section-subtitle">Education</h3>
			<div className="about-hover-cards-container">
				{educationData.map((education, i) => {
					return (
						<HoverCard
							key={'education ' + i}
							src={education.photo}
							info={checkCareerExtraInfo(education)}
							location={education.location}
							startYear={education.start_date.split('-')[0]}
							endYear={education.end_date.split('-')[0]}
							skills={education.skills}
						/>
					);
				})}
			</div>
			<h3 className="section-subtitle">Experience</h3>
			<div className="about-hover-cards-container">
				{experienceData.map((experience, i) => {
					return (
						<HoverCard
							key={'experience ' + i}
							src={experience.photo}
							info={checkCareerExtraInfo(experience)}
							location={experience.location}
							startYear={experience.start_date.split('-')[0]}
							endYear={experience.end_date.split('-')[0]}
							skills={experience.skills}
						/>
					);
				})}
			</div>
		</section>
	);
}

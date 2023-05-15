import './Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import CMSProject from './Project/Project';
import ProjectAddEditForm from './Project/AddEdit';
import CMSCareer from './Career/Career';
import CareerAddEditForm from './Career/AddEdit';
import CMSSkill from './Skill/Skill';
import SkillAddEditForm from './Skill/AddEdit';
import Login from './Login/Login';
import { fetchAuthServer } from '../../../data/database';

export default function Dashboard() {
	const [loggedIn, setLoggedIn] = useState(false);
	const [projectStatus, setProjectStatus] = useState('');
	const [skillStatus, setSkillStatus] = useState('');
	const [careerStatus, setCareerStatus] = useState('');

	// Clean up status messages after loggin in and out
	useEffect(() => {
		setCareerStatus('');
		setSkillStatus('');
		setProjectStatus('');
	}, [loggedIn]);

	useEffect(() => {
		const checkLoggedIn = async () => {
			let response = await fetchAuthServer('/api/authentication-status');
			if (response.status === 200) {
				setLoggedIn(true);
			}
		};
		checkLoggedIn();
	}, []);

	let addIcon = (
		<FontAwesomeIcon
			icon="fa-solid fa-circle-plus"
			className="dashboard__icon"
		/>
	);

	let editIcon = (
		<FontAwesomeIcon icon="fa-solid fa-pen" className="dashboard__icon" />
	);

	const logoutHandler = async () => {
		let response = await fetchAuthServer('/api/logout');
		let message = await response.text();
		if (response.status === 200) {
			setLoggedIn(false);
		}
		alert(message);
	};

	return (
		<div className="dashboard">
			<header className="dashboard__header">
				<p className="dashboard__user">
					{loggedIn ? 'Raymond Lee' : 'Visitor'}
				</p>
				<nav>
					<ul>
						<li>
							<FontAwesomeIcon
								icon="fa-solid fa-paperclip"
								className="dashboard__icon"
							/>
							<Link className="dashboard__link" to="/cms/dashboard/projects">
								Projects
							</Link>
						</li>
						<li>
							<FontAwesomeIcon
								icon="fa-solid fa-user-tie"
								className="dashboard__icon"
							/>
							<Link className="dashboard__link" to="/cms/dashboard/careers">
								Careers
							</Link>
						</li>
						<li>
							<FontAwesomeIcon
								icon="fa-solid fa-gear"
								className="dashboard__icon"
							/>
							<Link className="dashboard__link" to="/cms/dashboard/skills">
								Skills
							</Link>
						</li>
						<li>
							{loggedIn ? (
								<button
									className="cms__button dashboard__header-button"
									onClick={() => logoutHandler()}
								>
									<FontAwesomeIcon
										icon="fa-solid fa-sign-out"
										className="dashboard__icon"
									/>
									Log out
								</button>
							) : (
								<>
									<FontAwesomeIcon
										icon="fa-solid fa-sign-in"
										className="dashboard__icon"
									/>
									<Link className="dashboard__link" to="/cms/dashboard/login">
										Log in
									</Link>
								</>
							)}
						</li>
					</ul>
				</nav>
			</header>
			<main className="dashboard__main">
				<Routes>
					<Route
						index
						element={
							<CMSProject status={projectStatus} setStatus={setProjectStatus} />
						}
					></Route>
					<Route path="/projects">
						<Route
							index
							element={
								<CMSProject
									status={projectStatus}
									setStatus={setProjectStatus}
								/>
							}
						></Route>
						<Route
							path="add"
							element={
								<ProjectAddEditForm
									add={true}
									addIcon={addIcon}
									setStatus={setProjectStatus}
								/>
							}
						></Route>
						<Route
							path="edit"
							element={
								<ProjectAddEditForm
									add={false}
									editIcon={editIcon}
									setStatus={setProjectStatus}
								/>
							}
						></Route>
					</Route>
					<Route path="/careers">
						<Route
							index
							element={
								<CMSCareer status={careerStatus} setStatus={setCareerStatus} />
							}
						></Route>
						<Route
							path="add"
							element={
								<CareerAddEditForm
									add={true}
									addIcon={addIcon}
									setStatus={setCareerStatus}
								/>
							}
						></Route>
						<Route
							path="edit"
							element={
								<CareerAddEditForm
									add={false}
									editIcon={editIcon}
									setStatus={setCareerStatus}
								/>
							}
						></Route>
					</Route>
					<Route path="/skills">
						<Route
							index
							element={
								<CMSSkill status={skillStatus} setStatus={setSkillStatus} />
							}
						></Route>
						<Route
							path="add"
							element={
								<SkillAddEditForm
									add={true}
									addIcon={addIcon}
									setStatus={setSkillStatus}
								/>
							}
						></Route>
						<Route
							path="edit"
							element={
								<SkillAddEditForm
									add={false}
									editIcon={editIcon}
									setStatus={setSkillStatus}
								/>
							}
						></Route>
					</Route>
					<Route
						path="login"
						element={<Login setLoggedIn={setLoggedIn} />}
					></Route>
					<Route path="*" element={<h1>Not Found</h1>}></Route>
				</Routes>
			</main>
		</div>
	);
}

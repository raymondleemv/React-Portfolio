import './Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import CMSProject from './Project/Project';
import ProjectAddEditForm from './Project/AddEdit';
import CareerAddEditForm from './Career/AddEdit';
import { Routes, Route } from 'react-router-dom';
import CMSCareer from './Career/Career';
export default function Dashboard() {
	return (
		<div className="dashboard">
			<header className="dashboard__header">
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
							<FontAwesomeIcon
								icon="fa-solid fa-right-from-bracket"
								className="dashboard__icon"
							/>
							<Link className="dashboard__link">Log Out</Link>
						</li>
					</ul>
				</nav>
			</header>
			<main className="dashboard__main">
				<Routes>
					<Route index element={<CMSProject />}></Route>
					<Route path="/projects">
						<Route index element={<CMSProject />}></Route>
						<Route
							path="add"
							element={<ProjectAddEditForm add={true} />}
						></Route>
						<Route
							path="edit"
							element={<ProjectAddEditForm add={false} />}
						></Route>
					</Route>
					<Route path="/careers">
						<Route index element={<CMSCareer />}></Route>
						<Route
							path="add"
							element={<CareerAddEditForm add={true} />}
						></Route>
						<Route
							path="edit"
							element={<CareerAddEditForm add={false} />}
						></Route>
					</Route>
					<Route path="*" element={<h1>Not Found</h1>}></Route>
				</Routes>
			</main>
		</div>
	);
}

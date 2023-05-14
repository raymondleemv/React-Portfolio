import './CMS.css';
import Dashboard from './Dashboard/Dashboard';
import { Routes, Route } from 'react-router-dom';

export default function CMS() {
	return (
		<div className="cms">
			<Routes>
				<Route path="/dashboard/*" element={<Dashboard />}></Route>
				<Route path="*" element={<h1>Not Found</h1>}></Route>
			</Routes>
		</div>
	);
}

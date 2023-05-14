import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getCareers, deleteCareer } from '../../../../data/database';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loading from '../../../../components/Loading';

export default function CMSCareer() {
	const [data, setData] = useState([]);
	const [status, setStatus] = useState('');
	const location = useLocation();

	console.log(status);
	useEffect(() => {
		const getData = async () => {
			let careers = await getCareers();
			setData(careers);
		};
		getData();
		if (location.state) {
			setStatus(location.state.message);
			location.state = null;
		}
	}, [status]);

	let deleteCareerHandler = async (career) => {
		let data = {
			_id: career._id,
		};
		let response = await deleteCareer(data);
		console.log(await response.text());
		if (response.status === 200) {
			setStatus(`The ${career.career} career has been deleted.`);
		} else {
			setStatus(await response.text());
		}
	};

	return (
		<>
			<h1>Manage Careers</h1>
			{data.length === 0 && <Loading />}
			{status && <p>{status}</p>}
			<table className="dashboard__table">
				<tbody>
					<tr>
						<th></th>
						<th>Career</th>
						<th>Location</th>
						<th>Start Date</th>
						<th>End Date</th>
						<th>Career Type</th>
						<th>Skills</th>
						<th></th>
						<th></th>
					</tr>
					{data.map((career, i) => {
						return (
							<>
								<tr>
									<td>
										<img
											key={'career image ' + i}
											className="dashboard__image"
											src={career.photo}
											alt={'This is the ' + career.title + ' career image'}
										/>
									</td>
									<td>{career.career}</td>
									<td>{career.location}</td>
									<td>{career.start_date}</td>
									<td>{career.end_date}</td>
									<td>{career.career_type}</td>
									<td>{career.skills.join(' / ')}</td>
									<td>
										<Link
											className="dashboard__link"
											state={{ career: career }}
											to="/cms/dashboard/careers/edit"
										>
											Edit
										</Link>
									</td>
									<td>
										<button
											className="cms__button"
											onClick={() => deleteCareerHandler(career)}
										>
											Delete
										</button>
									</td>
								</tr>
							</>
						);
					})}
				</tbody>
			</table>
			<Link
				to="/cms/dashboard/careers/add"
				className="dashboard__link dashboard__button"
			>
				<FontAwesomeIcon
					icon="fa-solid fa-circle-plus"
					className="dashboard__icon"
				/>
				New Career
			</Link>
		</>
	);
}

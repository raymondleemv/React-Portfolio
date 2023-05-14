import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getSkills, deleteSkill } from '../../../../data/database';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loading from '../../../../components/Loading';
import './Skill.css';

export default function CMSSkill(props) {
	const [data, setData] = useState([]);

	useEffect(() => {
		const getData = async () => {
			let skills = await getSkills();
			setData(skills);
		};
		getData();
	}, [props.status]);

	let deleteSkillHandler = async (skill) => {
		let data = {
			_id: skill._id,
		};
		let response = await deleteSkill(data);
		console.log(await response.text());
		if (response.status === 200) {
			props.setStatus(`The ${skill.name} skill has been deleted.`);
		} else {
			props.setStatus(await response.text());
		}
	};

	return (
		<>
			<h1>Manage Skills</h1>
			{data.length === 0 && <Loading />}
			{props.status && <p>{props.status}</p>}
			<table className="dashboard__table">
				<tbody>
					<tr>
						<th></th>
						<th>Name</th>
						<th></th>
						<th></th>
					</tr>
					{data.map((skill, i) => {
						return (
							<>
								<tr>
									<td>
										<img
											key={'skill image ' + i}
											className="dashboard__image skill-image"
											src={skill.photo}
											alt={'This is the ' + skill.name + ' skill image'}
										/>
									</td>
									<td>{skill.name}</td>
									<td>
										<Link
											className="dashboard__link"
											state={{ skill: skill }}
											to="/cms/dashboard/skills/edit"
										>
											<FontAwesomeIcon
												icon="fa-solid fa-pen"
												className="dashboard__icon"
											/>
											Edit
										</Link>
									</td>
									<td>
										<button
											className="cms__button cms__table-button"
											onClick={() => deleteSkillHandler(skill)}
										>
											<FontAwesomeIcon
												icon="fa-solid fa-trash"
												className="dashboard__icon"
											/>
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
				to="/cms/dashboard/skills/add"
				className="dashboard__link dashboard__button"
			>
				<FontAwesomeIcon
					icon="fa-solid fa-circle-plus"
					className="dashboard__icon"
				/>
				New Skill
			</Link>
		</>
	);
}

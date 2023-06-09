import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProjects, deleteProject } from '../../../../data/database';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loading from '../../../../components/Loading';

export default function CMSProject(props) {
	const [data, setData] = useState([]);
	useEffect(() => {
		const getData = async () => {
			let projects = await getProjects();
			setData(projects);
		};
		getData();
	}, [props.status]);

	let deleteProjectHandler = async (project) => {
		let data = {
			_id: project._id,
		};
		let response = await deleteProject(data);
		if (response.status === 200) {
			props.setStatus(`The ${project.title} project has been deleted.`);
		} else {
			props.setStatus(await response.text());
		}
	};

	return (
		<>
			<h1>Manage Projects</h1>
			{data.length === 0 && <Loading />}
			{props.status && <p>{props.status}</p>}
			<table className="dashboard__table">
				<tbody>
					<tr>
						<th></th>
						<th>Title</th>
						<th></th>
						<th></th>
						<th></th>
					</tr>
					{data.map((project, i) => {
						return (
							<>
								<tr>
									<td>
										<img
											key={'project image ' + i}
											className="dashboard__image"
											src={project.photo}
											alt={'This is the ' + project.title + ' project image'}
										/>
									</td>
									<td>
										<Link className="dashboard__link" to={project.url}>
											{project.title}
										</Link>
									</td>
									<td>
										<Link className="dashboard__link">Image</Link>
									</td>
									<td>
										<Link
											className="dashboard__link"
											state={{ project: project }}
											to="/cms/dashboard/projects/edit"
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
											onClick={() => deleteProjectHandler(project)}
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
				to="/cms/dashboard/projects/add"
				className="dashboard__link dashboard__button"
			>
				<FontAwesomeIcon
					icon="fa-solid fa-circle-plus"
					className="dashboard__icon"
				/>
				New Project
			</Link>
		</>
	);
}

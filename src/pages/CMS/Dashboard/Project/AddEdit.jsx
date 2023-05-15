import { useLocation } from 'react-router-dom';
import { addProject, editProject } from '../../../../data/database.js';
import { useNavigate } from 'react-router-dom';

export default function ProjectAddEditForm(props) {
	const location = useLocation();
	const navigate = useNavigate();
	let submitHandler = async function (e) {
		e.preventDefault();
		let data = Object.fromEntries(new FormData(e.target));
		let response;
		if (props.add) {
			response = await addProject(data);
		} else {
			// append project id when editing project
			data._id = location.state.project._id;
			response = await editProject(data);
		}
		let message = await response.text();
		// navigate regardless to reflect status message
		navigate('/cms/dashboard/projects');
		props.setStatus(message);
	};
	return (
		<>
			<h1>{props.add ? 'New' : 'Edit'} Project</h1>
			<form
				method="POST"
				className="cms-form"
				onSubmit={(e) => submitHandler(e)}
			>
				<div className="cms-form__field">
					<label className="cms-form__label" htmlFor="title">
						Title:
					</label>
					<input
						name="title"
						defaultValue={location.state?.project.title}
					></input>
				</div>
				<div className="cms-form__field">
					<label className="cms-form__label" htmlFor="url">
						URL:
					</label>
					<input name="url" defaultValue={location.state?.project.url}></input>
				</div>
				<div className="cms-form__field">
					<label className="cms-form__label" htmlFor="github">
						GitHub:
					</label>
					<input
						name="github"
						defaultValue={location.state?.project.github}
					></input>
				</div>
				<div className="cms-form__field">
					<label className="cms-form__label" htmlFor="content">
						Content:
					</label>
					<textarea
						name="content"
						defaultValue={location.state?.project.content}
					></textarea>
				</div>
				<div className="cms-form__field">
					<label className="cms-form__label" htmlFor="photo">
						Photo:
					</label>
					<input
						name="photo"
						defaultValue={location.state?.project.photo}
					></input>
				</div>
				<button type="submit" className="cms__button">
					{props.add ? props.addIcon : props.editIcon}
					{props.add ? 'New' : 'Edit'} Project
				</button>
			</form>
		</>
	);
}

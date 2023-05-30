import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { addProject, editProject } from '../../../../data/database.js';
import UploadFile from '../../../../components/UploadFile.jsx';

export default function ProjectAddEditForm(props) {
	const location = useLocation();
	const navigate = useNavigate();

	const [image, setImage] = useState('');

	// Edit form: load image
	useEffect(() => {
		if (location.state) {
			setImage(location.state.project.photo);
		}
	}, []);

	let submitHandler = async function (e) {
		e.preventDefault();
		let data = Object.fromEntries(new FormData(e.target));
		data.photo = image;
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
						required
					></input>
				</div>
				<div className="cms-form__field">
					<label className="cms-form__label" htmlFor="url">
						URL:
					</label>
					<input
						name="url"
						defaultValue={location.state?.project.url}
						required
					></input>
				</div>
				<div className="cms-form__field">
					<label className="cms-form__label" htmlFor="github">
						GitHub:
					</label>
					<input
						name="github"
						defaultValue={location.state?.project.github}
						required
					></input>
				</div>
				<div className="cms-form__field">
					<label className="cms-form__label" htmlFor="content">
						Content:
					</label>
					<textarea
						name="content"
						defaultValue={location.state?.project.content}
						required
					></textarea>
				</div>
				<div className="cms-form__field">
					<label className="cms-form__label" htmlFor="photo">
						Photo:
					</label>
					<UploadFile name="photo" setImage={setImage} />
				</div>
				<button type="submit" className="cms__button">
					{props.add ? props.addIcon : props.editIcon}
					{props.add ? 'New' : 'Edit'} Project
				</button>
			</form>
			<img className="dashboard__preview-img" src={image}></img>
		</>
	);
}

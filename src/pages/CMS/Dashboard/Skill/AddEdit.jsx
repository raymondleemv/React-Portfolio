import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { addSkill, editSkill } from '../../../../data/database.js';
import UploadFile from '../../../../components/UploadFile.jsx';

export default function SkillAddEditForm(props) {
	const location = useLocation();
	const navigate = useNavigate();

	const [image, setImage] = useState('');

	// Edit form: load image
	useEffect(() => {
		if (location.state) {
			setImage(location.state.skill.photo);
		}
	}, []);

	let submitHandler = async function (e) {
		e.preventDefault();
		// Construct JSON Object from form
		let data = Object.fromEntries(new FormData(e.target));
		data.photo = image;
		let response;
		if (props.add) {
			response = await addSkill(data);
		} else {
			// append skill id when editing skill
			data._id = location.state.skill._id;
			response = await editSkill(data);
		}
		let message = await response.text();
		// navigate regardless to reflect status message
		navigate('/cms/dashboard/skills');
		props.setStatus(message);
	};

	return (
		<>
			<h1>{props.add ? 'New' : 'Edit'} Skill</h1>
			<form
				method="POST"
				className="cms-form"
				onSubmit={(e) => submitHandler(e)}
			>
				<div className="cms-form__field">
					<label className="cms-form__label" htmlFor="name">
						Name:
					</label>
					<input
						name="name"
						defaultValue={location.state?.skill.name}
						required
					></input>
				</div>
				<div className="cms-form__field">
					<label className="cms-form__label" htmlFor="photo">
						Photo:
					</label>
					<UploadFile name="photo" setImage={setImage} />
				</div>
				<button type="submit" className="cms__button">
					{props.add ? props.addIcon : props.editIcon}
					{props.add ? 'New' : 'Edit'} Skill
				</button>
			</form>
			<img className="dashboard__preview-img" src={image}></img>
		</>
	);
}

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { addSkill, editSkill } from '../../../../data/database.js';

export default function SkillAddEditForm(props) {
	const location = useLocation();
	const navigate = useNavigate();

	let submitHandler = async function (e) {
		e.preventDefault();
		// Construct JSON Object from form
		let data = Object.fromEntries(new FormData(e.target));
		let response;
		if (props.add) {
			response = await addSkill(data);
		} else {
			// append skill id when editing skill
			data._id = location.state.skill._id;
			response = await editSkill(data);
		}
		let message = await response.text();
		// fetch status is OK, redirect to CMS main page
		if (response.status === 200) {
			// TODO: change to CMS main page route
			navigate('/cms/dashboard/skills', {
				state: { message: message },
			});
		}
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
					<input name="name" defaultValue={location.state?.skill.name}></input>
				</div>
				<button type="submit" className="cms__button">
					{props.add ? 'New' : 'Edit'} Skill
				</button>
			</form>
		</>
	);
}

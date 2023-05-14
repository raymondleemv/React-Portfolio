import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { addCareer, editCareer, getSkills } from '../../../../data/database.js';
import { useState, useEffect } from 'react';

export default function CareerAddEditForm(props) {
	const location = useLocation();
	const navigate = useNavigate();

	const [data, setData] = useState([]);
	useEffect(() => {
		const getData = async () => {
			let skills = await getSkills();
			setData(skills);
		};
		getData();
	}, []);

	let submitHandler = async function (e) {
		e.preventDefault();
		// Construct JSON Object from form
		let data = Object.fromEntries(new FormData(e.target));
		// Form only stores the last checked skill checkbox, manually construct an array to store all checked skills
		let selectedSkills = Array.from(
			document.querySelectorAll('input[type=checkbox][name=skills]:checked'),
			(e) => e.value
		);
		// Overwrite the skills key in data with the skills array
		data.skills = selectedSkills;
		let response;
		if (props.add) {
			response = await addCareer(data);
		} else {
			// append career id when editing career
			data._id = location.state.career._id;
			response = await editCareer(data);
		}
		let message = await response.text();
		// fetch status is OK, redirect to CMS main page
		if (response.status === 200) {
			// TODO: change to CMS main page route
			navigate('/cms/dashboard/careers');
		}
		props.setStatus(message);
	};
	return (
		<>
			<h1>{props.add ? 'New' : 'Edit'} Career</h1>
			<form
				method="POST"
				className="cms-form"
				onSubmit={(e) => submitHandler(e)}
			>
				<div className="cms-form__field">
					<label className="cms-form__label" htmlFor="career">
						Career:
					</label>
					<input
						name="career"
						defaultValue={location.state?.career.career}
					></input>
				</div>
				<div className="cms-form__field">
					<label className="cms-form__label" htmlFor="location">
						Location:
					</label>
					<input
						name="location"
						defaultValue={location.state?.career.location}
					></input>
				</div>
				<div className="cms-form__field">
					<label className="cms-form__label" htmlFor="start_date">
						Start Date:
					</label>
					<input
						name="start_date"
						type="date"
						defaultValue={location.state?.career.start_date}
					></input>
				</div>
				<div className="cms-form__field">
					<label className="cms-form__label" htmlFor="end_date">
						End Date:
					</label>
					<input
						name="end_date"
						type="date"
						defaultValue={location.state?.career.end_date}
					></input>
				</div>
				<div className="cms-form__field">
					<label className="cms-form__label" htmlFor="career_type">
						Career Type:
					</label>
					<select name="career_type">
						<option
							value="Education"
							selected={location.state?.career.career_type === 'Education'}
						>
							Education
						</option>
						<option
							value="Experience"
							selected={location.state?.career.career_type === 'Education'}
						>
							Experience
						</option>
					</select>
				</div>
				<div className="cms-form__field">
					<label className="cms-form__label">Skills:</label>
					<div className="cms-form__checkbox-container">
						{data.map((skill) => {
							return (
								<label>
									<input
										name="skills"
										type="checkbox"
										value={skill.name}
										checked={location.state?.career.skills.includes(skill.name)}
										className="cms-form__checkbox"
									></input>
									{skill.name}
								</label>
							);
						})}
					</div>
				</div>
				<button type="submit" className="cms__button">
					{props.add ? props.addIcon : props.editIcon}
					{props.add ? 'New' : 'Edit'} Career
				</button>
			</form>
		</>
	);
}

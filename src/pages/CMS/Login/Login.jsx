import './Login.css';
import { useNavigate } from 'react-router-dom';

export default function Login() {
	const navigate = useNavigate();

	let submitHandler = async function (e) {
		e.preventDefault();
		const action = e.target.getAttribute('action');
		const method = e.target.getAttribute('method');
		let fetchOptions = {
			method: method,
			credentials: 'include',
		};
		if (method === 'POST') {
			fetchOptions.body = new URLSearchParams(new FormData(e.target));
		}
		let response = await fetch(action, fetchOptions);
		// fetch status is OK, redirect to CMS main page
		if (response.status === 200) {
			// TODO: change to CMS main page route
			navigate('/');
		}
	};
	return (
		<div>
			<h1>Login Page for CMS</h1>
			<form
				className="form"
				// TODO: change to auth server login route
				action="http://localhost:3001/login"
				method="POST"
				onSubmit={(e) => submitHandler(e)}
			>
				<div className="form__field">
					<label className="form__label" htmlFor="email">
						Email:
					</label>
					<input type="email" name="email" />
				</div>
				<div className="form__field">
					<label className="form__label" htmlFor="password">
						Password:
					</label>
					<input type="password" name="password" />
				</div>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}

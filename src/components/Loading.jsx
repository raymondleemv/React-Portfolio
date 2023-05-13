import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Loading() {
	return (
		<p>
			<FontAwesomeIcon
				icon="fas fa-spinner"
				className="dashboard__icon fa-pulse"
			/>
			Loading
		</p>
	);
}

import './HoverCard.css';

export default function HoverCard(props) {
	let skills = '- ';
	for (let i = 0; i < props.skills.length; ++i) {
		if (i !== props.skills.length - 1) {
			skills += props.skills[i].name + ' / ';
		} else {
			skills += props.skills[i].name;
		}
	}
	skills += ' -';
	return (
		<div className="flex-center hover-card flex-column">
			<img className="" src={props.src}></img>
			<p>{props.info.title}</p>
			{props.info.description && <p>{props.info.description}</p>}
			<p>{props.location}</p>
			<p>
				{props.startYear} - {props.endYear}
			</p>
			<p>{skills}</p>
		</div>
	);
}

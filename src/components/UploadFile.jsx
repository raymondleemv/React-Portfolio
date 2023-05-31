export default function UploadFile(props) {
	let convertBase64 = (file) => {
		return new Promise((resolve, reject) => {
			const fileReader = new FileReader();
			fileReader.readAsDataURL(file);
			fileReader.onload = () => {
				props.setImage(fileReader.result);
				resolve(fileReader.result);
			};
			fileReader.onerror = (error) => {
				reject(error);
			};
		});
	};

	let uploadImage = async (e) => {
		const file = e.target.files[0];
		const base64 = await convertBase64(file);
	};

	return (
		<input
			type="file"
			name={props.name}
			onChange={(e) => uploadImage(e)}
			accept="image/png, image/jpeg"
			required
		></input>
	);
}

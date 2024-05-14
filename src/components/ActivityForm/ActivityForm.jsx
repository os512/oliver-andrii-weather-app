export default function ActivityForm({ onAddActivity }) {
	function handleSubmit(event) {
		event.preventDefault();
		const formData = new FormData(event.target);
		const formElements = Object.fromEntries(formData);
		const formDataObj = {
			name: formElements.activity__name,
			isForGoodWeather: document.getElementById("isForGoodWeather__checkbox").checked,
		};
		onAddActivity(formDataObj);

		event.target.reset();
		event.target.elements.activity__name.focus();
	}

	return (
		<>
			<h2>Add new Activity:</h2>
			<form onSubmit={handleSubmit}>
				<label htmlFor="activity__name">Name:</label>
				<input name="activity__name" id="activity__name" type="text" autoFocus></input>

				<label htmlFor="isForGoodWeather__checkbox">Good-weather activity:</label>
				<input name="isForGoodWeather__checkbox" id="isForGoodWeather__checkbox" type="checkbox" />

				<button type="submit">Submit</button>
			</form>
		</>
	);
}

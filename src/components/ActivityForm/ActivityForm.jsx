export default function ActivityForm({ onAddActivity }) {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formElements = Object.fromEntries(formData);
    const formDataObj = {
      name: formElements.activity__name,
      isForGoodWeather: document.getElementById("isForGoodWeather__checkbox")
        .checked,
    };
    console.log(formDataObj.isForGoodWeather);
    onAddActivity(formDataObj);

    event.target.reset();
    event.target.elements.activity__name.focus();
  }

  return (
    <>
      <h2>Add new Activity:</h2>
      <form onSubmit={handleSubmit}>
        <div className="input__name__section">
          <label htmlFor="activity__name">Name:</label>
          <input
            className="input__field"
            name="activity__name"
            id="activity__name"
            type="text"
            autoFocus
          ></input>
        </div>
        <div className="input__weather__section">
          <label htmlFor="isForGoodWeather__checkbox">
            Good-weather activity:
          </label>
          <input
            className="input__checkbox"
            name="isForGoodWeather__checkbox"
            id="isForGoodWeather__checkbox"
            type="checkbox"
          />
        </div>
        <button className="form__submit__button" type="submit">
          Submit
        </button>
      </form>
    </>
  );
}

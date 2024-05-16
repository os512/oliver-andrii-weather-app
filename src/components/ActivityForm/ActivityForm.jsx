export default function ActivityForm({ onAddActivity, categories }) {
  function handleSubmit(event) {
    event.preventDefault();
    const category = document.getElementById("activity__category");
    const formData = new FormData(event.target);
    const formElements = Object.fromEntries(formData);
    const formDataObj = {
      name: formElements.activity__name,
      isForGoodWeather: document.getElementById("isForGoodWeather__checkbox")
        .checked,
      category: category.value,
    };

    onAddActivity(formDataObj);
    event.target.reset();
    category.value = "";
    event.target.elements.activity__name.focus();
  }

  return (
    <>
      <h2>Add new Activity</h2>
      <form onSubmit={handleSubmit}>
        <div className="input__category__section">
          <label htmlFor="activity__category">Category:</label>
          <input
            type="text"
            list="category-options"
            name="activity__category"
            id="activity__category"
            className="input__field"
            placeholder="Click twice or enter a new category"
            autoComplete="off"
            required
          />
          <datalist id="category-options">
            {categories.map((category, index) => (
              <option key={`${category}-${index}`} value={category} />
            ))}
          </datalist>
        </div>
        <div className="input__name__section">
          <label htmlFor="activity__name">Name:</label>
          <input
            className="input__field"
            name="activity__name"
            id="activity__name"
            type="text"
            placeholder="Enter a new activity"
            required
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
          Add activity
        </button>
      </form>
    </>
  );
}

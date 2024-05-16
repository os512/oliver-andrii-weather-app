import { useState } from "react";

export function ActivityList({
  activities,
  weather,
  condition,
  temperature,
  onDeleteActivity,
  categories,
}) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredActivities = activities.filter(
    (activity) =>
      activity.isForGoodWeather === weather &&
      (selectedCategory === "All" || activity.category === selectedCategory)
  );
  return (
    <>
      <section className="weather__icons__section">
        <div className="weather__icon__condition">{condition}</div>
        <div className="weather__icon__temperature">{temperature}&deg;C</div>
      </section>

      <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
        <option value="All">All</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <h2>{setHeader({ weather })}</h2>
      <ul className="activity__list">
        {filteredActivities.map((activity) => (
          <li key={activity.id} className="activity" id="isForGoodWeather__checkbox">
            <h3 className="activity__title">
              {activity.name} | {`Category: ${activity.category}`}
            </h3>
            <button
              className="activity__button__delete"
              onClick={() => {
                onDeleteActivity(activity.id);
              }}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

function setHeader({ weather }) {
  return weather
    ? "The weather is awesome! Go outside and:"
    : "Bad weather outside! Here's what you can do now:";
}

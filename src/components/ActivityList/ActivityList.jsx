import { useState } from "react";

export function ActivityList({
  activities,
  weather,
  condition,
  temperature,
  onDeleteActivity,
  categories,
  isLoading,
}) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredActivities = activities.filter(
    (activity) =>
      activity.isForGoodWeather === weather &&
      (selectedCategory === "All" || activity.category === selectedCategory)
  );
  return (
    <>
      {isLoading ? (
        <section className="loading__weather">
          <div className="loader" title="0">
            <svg
              version="1.1"
              id="loader-1"
              xmlns="http://www.w3.org/2000/svg"
              xlinkHref="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              width="40px"
              height="40px"
              viewBox="0 0 40 40"
              enableBackground="new 0 0 40 40"
              xmlSpace="preserve"
            >
              <path
                opacity="0.2"
                fill="#000"
                d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
    s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
    c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"
              />
              <path
                fill="#ffa500"
                d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
    C22.32,8.481,24.301,9.057,26.013,10.047z"
              >
                <animateTransform
                  attributeType="xml"
                  attributeName="transform"
                  type="rotate"
                  from="0 20 20"
                  to="360 20 20"
                  dur="0.5s"
                  repeatCount="indefinite"
                />
              </path>
            </svg>
          </div>
          <h4>Wait a second, we are checking the weather...</h4>
        </section>
      ) : (
        <section className="weather__icons__section">
          <div className="weather__icon__condition">{condition}</div>
          <div className="weather__icon__temperature">{temperature}&deg;C</div>
        </section>
      )}
      <select
        onChange={(e) => setSelectedCategory(e.target.value)}
        value={selectedCategory}
      >
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
          <li
            key={activity.id}
            className="activity"
            id="isForGoodWeather__checkbox"
          >
            <h3 className="activity__title">
              {activity.name.charAt(0).toUpperCase() +
                activity.name.slice(1).toLowerCase()}{" "}
              <span className="list__category__font">{`Category: ${activity.category}`}</span>
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

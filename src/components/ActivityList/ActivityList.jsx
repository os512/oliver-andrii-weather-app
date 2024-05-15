export function ActivityList({ activities, weather }) {
  const filteredActivities = activities.filter(
    (activity) => activity.isForGoodWeather === weather
  );
  return (
    <>
      <h2>{setHeader({ weather })}</h2>
      <ul className="activity__list">
        {filteredActivities.map((activity) => (
          <li
            key={activity.id}
            className="activity activity__${id}"
            id="isForGoodWeather__checkbox"
          >
            <h3 className="activity__title">{activity.name}</h3>
            <button className="activity__button__delete">x</button>
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

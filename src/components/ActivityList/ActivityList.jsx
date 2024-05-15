export function ActivityList({ activities }) {
  return (
    <ul className="activity__list">
      {activities.map((activity) => (
        <li key={activity.id} className="activity activity__${id}">
          <h3 className="activity__title">{activity.name}</h3>
          <button className="activity__button__delete">x</button>
        </li>
      ))}
    </ul>
  );
}

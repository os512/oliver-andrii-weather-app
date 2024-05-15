import { useState } from "react";
import ActivityForm from "./components/ActivityForm/ActivityForm";
import { uid } from "uid";
import "./App.css";

const initialActivities = [
  {
    id: 1,
    name: "badminton",
    isForGoodWeather: true,
  },
  {
    id: 2,
    name: "chess",
    isForGoodWeather: false,
  },
];

export default function App() {
  const [activities, setActivities] = useState(initialActivities);

  function handleAddActivity(newActivity) {
    setActivities([{ id: uid(), ...newActivity }, ...activities]);
  }

  return (
    <>
      <h1>Weather App</h1>
      <ActivityForm onAddActivity={handleAddActivity} />
    </>
  );
}

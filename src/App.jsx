import { useState, useEffect } from "react";
import ActivityForm from "./components/ActivityForm/ActivityForm";
import { ActivityList } from "./components/ActivityList/ActivityList";
import { uid } from "uid";
import useLocalStorageState from "use-local-storage-state";
import "./App.css";

const initialActivities = [
  {
    id: 1,
    name: "badminton",
    isForGoodWeather: true,
    category: "Sports",
  },
  {
    id: 2,
    name: "chess",
    isForGoodWeather: false,
    category: "Games",
  },
];

export default function App() {
  const [activities, setActivities] = useLocalStorageState("activities", {
    defaultValue: initialActivities,
  });
  const [categories, setCategories] = useLocalStorageState("categories", {
    defaultValue: ["Sports", "Games", "Outdoor", "Indoor"],
  });
  const [isGoodWeather, setIsGoodWeather] = useState(true);
  const [condition, setCondition] = useState("");
  const [temperature, setTemperature] = useState("");

  function handleAddActivity(newActivity) {
    setActivities([{ id: uid(), ...newActivity }, ...activities]);

    if (!categories.includes(newActivity.category)) {
      setCategories([...categories, newActivity.category]);
    }
  }

  function handleDeleteActivity(activityID) {
    setActivities(activities.filter((activity) => activity.id !== activityID));
  }

  async function fetchWeather() {
    try {
      const response = await fetch("https://example-apis.vercel.app/api/weather");
      if (!response.ok)
        throw new Error(`Failed to fetch weather data, status code: ${response.status}`);
      const weather = await response.json();

      setIsGoodWeather(weather?.isGoodWeather);
      setCondition(weather?.condition);
      setTemperature(weather?.temperature);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }

  useEffect(() => {
    const intervalId = setInterval(fetchWeather, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <h1>Weather App</h1>
      <ActivityForm onAddActivity={handleAddActivity} categories={categories} />
      <ActivityList
        activities={activities}
        weather={isGoodWeather}
        condition={condition}
        temperature={temperature}
        onDeleteActivity={handleDeleteActivity}
        categories={categories}
      />
    </>
  );
}

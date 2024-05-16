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
  {
    id: 3,
    name: "hiking",
    isForGoodWeather: true,
    category: "Outdoors",
  },
  {
    id: 4,
    name: "picnic",
    isForGoodWeather: true,
    category: "Outdoors",
  },
  {
    id: 5,
    name: "board games",
    isForGoodWeather: false,
    category: "Indoors",
  },
  {
    id: 6,
    name: "movie marathon",
    isForGoodWeather: false,
    category: "Indoors",
  },
  {
    id: 7,
    name: "soccer",
    isForGoodWeather: true,
    category: "Sports",
  },
  {
    id: 8,
    name: "swimming",
    isForGoodWeather: true,
    category: "Sports",
  },
  {
    id: 9,
    name: "video games",
    isForGoodWeather: false,
    category: "Games",
  },
  {
    id: 10,
    name: "card games",
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
  const [isLoading, setIsLoading] = useState(true); // ADDING EXTRA
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
      const response = await fetch(
        "https://example-apis-qays8irhv-neuefische.vercel.app/api/weather"
      );
      if (!response.ok)
        throw new Error(
          `Failed to fetch weather data, status code: ${response.status}`
        );
      const weather = await response.json();

      setIsGoodWeather(weather?.isGoodWeather);
      setCondition(weather?.condition);
      setTemperature(weather?.temperature);
      setIsLoading(false);
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
        isLoading={isLoading}
      />
    </>
  );
}

import { useState, useEffect } from "react";
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

	const [isGoodWeather, setIsGoodWeather] = useState(true);
	const [condition, setCondition] = useState("");
	const [temperature, setTemperature] = useState("");

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

		console.log("hello");
		return () => clearInterval(intervalId);
	}, []);

	return (
		<>
			<h1>Weather App</h1>
			<ActivityForm onAddActivity={handleAddActivity} />
		</>
	);
}

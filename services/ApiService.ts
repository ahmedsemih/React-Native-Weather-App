import moment from "moment";

export const getWeatherForecast = async (
  location: string
): Promise<Forecast> => {
  try {
    const res = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/forecast.json?key=${process.env.EXPO_PUBLIC_API_KEY}&q=${location}&days=3`
    );
    const data = await res.json();
    if (data.error) throw new Error(data.error.message);

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch weather forecast.");
  }
};

export const getCurrentWeather = async (
  location: string
): Promise<Omit<Forecast, "forecast">> => {
  try {
    const res = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/current.json?key=${process.env.EXPO_PUBLIC_API_KEY}&q=${location}`
    );
    const data = await res.json();
    if (data.error) throw new Error(data.error.message);

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch current weather.");
  }
};

export const getHistoricalWeather = async (
  location: string
): Promise<Omit<Forecast, "current">> => {
  try {
    const yesterday = moment().subtract(1, "days").format("YYYY-MM-DD");
    const fiveDaysAgoFromYesterday = moment()
      .subtract(6, "days")
      .format("YYYY-MM-DD");

    const res = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/history.json?key=${process.env.EXPO_PUBLIC_API_KEY}&q=${location}&dt=${fiveDaysAgoFromYesterday}&end_dt=${yesterday}`
    );
    const data = await res.json();
    if (data.error) throw new Error(data.error.message);

    const reversedData = data.forecast.forecastday
      .reverse()
      .map((day: ForecastDay) => ({
        date: day.date,
        data: [day],
      }));

    return reversedData;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch historical weather.");
  }
};

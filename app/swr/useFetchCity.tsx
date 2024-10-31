import axios from "axios";
import useSWR from "swr";

type TCity = {
  base: string;
  name: string;
  visibility: number;
  dt: number;
  timezone: number;
  id: number;
  cod: number;
  coord: {
    lat: number;
    lon: number
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  main: {
    temp: number,
    feels_like: number,
    temp_min: number,
    temp_max: number,
    pressure: number,
    humidity: number,
    sea_level: number,
    grnd_level: number
  };
  wind: {
    speed: number,
    deg: number
  };
  clouds: {
    all: number
  };
  sys: {
    type: number;
    id: number;
    sunrise: number;
    sunset: number;
    country: string;
  }
}

const fetcher = async (arr: number[]): Promise<TCity> => {
  const [lat, lon] = arr;
  const res = await axios.get(
    `
    https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.NEXT_PUBLIC_OPEN_MAP_API as string}
    `
  )
  return res.data
}

export default function useFetchCity(lat: number, lon: number) {
  const { data: info, error, isLoading } = useSWR([lat, lon], fetcher)
  return {
    info,
    isLoading,
    isError: error
  }
}
import useSWR from "swr"
import axios from "axios"
import { initialState } from "../(dashboaard)/page"

const fetcher = async (props: string[]): Promise<Place[]> => {
  const [city, state, country] = props;
  let queryString = city;
  if(state) queryString += `,${state}`
  if(country) queryString += `,${country}`
  const res = await axios.get(
    '/api/cities',
    {
      params: {
        queryString
      }
    }
  )
  return res.data
}

export type Place = {
  name: string;
  local_names: { [key: string]: string }[];
  lat: number;
  lon: number;
  country: string;
  state: string
}


export default function useFetchList(segments: initialState) {
  const [city, state, country] = Object.values(segments);

  const { data: info, error, isLoading } = useSWR(
    city ? [city, state, country] : null, fetcher
  )
  return {
    info,
    isLoading,
    isError: error
  }
}
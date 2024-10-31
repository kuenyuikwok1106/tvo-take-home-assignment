'use client';
import { useSearchParams } from "next/navigation"
import useFetchCity from "../../swr/useFetchCity";
import { useMemo } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { capitalize, Typography } from "@mui/material";
import CircularLoader from "../../components/CircularLoader/CircularLoader";

export default function Page() {
    const searchParams = useSearchParams();


    const cood = useMemo(() => ({
        lat: parseInt(searchParams.get('lat') as string),
        lon: parseInt(searchParams.get('lon') as string),
    }), [searchParams])

    const { info, isLoading, isError } = useFetchCity(cood.lat, cood.lon);

    if(isLoading) return <CircularLoader />
    console.log(info)


    return (
        <Box>
            <Stack>
                <Box>
                    <Typography>{`${searchParams.get('name')}, ${info?.name}, ${info?.sys.country}`}</Typography>
                    <Typography variant="h4">{Math.floor(info?.main?.temp)}°C</Typography>
                    <Typography variant="subtitle2" display="inline">
                        {`Feel like ${info?.main.feels_like}°C`}.
                        {
                            info?.weather.map((w) => (
                                <Typography key={w.id} variant="subtitle2" component="span"> {capitalize(w.description)}. </Typography>
                            ))
                        }
                    </Typography>
                </Box>
                
            </Stack>
            
        </Box>
    )
}
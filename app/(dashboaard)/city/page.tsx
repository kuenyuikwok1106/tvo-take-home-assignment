'use client';
import NavigationIcon from '@mui/icons-material/Navigation';
import SpeedIcon from '@mui/icons-material/Speed';
import { capitalize, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { notFound, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import CircularLoader from "../../components/CircularLoader/CircularLoader";
import useFetchCity from "../../swr/useFetchCity";
import Map from "./Map";
import VerticalCenterTypography from '../../components/VerticalCenterTypography/VerticalCenterTypography';

export default function Page() {
    const searchParams = useSearchParams();

    if (
        !searchParams.get('lat')
        || !searchParams.get('lon')
        || !searchParams.get('name')
    ) throw new Error("You have missing information from your URL.");

    const cood = useMemo(() => ({
        lat: parseFloat(searchParams.get('lat') as string),
        lon: parseFloat(searchParams.get('lon') as string),
    }), [searchParams])

    const { info, isLoading, isError } = useFetchCity(cood.lat, cood.lon);

    if (isLoading) return <CircularLoader />;
    if(!info || isError) notFound();

    return (
        <Box>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                <Box sx={{ maxWidth: { md: '40%' } }}>
                    <Box mb={2}>
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
                    <Box>
                        <Stack>
                            <Stack direction="row" alignItems="center" justifyContent={{ xs: "center", md: "space-between" }} spacing={2}>
                                <VerticalCenterTypography variant="subtitle1">
                                    <NavigationIcon sx={{ transform: `rotate(${info?.wind.deg}deg)` }} />{info?.wind.speed} m/s
                                </VerticalCenterTypography>
                                <VerticalCenterTypography variant="subtitle1">
                                    <SpeedIcon />{info?.main.pressure} hPa
                                </VerticalCenterTypography>
                            </Stack>
                        </Stack>
                        <Stack>
                            <Stack direction="row" alignItems="center" justifyContent={{ xs: "center", md: "space-between" }} spacing={2}>
                                <VerticalCenterTypography variant="subtitle1">
                                    Humidity: {info?.main.humidity}
                                </VerticalCenterTypography>
                                <VerticalCenterTypography variant="subtitle1">
                                    Visibility: {info?.visibility / 1000}km
                                </VerticalCenterTypography>
                            </Stack>
                        </Stack>
                    </Box>
                </Box>
                <Box flexGrow={1}>
                    <Map lat={cood.lat} lon={cood.lon} />
                </Box>
            </Stack>
        </Box>
    )
}
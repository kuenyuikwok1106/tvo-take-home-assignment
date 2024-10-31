'use client';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import CircularLoader from '../../components/CircularLoader/CircularLoader';

type TMap = {
    lat: number,
    lon: number
}

export default function Map({
    lat,
    lon: lng
}: Readonly<TMap>) {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string,
    })
    
    if (!isLoaded) return <CircularLoader />
    return (
        <GoogleMap
            mapContainerStyle={{
                width: '100%',
                minHeight: '300px',
            }}
            center={{ lat, lng }}
            zoom={13}
        >
        </GoogleMap>
    )
}
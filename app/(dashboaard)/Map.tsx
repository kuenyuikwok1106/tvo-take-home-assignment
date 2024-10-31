// 'use client';
// import TextField from '@mui/material/TextField';
// import { GoogleMap, useJsApiLoader, StandaloneSearchBox } from '@react-google-maps/api'
// import { useState, useCallback } from 'react';

// const inputStyle = {
//     boxSizing: `border-box`,
//     border: `1px solid transparent`,
//     width: `240px`,
//     height: `32px`,
//     padding: `0 12px`,
//     borderRadius: `3px`,
//     boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
//     fontSize: `14px`,
//     outline: `none`,
//     textOverflow: `ellipses`,
//     position: 'absolute',
//     top: '10px',
//     right: '10px',
// }

// const containerStyle = {
//     width: '80vw',
//     height: '30vh',
// }

// const center = {
//     lat: -3.745,
//     lng: -38.523,
// }

// export default function Map() {
//     const { isLoaded } = useJsApiLoader({
//         id: 'google-map-script',
//         googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string,
//         libraries: ['places']
//     })

//     const [map, setMap] = useState<google.maps.Map | null>(null)
//     const [places, setPlaces] = useState<any[]>([]);

//     const onLoad = useCallback((map: google.maps.Map) => {
//         // This is just an example of getting and using the map instance!!! don't just blindly copy!
//         const bounds = new window.google.maps.LatLngBounds(center)
//         map.fitBounds(bounds)
//         setMap(map)
//     }, [])

//     const onSearch = () => {
//         let service = new window.google.maps.places.PlacesService(map);
//         service.findPlaceFromQuery(request, (results, status) => {
//             if (status === google.maps.places.PlacesServiceStatus.OK) {
//                 for (var i = 0; i < results.length; i++) {
//                     coords.push(results[i]);
//                 }

//                 this.setState({
//                     center: results[0].geometry.location,
//                     coordsResult: coords
//                 });
//             }
//         });
//     }

//     return (
//         <>
//             <TextField
//                 id="outlined-basic"
//                 label="Enter your location"
//                 variant="filled"
//             />
//             {
//                 isLoaded ? (
//                     <GoogleMap
//                         mapContainerStyle={containerStyle}
//                         center={center}
//                         zoom={10}
//                         onLoad={onLoad}
//                         onUnmount={() => setMap(null)}
//                     >
//                         {/* Child components, such as markers, info windows, etc. */}
//                         <StandaloneSearchBox
//                             onPlacesChanged={(e) => console.log(e)}
//                         >
                
                
//                         </StandaloneSearchBox>
//                     </GoogleMap>
//                 ) : (
//                     <></>
//                 )
//             }
//         </>


//     )
// }
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Polyline, useMap } from 'react-leaflet';
import { useEffect, useState } from 'react';
import L, { divIcon, marker } from 'leaflet';
import './leaflet.awesome-markers';


function Map(props) {

    
    const [position, setPosition] = useState([45.06294822296754, 7.662272990156818])
    const points = props.positions;
    // values to bounds the map
    const minLat = Math.min(...points.map(p => p.lat)) - 0.003;
    const minLng = Math.min(...points.map(p => p.lng)) - 0.003;
    const maxLat = Math.max(...points.map(p => p.lat)) + 0.003;
    const maxLng = Math.max(...points.map(p => p.lng)) + 0.003;
    // custom icons for the map markers
    const startIcon = L.AwesomeMarkers.icon({ 
        icon: 'play-circle', 
        markerColor: 'green',
        prefix: 'fa',  
        iconColor: 'black',
        extraClasses: 'fas fa-2x',
        
    });
    const endIcon = L.AwesomeMarkers.icon({ 
        icon: 'stop-circle', 
        markerColor: 'red', 
        prefix: 'fa', 
        iconColor: 'black',
        extraClasses: 'fas fa-2x'
    });
    const refIcon = L.AwesomeMarkers.icon({ 
        icon: 'info-circle', 
        markerColor: 'blue', 
        prefix: 'fa', 
        iconColor: 'black',
        extraClasses: 'fas fa-2x'
    });


    // map click component 
    function LocationMarker(props) {
        const map = useMapEvents({
            async click(e) {
                setPosition([e.latlng.lat, e.latlng.lng]);
                //await props.getPosition(position);
                console.log('-----------', position, e.latlng.lat)
            },
            locationfound(e) {
                setPosition(e.latlng)
                map.flyTo(e.latlng, map.getZoom())
            },
        })

        return position === null ? null : (

            <Marker position={position}>
            </Marker>

        )
    }


    // function to center the gps track
    const evaluateCenter = () => {
        return points.reduce((sum, point) => (
            [point.lat + sum[0], point.lng + sum[1]]
        ), [0., 0.]).map(v => v / points.length);
    };


    return (
        <>
            <MapContainer center={evaluateCenter()} bounds={L.latLngBounds(L.latLng(minLat, minLng), L.latLng(maxLat, maxLng))}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/* <LocationMarker /> */}
                <Polyline
                    pathOptions={{ fillColor: 'red', color: 'blue' }}
                    positions={props.positions}
                />
                {props.startPoint.length !== 0 ? <Marker position={[props.startPoint.latitude, props.startPoint.longitude]} icon={startIcon}>
                    <Popup>
                        Start point
                    </Popup>
                </Marker> : ''}
                {props.endPoint.length !== 0 ? <Marker position={[props.endPoint.latitude, props.endPoint.longitude]} icon={endIcon}>
                    <Popup>
                        End Point
                    </Popup>
                </Marker> : ''}
            </MapContainer>
        </>
    )
}

export { Map }
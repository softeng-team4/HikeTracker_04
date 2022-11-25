import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Polyline } from 'react-leaflet'
import { useState } from "react"


function Map(props) {

    const [position, setPosition] = useState([45.06294822296754, 7.662272990156818])
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

    return (
        <>
            <MapContainer center={[props.positions[0].lat, props.positions[0].lng]} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker />
                <Polyline
                    pathOptions={{ fillColor: 'red', color: 'blue' }}
                    positions={props.positions}
                />
                {props.startPoint.length !== 0 ? <Marker position={[props.startPoint.latitude, props.startPoint.longitude]}>
                    <Popup>
                        Start point
                    </Popup>
                </Marker> : ''}
                {props.endPoint.length !== 0 ? <Marker position={[props.endPoint.latitude, props.endPoint.longitude]}>
                    <Popup>
                        End Point
                    </Popup>
                </Marker> : ''}
            </MapContainer>
        </>
    )
}

export { Map }
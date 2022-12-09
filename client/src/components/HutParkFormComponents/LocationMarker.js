import { Marker, useMapEvents } from "react-leaflet";

function LocationMarker(props) {
    const map = useMapEvents({
        async click(e) {
            props.setPosition([e.latlng.lat, e.latlng.lng]);
            //await props.getPosition(position);
            console.log('-----------', props.position, e.latlng.lat)
        },
        locationfound(e) {
            // setPosition(e.latlng)
            map.flyTo(e.latlng, map.getZoom())
        },
    });

    return props.position === null ? null : (
        <Marker position={props.position}>
        </Marker>
    );
}

export { LocationMarker }
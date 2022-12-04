import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import './leaflet.awesome-markers';
import 'leaflet/dist/leaflet.css';
import { Button } from 'react-bootstrap';


function Map(props) {


    // const [position, setPosition] = useState([45.06294822296754, 7.662272990156818])
    const points = props.positions;
    // values to bounds the map
    const minLat = Math.min(...points.map(p => p.lat)) - 0.003;
    const minLng = Math.min(...points.map(p => p.lng)) - 0.003;
    const maxLat = Math.max(...points.map(p => p.lat)) + 0.003;
    const maxLng = Math.max(...points.map(p => p.lng)) + 0.003;
    const huts = props.huts ? props.huts : [];
    const filteredHuts = !props.isDisplay ? huts.filter(h => {
        return !points.every(p => {
            const maxDistance = 5000; // max distance of a hut to the hike to be linked now is 2.5km
            const from = L.latLng([h.position._lat, h.position._long]);
            const to = L.latLng([p.lat, p.lng]);
            const d = from.distanceTo(to);
            if (d <= maxDistance) {
                return false;
            }
            return true;
        });
    }) : huts;
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
    // const refIcon = L.AwesomeMarkers.icon({
    //     icon: 'info-circle',
    //     markerColor: 'blue',
    //     prefix: 'fa',
    //     iconColor: 'black',
    //     extraClasses: 'fas fa-2x'
    // });
    const hutIcon = L.AwesomeMarkers.icon({
        icon: 'home',
        markerColor: 'blue',
        prefix: 'fa',
        iconColor: 'black',
        extraClasses: 'fas fa-2x'
    });
    // const parkIcon = L.AwesomeMarkers.icon({
    //     icon: 'parking',
    //     markerColor: 'blue',
    //     prefix: 'fa',
    //     iconColor: 'black',
    //     extraClasses: 'fas fa-2x'
    // });


    const handleHutClick = (ev) => {
        ev.preventDefault();
        const id = ev.target.id;
        console.log('I click on popup with id=' + id);
        props.handleLinkHut(id);
    };


    props.handleNohutsCloseToHike && filteredHuts.length === 0 && huts.length !== 0 && props.handleNohutsCloseToHike();


    // map click component 
    // function LocationMarker(props) {
    //     const map = useMapEvents({
    //         async click(e) {
    //             setPosition([e.latlng.lat, e.latlng.lng]);
    //             //await props.getPosition(position);
    //             console.log('-----------', position, e.latlng.lat)
    //         },
    //         locationfound(e) {
    //             setPosition(e.latlng)
    //             map.flyTo(e.latlng, map.getZoom())
    //         },
    //     })

    //     return position === null ? null : (

    //         <Marker position={position}>
    //         </Marker>

    //     )
    // }


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
                    positions={points}
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
                {filteredHuts && filteredHuts.map((h) =>
                    <Marker key={`mark_${h.name}`} position={[h.position._lat, h.position._long]} icon={hutIcon}>
                        <Popup key={`pop_${h.name}`}>
                            {props.isDisplay ?
                                <>{h.name}</>
                                :
                                <Button key={`btn_${h.name}`} variant='link' id={h.id} onClick={(ev) => handleHutClick(ev)}>{`Link ${h.name} to hike`}</Button>
                            }
                        </Popup>
                    </Marker>
                )}
            </MapContainer>
        </>
    )
}

export { Map }
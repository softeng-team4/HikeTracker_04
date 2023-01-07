import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Button } from 'react-bootstrap';
import MapIcons from './MapIcons';


function Map(props) {


    // const [position, setPosition] = useState([45.06294822296754, 7.662272990156818])
    const points = props.positions;
    const refPoints = props.positions.filter(p => p.name);
    // values to bounds the map
    const minLat = Math.min(...points.map(p => p.lat)) - 0.003;
    const minLng = Math.min(...points.map(p => p.lng)) - 0.003;
    const maxLat = Math.max(...points.map(p => p.lat)) + 0.003;
    const maxLng = Math.max(...points.map(p => p.lng)) + 0.003;
    const huts = props.huts ? props.huts : [];
    const filteredHuts = !props.isDisplay ? huts.filter(h => {
        return !points.every(p => {
            const maxDistance = 5000; // max distance of a hut to the hike to be linked now is 5km
            const from = L.latLng([h.position._lat, h.position._long]);
            const to = L.latLng([p.lat, p.lng]);
            const d = from.distanceTo(to);
            if (d <= maxDistance) {
                return false;
            }
            return true;
        });
    }) : huts;


    const handleHutClick = (ev) => {
        ev.preventDefault();
        const id = ev.target.id;
        console.log('I click on popup with id=' + id);
        props.handleHutClickOnMap(id);
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
                {props.startPoint && <Marker position={[props.startPoint.latitude, props.startPoint.longitude]} icon={MapIcons.startIcon}>
                        <Popup>
                            Start point
                        </Popup>
                    </Marker>
                }
                {props.startPoint && (props.startPoint.latitude !== points[0].lat || props.startPoint.longitude !== points[0].lng) && 
                    <Polyline pathOptions={{color: 'grey', dashArray: '4'}}
                              positions={[[props.startPoint.latitude, props.startPoint.longitude],[points[0].lat, points[0].lng]]}
                    />
                }
                {props.endPoint && <Marker position={[props.endPoint.latitude, props.endPoint.longitude]} icon={MapIcons.endIcon}>
                        <Popup>
                            End Point
                        </Popup>
                    </Marker>
                }
                {props.endPoint && (props.endPoint.latitude !== points[points.length - 1].lat || props.endPoint.longitude !== points[points.length - 1].lng) && 
                    <Polyline pathOptions={{color: 'grey', dashArray: '4', }}
                              positions={[[props.endPoint.latitude, props.endPoint.longitude],[points[points.length - 1].lat, points[points.length - 1].lng]]}
                    />
                }
                {filteredHuts && filteredHuts.map((h) =>
                    <Marker key={`mark_${h.name}${h.position._lat}${h.position._long}`} position={[h.position._lat, h.position._long]} icon={MapIcons.hutIcon}>
                        <Popup key={`pop_${h.name}`}>
                            <Button key={`btn_${h.name}`} variant='link' id={h.id} onClick={(ev) => handleHutClick(ev)}>
                                {props.isDisplay ?
                                    <>{h.name}</>
                                    :
                                    <>{`Link ${h.name} to hike`}</>
                                }
                            </Button>
                        </Popup>
                    </Marker>
                )}
                {props.parkLots && props.parkLots.map((p) => 
                    <Marker key={`mark_${p.name}${p.position._lat}${p.position._long}`} position={[p.position._lat, p.position._long]} icon={MapIcons.parkIcon}>
                        <Popup key={`pop_${p.name}`}>{p.name}</Popup>
                    </Marker>
                )}
                {refPoints.length > 0 && refPoints.map((p) => 
                    <Marker key={`mark_${p.name}${p.lat}${p.lng}`} position={[p.lat, p.lng]} icon={MapIcons.refIcon}>
                        <Popup key={`pop_${p.name}`}>{p.name}</Popup>
                    </Marker>
                )}
            </MapContainer>
        </>
    )
}

export { Map }
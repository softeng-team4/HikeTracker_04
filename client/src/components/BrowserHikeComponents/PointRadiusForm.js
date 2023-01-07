import { useState, useRef, useMemo } from "react";
import { MapContainer, TileLayer, useMapEvents, Circle, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import { Button, Col, Form } from "react-bootstrap";


const PointRadiusForm = (props) => {


    // state to hold the radius set by the user
    const radiusList = ['0.5 km', '1 km', '2 km', '5 km', '10 km', '20 km', '30 km', '50 km', '100 km', '200 km'];
    const [radius, setRadius] = useState(500);
    const circleRef = useRef(null);
    

    L.Icon.Default.mergeOptions({
        iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
        iconUrl: require("leaflet/dist/images/marker-icon.png"),
        shadowUrl: require("leaflet/dist/images/marker-shadow.png")
    });


    function DraggableCircle() {
        const map = useMapEvents({
            dragend: () => {
                props.setPointRadius((s) => ({...s, pointRadius: { coordinates: [map.getCenter().lat, map.getCenter().lng], radius: radius }}));
            }
        });
        const position = props.pointRadius.coordinates ? props.pointRadius.coordinates : props.centerMap.coordinates;
        const eventHandlers = useMemo(
            () => ({
                mousedown: () => {
                    map.dragging.disable();
                    map.addEventListener('mousemove', function (e) {
                        circleRef.current.setLatLng(e.latlng);
                    });
                },
                mouseup: () => {
                    map.removeEventListener('mousemove');
                    map.dragging.enable();
                    props.setPointRadius((s) => ({...s, pointRadius: { coordinates: [circleRef.current.getLatLng().lat, circleRef.current.getLatLng().lng], radius: radius }}));
                }
            }), [map])

        return (
            <Circle
                eventHandlers={eventHandlers}
                center={position}
                radius={radius}
                ref={circleRef}
                color={props.pointRadius.coordinates ? 'blue' : 'red'}>
                {!props.pointRadius.coordinates ? <Tooltip direction='top' permanent={true}>Move to select area!</Tooltip> : null}
            </Circle>
        )
    };


    const handleRadiusChange = (ev) => {
        ev.preventDefault();
        const r = parseFloat(ev.target.value);
        setRadius(r * 1000);
        console.log(props.centerMap);
        props.setPointRadius((s) => ({...s, pointRadius: { coordinates: props.pointRadius.coordinates ? props.pointRadius.coordinates : props.centerMap.coordinates, radius: r * 1000 }}));
    };


    return (
        <>
            <Col xl={10}>
                <MapContainer center={props.centerMap.coordinates} zoom={13}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <DraggableCircle />
                </MapContainer>
            </Col>
            <Col xl={2} className='btn-radius p-2'>
                <Button size='sm' variant='success' className="filterBtn" onClick={props.handleGeoAreaSwitch}>Switch to geo area</Button>
                <Form className='row d-flex p-2'>
                    <Form.Label>Radius:</Form.Label>
                    <Form.Select className="radiusSelection" onChange={(ev) => { handleRadiusChange(ev) }}>{radiusList.map((r) => <option key={r} value={r.split(' ')[0]}>{r}</option>)}</Form.Select>
                </Form>
            </Col>
        </>
    );
};

export default PointRadiusForm;
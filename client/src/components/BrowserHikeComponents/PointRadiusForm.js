import { useState, useRef, useMemo, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Circle } from 'react-leaflet';
import L, { map } from 'leaflet';
import { Button, Col, Form } from "react-bootstrap";


const PointRadiusForm = (props) => {


    // state to hold the radius set by the user
    const radiusList = ['0.5 km', '1 km', '2 km', '5 km', '10 km', '20 km', '30 km', '50 km', '100 km', '200 km'];
    const [radius, setRadius] = useState(500);

    L.Icon.Default.mergeOptions({
        iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
        iconUrl: require("leaflet/dist/images/marker-icon.png"),
        shadowUrl: require("leaflet/dist/images/marker-shadow.png")
    });

    function SelectCenter() {

        const map = useMapEvents({
            async click(e) {
                const pR = props.pointRadius;
                pR.radius = radius;
                console.log(pR)
                pR.coordinates = [e.latlng.lat, e.latlng.lng];
                props.setPointRadius(pR);
            },
            locationfound(e) {

            },
        })
        return !props.pointRadius.coordinates ? null : (
            <DraggableCircle />
        );
    };

    function DraggableCircle() {
        const circleRef = useRef(null)
        const map = useMapEvents({});
        const [position, setPosition] = useState(props.pointRadius.coordinates ? props.pointRadius.coordinates : props.centerMap.coordinates);
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
                    props.setPointRadius({ coordinates: [circleRef.current.getLatLng().lat, circleRef.current.getLatLng().lng], radius: radius })
                }
            }),
            [],
        )

        return (
            <Circle
                eventHandlers={eventHandlers}
                center={position}
                radius={radius}
                ref={circleRef}>

            </Circle>
        )
    };


    const handleRadiusChange = (ev) => {
        ev.preventDefault();
        const r = parseFloat(ev.target.value)
        setRadius(r * 1000);
        console.log(props.centerMap)
        props.setPointRadius({ coordinates: props.pointRadius.coordinates ? props.pointRadius.coordinates : props.centerMap.coordinates, radius: r * 1000 })
    };


    return (
        <>
            <Col xl={10}>
                <MapContainer center={props.centerMap.coordinates} zoom={11}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {/* <SelectCenter /> */}
                    {/* {props.pointRadius.coordinates !== undefined ? <DraggableCircle /> : null} */}
                    <DraggableCircle />
                </MapContainer>
            </Col>
            <Col xl={2} className='btn-radius p-2'>
                <Button size='sm' variant='success' onClick={props.handleGeoAreaSwitch}>switch to geo area</Button>
                <Form className='row d-flex p-2'>
                    <Form.Label>Radius:</Form.Label>
                    <Form.Select onChange={(ev) => { handleRadiusChange(ev) }}>{radiusList.map((r) => <option key={r} value={r.split(' ')[0]}>{r}</option>)}</Form.Select>
                </Form>
            </Col>
        </>
    );
};

export default PointRadiusForm;
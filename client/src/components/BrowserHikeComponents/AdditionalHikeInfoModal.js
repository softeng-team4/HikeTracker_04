import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Card, Button, Row, Col } from 'react-bootstrap';
import { useEffect } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import L, { Map } from 'leaflet';


const AdditionalHikeInfoModal = (props) => {

    L.Icon.Default.mergeOptions({
        iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
        iconUrl: require("leaflet/dist/images/marker-icon.png"),
        shadowUrl: require("leaflet/dist/images/marker-shadow.png")
    });


    const points = JSON.parse(props.hike.referencePoint);
    const minLat = Math.min(...points.map(p => p.lat)) - 0.003;
    const minLng = Math.min(...points.map(p => p.lng)) - 0.003;
    const maxLat = Math.max(...points.map(p => p.lat)) + 0.003;
    const maxLng = Math.max(...points.map(p => p.lng)) + 0.003;
    console.log(minLat, minLng, maxLat, maxLng)


    const evaluateCenter = () => {
        return points.reduce((sum, point) => (
            [point.lat + sum[0], point.lng + sum[1]]
        ), [0., 0.]).map(v => v / points.length);
    };


    return (
        <Modal {...props} size='lg' aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header className='m-0'>
                <Col>
                    <Modal.Title>Hike:&nbsp;{props.hike.title}</Modal.Title>
                    <MapContainer center={evaluateCenter()} bounds={L.latLngBounds(L.latLng(minLat, minLng), L.latLng(maxLat, maxLng))}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Polyline
                            pathOptions={{ fillColor: 'red', color: 'blue' }}
                            positions={points}
                        />
                        <Marker position={points[0]} fillColor='green'>
                            <Popup>
                                {(points[0].lat === points[points.length - 1].lat && points[0].lng === points[points.length - 1].lng) ? 'Start/End' : 'Start'}
                            </Popup>
                        </Marker>
                        {!(points[0].lat === points[points.length - 1].lat && points[0].lng === points[points.length - 1].lng) ?
                            <Marker position={points[points.length - 1]} fillColor='red'>
                                <Popup >
                                    End
                                </Popup>
                            </Marker> : null
                        }
                    </MapContainer>
                </Col>
            </Modal.Header>
            <Modal.Body>
                <Col><strong>Description:</strong>&nbsp;{props.hike.description}</Col>
                <Col><strong>Difficulty:</strong>&nbsp;{props.hike.difficulty}</Col>
                <Col><strong>Length:</strong>&nbsp;{(parseFloat(props.hike.length) / 1000.).toFixed(1)}&nbsp;km</Col>
                <Col><strong>Ascent:</strong>&nbsp;{parseInt(props.hike.ascent)}&nbsp;m</Col>
                <Col><strong>Estimated Time:</strong>&nbsp;{props.hike.expectedTime}&nbsp;min</Col>
            </Modal.Body>
            <Modal.Footer>
                <Button size='sm' onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AdditionalHikeInfoModal;
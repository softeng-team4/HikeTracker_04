import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Form, Button, Row, Col, Alert, Table, Container } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { useNavigate } from "react-router";
import { LocationMarker } from "../HutParkFormComponents/LocationMarker";
import { modifyReferencePoints } from '../../API';
import StaticHikeInfo from './StaticHikeInfo';
import { FaRegTrashAlt } from 'react-icons/fa';


function ReferencePointForm(props) {
    const [name, setName] = useState('');
    const [position, setPosition] = useState([45.06294822296754, 7.662272990156818]);
    const [validated, setValidated] = useState(false);
    const [refPointList, setRefPointList] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    L.Icon.Default.mergeOptions({
        iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
        iconUrl: require("leaflet/dist/images/marker-icon.png"),
        shadowUrl: require("leaflet/dist/images/marker-shadow.png")
    });

    const points = JSON.parse(props.hike.referencePoint);
    const definedRefPoint = points.filter(e => e.name !== undefined);
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
    const refIconToConfirm = L.AwesomeMarkers.icon({
        icon: 'info-circle',
        markerColor: 'red',
        prefix: 'fa',
        iconColor: 'black',
        extraClasses: 'fas fa-2x'
    });

    const evaluateCenter = () => {
        return points.reduce((sum, point) => (
            [point.lat + sum[0], point.lng + sum[1]]
        ), [0., 0.]).map(v => v / points.length);
    };

    const checkPosInsideTrack = async (r = 50) => {
        var min = 100;
        var p = undefined;
        points.forEach((pos) => {
            var from = L.latLng(position[0], position[1]);
            var to = L.latLng(pos.lat, pos.lng);
            const d = from.distanceTo(to);
            if (d <= r) {
                if (d < min) {
                    min = d;
                    p = pos;
                }
            }
        });
        if (p !== undefined) {
            console.log(position, "=>", [p.lat, p.lng], "distance: ", min);
            const rp = {
                name: name,
                lat: p.lat,
                lng: p.lng
            }
            setRefPointList(state => [...state, rp])
            return true;
        }
        return false;
    }

    const AddRefPoint = async (event) => {
        event.preventDefault();
        console.log(props.hike.id);
        const form = event.currentTarget;
        if (form.checkValidity() === false || name === '') {
            event.stopPropagation();
            setValidated(true);
            return;
        }

        const validPos = await checkPosInsideTrack();
        if (validPos) {
            console.log("Point added");
        } else {
            setErrorMessage("Invalid position. Select a position on the track");
            console.log("Invalid position. Select a position on the track");
        }
        setValidated(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Points: ", refPointList);
        handleShow();
        await modifyReferencePoints(props.hike, refPointList);
        setRefPointList([]);
        navigate('/')

    };

    useEffect(() => {
        delete L.Icon.Default.prototype._getIconUrl;

        L.Icon.Default.mergeOptions({
            iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
            iconUrl: require("leaflet/dist/images/marker-icon.png"),
            shadowUrl: require("leaflet/dist/images/marker-shadow.png")
        });
    }, [])

    useEffect(() => {
        setPosition([45.06294822296754, 7.662272990156818]);
        setName('');
        setErrorMessage('');
    }, [refPointList]);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const deleteRefPoint = (i) => {
        setRefPointList((oldRf) => oldRf.filter((o, index) => index !== i));
    }

    return (<Container fluid style={{ marginBottom: 20 }}>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>New reference points</Modal.Title>
            </Modal.Header>
            <Modal.Body>Reference points have been saved successfully!</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
        <Form noValidate validated={validated} onSubmit={handleSubmit} className="mt-3" style={{ marginBottom: 10 }}>
            <StaticHikeInfo hike={props.hike} />
            <Form.Group as={Row} className="mb-3">
                <Col sm={2}>
                    <Form.Label>Name:</Form.Label>
                </Col>
                <Col>
                    <Form.Control className='name-input' required type='text' value={name} onChange={(event) => setName(event.target.value)} />
                    <Form.Control.Feedback>Valid name!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">Please insert a name.</Form.Control.Feedback>
                </Col>
            </Form.Group>
            <Row>
                <MapContainer center={evaluateCenter()} bounds={L.latLngBounds(L.latLng(minLat, minLng), L.latLng(maxLat, maxLng))}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Polyline
                        pathOptions={{ fillColor: 'red', color: 'blue' }}
                        positions={points}
                    />
                    <Marker position={[props.hike.startPoint.latitude, props.hike.startPoint.longitude]} icon={startIcon}>
                        <Popup>
                            Start point
                        </Popup>
                    </Marker>
                    <Marker position={[props.hike.endPoint.latitude, props.hike.endPoint.longitude]} icon={endIcon}>
                        <Popup>
                            End Point
                        </Popup>
                    </Marker>
                    {definedRefPoint.map(rp =>
                        <Marker key={`mark_${rp.name}${rp.lat}${rp.lng}`} position={[rp.lat, rp.lng]} icon={refIcon}>
                            <Popup>
                                {rp.name}
                            </Popup>
                        </Marker>
                    )}
                    {refPointList.map(rp =>
                        <Marker key={`mark_${rp.name}${rp.lat}${rp.lng}`} position={[rp.lat, rp.lng]} icon={refIconToConfirm}>
                            <Popup>
                                {rp.name}
                            </Popup>
                        </Marker>
                    )}
                    <LocationMarker position={position} setPosition={setPosition} />
                </MapContainer>
            </Row>
            {errorMessage ? <Alert variant='danger'>{errorMessage}</Alert> : ''}
            <Table id="ref_point-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Latitude</th>
                        <th>Longitude</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {refPointList.map((rp, i) =>
                        <tr key={`${rp.name}${rp.lat}${rp.lng}`}>
                            <td>{rp.name}</td>
                            <td>{rp.lat}</td>
                            <td>{rp.lng}</td>
                            <td><Button variant='danger' onClick={() => deleteRefPoint(i)}><FaRegTrashAlt /></Button></td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <Button type="submit" onClick={(ev) => AddRefPoint(ev)}>Add point</Button>
            <Button variant='success' type="submit" style={{ marginLeft: 10 }}>Submit changes</Button>
        </Form>
    </Container>);
}

export default ReferencePointForm
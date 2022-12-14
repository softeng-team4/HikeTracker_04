import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Form, Button, Row, Col, Alert, Table, Container, InputGroup } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { useNavigate } from "react-router";
import { LocationMarker } from "../HutParkFormComponents/LocationMarker";
import { modifyReferencePoints } from '../../API';
import { FaRegTrashAlt } from 'react-icons/fa';
import MapIcons from '../MapComponents/MapIcons';


function ReferencePointForm(props) {
    const [name, setName] = useState('');
    const [altitude, setAltitude] = useState('');
    const [position, setPosition] = useState([45.06294822296754, 7.662272990156818]);
    const [validated, setValidated] = useState(false);
    const [refPointList, setRefPointList] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();


    const points = JSON.parse(props.hike.referencePoint);
    const definedRefPoint = points.filter(e => e.name !== undefined);
    const minLat = Math.min(...points.map(p => p.lat)) - 0.003;
    const minLng = Math.min(...points.map(p => p.lng)) - 0.003;
    const maxLat = Math.max(...points.map(p => p.lat)) + 0.003;
    const maxLng = Math.max(...points.map(p => p.lng)) + 0.003;


    const evaluateCenter = () => {
        return points.reduce((sum, point) => (
            [point.lat + sum[0], point.lng + sum[1]]
        ), [0., 0.]).map(v => v / points.length);
    };

    const checkPosInsideTrack = async (r = 50) => {
        let min = 100;
        let p = undefined;
        points.forEach((pos) => {
            let from = L.latLng(position[0], position[1]);
            let to = L.latLng(pos.lat, pos.lng);
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
                alt: altitude,
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
        if (form.checkValidity() === false || name === '' || altitude === '') {
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
        setPosition([45.06294822296754, 7.662272990156818]);
        setName('');
        setAltitude('');
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
            <Form.Group as={Row} className="mb-3">
                <Col sm={2}>
                    <Form.Label>Altitude:</Form.Label>
                </Col>
                <Col>
                    <InputGroup>
                        <Form.Control className='altitude-input' required type='number' min={0} value={altitude} onChange={(event) => setAltitude(event.target.value)} />
                        <InputGroup.Text>meters</InputGroup.Text>
                        <Form.Control.Feedback>Valid altitude!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">Please insert a valid altitude value.</Form.Control.Feedback>
                    </InputGroup>
                </Col>
            </Form.Group>
            <Row style={{ marginBottom: 10 }}>
                <MapContainer className='map_ref' center={evaluateCenter()} bounds={L.latLngBounds(L.latLng(minLat, minLng), L.latLng(maxLat, maxLng))}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Polyline
                        pathOptions={{ fillColor: 'red', color: 'blue' }}
                        positions={points}
                    />
                    <Marker position={[props.hike.startPoint.latitude, props.hike.startPoint.longitude]} icon={MapIcons.startIcon}>
                        <Popup>
                            Start point
                        </Popup>
                    </Marker>
                    <Marker position={[props.hike.endPoint.latitude, props.hike.endPoint.longitude]} icon={MapIcons.endIcon}>
                        <Popup>
                            End Point
                        </Popup>
                    </Marker>
                    {definedRefPoint.map(rp =>
                        <Marker key={`mark_${rp.name}${rp.lat}${rp.lng}`} position={[rp.lat, rp.lng]} icon={MapIcons.refIcon}>
                            <Popup>
                                {rp.name}
                            </Popup>
                        </Marker>
                    )}
                    {refPointList.map(rp =>
                        <Marker key={`mark_${rp.name}${rp.lat}${rp.lng}`} position={[rp.lat, rp.lng]} icon={MapIcons.refIconToConfirm}>
                            <Popup>
                                {rp.name}
                            </Popup>
                        </Marker>
                    )}
                    <LocationMarker position={position} setPosition={setPosition} isRef={true} />
                </MapContainer>
            </Row>
            {errorMessage ? <Alert variant='danger'>{errorMessage}</Alert> : ''}
            <Table id="ref_point-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Latitude</th>
                        <th>Longitude</th>
                        <th>Altitude</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {refPointList.map((rp, i) =>
                        <tr key={`${rp.name}${rp.lat}${rp.lng}${rp.alt}`}>
                            <td>{rp.name}</td>
                            <td>{rp.lat}</td>
                            <td>{rp.lng}</td>
                            <td>{rp.alt}</td>
                            <td><Button variant='danger' onClick={() => deleteRefPoint(i)}><FaRegTrashAlt /></Button></td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <Button type="submit" className='refAddBtn' onClick={(ev) => AddRefPoint(ev)}>Add point</Button>
            <Button variant='success' className='refConfirmBtn' type="submit" style={{ marginLeft: 10 }}>Submit changes</Button>
        </Form>
    </Container>);
}

export default ReferencePointForm
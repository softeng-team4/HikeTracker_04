import { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Table } from "react-bootstrap";
import { useNavigate } from "react-router";
import { Map } from "./Map";
import StaticHikeInfo from "./StaticHikeInfo";
import API from '../API';

function ModifyHike(props) {

    const hike = props.hike;
    const points = JSON.parse(hike.referencePoint);
    const navigate = useNavigate();
    const [hutList, setHutList] = useState([])
    const [parkingList, setParkingList] = useState([])
    const [show, setShow] = useState(false);
    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')
    const [startPoint, setStartPoint] = useState(hike.startPoint)
    const [endPoint, setEndPoint] = useState(hike.endPoint)
    const [modal, setModal] = useState('')

    useEffect(() => {
        const filters = {
            name: undefined,
            country: hike.country,
            region: hike.region,
            city: hike.city
        };
        API.hutsList(filters).then(r => setHutList(r))
        API.getAllParkingLots().then(p => setParkingList(p.filter(p => p.city === hike.city)))
    }, [hike])
    console.log('hut', hutList)
    console.log('park', parkingList)
    console.log('\\', startPoint, endPoint)


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleChange = async (event) => {
        event.preventDefault();
        const lists = hutList.concat(parkingList);
        console.log("list", lists)
        const currentStart = lists.filter((l) => l.id === start)[0];
        const currentEnd = lists.filter((l) => l.id === end)[0];
        console.log('current', currentStart.position.latitude, 'end', currentEnd)
        modal === 'start' ? setStartPoint({
            latitude: currentStart.position.latitude,
            longitude: currentStart.position.longitude,
            altitude: hike.startPoint.altitude,
            time: hike.startPoint.time,
            id: start,
            name: currentStart.name
        }) : setEndPoint({
            latitude: currentEnd.position.latitude,
            longitude: currentEnd.position.longitude,
            altitude: hike.startPoint.altitude,
            time: hike.startPoint.time,
            id: end,
            name: currentEnd.name
        })
        setModal('')
        handleClose();
    }
    const handleSubmit = async (event) => {
        event.preventDefault();

        await API.modifyHike(hike.id, hike.ascent, hike.city, hike.country,
            hike.description, hike.difficulty, endPoint, hike.expectedTime,
            hike.length, hike.referencePoint, hike.region, hike.title, startPoint,
            hike.author)
        setStart('')
        setEnd('')
        setModal('')
        navigate('/')

    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    {modal === 'start' ? <Modal.Title>Link Start Point</Modal.Title> : <Modal.Title>Link End Point</Modal.Title>}
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Col>
                                <Form.Label>Hut List:</Form.Label>
                            </Col>
                            <Col>
                                {modal === 'start' ? <Form.Select value={start} onChange={(event) => setStart(event.target.value)}>
                                    <option value={''}>Select hut</option>
                                    {hutList.map((h, i) => <option key={i} value={h.id}>{h.name}</option>)}
                                </Form.Select> :
                                    <Form.Select value={end} onChange={(event) => setEnd(event.target.value)}>
                                        <option value={''}>Select hut</option>
                                        {hutList.map((h, i) => <option key={i} value={h.id}>{h.name}</option>)}
                                    </Form.Select>}

                            </Col>
                        </Form.Group>
                        <Form.Group>
                            <Col>
                                <Form.Label>Parking Lot List:</Form.Label>
                            </Col>
                            <Col>
                                {modal === 'start' ? <Form.Select value={start} onChange={(event) => setStart(event.target.value)}>
                                    <option value={''}>Select Park</option>
                                    {parkingList.map((p, j) => <option key={j} value={p.id}>{p.name}</option>)}
                                </Form.Select> :
                                    <Form.Select value={end} onChange={(event) => setEnd(event.target.value)}>
                                        <option value={''}>Select Park</option>
                                        {parkingList.map((p, j) => <option key={j} value={p.id}>{p.name}</option>)}
                                    </Form.Select>}

                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>
                    {modal === 'start' ? <Button variant="primary" onClick={handleChange} disabled={start === ''}>
                        Confirm
                    </Button> : <Button variant="primary" onClick={handleChange} disabled={end === ''}>
                        Confirm
                    </Button>}
                </Modal.Footer>
            </Modal>
            
            <Form noValidate className="mt-3">
                <StaticHikeInfo hike={hike} />

                {hike.referencePoint !== '' ?
                    <Map positions={points} startPoint={startPoint} endPoint={endPoint} hutList={hutList} parkingList={parkingList} />
                    : <div>No Track Inside</div>}

                {/* or show the parks and huts in the map, give a button in popup to select them as start or end or ref */}

                <Table id="point-table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>latitude</th>
                            <th>longitude</th>
                            <th>altitude</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Start point</td>
                            <td>{hike.startPoint.latitude}</td>
                            <td>{hike.startPoint.longitude}</td>
                            <td>{hike.startPoint.altitude}</td>
                            <td>{startPoint.name === null ? '' : startPoint.name}</td>
                            <td><Button onClick={(event) => { handleShow(); setModal('start') }}>Link</Button></td>
                        </tr>
                        <tr>
                            <td>End point</td>
                            <td>{hike.endPoint.latitude}</td>
                            <td>{hike.endPoint.longitude}</td>
                            <td>{hike.endPoint.altitude}</td>
                            <td>{endPoint.name === null ? '' : endPoint.name}</td>
                            <td><Button onClick={(event) => { handleShow(); setModal('end') }}>Link</Button></td>
                        </tr>
                    </tbody>
                </Table>
                <Button onClick={handleSubmit}>Save Changes</Button>
            </Form>
        </>
    );
}

export { ModifyHike }
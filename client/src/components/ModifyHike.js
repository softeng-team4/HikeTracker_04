import { useEffect, useState } from "react";
import { Button, Col, Form, InputGroup, Modal, Row, Table } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router";
import { Map } from "./Map";
import API from '../API';


function ModifyHike(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const points = JSON.parse(location.state.hike.referencePoint)
    const [hutList, setHutList] = useState([])
    const [parkingList, setParkingList] = useState([])
    const [show, setShow] = useState(false);
    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')
    const [startPoint, setStartPoint] = useState(location.state.hike.startPoint)
    const [endPoint, setEndPoint] = useState(location.state.hike.endPoint)
    const [modal, setModal] = useState('')

    useEffect(() => {
        const filters = {
            name: undefined,
            country: location.state.hike.country,
            region: location.state.hike.region,
            city: location.state.hike.city
        };
        API.hutsList(filters).then(r => setHutList(r))
        API.getAllParkingLots().then(p => setParkingList(p.filter(p => p.city === location.state.hike.city)))
    }, [])
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
            altitude: location.state.hike.startPoint.altitude,
            time: location.state.hike.startPoint.time,
            id: start,
            name: currentStart.name
        }) : setEndPoint({
            latitude: currentEnd.position.latitude,
            longitude: currentEnd.position.longitude,
            altitude: location.state.hike.startPoint.altitude,
            time: location.state.hike.startPoint.time,
            id: end,
            name: currentEnd.name
        })
        setModal('')
        handleClose();
    }
    const handleSubmit = async (event) => {
        event.preventDefault();

        await props.modifyHike(location.state.hike.id, location.state.hike.ascent, location.state.hike.city, location.state.hike.country,
            location.state.hike.description, location.state.hike.difficulty, endPoint, location.state.hike.expectedTime,
            location.state.hike.length, location.state.hike.referencePoint, location.state.hike.region, location.state.hike.title, startPoint,
            location.state.hike.author)
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
                <Form.Group as={Row} className="mb-3">
                    <Col sm={2}>
                        <Form.Label>Title:</Form.Label>
                    </Col>
                    <Col>
                        <Form.Control className='title-input' value={location.state.hike.title} required disabled type='text' />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Col sm={2}>
                        <Form.Label>Difficulty:</Form.Label>
                    </Col>
                    <Col >
                        <Form.Control className='difficulty-input' required disabled value={location.state.hike.difficulty} />
                    </Col><Col sm={2}>
                        <Form.Label>Expected time:</Form.Label>
                    </Col>
                    <Col >
                        <InputGroup>
                            <Form.Control className='expTime-input' required disabled type='number' value={location.state.hike.expectedTime} />
                            <InputGroup.Text>minutes</InputGroup.Text>
                        </InputGroup>
                    </Col>

                </Form.Group>



                <Form.Group as={Row} className="mb-3">
                    <Col sm={2}>
                        <Form.Label>Length:</Form.Label>
                    </Col>
                    <Col >
                        <InputGroup>
                            <Form.Control className='length-input' required disabled type='number' value={location.state.hike.length} />
                            <InputGroup.Text>meters</InputGroup.Text>
                        </InputGroup>
                    </Col><Col sm={2}>
                        <Form.Label>Ascent:</Form.Label>
                    </Col>
                    <Col >
                        <InputGroup>
                            <Form.Control className='ascent-input' required disabled type='number' value={location.state.hike.ascent} />
                            <InputGroup.Text>meters</InputGroup.Text>
                        </InputGroup>
                    </Col>
                </Form.Group>



                <Form.Group as={Row} className="mb-3">

                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Col sm={2}>
                        <Form.Label>Country:</Form.Label>
                    </Col>
                    <Col >
                        <Form.Control className='country-input' required disabled value={location.state.hike.country} />
                    </Col>
                    <Col sm={2}>
                        <Form.Label>Region:</Form.Label>
                    </Col>
                    <Col >
                        <Form.Control className='region-input' required disabled value={location.state.hike.country} />
                    </Col>
                    <Col sm={2}>
                        <Form.Label>City:</Form.Label>
                    </Col>
                    <Col >
                        <Form.Control className='city-input' required disabled value={location.state.hike.country} />
                    </Col>
                </Form.Group>

                {location.state.referencePoint !== '' ?
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
                            <td>{location.state.hike.startPoint.latitude}</td>
                            <td>{location.state.hike.startPoint.longitude}</td>
                            <td>{location.state.hike.startPoint.altitude}</td>
                            <td>{startPoint.name === null ? '' : startPoint.name}</td>
                            <td><Button onClick={(event) => { handleShow(); setModal('start') }}>Link</Button></td>
                        </tr>
                        <tr>
                            <td>End point</td>
                            <td>{location.state.hike.endPoint.latitude}</td>
                            <td>{location.state.hike.endPoint.longitude}</td>
                            <td>{location.state.hike.endPoint.altitude}</td>
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
import { useEffect, useState } from "react";
import { Alert, Button, Col, Form, InputGroup, Row, Table } from "react-bootstrap";
import { useLocation } from "react-router";
import API from '../API';
import { Map } from "./Map";
import { FaRegTimesCircle } from 'react-icons/fa';

function ModifyHike(props) {
    const location = useLocation();
    const points = JSON.parse(location.state.hike.referencePoint)
    // state to hold list of huts
    const [hutList, setHutList] = useState([])
    // selected hut list
    const [selectedHutList, setSelectedHutList] = useState([])
    // list to hold button colors
    const buttonColor = [
        'outline-primary',
        'outline-secondary',
        'outline-success',
        'outline-danger',
        'outline-warning',
        'outline-info',
    ]

    useEffect(() => {
        const filters = {
            name: undefined,
            country: undefined,
            region: undefined,
            city: undefined
        };
        API.hutsList(filters).then(r => setHutList(r))
    }, []);


    const handleLinkHut = (hutId) => {
        let tmp = hutList.find(h => h.id === hutId);
        setSelectedHutList([...selectedHutList, tmp]);
        setHutList(hutList.filter(h => h.id !== hutId));
    };


    const handleUnlinkHut = (ev) => {
        ev.preventDefault();
        const hutId = ev.currentTarget.id;
        let tmp = selectedHutList.find(h => h.id === hutId);
        setSelectedHutList(selectedHutList.filter(h => h.id !== hutId));
        setHutList([...hutList, tmp]);
    };


    return (
        <>
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

                {selectedHutList.length === 0 && <Alert variant='danger'>To link a hut to the hike select it on the map</Alert>}
                {location.state.referencePoint !== '' ? <Map positions={points} startPoint={location.state.hike.startPoint} endPoint={location.state.hike.endPoint} huts={hutList} handleLinkHut={handleLinkHut} /> : ''}

                {/* or show the parks and huts in the map, give a button in popup to select them as start or end or ref */}

                <Table id="point-table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>latitude</th>
                            <th>longitude</th>
                            <th>altitude</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Start point</td>
                            <td>{location.state.hike.startPoint.latitude}</td>
                            <td>{location.state.hike.startPoint.longitude}</td>
                            <td>{location.state.hike.startPoint.altitude}</td>
                            <td><Button>Link</Button></td>
                        </tr>
                        <tr>
                            <td>End point</td>
                            <td>{location.state.hike.endPoint.latitude}</td>
                            <td>{location.state.hike.endPoint.longitude}</td>
                            <td>{location.state.hike.endPoint.altitude}</td>
                            <td><Button>Link</Button></td>
                        </tr>
                    </tbody>
                </Table>
                <h5>Linked huts:</h5>
                <Row>
                    <Col>
                        {selectedHutList.map((h, idx) => <Button 
                                                            id={h.id} 
                                                            key={`btn_${h.id}`} 
                                                            className='m-1' 
                                                            size='sm' 
                                                            onClick={(ev) => handleUnlinkHut(ev)} 
                                                            variant={buttonColor[idx < buttonColor.length ? idx : idx % buttonColor.length]}>
                                                                {h.name}{' '}<FaRegTimesCircle key={`times_${h.id}`}/>
                                                        </Button>)}
                    </Col>
                </Row>
            </Form>
        </>
    );
}

export { ModifyHike }
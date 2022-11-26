import { Button, Col, Form, InputGroup, Row, Table } from "react-bootstrap";
import { useLocation } from "react-router";
import { Map } from "./Map";

function ModifyHike(props) {
    const location = useLocation();
    console.log(location.state.hike.referencePoint)
    const points = JSON.parse(location.state.hike.referencePoint)

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

                {location.state.referencePoint !== '' ? <Map positions={points} startPoint={location.state.hike.startPoint} endPoint={location.state.hike.endPoint} /> : ''}
                
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

            </Form>
        </>
    );
}

export { ModifyHike }
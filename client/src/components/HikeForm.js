import { Form, Row, Col, Container, Button } from "react-bootstrap"

function HikeForm() {
    let title, length, ascent, difficulty, description
    /*
    Data format for a hike:
        • Title/label
        • Length (kms)
        • Expected time
        • Ascent (meters)
        • Difficulty (Tourist, Hiker, Professional hiker)
        • Start point *
        • End point *
        • Reference points *
        • Description
        • Point can be: address, name of location, GPS coordinates, hut, parking lot
    */
    return (
        <Container className="mt-3">
            <Form.Group as={Row} className="mb-3">
                <Col sm={2}>
                    <Form.Label>Title:</Form.Label>
                </Col>
                <Col>
                    <Form.Control type='text' value={title} defaultValue={undefined} onChange={() => { } /*(event) => { doSomething(event.target.value);} */} />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Col sm={2}>
                    <Form.Label>Length:</Form.Label>
                </Col>
                <Col >
                    <Form.Control type='number' value={length} defaultValue={undefined} min={0} onChange={() => { } /*(event) => { doSomething(event.target.value);} */} />
                </Col>
                <Col sm={1}>Km</Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Col sm={2}>
                    <Form.Label>Expected time:</Form.Label>
                </Col>
                <Col >
                    <Form.Control type='number' value={length} defaultValue={undefined} min={0} onChange={() => { } /*(event) => { doSomething(event.target.value);} */} />
                </Col>
                <Col sm={1}>minutes</Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Col sm={2}>
                    <Form.Label>Ascent:</Form.Label>
                </Col>
                <Col >
                    <Form.Control type='number' value={ascent} defaultValue={undefined} min={0} onChange={() => { } /*(event) => { doSomething(event.target.value);} */} />
                </Col>
                <Col sm={1}>m</Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Col sm={2}>
                    <Form.Label>Difficulty:</Form.Label>
                </Col>
                <Col >
                    <Form.Select value={difficulty} defaultValue={undefined} min={0} onChange={() => { } /*(event) => { doSomething(event.target.value);} */}>
                        <option value="1">Tourist</option>
                        <option value="2">Hiker</option>
                        <option value="3">Professional Hiker</option>
                    </Form.Select>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Col sm={2}>
                    <Form.Label>Start Point:</Form.Label>
                </Col>
                <Col >
                    TBD
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Col sm={2}>
                    <Form.Label>End Point:</Form.Label>
                </Col>
                <Col >
                    TBD
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Col sm={2}>
                    <Form.Label>Reference Point:</Form.Label>
                </Col>
                <Col >
                    TBD
                </Col>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Description:</Form.Label>
                <Form.Control as='textarea' rows={3} value={description} defaultValue={undefined} onChange={() => { } /*(event) => { doSomething(event.target.value);} */} />
            </Form.Group>
        </Container>
    )
}

export { HikeForm }
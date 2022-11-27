import { Col, Form, InputGroup, Row } from "react-bootstrap";


const StaticHikeInfo = (props) => {

    const hike = props.hike;

    return (
        <>
            <Form.Group as={Row} className="mb-3">
                <Col sm={2}>
                    <Form.Label>Title:</Form.Label>
                </Col>
                <Col>
                    <Form.Control className='title-input' value={hike.title} required disabled type='text' />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Col sm={2}>
                    <Form.Label>Difficulty:</Form.Label>
                </Col>
                <Col >
                    <Form.Control className='difficulty-input' required disabled value={hike.difficulty} />
                </Col><Col sm={2}>
                    <Form.Label>Expected time:</Form.Label>
                </Col>
                <Col >
                    <InputGroup>
                        <Form.Control className='expTime-input' required disabled type='number' value={hike.expectedTime} />
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
                        <Form.Control className='length-input' required disabled type='number' value={hike.length} />
                        <InputGroup.Text>meters</InputGroup.Text>
                    </InputGroup>
                </Col><Col sm={2}>
                    <Form.Label>Ascent:</Form.Label>
                </Col>
                <Col >
                    <InputGroup>
                        <Form.Control className='ascent-input' required disabled type='number' value={hike.ascent} />
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
                    <Form.Control className='country-input' required disabled value={hike.country} />
                </Col>
                <Col sm={2}>
                    <Form.Label>Region:</Form.Label>
                </Col>
                <Col >
                    <Form.Control className='region-input' required disabled value={hike.region} />
                </Col>
                <Col sm={2}>
                    <Form.Label>City:</Form.Label>
                </Col>
                <Col >
                    <Form.Control className='city-input' required disabled value={hike.city} />
                </Col>
            </Form.Group>
        </>
    );
}

export default StaticHikeInfo;
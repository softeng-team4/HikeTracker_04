import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import API from '../API';
import { useNavigate } from "react-router";
import { useState } from "react";
import { Map } from "./Map";

const StaticHikeInfo = (props) => {

    const hike = props.hike;
    const points = JSON.parse(props.hike.referencePoint);
    const navigate = useNavigate();
    const [difficulty, setDifficulty] = useState(hike.difficulty);
    const [description, setDescription] = useState(hike.description);
    const [title, setTitle] = useState(hike.title);
    const [expectedTime, setExpectedTime] = useState(hike.expectedTime);

    const handleSubmit = async (event) => {
        event.preventDefault();

        await API.UpdateHikeDescription(title, expectedTime, difficulty, description, hike.id)
        setDescription('');
        setDifficulty('');
        setExpectedTime('');
        setTitle('');
        navigate('/')

    }
    return (
        <>
            <Form.Group as={Row} className="mb-3">
                <Col sm={2}>
                    <Form.Label>Title:</Form.Label>
                </Col>
                <Col>
                    <Form.Control className='title-input' value={title} required disabled={props.status === 'static'} type='text' onChange={(event) => setTitle(event.target.value)} />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Col sm={2}>
                    <Form.Label>Difficulty:</Form.Label>
                </Col>
                <Col >
                    <Form.Select className='difficulty-input' required disabled={props.status === 'static'} value={difficulty} onChange={(event) => setDifficulty(event.target.value)}>
                        <option value={'Tourist'}>Tourist (Easy)</option>
                        <option value={'Hiker'}>Hiker (Medium)</option>
                        <option value={'Professional Hiker'}>Professional Hiker (Hard)</option>
                    </Form.Select>
                </Col><Col sm={2}>
                    <Form.Label>Expected time:</Form.Label>
                </Col>
                <Col >
                    <InputGroup>
                        <Form.Control className='expTime-input' required disabled={props.status === 'static'} type='number' value={expectedTime} min={0} onChange={(event) => setExpectedTime(event.target.value)} />
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

            <Form.Group as={Row} className="mb-3">
                <Col sm={2}>
                    <Form.Label>Description:</Form.Label>
                </Col>
                <Col >
                    <Form.Control className='region-input' required disabled={props.status === 'static'} value={description} onChange={(event) => setDescription(event.target.value)} />
                </Col>
            </Form.Group>
            {props.status === 'modify' ? props.hike.referencePoint !== '' ?
                <Map positions={points} startPoint={props.hike.startPoint} endPoint={props.hike.endPoint} />
                : <div>No Track Inside</div> : ''}
            {props.status === 'modify' ? <div align="right" style={{ marginTop: 10 }}><Button onClick={handleSubmit}>Confirm</Button></div> : ''}
        </>
    );
}

export default StaticHikeInfo;
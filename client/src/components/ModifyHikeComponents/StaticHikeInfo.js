import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import API from '../../API';
import { useLocation, useNavigate } from "react-router";
import { useState } from "react";
import HandleModifyPage from "./HandleModifyPage";
import { FaRegEdit } from 'react-icons/fa';
import Spacer from "../BrowserHikeComponents/Spacer";


const StaticHikeInfo = (props) => {

    const { state } = useLocation();

    const hike = state.hike;
    const navigate = useNavigate();
    const [difficulty, setDifficulty] = useState(hike.difficulty);
    const [description, setDescription] = useState(hike.description);
    const [title, setTitle] = useState(hike.title);
    const [expectedTime, setExpectedTime] = useState(hike.expectedTime);
    const [status, setStatus] = useState('static')

    const handleSubmit = async (event) => {
        event.preventDefault();

        await API.UpdateHikeDescription(title, expectedTime, difficulty, description, hike.id)
        setDescription('');
        setDifficulty('');
        setExpectedTime('');
        setTitle('');
        setStatus('static');
        navigate('/myHikeList')

    }

    return (
        <Container fluid>
            <Spacer height='2rem' />
            <Row>
                <Col xs={9}><h2>Hike</h2> </Col>
                <Col align="right" xs={3}><Button variant={status === 'modify' ? "secondary" : "outline-secondary"} onClick={() => setStatus('modify')}><FaRegEdit /></Button></Col>
            </Row>

            <Form>
                <Form.Group as={Row} className="mb-3">
                    <Col sm={2}>
                        <Form.Label>Title:</Form.Label>
                    </Col>
                    <Col>
                        <Form.Control className='title-input' value={title} required disabled={status === 'static'} type='text' onChange={(event) => setTitle(event.target.value)} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Col sm={2}>
                        <Form.Label>Difficulty:</Form.Label>
                    </Col>
                    <Col >
                        <Form.Select className='difficulty-input' required disabled={status === 'static'} value={difficulty} onChange={(event) => setDifficulty(event.target.value)}>
                            <option value={'Tourist'}>Tourist (Easy)</option>
                            <option value={'Hiker'}>Hiker (Medium)</option>
                            <option value={'Professional Hiker'}>Professional Hiker (Hard)</option>
                        </Form.Select>
                    </Col><Col sm={2}>
                        <Form.Label>Expected time:</Form.Label>
                    </Col>
                    <Col >
                        <InputGroup>
                            <Form.Control className='expTime-input' required disabled={status === 'static'} type='number' value={expectedTime} min={0} onChange={(event) => setExpectedTime(event.target.value)} />
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
                        <Form.Control className='region-input' required disabled={status === 'static'} value={description} onChange={(event) => setDescription(event.target.value)} />
                    </Col>
                </Form.Group>
            </Form>
            {status === 'modify' ? <Col align="right" style={{ marginBottom: 10 }}>
                <Button variant="danger" onClick={() => { setStatus('static') }}>Cancel</Button>
                <Button variant='success' style={{ marginLeft: 5 }} onClick={handleSubmit}>Confirm</Button></Col> : ''}
            <HandleModifyPage hike={hike} />

        </Container>
    );
}

export default StaticHikeInfo;
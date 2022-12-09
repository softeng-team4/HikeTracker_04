import { async } from "@firebase/util";
import { useEffect, useState } from "react"
import { Alert, Button, ButtonGroup, Card, Col, Form, Modal, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { FaRegEdit } from 'react-icons/fa';
import { RiErrorWarningLine } from 'react-icons/ri'
import { BiCheckCircle } from 'react-icons/bi'
import API from '../API';
import AuthenticationContext from "./AuthenticationContext";
import AdditionalHikeInfoModal from "./BrowserHikeComponents/AdditionalHikeInfoModal";
import Spacer from "./BrowserHikeComponents/Spacer";

function UpdateCondition(props) {
    const [hikeList, setHikeList] = useState([]);
    const [hutId, setHutId] = useState('')
    const [hike, setHike] = useState(undefined);
    const [showInfoModal, setShowInfoModal] = useState(false);
    const [show, setShow] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);
    const [condition, setCondition] = useState('')
    const [condDetails, setCondDetails] = useState('')
    const [reload, setReload] = useState(false);

    useEffect(() => {
        API.getHikesByLinkHutWorker(hutId).then(r => setHikeList(r))
    }, [hutId, reload])

    const handleShowInfo = (event) => {
        event.preventDefault();
        const id = event.target.id;
        setHike(hikeList.find((h) => h.id === id));
        setShowInfoModal(true);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        await API.updateCondition(condition, condDetails, hike.id);
        setShow(false);
        setReload(!reload);
        setShowFeedback(true);
    }
    // console.log(condition,condDetails,hike)
    return (
        <AuthenticationContext.Consumer>
            {(authObject) => (
                <>
                    <Modal show={showFeedback} onHide={() => setShowFeedback(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Update Condition Feedback</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Update Condition Success!
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={() => setShowFeedback(false)}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <Modal show={show} onHide={() => setShow(false)} backdrop="static">
                        <Modal.Header closeButton>
                            <Modal.Title>Update Condition</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group as={Row} className="mb-3">
                                    <Col sm={2}>
                                        <Form.Label>Condition:</Form.Label>
                                    </Col>
                                    <Col >
                                        <Form.Select className='condition-input' style={{ cursor: "pointer" }} required value={condition} onChange={(event) => setCondition(event.target.value)}>
                                            <option value={''}>Select condition</option>
                                            <option value={'open'}>Open</option>
                                            <option value={'closed'}>Closed</option>
                                            <option value={'partly blocked'}>Partly Blocked</option>
                                            <option value={'requires special gear'}>Requires Special Gear</option>
                                        </Form.Select>
                                    </Col>
                                    <Col md={1}>
                                        {condition === '' ? <RiErrorWarningLine style={{ color: 'red' }} /> : <BiCheckCircle style={{ color: 'green' }} />}
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3">
                                    <Col sm={2}>
                                        <Form.Label>Condition:</Form.Label>
                                    </Col>
                                    <Col>
                                        <Form.Control className='title-input' value={condDetails} required as='textarea' onChange={(event) => setCondDetails(event.target.value)} />
                                    </Col>
                                    <Col md={1}>
                                        {condDetails === '' ? <RiErrorWarningLine style={{ color: 'red' }} /> : <BiCheckCircle style={{ color: 'green' }} />}
                                    </Col>
                                </Form.Group>
                            </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="primary" disabled={condDetails === '' || condition === ''} onClick={(e) => { handleSubmit(e) }}>
                                    Confirm
                                </Button>
                                <Button variant="danger" onClick={() => setShow(false)}>
                                    Close
                                </Button>
                            </Modal.Footer>
                    </Modal>
                    {authObject.authUser && authObject.authUser.role.toLowerCase() === 'hut worker' ? setHutId(authObject.authUser.hut) : null}
                    {hikeList.length === 0 ? <div>No Hike Linked With My working Hut</div> :
                        hikeList.map((hike, idx) =>
                            <div key={`div_${idx}`}>
                                <Card key={`card_${idx}`}>
                                    <Card.Header key={`card_header_${idx}`}>
                                        <Row md={10}>
                                            <Col md={5}><b>Title:</b>&nbsp;{hike.title}</Col>
                                            <Col md={5}><b>Location:</b>&nbsp;{hike.country},&nbsp;{hike.region},&nbsp;{hike.city}</Col>
                                            <Col className='d-flex justify-content-md-end'>
                                                <ButtonGroup size='sm'>
                                                    <OverlayTrigger overlay={!authObject.authUser ? <Tooltip id="tooltip-disabled">Sign up to see more info about the hike</Tooltip> : <></>}>
                                                        <Button
                                                            id={hike.id} //TODO change with id on final version
                                                            variant='success'
                                                            onClick={authObject.authUser ? (ev) => handleShowInfo(ev) : null}>
                                                            Show more info
                                                        </Button>
                                                    </OverlayTrigger>
                                                    {authObject.authUser && authObject.authUser.role.toLowerCase() === 'hut worker' ? <Button variant='danger'
                                                        onClick={() => {
                                                            setHike(hike);
                                                            setShow(true);
                                                        }}><FaRegEdit /></Button> : null}
                                                </ButtonGroup>
                                            </Col>
                                        </Row>
                                    </Card.Header>
                                    <Card.Body className='d-flex justify-content-start' key={`card_body_${idx}`}>
                                        <Col><b>Description:</b>&nbsp;<Col className='hike-desc'>{hike.description}</Col></Col>
                                        <Col><b>Condition:</b>&nbsp;<Col className='hike-desc'>{hike.condition}</Col></Col>
                                        <Col><b>Condition Detail:</b>&nbsp;<Col className='hike-desc'>{hike.condDetails}</Col></Col>
                                    </Card.Body>
                                    <Card.Footer key={`card_footer_${idx}`}>
                                        <Row md={12}>
                                            <Col md key={`hike_diff_${idx}`}><b>Difficulty:</b>&nbsp;{hike.difficulty}</Col>
                                            <Col md key={`hike_len_${idx}`}><b>Length:</b>&nbsp;{(parseFloat(hike.length) / 1000.).toFixed(1)}&nbsp;km</Col>
                                            <Col md key={`hike_asc_${idx}`}><b>Ascent:</b>&nbsp;{parseInt(hike.ascent)}&nbsp;m</Col>
                                            <Col md key={`hike_time_${idx}`}><b>Estimated Time:</b>&nbsp;{hike.expectedTime}&nbsp;min</Col>
                                        </Row>
                                    </Card.Footer>
                                </Card>
                                <Spacer height='1rem' key={`card_spacer_${idx}`} />
                            </div>
                        )}
                    {hike ? <AdditionalHikeInfoModal hike={hike} show={showInfoModal} onHide={() => setShowInfoModal(false)} /> : null}
                </>
            )}
        </AuthenticationContext.Consumer>
    )
}

export { UpdateCondition }
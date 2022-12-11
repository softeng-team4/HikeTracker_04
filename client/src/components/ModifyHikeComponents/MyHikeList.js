import { useContext, useEffect, useState } from "react";
import API from '../../API';
import AuthenticationContext from "../AuthenticationContext";
import { Button, ButtonGroup, Card, Col, Container, Modal, OverlayTrigger, Row, Spinner, Tooltip } from "react-bootstrap";
import { FaRegEdit } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Spacer from "../BrowserHikeComponents/Spacer";
import AdditionalHikeInfoModal from "../BrowserHikeComponents/AdditionalHikeInfoModal";
import { useNavigate } from "react-router";

function MyHikeList(props) {
    const [hikeList, setHikeList] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const author = useContext(AuthenticationContext).authUser.email;
    const [showFeedback, setShowFeedback] = useState(false);
    const [hike, setHike] = useState(undefined);
    const [showInfoModal, setShowInfoModal] = useState(false);
    const [reload, setReload] = useState(false);
    const nav = useNavigate();


    useEffect(() => {
        API.getHikesByAuthor(author).then(h => setHikeList(h))
        setIsLoading(false)
    }, [hikeList.length, reload, author])

    const handleDelete = async (hikeId) => {
        await API.deleteHike(hikeId)
        setShowFeedback(true);
        setIsLoading(true)
    }

    const handleShowInfo = (event) => {
        event.preventDefault();
        const id = event.target.id;
        setHike(hikeList.find((h) => h.id === id));
        setShowInfoModal(true);
    }

    return (
        <AuthenticationContext>
            {(authObject) => (
                <>
                    <Modal show={showFeedback} onHide={() => setShowFeedback(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Delete Hike</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            You already delete this hike!
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={() => { setShowFeedback(false); setReload(!reload) }} className='close-feedback'>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    {isLoading && <div className='loading-overlay'><Spinner className='spinner' animation="border" variant="light" /></div>}
                    <Container fluid className='LinkedHikesContainer' style={isLoading ? { pointerEvents: 'none' } : null}>
                        {
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
                                                                id={hike.id}
                                                                variant='success'
                                                                onClick={authObject.authUser ? (ev) => handleShowInfo(ev) : null}>
                                                                Show more info
                                                            </Button>
                                                        </OverlayTrigger>

                                                        <Button variant='primary' onClick={() =>
                                                            (nav('/modifyHike', { state: { hike: hike } }))}><FaRegEdit /></Button>
                                                        <Button variant='danger'
                                                            onClick={() =>
                                                                (handleDelete(hike.id))}
                                                        ><RiDeleteBin6Line /></Button>
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
                        {!isLoading && hikeList.length === 0 &&
                            <Container className='emty-hikeList'><Spacer height='2rem' /><Card><h5>You haven't added any hike yet</h5></Card><Spacer height='2rem' /></Container>}
                        {hike ? <AdditionalHikeInfoModal hike={hike} show={showInfoModal} onHide={() => setShowInfoModal(false)} /> : null}
                    </Container>
                </>

            )}
        </AuthenticationContext>
    )
}

export { MyHikeList }
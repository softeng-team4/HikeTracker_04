import AuthenticationContext from "../AuthenticationContext";
import { Row, Col, Container, Card, ButtonGroup, Button, Tooltip, OverlayTrigger, Spinner, Modal } from 'react-bootstrap';
import AdditionalHikeInfoModal from './AdditionalHikeInfoModal';
import ConfirmModal from '../ModifyHikeComponents/ConfirmModal';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import API from "../../API"

const HikeCard = (props) => {
    // state to display modal with additional hike info
    const [showInfoModal, setShowInfoModal] = useState(false);
    const [hike, setHike] = useState(props.hike);
    const [showConfirm, setShowConfirm] = useState(false);
    const activeHike = props.activeHike
    const navigate = useNavigate()

    // function to display additional hike info modal
    const handleShowInfo = (event) => {
        event.preventDefault();
        const id = event.target.id;
        setHike(hike);
        setShowInfoModal(true);
    }

    const startHike = async (hikeId) => {
        await API.startHike(hikeId);
        navigate(`/active`)
    }


    const confirmModalSubmit = () => {
        setShowConfirm(s => !s);
        
        startHike(hike.id)
    }

    return (
        <AuthenticationContext.Consumer>
            {(authObject) => (
                <>
                    <Card key={`card`}>
                        <Card.Header key={`card_header`}>
                            <Row>
                                <Col md={8}>
                                    <Row>
                                        <Col lg={6}><b>Title:</b>&nbsp;{hike.title}</Col>
                                        <Col lg={6}><b>Location:</b>&nbsp;{hike.country},&nbsp;{hike.region},&nbsp;{hike.city}</Col>
                                    </Row>
                                </Col>
                                <Col md={4}>
                                    <Col className='d-flex justify-content-md-end'>
                                        <OverlayTrigger overlay={!authObject.authUser ? <Tooltip id="tooltip-disabled">Sign up to see more info about the hike</Tooltip> : <></>}>
                                            <Button
                                                id={hike.id}
                                                size='sm'
                                                variant='success'
                                                onClick={authObject.authUser ? (ev) => handleShowInfo(ev) : null}>
                                                Show more info
                                            </Button>
                                        </OverlayTrigger>
                                        {authObject.authUser && authObject.authUser.role.toLowerCase() === 'hiker' && !activeHike &&
                                            <Button id={hike.id}
                                                size='sm'
                                                variant='primary'
                                                onClick={() => {
                                                    setHike(hike);
                                                    setShowConfirm(true)
                                                }}>
                                                Start hike
                                            </Button>}
                                    </Col>
                                </Col>
                            </Row>
                        </Card.Header>
                        <Card.Body className='d-flex justify-content-start' key={`card_body`}>
                            <Col><b>Description:</b>&nbsp;<Col className='hike-desc'>{hike.description}</Col></Col>
                        </Card.Body>
                        <Card.Footer key={`card_footer`}>
                            <Row md={12}>
                                <Col md={6} lg={3} key={`hike_diff`}><b>Difficulty:</b>&nbsp;{hike.difficulty}</Col>
                                <Col md={6} lg={3} key={`hike_len`}><b>Length:</b>&nbsp;{(parseFloat(hike.length) / 1000.).toFixed(1)}&nbsp;km</Col>
                                <Col md={6} lg={3} key={`hike_asc`}><b>Ascent:</b>&nbsp;{parseInt(hike.ascent)}&nbsp;m</Col>
                                <Col md={6} lg={3} key={`hike_time`}><b>Estimated Time:</b>&nbsp;{hike.expectedTime}&nbsp;min</Col>
                            </Row>
                        </Card.Footer>
                    </Card>
                    <AdditionalHikeInfoModal hike={hike} show={showInfoModal} onHide={() => setShowInfoModal(false)} />
                    <ConfirmModal show={showConfirm} onSubmit={confirmModalSubmit} onAbort={() => { setShowConfirm(false); }} />
                </>
            )}
        </AuthenticationContext.Consumer>
    );
}

export default HikeCard
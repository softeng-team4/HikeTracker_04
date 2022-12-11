import { useContext, useEffect, useState } from "react";
import API from '../../API';
import AuthenticationContext from "../AuthenticationContext";
import { Button, ButtonGroup, Card, Col, Container, Modal, OverlayTrigger, Row, Spinner, Toast, Tooltip } from "react-bootstrap";
import { FaRegEdit } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Spacer from "../BrowserHikeComponents/Spacer";
import AdditionalHikeInfoModal from "../BrowserHikeComponents/AdditionalHikeInfoModal";
import { useNavigate } from "react-router";
import HikePageHandler from "../BrowserHikeComponents/HickePageHendler";
import ConfirmModal from "./ConfirmModal";

function MyHikeList() {


    // state to hold list of hikes
    const [hikeList, setHikeList] = useState([])
    //state to wait server response for retrieve hikeList
    const [isLoading, setIsLoading] = useState(true);
    // state to hold current page index
    const [index, setIndex] = useState(0);
    // number of hikes visulaized for page
    const hike4page = 4
    // state to hold list of hikes of current page
    const [subHikeList, setSubHikeList] = useState(hikeList.slice(0, hike4page));
    const [hikeIdToDelete, setHikeIdToDelete] = useState(undefined);
    const author = useContext(AuthenticationContext).authUser.email;
    const [showConfirm, setShowConfirm] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);
    const [hike, setHike] = useState(undefined);
    const [showInfoModal, setShowInfoModal] = useState(false);
    const [reload, setReload] = useState(false);
    const nav = useNavigate();
    // function to change page displayed
    const handlePageChange = (idx) => {
        setIndex(idx);
        setSubHikeList(hikeList.slice(idx * hike4page, idx * hike4page + hike4page));
    };
    // function to retrieve page index
    const computeIndex = () => parseInt(hikeList.length / hike4page) + (hikeList.length % hike4page ? 1 : 0);


    useEffect(() => {
        API.getHikesByAuthor(author).then(h => {
            setHikeList(h);
            setSubHikeList(h.slice(0, hike4page));
        });
        setIsLoading(false);
    }, [reload, author])


    const handleDelete = async () => {
        console.log(hikeIdToDelete)
        await API.deleteHike(hikeIdToDelete);
        setIndex(0);
        setHikeIdToDelete();
        setIsLoading(true);
        setShowFeedback(true);
        setReload(s => !s);
    }


    const handleShowInfo = (event) => {
        event.preventDefault();
        const id = event.target.id;
        setHike(hikeList.find((h) => h.id === id));
        setShowInfoModal(true);
    }


    return (
        <AuthenticationContext.Consumer>
            {(authObject) => (
                <>
                    {isLoading ? <div className='loading-overlay'><Spinner className='spinner' animation="border" variant="light" /></div> :
                        <>
                            <Container fluid className='LinkedHikesContainer' style={isLoading ? { pointerEvents: 'none' } : null}>
                                <Spacer height='2rem' />
                                <h2>My Hikes</h2>
                                <Spacer height='1rem' />
                                <Toast bg='danger' show={showFeedback} onClose={() => setShowFeedback(false)} delay={3000} autohide>
                                    <Toast.Body>Hike deleted!</Toast.Body>
                                </Toast>
                                <Spacer height='1rem' />
                                {
                                    subHikeList.map((hike, idx) =>
                                        <div key={`div_${idx}`}>
                                            <Card key={`card_${idx}`}>
                                                <Card.Header key={`card_header_${idx}`}>
                                                    <Row>
                                                        <Col md={8}>
                                                            <Row>
                                                                <Col lg={6}><b>Title:</b>&nbsp;{hike.title}</Col>
                                                                <Col lg={6}><b>Location:</b>&nbsp;{hike.country},&nbsp;{hike.region},&nbsp;{hike.city}</Col>
                                                            </Row>
                                                        </Col>
                                                        <Col md={4}>
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
                                                                        onClick={() => { setHikeIdToDelete(hike.id); setShowConfirm(true) }}
                                                                    ><RiDeleteBin6Line /></Button>
                                                                </ButtonGroup>
                                                            </Col>
                                                        </Col>
                                                    </Row>
                                                </Card.Header>
                                                <Card.Body key={`card_body_${idx}`}>
                                                    <Row className='d-flex justify-content-start'><Col><b>Description:</b>&nbsp;{hike.description}</Col></Row>
                                                    <Row className='d-flex justify-content-start'>
                                                        <Col lg={4}><b>Condition:</b>&nbsp;{hike.condition}</Col>
                                                        <Col><b>Condition Detail:</b>&nbsp;{hike.condDetails}</Col>
                                                    </Row>
                                                </Card.Body>
                                                <Card.Footer key={`card_footer_${idx}`}>
                                                    <Row md={12}>
                                                        <Col md={6} lg={3} key={`hike_diff_${idx}`}><b>Difficulty:</b>&nbsp;{hike.difficulty}</Col>
                                                        <Col md={6} lg={3} key={`hike_len_${idx}`}><b>Length:</b>&nbsp;{(parseFloat(hike.length) / 1000.).toFixed(1)}&nbsp;km</Col>
                                                        <Col md={6} lg={3} key={`hike_asc_${idx}`}><b>Ascent:</b>&nbsp;{parseInt(hike.ascent)}&nbsp;m</Col>
                                                        <Col md={6} lg={3} key={`hike_time_${idx}`}><b>Estimated Time:</b>&nbsp;{hike.expectedTime}&nbsp;min</Col>
                                                    </Row>
                                                </Card.Footer>
                                            </Card>
                                            <Spacer height='1rem' key={`card_spacer_${idx}`} />
                                        </div>
                                    )}
                                {!isLoading && hikeList.length === 0 &&
                                    <Container className='emty-hikeList'><Spacer height='2rem' /><Card><h5>You haven't added any hike yet</h5></Card><Spacer height='2rem' /></Container>}
                                <HikePageHandler index={index} pageNum={computeIndex()} handlePageChange={handlePageChange} />
                                <ConfirmModal show={showConfirm} onSubmit={() => { setShowConfirm(s => !s); handleDelete(hikeIdToDelete) }} onAbort={() => { setShowConfirm(false); setHikeIdToDelete() }} />
                                {hike ? <AdditionalHikeInfoModal hike={hike} show={showInfoModal} onHide={() => setShowInfoModal(false)} /> : null}
                            </Container>
                        </>
                    }
                </>
            )}
        </AuthenticationContext.Consumer>
    )
}

export { MyHikeList }
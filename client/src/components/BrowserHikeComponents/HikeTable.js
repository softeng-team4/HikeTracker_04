import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Container, Card, ButtonGroup, Button, Tooltip, OverlayTrigger, Spinner, Modal, Alert, Toast, ToastContainer } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import Spacer from './Spacer';
import FilterForm from './FilterForm';
import AuthenticationContext from '../AuthenticationContext';
import HikePageHandler from './HickePageHendler';
import AdditionalHikeInfoModal from './AdditionalHikeInfoModal';
import API from '../../API';
import { async } from '@firebase/util';
import ConfirmModal from '../ModifyHikeComponents/ConfirmModal';

const HikeTable = () => {


    // state to hold list of hikes
    const [hikeList, setHikeList] = useState([]);
    //state to wait server response for retrieve hikeList
    const [isLoading, setIsLoading] = useState(true);
    // state to hold current page index
    const [index, setIndex] = useState(0);
    // number of hikes visulaized for page
    const hike4page = 4
    // state to hold list of hikes of current page
    const [subHikeList, setSubHikeList] = useState(hikeList.slice(0, hike4page));
    // state to hold the selected hike
    const [hike, setHike] = useState(undefined);
    // state to display modal with additional hike info
    const [showInfoModal, setShowInfoModal] = useState(false);
    // state to hold user email --> author of hike
    const user = useContext(AuthenticationContext).authUser;
    const author = user ? user.email : undefined;
    // state to hold touch swipe
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    // function to retrieve page index
    const computeIndex = () => parseInt(hikeList.length / hike4page) + (hikeList.length % hike4page ? 1 : 0);

    const [showConfirm, setShowConfirm] = useState(false);
    const [message, setMessage] = useState('');

    // effect to select the hikes to show based on page number
    useEffect(() => {
        setSubHikeList(hikeList.slice(0, hike4page));
        setIsLoading(false);
        setIndex(0);
    }, [hikeList]);


    // function to change page displayed
    const handlePageChange = (idx) => {
        setIndex(idx);
        setSubHikeList(hikeList.slice(idx * hike4page, idx * hike4page + hike4page));
    };


    // function to display additional hike info modal
    const handleShowInfo = (event) => {
        event.preventDefault();
        const id = event.target.id;
        setHike(hikeList.find((h) => h.id === id));
        setShowInfoModal(true);
    }


    const handleTouchStart = (e) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (touchStart - touchEnd > 150) {
            // do your stuff here for left swipe
            handlePageChange(index !== computeIndex() - 1 ? index + 1 : 0);
        }

        if (touchStart - touchEnd < -150) {
            // do your stuff here for right swipe
            handlePageChange(index !== 0 ? index - 1 : computeIndex() - 1);

        }
    };

    const startHike = async (hikeId) => {
        try {
            await API.startHike(hikeId);
            setMessage('')
        } catch (e) {
            setMessage(e);
        }


    }

    return (
        <AuthenticationContext.Consumer>
            {(authObject) => (
                <>
                    {isLoading && <div className='loading-overlay'><Spinner className='spinner' animation="border" variant="light" /></div>}
                    <Container fluid className='BrowserHikesContainer' style={isLoading ? { pointerEvents: 'none' } : null}>
                        <Spacer height='2rem' />
                        <h2>Explore Hike</h2>
                        <FilterForm setHikeList={setHikeList} setIsLoading={setIsLoading} />
                        {message ? <div className='loading-overlay'><ToastContainer className="startedWarning p-3" position={'middle-center'}>
                            <Toast bg='warning' onClose={() => setMessage('')} >
                                <Toast.Header >
                                    <strong className="me-auto">Oops!</strong>
                                    <small>warning</small>
                                </Toast.Header>
                                <Toast.Body>{message}</Toast.Body>
                            </Toast>
                        </ToastContainer> </div> : ''}

                        {subHikeList.map((hike, idx) =>
                            <div key={`div_${idx}`} onTouchStart={e => handleTouchStart(e)} onTouchMove={e => handleTouchMove(e)} onTouchEnd={handleTouchEnd}>
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
                                                        <OverlayTrigger overlay={!authObject.authUser ? <Tooltip id="tooltip-disabled">Sign up to see more info about the hike</Tooltip> : <></>}>
                                                            <Button
                                                                className='showInfoBtn'
                                                                id={hike.id}
                                                                size='sm'
                                                                variant='success'
                                                                onClick={authObject.authUser ? (ev) => handleShowInfo(ev) : null}>
                                                                Show more info
                                                            </Button>
                                                        </OverlayTrigger>
                                                </Col>
                                            </Col>
                                        </Row>
                                    </Card.Header>
                                    <Card.Body className='d-flex justify-content-start' key={`card_body_${idx}`}>
                                        <Col><b>Description:</b>&nbsp;<Col className='hike-desc'>{hike.description}</Col></Col>
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
                        {!isLoading && hikeList.length === 0 && <Container className='emty-hikeList'><Spacer height='2rem' /><Card><h5>There are no hikes for the selected filters!</h5></Card><Spacer height='2rem' /></Container>}
                        <HikePageHandler index={index} pageNum={computeIndex()} handlePageChange={handlePageChange} />
                        <ConfirmModal show={showConfirm} onSubmit={() => { setShowConfirm(s => !s); startHike(hike.id) }} onAbort={() => { setShowConfirm(false); }} />

                    </Container>
                    {hike && <AdditionalHikeInfoModal hike={hike} show={showInfoModal} onHide={() => setShowInfoModal(false)} />}
                </>
            )}
        </AuthenticationContext.Consumer>
    );
};

export default HikeTable;
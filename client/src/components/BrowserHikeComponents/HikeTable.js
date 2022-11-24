import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Container, Card, Button, Tooltip, OverlayTrigger, Spinner } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Spacer from './Spacer';
import FilterForm from './FilterForm';
import AuthenticationContext from '../AuthenticationContext';
import HikePageHandler from './HickePageHendler';
import AdditionalHikeInfoModal from './AdditionalHikeInfoModal';


const HikeTable = () => {


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
    // state to hold the selected hike id
    const [hikeId, setHikeId] = useState(undefined);
    // state to display modal with additional hike info
    const [showInfoModal, setShowInfoModal] = useState(false);
    // function to retrieve page index
    const computeIndex = () => parseInt(hikeList.length / hike4page) + (hikeList.length % hike4page ? 1 : 0)


    // effect to select the hikes to show based on page number
    useEffect(() => {
        setSubHikeList(hikeList.slice(0, hike4page));
        setIsLoading(false);
    }, [hikeList]);


    // function to change page displayed
    const handlePageChange = (idx) => {
        setIndex(idx);
        setSubHikeList(hikeList.slice(idx * hike4page, idx * hike4page + hike4page));
    };


    // function to display additional hike info modal
    const handleShowInfo = (event) => {
        event.preventDefault();
        setHikeId(event.target.key);
        setShowInfoModal(true);
    }


    return (
        <AuthenticationContext.Consumer>
            {(authObject) => (
                <>
                    {isLoading && <div className='loading-overlay'><Spinner className='spinner' animation="border" variant="light" /></div>}
                    <Container fluid className='BrowserHikesContainer'>
                        <Spacer height='2rem' />
                        <h2>Explore Hike</h2>
                        <FilterForm setHikeList={setHikeList} setIsLoading={setIsLoading} />
                        {subHikeList.map((hike, idx) =>
                            <div key={`div_${idx}`}>
                                <Card key={`card_${idx}`}>
                                    <Card.Header key={`card_header_${idx}`}>
                                        <Row md={10}>
                                            <Col md={5}><b>Title:</b>&nbsp;{hike.title}</Col>
                                            <Col md={5}><b>Location:</b>&nbsp;{hike.country},&nbsp;{hike.region},&nbsp;{hike.city}</Col>
                                            <Col className='d-flex justify-content-md-end'>
                                                <OverlayTrigger overlay={!authObject.authUser ? <Tooltip id="tooltip-disabled">Sign up to see more info about the hike</Tooltip> : <></>}>
                                                    <Button
                                                        key={hike.id}
                                                        variant='success'
                                                        size='sm'
                                                        onClick={authObject.authUser ? (ev) => handleShowInfo(ev) : null}>
                                                        Show more info
                                                    </Button>
                                                </OverlayTrigger>
                                            </Col>
                                        </Row>
                                    </Card.Header>
                                    <Card.Body className='d-flex justify-content-start' key={`card_body_${idx}`}>
                                        <Col><b>Description:</b>&nbsp;<Col className='hike-desc'>{hike.description}</Col></Col>
                                    </Card.Body>
                                    <Card.Footer key={`card_footer_${idx}`}>
                                        <Row md={12}>
                                            <Col md key={`hike_diff_${idx}`}><b>Difficulty:</b>&nbsp;{hike.difficulty}</Col>
                                            <Col md key={`hike_len_${idx}`}><b>Length:</b>&nbsp;{hike.length}&nbsp;km</Col>
                                            <Col md key={`hike_asc_${idx}`}><b>Ascent:</b>&nbsp;{hike.ascent}&nbsp;m</Col>
                                            <Col md key={`hike_time_${idx}`}><b>Estimated Time:</b>&nbsp;{hike.expectedTime}&nbsp;min</Col>
                                            {/* {authObject.authUser && authObject.authUser.role.toLowerCase() === 'local guide' ? //TODO modify button : null} */}
                                        </Row>
                                    </Card.Footer>
                                </Card>
                                <Spacer height='1rem' key={`card_spacer_${idx}`} />
                            </div>
                        )}
                        {!isLoading && hikeList.length === 0 ? <Container className='emty-hikeList'><Spacer height='2rem' /><Card><h5>There are no hikes for the selected filters!</h5></Card><Spacer height='2rem' /></Container> : null}
                        <HikePageHandler index={index} pageNum={computeIndex()} handlePageChange={handlePageChange} />
                    </Container>
                    <AdditionalHikeInfoModal hikeId={hikeId} show={showInfoModal} onHide={() => setShowInfoModal(false)} />
                </>
            )}
        </AuthenticationContext.Consumer>
    );
};

export default HikeTable;
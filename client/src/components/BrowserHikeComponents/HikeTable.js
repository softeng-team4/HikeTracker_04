import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Container, Card, ButtonGroup, Button, Tooltip, OverlayTrigger, Spinner } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Spacer from './Spacer';
import FilterForm from './FilterForm';
import AuthenticationContext from '../AuthenticationContext';
import HikePageHandler from './HickePageHendler';
import AdditionalHikeInfoModal from './AdditionalHikeInfoModal';
import { FaRegEdit } from 'react-icons/fa';


const HikeTable = () => {


    // state to hold list of hikes
    const [hikeList, setHikeList] = useState([]);
    // state to hold a copy of hike list
    const [hikeListCopy, setHikeListCopy] = useState([]);
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
    const [author, setAuthor] = useState(undefined);
    // state to allow a local guide to modify his tasks
    const [filterByEmail, setFilterByEmail] = useState(false);
    // function to retrieve page index
    const computeIndex = () => parseInt(hikeList.length / hike4page) + (hikeList.length % hike4page ? 1 : 0)


    // effect to select the hikes to show based on page number
    useEffect(() => {
        setSubHikeList(hikeList.slice(0, hike4page));
        setIsLoading(false);
    }, [hikeList]);

    const handleEmailFilter = () => {
        const hl = hikeList;
        if (!filterByEmail) {
            setHikeListCopy(hikeList);
            setHikeList(hl.filter((h) => (h.author === author)));
            setFilterByEmail(true);
        } else {
            setHikeList(hikeListCopy);
            setFilterByEmail(false);
        }
    };


    // function to change page displayed
    const handlePageChange = (idx) => {
        setIndex(idx);
        setSubHikeList(hikeList.slice(idx * hike4page, idx * hike4page + hike4page));
    };


    // function to display additional hike info modal
    const handleShowInfo = (event) => {
        event.preventDefault();
        const id = event.target.id;
        setHike(hikeList.find((h) => h.id === id)); // TODO change with id on final version
        setShowInfoModal(true);
    }


    return (
        <AuthenticationContext.Consumer>
            {(authObject) => (
                <>
                    {isLoading && <div className='loading-overlay'><Spinner className='spinner' animation="border" variant="light" /></div>}
                    {authObject.authUser && authObject.authUser.email ? setAuthor(authObject.authUser.email) : null}
                    <Container fluid className='BrowserHikesContainer' style={isLoading ? {pointerEvents: 'none'} : null}>
                        <Spacer height='2rem' />
                        <h2>Explore Hike</h2>
                        <FilterForm setHikeList={setHikeList} isLoading={isLoading} setIsLoading={setIsLoading} handleEmailFilter={handleEmailFilter} />
                        {subHikeList.map((hike, idx) =>
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
                                                    {filterByEmail && authObject.authUser && authObject.authUser.role.toLowerCase() === 'local guide' ? <Button variant='danger'><FaRegEdit /></Button> : null}
                                                </ButtonGroup>
                                            </Col>
                                        </Row>
                                    </Card.Header>
                                    <Card.Body className='d-flex justify-content-start' key={`card_body_${idx}`}>
                                        <Col><b>Description:</b>&nbsp;<Col className='hike-desc'>{hike.description}</Col></Col>
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
                        {!isLoading && hikeList.length === 0 ? <Container className='emty-hikeList'><Spacer height='2rem' /><Card><h5>There are no hikes for the selected filters!</h5></Card><Spacer height='2rem' /></Container> : null}
                        <HikePageHandler index={index} pageNum={computeIndex()} handlePageChange={handlePageChange} />
                    </Container>
                    {hike ? <AdditionalHikeInfoModal hike={hike} show={showInfoModal} onHide={() => setShowInfoModal(false)} /> : null}
                </>
            )}
        </AuthenticationContext.Consumer>
    );
};

export default HikeTable;
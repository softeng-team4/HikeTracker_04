import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Card, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Spacer from './Spacer';
import FilterForm from './FilterForm';
import AuthenticationContext from '../AuthenticationContext';
import HikePageHandler from './HickePageHendler';
import AdditionalHikeInfoModal from './AdditionalHikeInfoModal';


const HikeTable = () => {


    // state to hold list of hikes
    const [hikeList, setHikeList] = useState([]);
    // state to hold a copy of hike list
    const [hikeListCopy, setHikeListCopy] = useState([]);
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
    // state to hold user email
    const [email, setEmail] = useState(undefined);
    // state to allow a local guide to modify his tasks
    const [filterByEmail, setFilterByEmail] = useState(false);
    // function to retrieve page index
    const computeIndex = () => parseInt(hikeList.length / hike4page) + (hikeList.length % hike4page ? 1 : 0)


    useEffect(() => {
        setSubHikeList(hikeList.slice(0, hike4page));
    }, [hikeList]);

    const handleEmailFilter = () => {
        const hl = hikeList;
        if(!filterByEmail) {
            setHikeListCopy(hikeList);
            setHikeList(hl.filter((h) => (h.email === email)));
            setFilterByEmail(true);
        } else {
            setHikeList(hikeListCopy);
            setFilterByEmail(false);
        }
    };


    const handlePageChange = (idx) => {
        setIndex(idx);
        setSubHikeList(hikeList.slice(idx * hike4page, idx * hike4page + hike4page));
    };


    const handleShowInfo = (event) => {
        event.preventDefault();
        setHikeId(event.target.key);
        setShowInfoModal(true);
    }


    return (
        <AuthenticationContext.Consumer>
            {(authObject) => (
                <>
                    {authObject.authUser && authObject.authUser.email ? setEmail(authObject.authUser.email) : null}
                    <Container fluid className='BrowserHikesContainer'>
                        <Spacer height='2rem' />
                        <h2>Explore Hike</h2>
                        <FilterForm setHikeList={setHikeList} handleEmailFilter={handleEmailFilter} />
                        {subHikeList.map((hike, idx) =>
                            <div key={`div_${idx}`}>
                                <Card key={`card_${idx}`}>
                                    <Card.Header className='row d-flex justify-content-start' key={`card_header_${idx}`}>
                                        <Col md={3}><b>Title:</b>&nbsp;{hike.title}</Col>
                                        <Col md={3}><b>Location:</b>&nbsp;{hike.country},&nbsp;{hike.region},&nbsp;{hike.city}</Col>
                                        {authObject.authUser ? <Button key={hike.id} variant='success' size='sm' onClick={(ev) => handleShowInfo(ev)}>Show more info</Button> : null}
                                        {filterByEmail && authObject.authUser && authObject.authUser.role.toLowerCase() === 'local guide' ?  <Col md={3}><Button>test</Button></Col> : null}
                                    </Card.Header>
                                    <Card.Body className='row d-flex justify-content-start' key={`card_body_${idx}`}>
                                        <Col><b>Description:</b>&nbsp;<Col className='hike-desc'>{hike.description}</Col></Col>
                                    </Card.Body>
                                    <Card.Footer className='row d-flex justify-content-between' key={`card_footer_${idx}`}>
                                        <Col md={3} key={`hike_diff_${idx}`}><b>Difficulty:</b>&nbsp;{hike.difficulty}</Col>
                                        <Col md={3} key={`hike_len_${idx}`}><b>Length:</b>&nbsp;{hike.length}&nbsp;km</Col>
                                        <Col md={3} key={`hike_asc_${idx}`}><b>Ascent:</b>&nbsp;{hike.ascent}&nbsp;m</Col>
                                        <Col md={3} key={`hike_time_${idx}`}><b>Estimated Time:</b>&nbsp;{hike.expectedTime}&nbsp;min</Col>
                                    </Card.Footer>
                                </Card>
                                <Spacer height='1rem' key={`card_spacer_${idx}`} />
                            </div>
                        )}
                        {hikeList.length === 0 ? <Container className='emty-hikeList'><Spacer height='2rem' /><Card><h5>There are no hikes for the selected filters!</h5></Card><Spacer height='2rem' /></Container> : null}
                        <HikePageHandler index={index} pageNum={computeIndex()} handlePageChange={handlePageChange} />
                    </Container>
                    <AdditionalHikeInfoModal hikeId={hikeId} show={showInfoModal} onHide={() => setShowInfoModal(false)}/>
                </>
            )}
        </AuthenticationContext.Consumer>
    );
};

export default HikeTable;
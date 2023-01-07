import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Container, Card, ButtonGroup, Button, Tooltip, OverlayTrigger, Spinner, Modal, Alert, Toast, ToastContainer } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import Spacer from './Spacer';
import FilterForm from './FilterForm';
import AuthenticationContext from '../AuthenticationContext';
import HikePageHandler from './HickePageHendler';
import { useNavigate } from 'react-router';
import HikeCard from './HikeCard';

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
    // state to hold user email --> author of hike
    const user = useContext(AuthenticationContext).authUser;
    const author = user ? user.email : undefined;
    // state to hold touch swipe
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    // function to retrieve page index
    const computeIndex = () => parseInt(hikeList.length / hike4page) + (hikeList.length % hike4page ? 1 : 0);

    const navigate = useNavigate()
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

    return (
        <AuthenticationContext.Consumer>
            {(authObject) => (
                <>
                    {isLoading && <div className='loading-overlay'><Spinner className='spinner' animation="border" variant="light" /></div>}
                    <Container fluid className='BrowserHikesContainer' style={isLoading ? { pointerEvents: 'none' } : null}>
                        <Spacer height='2rem' />
                        <h2>Explore Hike</h2>
                        <FilterForm setHikeList={setHikeList} setIsLoading={setIsLoading} />

                        {subHikeList.map((hike, idx) =>
                            <div key={`div_${idx}`} onTouchStart={e => handleTouchStart(e)} onTouchMove={e => handleTouchMove(e)} onTouchEnd={handleTouchEnd}>
                                <HikeCard hike={hike}/>
                                <Spacer height='1rem' key={`card_spacer_${idx}`} />
                            </div>
                        )}
                        {!isLoading && hikeList.length === 0 && <Container className='emty-hikeList'><Spacer height='2rem' /><Card><h5>There are no hikes for the selected filters!</h5></Card><Spacer height='2rem' /></Container>}
                        <HikePageHandler index={index} pageNum={computeIndex()} handlePageChange={handlePageChange} />


                    </Container>
                </>
            )}
        </AuthenticationContext.Consumer>
    );
};

export default HikeTable;
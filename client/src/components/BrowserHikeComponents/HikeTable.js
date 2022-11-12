import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner, Col, Container, Card } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import API from '../../API';
import Spacer from './Spacer';
import FilterForm from './FilterForm';
import AuthenticationContext from '../AuthenticationContext';
import HikePageHandler from './HickePageHendler';


const HikeTable = () => {


    // test list of retrived hikes
    var hikeListTest = [
        { name: 'hike1', difficulty: 'Tourist', lenght: '2.4km', ascent: '252m', expected_time: '1h' },
        { name: 'hike2', difficulty: 'Professional Hiker', lenght: '21km', ascent: '200m', expected_time: '6h' },
        { name: 'hike3', difficulty: 'Tourist', lenght: '4km', ascent: '126m', expected_time: '1.45h' },
        { name: 'hike4', difficulty: 'Hiker', lenght: '8km', ascent: '550m', expected_time: '3h' },
        { name: 'hike5', difficulty: 'Professional Hiker', lenght: '27km', ascent: '350m', expected_time: '8h' },
        { name: 'hike6', difficulty: 'Tourist', lenght: '5.5km', ascent: '40m', expected_time: '2h' },
        { name: 'hike7', difficulty: 'Tourist', lenght: '4.2km', ascent: '89m', expected_time: '1.30h' },
        { name: 'hike8', difficulty: 'Professional Hiker', lenght: '19km', ascent: '890m', expected_time: '7h' },
        { name: 'hike9', difficulty: 'Professional Hiker', lenght: '12km', ascent: '1400m', expected_time: '5.30h' },
        { name: 'hike10', difficulty: 'Hiker', lenght: '13km', ascent: '620m', expected_time: '4h' },
    ];
    // state to hold list of hikes
    const [hikeList, setHikeList] = useState(hikeListTest)
    // state to wait server response
    const [isLoading, setIsLoading] = useState(true);
    // state to hold current page index
    const [index, setIndex] = useState(0);
    // number of hikes visulaized for page
    const hike4page = 4
    // state to hold list of hikes of current page
    const [subHikeList, setSubHikeList] = useState(hikeList.slice(0, hike4page));
    // function to retrieve page index
    const computeIndex = () => parseInt(hikeList.length / hike4page) + (hikeList.length % hike4page ? 1 : 0)

    
    const handlePageChange = (idx) => {
        setIndex(idx);
        setSubHikeList(hikeList.slice(idx*hike4page, idx*hike4page + hike4page));
    };


    return (
        <AuthenticationContext.Consumer>
            {(authObject) => (
                <Container fluid className='BrowserHikesContainer'>
                    <Spacer height='2rem' />
                    <h2>Explore Hike</h2>
                    <FilterForm setHikeList={setHikeList} />
                    {subHikeList.map((hike, idx) =>
                        <div key={`div_${idx}`}>
                            <Card key={`card_${idx}`}>
                                <Card.Header key={`card_header_${idx}`}>{hike.name}</Card.Header>
                                <Card.Body className='row d-flex justify-content-between' key={`card_body_${idx}`}>
                                    <Col md={3} key={`hike_diff_${idx}`}><b>Difficulty:</b>&nbsp;{hike.difficulty}</Col>
                                    <Col md={3} key={`hike_len_${idx}`}><b>Lenght:</b>&nbsp;{hike.lenght}</Col>
                                    <Col md={3} key={`hike_asc_${idx}`}><b>Ascent:</b>&nbsp;{hike.ascent}</Col>
                                    <Col md={3} key={`hike_time_${idx}`}><b>Estimated Time:</b>&nbsp;{hike.expected_time}</Col>
                                </Card.Body>
                            </Card>
                            <Spacer height='1rem' key={`card_spacer_${idx}`} />
                        </div>
                    )}
                    <HikePageHandler index={index}  pageNum={computeIndex()} handlePageChange={handlePageChange}/>
                </Container>
            )}
        </AuthenticationContext.Consumer>
    );
};

export default HikeTable;
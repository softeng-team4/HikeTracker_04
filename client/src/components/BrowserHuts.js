import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Card } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Spacer from './Spacer';
import FilterForm from './FilterForm';
import AuthenticationContext from '../AuthenticationContext';
import HikePageHandler from './HickePageHendler';
import API from '../../API';
import HutSearchBar from './HutSearchBar';


const BrowserHuts = (props) =>{

    // state to hold list of huts
    const [hutList, setHutList] = useState([])
    // state to hold current page index
    const [index, setIndex] = useState(0);
    // number of hikes visulaized for page
    const hut4page = 4
    // state to hold list of hikes of current page
    const [subHutList, setSubHutList] = useState(hutList.slice(0, hut4page));
    const [searchQuery, setSearchQuery] = useState(query || '');
    // function to retrieve page index
    const computeIndex = () => parseInt(hutList.length / hut4page) + (hutList.length % hut4page ? 1 : 0)

    useEffect(()=>{
        API.hutList("hut").then(r => props.setHutList(r))
    },[])

    useEffect(() => {
        setSubHutList(hutList.slice(0, hut4page));
        console.log('I am here dont loop pls')
    }, [hutList]);

    useEffect(() =>{
        setSubHutList(() => {
            if(searchQuery)
                return subHutList.filter((hut) =>{
                    const hutName = hut.name.toLowerCase();
                    return hutName.includes(searchQuery);
                })
        })
    },[searchQuery])

    
    const handlePageChange = (idx) => {
        setIndex(idx);
        setSubHutList(hutList.slice(idx*hut4page, idx*hut4page + hut4page));
    };

    const { search } = window.location;
    const query = new URLSearchParams(search).get('s');


    return(
        <AuthenticationContext.Consumer>
            {(authObject) => (
                <Container fluid className='BrowserHutssContainer'>
                    <Spacer height='2rem' />
                    <h2>Explore Huts</h2>
                    <HutSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                    {subHutList.map((hut, idx) =>
                        <div key={`div_${idx}`}>
                            <Card key={`card_${idx}`}>
                                <Card.Header className='row d-flex justify-content-start' key={`card_header_${idx}`}>
                                    <Col md={3}><b>Title:</b>&nbsp;{hike.title}</Col>
                                    <Col md={3}><b>Location:</b>&nbsp;{hike.country},&nbsp;{hike.region},&nbsp;{hike.city}</Col>
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
                    {hikeList.length === 0 ? <Container className='emty-hikeList'><Spacer height='2rem'/><Card><h5>No huts found!</h5></Card><Spacer height='2rem'/></Container> : null}
                    <HikePageHandler index={index}  pageNum={computeIndex()} handlePageChange={handlePageChange}/>
                </Container>
            )}
        </AuthenticationContext.Consumer>
    )
}
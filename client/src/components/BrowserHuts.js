import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Card, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Spacer from './BrowserHikeComponents/Spacer';
import AuthenticationContext from './AuthenticationContext';
import HikePageHandler from './BrowserHikeComponents/HickePageHendler';
import API from '../API';
import {HutSearchBar} from './HutSearchBar';


const BrowserHuts = (props) =>{

    // state to hold list of huts
    const [hutList, setHutList] = useState([{name:"hut test", bedsNumber:10, closingHour:22, closingMinute:45, costPerNight: 50, description:"modern small hotel", openingHour: 8, openingMinute: 30, position:[45.0,7.65]}])
    // state to hold current page index
    const [index, setIndex] = useState(0);
    // number of hikes visulaized for page
    const hut4page = 4
    // state to hold list of hikes of current page
    const [subHutList, setSubHutList] = useState(hutList.length > hut4page? hutList.slice(0, hut4page) : hutList);
    const { search } = window.location;
    const query = new URLSearchParams(search).get('s');
    const [searchQuery, setSearchQuery] = useState(query || '');
    // function to retrieve page index
    const computeIndex = () => parseInt(hutList.length / hut4page) + (hutList.length % hut4page ? 1 : 0)

    useEffect(()=>{
        const filters={
            name: undefined,
            country: undefined,
            region: undefined,
            city: undefined
        };
        API.hutsList(filters).then(r => setHutList(r))
    },[])

    /*useEffect(() => {
        setSubHutList(hutList.slice(0, hut4page));
        console.log('I am here dont loop pls')
    }, [hutList]);*/

    useEffect(() =>{
        setSubHutList(() => {
            if(hutList && searchQuery)
                return hutList.filter((hut) =>{
                    const hutName = hut.name.toLowerCase();
                    return hutName.includes(searchQuery);
                })
            return hutList
        })
    },[searchQuery,hutList])

    
    const handlePageChange = (idx) => {
        setIndex(idx);
        setSubHutList(hutList.slice(idx*hut4page, idx*hut4page + hut4page));
    };


    return(
        <AuthenticationContext.Consumer>
            {(authObject) => (
                <Container fluid className='BrowserHutssContainer'>
                    <Spacer height='2rem' />
                    <h2>Explore Huts</h2>
                    <Row className='mt-3'>
                    <HutSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                    </Row>
                    <Row className='mt-3'>
                    {!(hutList)? false : subHutList.map((hut, idx) =>
                        <div key={`div_${idx}`}>
                            <Card key={`card_${idx}`}>
                                <Card.Header className='row d-flex justify-content-start' key={`card_header_${idx}`}>
                                    <Col md={3}><b>Name:</b>&nbsp;{hut.name}</Col>
                                    <Col md={3}><b>Latitude:</b>&nbsp;{hut.position[0]}</Col>
                                    <Col md={3}><b>Longitude:</b>&nbsp;{hut.position[1]}</Col>
                                </Card.Header> 
                                <Card.Body className='row d-flex justify-content-start' key={`card_body_${idx}`}>
                                    <Col><b>Description:</b>&nbsp;<Col className='hut-desc'>{hut.description}</Col></Col>
                                </Card.Body>
                                <Card.Footer className='row d-flex justify-content-between' key={`card_footer_${idx}`}>
                                    <Col md={3} key={`hut_beds_${idx}`}><b>Number of beds:</b>&nbsp;{hut.bedsNumber}</Col>
                                    <Col md={3} key={`hut_cost_${idx}`}><b>Cost per night:</b>&nbsp;{hut.costPerNight}&nbsp;€</Col>
                                    <Col md={3} key={`hut_opn_${idx}`}><b>Opening time:</b>&nbsp;{hut.openingHour}&nbsp;:&nbsp;{hut.openingMinute}</Col>
                                    <Col md={3} key={`hut_cls_${idx}`}><b>Closing Time:</b>&nbsp;{hut.closingHour}&nbsp;:&nbsp;{hut.closingMinute}</Col>
                                </Card.Footer>
                            </Card>
                            <Spacer height='1rem' key={`card_spacer_${idx}`} />
                        </div>
                    )}
                    </Row>
                    {hutList.length === 0 || subHutList.length === 0 ? <Container className='emty-hutList'><Spacer height='2rem'/><Card><h5>No huts found!</h5></Card><Spacer height='2rem'/></Container> : null}
                    <HikePageHandler index={index}  pageNum={computeIndex()} handlePageChange={handlePageChange}/>
                </Container>
            )}
        </AuthenticationContext.Consumer>
    )
}
export {BrowserHuts}
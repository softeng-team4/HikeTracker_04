import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Card, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Spacer from './BrowserHikeComponents/Spacer';
import AuthenticationContext from './AuthenticationContext';
import HikePageHandler from './BrowserHikeComponents/HickePageHendler';
import API from '../API';
import {HutSearchBar} from './HutSearchBar';
import { useSearchParams } from 'react-router-dom';

const BrowserHuts = (props) =>{

    const [geoArea, setGeoArea] = useState({ country: { countryCode: 'None', name: 'None' }, region: { countryCode: 'None', stateCode: 'None', name: 'None' }, city: { name: 'None' } });

    // state to hold list of huts
    const [hutList, setHutList] = useState([])
    // state to hold current page index
    const [index, setIndex] = useState(0);
    // number of hikes visulaized for page
    const hut4page = 4
    // state to hold list of hikes of current page
    const [subHutList, setSubHutList] = useState(hutList);
    const [pageHutList, setPageHutList] = useState(hutList)
    const [searchParams, setSearchParams] = useSearchParams()
    const { search } = window.location;
    const query = new URLSearchParams(search).get('s');
    const [searchQuery, setSearchQuery] = useState(query || '');
    // function to retrieve page index
    const computeIndex = () => parseInt(subHutList.length / hut4page) + (subHutList.length % hut4page ? 1 : 0)

    useEffect(()=>{
        const filters={
            name: undefined,
            country: geoArea.country.name !== 'None' ? geoArea.country.name : undefined,
            region: geoArea.region.name !== 'None' ? geoArea.region.name : undefined,
            city: geoArea.city.name !== 'None' ? geoArea.city.name : undefined
        };
        API.hutsList(filters).then(r => setHutList(r))
    },[geoArea])

    useEffect(()=>{
        if(searchParams)
            setSearchQuery(searchParams.get('s'))
    },[searchParams])

    useEffect(()=>{
            setPageHutList(subHutList.slice(index*hut4page, index*hut4page + hut4page))
    },[subHutList,index])

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
        setPageHutList(subHutList.slice(idx*hut4page, idx*hut4page + hut4page));
    };


    return(
        <AuthenticationContext.Consumer>
            {(authObject) => (
                <Container fluid className='BrowserHutssContainer'>
                    <Spacer height='2rem' />
                    <Row className='mt-3'>
                        <h2>Explore Huts</h2>
                    </Row>
                    <Row className='mt-3'>
                        <HutSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} geoArea={geoArea} setGeoArea={setGeoArea} />
                    </Row>
                    <Row className='mt-3'>
                    {!(hutList)? false : pageHutList.map((hut, idx) =>
                        <div key={`div_${idx}`}>
                            <Card key={`card_${idx}`}>
                                <Card.Header className='row d-flex justify-content-start' key={`card_header_${idx}`}>
                                    {hut.author? <Col md={3}><b>Local guide:</b>&nbsp;{hut.author}</Col> : false}
                                    <Col md={3}><b>Name:</b>&nbsp;{hut.name}</Col>
                                    <Col md={3}><b>Latitude:</b>&nbsp;{hut.position.latitude}</Col>
                                    <Col md={3}><b>Longitude:</b>&nbsp;{hut.position.longitude}</Col>
                                    <Col md={3}><b>Country:</b>&nbsp;{hut.country}</Col>
                                    <Col md={3}><b>Region:</b>&nbsp;{hut.region}</Col>
                                    <Col md={3}><b>City:</b>&nbsp;{hut.city}</Col>
                                </Card.Header> 
                                <Card.Body className='row d-flex justify-content-start' key={`card_body_${idx}`}>
                                    <Col><b>Description:</b>&nbsp;<Col className='hut-desc'>{hut.description}</Col></Col>
                                </Card.Body>
                                <Card.Footer className='row d-flex justify-content-between' key={`card_footer_${idx}`}>
                                    {hut.bedsNumber? <Col md={3} key={`hut_beds_${idx}`}><b>Number of beds:</b>&nbsp;{hut.bedsNumber}</Col> : false}
                                    {hut.costPerNight? <Col md={3} key={`hut_cost_${idx}`}><b>Cost per night:</b>&nbsp;{hut.costPerNight}&nbsp;€</Col> : false}
                                    {hut.openingHour && hut.openingMinute ?<Col md={3} key={`hut_opn_${idx}`}><b>Opening time:</b>&nbsp;{hut.openingHour}&nbsp;:&nbsp;{hut.openingMinute}</Col> : false}
                                    {hut.closingHour && hut.closingMinute ?<Col md={3} key={`hut_cls_${idx}`}><b>Closing Time:</b>&nbsp;{hut.closingHour}&nbsp;:&nbsp;{hut.closingMinute}</Col> : false}
                                </Card.Footer>
                            </Card>
                            <Spacer height='1rem' key={`card_spacer_${idx}`} />
                        </div>
                    )}
                    </Row>
                    {hutList.length === 0 || subHutList.length === 0 ? <Container className='emty-hutList'><Spacer height='2rem'/><Card style={{padding: 10}}><div align='center'><h5>No huts found!</h5></div></Card><Spacer height='2rem'/></Container> : null}
                    <HikePageHandler index={index}  pageNum={computeIndex()} handlePageChange={handlePageChange}/>
                </Container>
            )}
        </AuthenticationContext.Consumer>
    )
}
export {BrowserHuts}
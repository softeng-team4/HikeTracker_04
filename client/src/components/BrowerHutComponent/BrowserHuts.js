import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Card, Row, Spinner } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Spacer from '../BrowserHikeComponents/Spacer';
import AuthenticationContext from '../AuthenticationContext';
import HikePageHandler from '../BrowserHikeComponents/HickePageHendler';
import API from '../../API';
import { HutSearchBar } from './HutSearchBar';

const BrowserHuts = (props) => {

    const [range, setRange] = useState(undefined);

    const [isLoading, setIsLoading] = useState(true);
    const [geoArea, setGeoArea] = useState({ country: { countryCode: 'None', name: 'None' }, region: { countryCode: 'None', stateCode: 'None', name: 'None' }, city: { name: 'None' } });

    // state to hold list of huts
    const [hutList, setHutList] = useState(undefined)
    // state to hold current page index
    const [index, setIndex] = useState(0);
    // number of hikes visulaized for page
    const hut4page = 4
    // state to hold touch swipe
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    // state to hold list of hikes of current page
    const [subHutList, setSubHutList] = useState([]);
    const [pageHutList, setPageHutList] = useState([]);
    const { search } = window.location;
    const query = new URLSearchParams(search).get('s');
    const [searchQuery, setSearchQuery] = useState(query || '');
    // function to retrieve page index
    const computeIndex = () => parseInt(subHutList.length / hut4page) + (subHutList.length % hut4page ? 1 : 0)

    useEffect(() => {
        setIsLoading(true);
        const filters = {
            name: undefined,
            country: geoArea.country.name !== 'None' ? geoArea.country.name : undefined,
            region: geoArea.region.name !== 'None' ? geoArea.region.name : undefined,
            city: geoArea.city.name !== 'None' ? geoArea.city.name : undefined
        };
        API.hutsList(filters).then(r => setHutList(r))
    }, [geoArea])

    useEffect(() => {
        hutList !== undefined &&
            setPageHutList(() => {
                setIsLoading(false);
                return subHutList.slice(index * hut4page, index * hut4page + hut4page)
            })
    }, [subHutList, index, hutList])

    useEffect(() => {
        hutList !== undefined &&
            setSubHutList(() => {
                if (hutList && (searchQuery || range !== undefined))
                    return hutList.filter((hut) => {
                        const hutName = hut.name.toLowerCase();
                        return (hutName.includes(searchQuery) && (
                            range === undefined ? true :
                            (hut.altitude <= range.max && hut.altitude >= range.min)
                        ));
                    })
                return hutList
            })
    }, [searchQuery, hutList, range])


    const handlePageChange = (idx) => {
        setIndex(idx);
        setPageHutList(subHutList.slice(idx * hut4page, idx * hut4page + hut4page));
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

    const HutHeader = (props) =>{
        return(
            <>
            {props.hut.author ? <Col md={4}><b>Local guide:</b>&nbsp;{props.hut.author}</Col> : false}
                                            <Col md={4}><b>Name:</b>&nbsp;{props.hut.name}</Col>
                                            <Col md={4}><b>Phone:</b>&nbsp;{props.hut.phone}</Col>
                                            <Col md={4}><b>Email:</b>&nbsp;{props.hut.email}</Col>
                                            <Col md={4}><b>Latitude:</b>&nbsp;{parseFloat(props.hut.position.latitude).toFixed(6)}</Col>
                                            <Col md={4}><b>Longitude:</b>&nbsp;{parseFloat(props.hut.position.longitude).toFixed(6)}</Col>
                                            <Col md={4}><b>Altitude:</b>&nbsp;{props.hut.altitude}&nbsp;m</Col>
                                            <Col md={4}><b>Country:</b>&nbsp;{props.hut.country}</Col>
                                            <Col md={4}><b>Region:</b>&nbsp;{props.hut.region}</Col>
                                            <Col md={4}><b>City:</b>&nbsp;{props.hut.city}</Col>
                                            {props.hut.website !== '' && <Col md={12}><b>Website:</b>&nbsp;{props.hut.website}</Col>}
            </>
        )
    }

    const HutFooter = (props) =>{
        return(<>
        {props.hut.bedsNumber ? <Col md={3} key={`hut_beds_${props.idx}`}><b>Number of beds:</b>&nbsp;{props.hut.bedsNumber}</Col> : false}
        {props.hut.costPerNight ? <Col md={3} key={`hut_cost_${props.idx}`}><b>Cost per night:</b>&nbsp;{props.hut.costPerNight}&nbsp;€</Col> : false}
        {props.hut.openingHour && props.hut.openingMinute ? <Col md={3} key={`hut_opn_${props.idx}`}><b>Opening time:</b>&nbsp;{props.hut.openingHour}&nbsp;:&nbsp;{props.hut.openingMinute}</Col> : false}
        {props.hut.closingHour && props.hut.closingMinute ? <Col md={3} key={`hut_cls_${props.idx}`}><b>Closing Time:</b>&nbsp;{props.hut.closingHour}&nbsp;:&nbsp;{props.hut.closingMinute}</Col> : false}
        </>)
    }


    return (
        <AuthenticationContext.Consumer>
            {(authObject) => (<>
                {isLoading && <div className='loading-overlay'><Spinner className='spinner' animation="border" variant="light" /></div>}
                <Container fluid className='BrowserHutssContainer'>
                    <Spacer height='2rem' />
                    <h2>Explore Huts</h2>
                    <Row className='mt-3'>
                        <HutSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} geoArea={geoArea} setGeoArea={setGeoArea} setRange={setRange} />
                    </Row>
                    <Row className='mt-3'>
                        {!hutList && !isLoading ? false : pageHutList.map((hut, idx) =>
                            <div key={`div_${idx}`} onTouchStart={e => handleTouchStart(e)} onTouchMove={e => handleTouchMove(e)} onTouchEnd={handleTouchEnd}>
                                <Card key={`card_${idx}`}>
                                    <Card.Header key={`card_header_${idx}`}>
                                        <Row md={10} className='row d-flex justify-content-between'>
                                            <HutHeader hut={hut}>
                                                </HutHeader>
                                        </Row>
                                    </Card.Header>
                                    <Card.Body key={`card_body_${idx}`}>
                                        <Col><b>Description:</b>&nbsp;<Col className='hut-desc'>{hut.description}</Col></Col>
                                    </Card.Body>
                                    <Card.Footer key={`card_footer_${idx}`}>
                                        <Row md={10} className='row d-flex justify-content-between'>
                                            <HutFooter hut={hut} idx={idx}>
                                                </HutFooter>
                                        </Row>
                                    </Card.Footer>
                                </Card>
                                <Spacer height='1rem' key={`card_spacer_${idx}`} />
                            </div>
                        )}
                    </Row>
                    {(!isLoading && (hutList.length === 0 || subHutList.length === 0)) ? <Container className='emty-hutList'><Spacer height='2rem' /><Card style={{ padding: 10 }}><div align='center'><h5>No huts found!</h5></div></Card><Spacer height='2rem' /></Container> : null}
                    <HikePageHandler index={index} pageNum={computeIndex()} handlePageChange={handlePageChange} />
                </Container>
            </>)}
        </AuthenticationContext.Consumer>
    )
}
export { BrowserHuts }
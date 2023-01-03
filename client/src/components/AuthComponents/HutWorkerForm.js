import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Card, Row, Button, Modal } from 'react-bootstrap';
import { useEffect, useState, useCallback } from 'react';
import Spacer from '../BrowserHikeComponents/Spacer';
import HikePageHandler from '../BrowserHikeComponents/HickePageHendler';
import API from '../../API';
import { HutSearchBar } from '../BrowerHutComponent/HutSearchBar';

function HutWorkerForm(props) {
    const [range, setRange] = useState(undefined);

    const [geoArea, setGeoArea] = useState({ country: { countryCode: 'None', name: 'None' }, region: { countryCode: 'None', stateCode: 'None', name: 'None' }, city: { name: 'None' } });
    // state to hold list of huts
    const [hutList, setHutList] = useState([])
    // state to hold current page index
    const [index, setIndex] = useState(0);
    // number of hikes visulaized for page
    const hut4page = 4
    // state to hold touch swipe
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    // state to hold list of hikes of current page
    const [subHutList, setSubHutList] = useState(hutList);
    const [pageHutList, setPageHutList] = useState(hutList)
    const { search } = window.location;
    const query = new URLSearchParams(search).get('s');
    const [searchQuery, setSearchQuery] = useState(query || '');
    // function to retrieve page index
    const computeIndex = () => parseInt(subHutList.length / hut4page) + (subHutList.length % hut4page ? 1 : 0);
    const [hutSelected, setHutSelected] = useState(false);
    const [hut, setHut] = useState('');

    useEffect(() => {
        let filters;
        if(geoArea.geoArea !== undefined){
            filters = {
                name: undefined,
                country: geoArea.geoArea.country.name !== 'None' ? geoArea.geoArea.country.name : undefined,
                region: geoArea.geoArea.region.name !== 'None' ? geoArea.geoArea.region.name : undefined,
                city: geoArea.geoArea.city.name !== 'None' ? geoArea.geoArea.city.name : undefined
            };
        }else{
            filters = {
                name: undefined,
                country: undefined,
                region: undefined,
                city: undefined
            };
        }
        API.hutsList(filters).then(r => setHutList(r))
    }, [geoArea])

    useEffect(() => {
        hutList !== undefined &&
            setPageHutList(() => {
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

    const handlePageChange = useCallback((idx) => {
        setIndex(idx);
        setPageHutList(subHutList.slice(idx * hut4page, idx * hut4page + hut4page));
    }, [setIndex, setPageHutList, subHutList]);

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
    const [show, setShow] = useState(false);

    const handleClose = useCallback(() => {
        setShow(false);
        setRange(undefined);
    }, [setShow, setRange]);

    const handleShow = useCallback(() => {
        setShow(true);
    }, [setShow]);

    const handleHut = (hut) => {
        props.hutSelection(hut.id);
        setHut(hut);
        setHutSelected(true);
        handleClose();
    };

    return (
        <>
            <Spacer height='2rem' />
            {hutSelected ?
                <Card>
                    <Card.Header>
                        <Row md={10} className='row d-flex justify-content-between'>
                            {hut.author ? <Col lg={4}><b>Local guide:</b>&nbsp;{hut.author}</Col> : false}
                            <Col lg={4}><b>Name:</b>&nbsp;{hut.name}</Col>
                            <Col lg={4}><b>Phone:</b>&nbsp;{hut.phone}</Col>
                            <Col lg={4}><b>Email:</b>&nbsp;{hut.email}</Col>
                            <Col lg={4}><b>Latitude:</b>&nbsp;{parseFloat(hut.position.latitude).toFixed(6)}</Col>
                            <Col lg={4}><b>Longitude:</b>&nbsp;{parseFloat(hut.position.longitude).toFixed(6)}</Col>
                            <Col lg={4}><b>Altitude:</b>&nbsp;{hut.altitude}&nbsp;m</Col>
                            <Col lg={4}><b>Country:</b>&nbsp;{hut.country}</Col>
                            <Col lg={4}><b>Region:</b>&nbsp;{hut.region}</Col>
                            <Col lg={4}><b>City:</b>&nbsp;{hut.city}</Col>
                            {hut.website !== '' && <Col lg={12}><b>Website:</b>&nbsp;{hut.website}</Col>}
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <Col><b>Description:</b>&nbsp;<Col className='hut-desc'>{hut.description}</Col></Col>
                    </Card.Body>
                </Card>
                : null}
            <Button onClick={handleShow} className='searchHutBtn'>Search hut</Button>
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Explore Huts</Modal.Title>
                </Modal.Header>
                <Modal.Body><Container fluid className='BrowserHutssContainer'>
                    <Row className='mt-3'>
                        <HutSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} geoArea={geoArea} setGeoArea={setGeoArea} setRange={setRange} />
                    </Row>
                    <Row className='mt-3'>
                        {!(hutList) ? false : pageHutList.map((hut) =>
                            <div key={`div_${hut.id}`} onTouchStart={e => handleTouchStart(e)} onTouchMove={e => handleTouchMove(e)} onTouchEnd={handleTouchEnd}>
                                <Card key={`card_${hut.id}`}>
                                    <Card.Header key={`card_header_${hut.id}`}>
                                        <Row md={10} className='row d-flex justify-content-between'>
                                            {hut.author ? <Col lg={4}><b>Local guide:</b>&nbsp;{hut.author}</Col> : false}
                                            <Col lg={4}><b>Name:</b>&nbsp;{hut.name}</Col>
                                            <Col lg={4}><b>Phone:</b>&nbsp;{hut.phone}</Col>
                                            <Col lg={4}><b>Email:</b>&nbsp;{hut.email}</Col>
                                            <Col lg={4}><b>Latitude:</b>&nbsp;{parseFloat(hut.position.latitude).toFixed(6)}</Col>
                                            <Col lg={4}><b>Longitude:</b>&nbsp;{parseFloat(hut.position.longitude).toFixed(6)}</Col>
                                            <Col lg={4}><b>Altitude:</b>&nbsp;{hut.altitude}&nbsp;m</Col>
                                            <Col lg={4}><b>Country:</b>&nbsp;{hut.country}</Col>
                                            <Col lg={4}><b>Region:</b>&nbsp;{hut.region}</Col>
                                            <Col lg={4}><b>City:</b>&nbsp;{hut.city}</Col>
                                            {hut.website !== '' && <Col lg={12}><b>Website:</b>&nbsp;{hut.website}</Col>}
                                        </Row>
                                    </Card.Header>
                                    <Card.Body key={`card_body_${hut.id}`}>
                                        <Col><b>Description:</b>&nbsp;<Col className='hut-desc'>{hut.description}</Col></Col>
                                    </Card.Body>
                                    <Card.Footer key={`card_footer_${hut.id}`}>
                                        <Row md={4} className='row d-flex justify-content-between'>
                                            <Button className='selectBtn' onClick={() => handleHut(hut)} >Select hut</Button>
                                        </Row>
                                    </Card.Footer>
                                </Card>
                                <Spacer height='1rem' key={`card_spacer_${hut.id}`} />
                            </div>
                        )}
                    </Row>
                    {hutList.length === 0 || subHutList.length === 0 ? <Container className='emty-hutList'><Spacer height='2rem' /><Card style={{ padding: 10 }}><div align='center'><h5>No huts found!</h5></div></Card><Spacer height='2rem' /></Container> : null}
                    <HikePageHandler index={index} pageNum={computeIndex()} handlePageChange={handlePageChange} />
                </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} className='closeBtn'>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}

export default HutWorkerForm;
import { City, Country, State } from "country-state-city";
import { useEffect, useState } from "react";
import { Button, Col, Form, InputGroup, Modal, Row, Table } from "react-bootstrap";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useNavigate } from "react-router";
import { LocationMarker } from "./LocationMarker";
import L from 'leaflet'
import ParkingLot from "../model/ParkingLot";

function ParkForm(props) {
    const [name, setName] = useState('');
    const [lotsNumber, setLotsNumber] = useState('');
    const [description, setDescription] = useState('');
    const [costPerDay, setCostPerDay] = useState('');
    const [openingHour, setOpeningHour] = useState('');
    const [openingMinute, setOpeningMinute] = useState('');
    const [closingHour, setClosingHour] = useState('');
    const [closingMinute, setClosingMinute] = useState('');
    
    const [parkPoint, setParkPoint] = useState([]);
    const [position, setPosition] = useState([45.06294822296754, 7.662272990156818]);
    const [countryCode, setCountryCode] = useState('');
    const [country, setCountry] = useState('');
    const [region, setRegion] = useState('');
    const [regionCode, setRegionCode] = useState('');
    const [city, setCity] = useState('');
    const [cityMap, setCityMap] = useState([]);

    const [validated, setValidated] = useState(false);
    
    let navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false || parkPoint.length === 0) {
            event.stopPropagation();
            setValidated(true);
            return;
        }

        const parkingLot = new ParkingLot(name, country, region, city, parkPoint, lotsNumber, costPerDay, description, openingHour, openingMinute, closingHour, closingMinute);
        
        await props.addNewParkingLot(parkingLot);
        setName('');
        setLotsNumber('');
        setDescription('');
        setCostPerDay('');
        setOpeningHour('');
        setOpeningMinute('');
        setClosingHour('');
        setClosingMinute('');
        setCountry('');
        setCountryCode('');
        setRegion('');
        setRegionCode('');
        setCity('');
        setCityMap('');
        setParkPoint([]);
        setPosition([45.06294822296754, 7.662272990156818]);
        setValidated(false);
        handleShow();
    };
    
    useEffect(() => {
        delete L.Icon.Default.prototype._getIconUrl;

        L.Icon.Default.mergeOptions({
            iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
            iconUrl: require("leaflet/dist/images/marker-icon.png"),
            shadowUrl: require("leaflet/dist/images/marker-shadow.png")
        });
    }, []);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (<>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>New parking lot</Modal.Title>
            </Modal.Header>
            <Modal.Body>The new parking lot has been saved successfully!</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
        <h2>Add A New Parking Lot</h2>
        <Form noValidate validated={validated} onSubmit={handleSubmit} className="mt-3" style={{marginBottom:10}}>
            <Form.Group as={Row} className="mb-3">
                <Col sm={2}>
                    <Form.Label>Name:</Form.Label>
                </Col>
                <Col>
                    <Form.Control className='name-input' required type='text' value={name} onChange={(event) => setName(event.target.value)} />
                    <Form.Control.Feedback>Valid name!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">Please insert a name.</Form.Control.Feedback>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Col sm={2}>
                    <Form.Label>Number of lots:</Form.Label>
                </Col>
                <Col >
                    <Form.Control className='lots-input' required type='number' value={lotsNumber} defaultValue={undefined} min={0} onChange={(event) => setLotsNumber(event.target.value)} />
                    <Form.Control.Feedback>Valid number of lots!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">Please insert the number of lots. It must be a positive integer.</Form.Control.Feedback>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Col sm={2}>
                    <Form.Label>Cost per day:</Form.Label>
                </Col>
                <Col >
                    <InputGroup>
                        <InputGroup.Text>€</InputGroup.Text>
                        <Form.Control className='cost-input' required type='number' value={costPerDay} defaultValue={undefined} min={0} onChange={(event) => setCostPerDay(event.target.value)} />
                        <InputGroup.Text>.00</InputGroup.Text>
                        <Form.Control.Feedback>Valid cost per day!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">Please insert the cost per day. It must be a positive number.</Form.Control.Feedback>
                    </InputGroup>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Col sm={2}>
                    <Form.Label>Opening time:</Form.Label>
                </Col>
                <Col >
                    <InputGroup>
                        <Form.Control className='openingHour-input' required type='number' value={openingHour} defaultValue={undefined} min={0} max={23} onChange={(event) => setOpeningHour(event.target.value)} />
                        <InputGroup.Text>hour</InputGroup.Text>
                        <Form.Control.Feedback>Valid hour!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">Please insert the hour. It must be a positive integer between 0 and 23.</Form.Control.Feedback>
                    </InputGroup>
                </Col>
                <Col >
                    <InputGroup>
                        <Form.Control className='openingMinute-input' required type='number' value={openingMinute} defaultValue={undefined} min={0} max={59} onChange={(event) => setOpeningMinute(event.target.value)} />
                        <InputGroup.Text>minute</InputGroup.Text>
                        <Form.Control.Feedback>Valid minutes!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">Please insert the minutes. It must be a positive integer between 0 and 59.</Form.Control.Feedback>
                    </InputGroup>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Col sm={2}>
                    <Form.Label>Closing time:</Form.Label>
                </Col>
                <Col >
                    <InputGroup>
                        <Form.Control className='closingHour-input' required type='number' value={closingHour} defaultValue={undefined} min={0} max={23} onChange={(event) => setClosingHour(event.target.value)} />
                        <InputGroup.Text>hour</InputGroup.Text>
                        <Form.Control.Feedback>Valid hour!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">Please insert the hour. It must be a positive integer between 0 and 23.</Form.Control.Feedback>
                    </InputGroup>
                </Col>
                <Col >
                    <InputGroup>
                        <Form.Control className='closingMinute-input' required type='number' value={closingMinute} defaultValue={undefined} min={0} max={59} onChange={(event) => setClosingMinute(event.target.value)} />
                        <InputGroup.Text>minute</InputGroup.Text>
                        <Form.Control.Feedback>Valid minutes!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">Please insert the minutes. It must be a positive integer between 0 and 59.</Form.Control.Feedback>
                    </InputGroup>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Col sm={2}>
                    <Form.Label>Country:</Form.Label>
                </Col>
                <Col >
                    <Form.Select className='country-input' style={{cursor:"pointer"}} required value={countryCode} onChange={(event) => {
                        if (event.target.value === "") {
                            setCountryCode('');
                            setCountry('');
                            setRegionCode('');
                            setRegion('');
                            setCity('');
                            setCityMap('');
                            return;
                        }
                        setCountryCode(event.target.value);
                        setCountry(Country.getAllCountries().filter(c => c.isoCode === event.target.value)[0].name);
                        setRegionCode('');
                        setRegion('');
                        setCity('');
                        setCityMap('');
                    }}>
                        <option key={'None'} value={''}>{'None'}</option>
                        {Country.getAllCountries().map((c, i) => <option key={i} value={c.isoCode}>{c.name}</option>)}
                    </Form.Select>
                </Col>
                <Col sm={2}>
                    <Form.Label>Region:</Form.Label>
                </Col>
                <Col >
                    <Form.Select className='region-input' style={countryCode ? {cursor:"pointer"} : {}} disabled={countryCode ? false : true} required value={regionCode} onChange={(event) => {
                        if (event.target.value === "") {
                            setRegionCode('');
                            setRegion('');
                            setCity('');
                            setCityMap('');
                            return;
                        }
                        setRegionCode(event.target.value);
                        setRegion(State.getStatesOfCountry(countryCode).filter(r => r.isoCode === event.target.value)[0].name);
                        setCity('');
                        setCityMap('');
                    }}>
                        <option key={'None'} value={''}>{'None'}</option>
                        {State.getStatesOfCountry(countryCode).map((r, j) => <option key={j} value={r.isoCode}>{r.name}</option>)}
                    </Form.Select>
                </Col>
                <Col sm={2}>
                    <Form.Label>City:</Form.Label>
                </Col>
                <Col >
                    <Form.Select className='city-input' style={regionCode ? {cursor:"pointer"} : {}} disabled={regionCode ? false : true} required value={city} onChange={(event) => {
                        if (event.target.value === "") {
                            setCity('');
                            setCityMap('');
                            return;
                        }
                        setCity(event.target.value);
                        setCityMap([City.getAllCities().filter(c => c.name === event.target.value)[0].latitude, City.getAllCities().filter(c => c.name === event.target.value)[0].longitude])
                    }}>
                        <option key={'None'} value={''}>{'None'}</option>
                        {City.getCitiesOfState(countryCode, regionCode).map((ci, k) => <option key={k} value={ci.name}>{ci.name}</option>)}
                    </Form.Select>
                </Col>
            </Form.Group>
            {cityMap[0] === undefined ? '' :
                <Form.Group as={Row} className="mb-3">
                    <Row>
                        <Col >
                            <MapContainer center={cityMap} zoom={13} scrollWheelZoom={false}>
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <LocationMarker position={position} setPosition={setPosition} />
                                {parkPoint.length !== 0 ? <Marker position={parkPoint}>
                                    <Popup>
                                        Parking lot point
                                    </Popup>
                                </Marker> : ''}
                            </MapContainer>
                        </Col>
                    </Row>
                    <Row>
                        <Col align="right" style={{marginTop:5}}>
                            <Button variant='primary' onClick={() => {
                                //add into db
                                setParkPoint(position);
                                console.log('parkingLot', parkPoint);
                            } }>Save position
                            </Button>
                        </Col>
                    </Row>
                    <div style={{paddingLeft:10, paddingRight:10}}>
                        <Table id="point-table">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>latitude</th>
                                    <th>longitude</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Hut point</td>
                                    <td>{parkPoint[0]}</td>
                                    <td>{parkPoint[1]}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                    { validated && parkPoint.length === 0 ?
                        <p style={{color:"red"}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
                            </svg>{' '}
                            Please select a position on the map!
                        </p> : ''
                    }
                </Form.Group>
            }
            <Form.Group className="mb-3">
                <Form.Label>Description:</Form.Label>
                <Form.Control className='description-input' required as='textarea' value={description} rows={3} defaultValue={undefined} onChange={(event) => setDescription(event.target.value)} />
                <Form.Control.Feedback>Valid description!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">Please insert a description.</Form.Control.Feedback>
            </Form.Group>
            <Button variant='success' type="submit" >Submit form</Button>
            <Button variant='danger' style={{marginLeft: 5}} onClick={() => navigate(`/`)}>Exit without saving</Button>
        </Form>
    </>);
}

export {ParkForm}
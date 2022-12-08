import { City, Country, State } from "country-state-city";
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, InputGroup, Modal, Row, Table } from "react-bootstrap";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useNavigate } from "react-router";
import { LocationMarker } from "./LocationMarker";
import L from 'leaflet'
import Hut from '../../model/Hut'
import Spacer from "../BrowserHikeComponents/Spacer";

function HutForm(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [website, setWebsite] = useState('');
    const [altitude, setAltitude] = useState('');
    const [bedsNumber, setBedsNumber] = useState('');
    const [description, setDescription] = useState('');

    const [hutPoint, setHutPoint] = useState([]);
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
        if (form.checkValidity() === false || hutPoint.length === 0) {
            event.stopPropagation();
            setValidated(true);
            return;
        }

        const hut = new Hut(name, phone, email, website, parseInt(altitude), country, region, city, hutPoint, parseInt(bedsNumber), null, description, null, null, null, null);

        console.log(hut)
        await props.addNewHut(hut);
        setValidated(false);
        setName('');
        setEmail('');
        setPhone('');
        setWebsite('');
        setAltitude('');
        setBedsNumber('');
        setDescription('');
        setCountry('');
        setCountryCode('');
        setRegion('');
        setRegionCode('');
        setCity('');
        setHutPoint([]);
        setCityMap([]);
        setPosition([45.06294822296754, 7.662272990156818]);
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
                <Modal.Title>New hut</Modal.Title>
            </Modal.Header>
            <Modal.Body>The new hut has been saved successfully!</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
        <Container fluid style={{ marginBottom: 20 }}>
            <Spacer height='2rem' />
            <h2>Add A New Hut</h2>
            <Form noValidate validated={validated} onSubmit={handleSubmit} className="mt-3">
                <Form.Group as={Row} className="mb-3">
                    <Col sm={2}>
                        <Form.Label>Name:</Form.Label>
                    </Col>
                    <Col>
                        <Form.Control className='name-input' required type='text' value={name} onChange={(event) => setName(event.target.value)} />
                        <Form.Control.Feedback>Valid name!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">Please insert a name.</Form.Control.Feedback>
                    </Col>
                </Form.Group><Form.Group as={Row} className="mb-3">
                    <Col sm={2}>
                        <Form.Label>Email:</Form.Label>
                    </Col>
                    <Col>
                        <Form.Control className='email-input' required type='email' value={email} onChange={(event) => setEmail(event.target.value)} />
                        <Form.Control.Feedback>Valid email!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">Please insert a valid email.</Form.Control.Feedback>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Col sm={2}>
                        <Form.Label>Phone number:</Form.Label>
                    </Col>
                    <Col>
                        <Form.Control className='phone-input' required type='tel' value={phone} pattern="[0-9]{4,12}" onChange={(event) => setPhone(event.target.value)} />
                        <Form.Control.Feedback>Valid phone number!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">Please insert a valid phone number. It must have between 4 and 12 digits, based on your country.</Form.Control.Feedback>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Col sm={2}>
                        <Form.Label>Optional website:</Form.Label>
                    </Col>
                    <Col>
                        <Form.Control className='website-input' type='url' placeholder="https://example.com" value={website} onChange={(event) => setWebsite(event.target.value)} />
                        <Form.Control.Feedback>This field is optional.</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">Please insert a valid website. The format should be like "https://example.com".</Form.Control.Feedback>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Col sm={2}>
                        <Form.Label>Altitude:</Form.Label>
                    </Col>
                    <Col>
                        <InputGroup>
                            <Form.Control className='altitude-input' required type='number' value={altitude} defaultValue={undefined} min={0} onChange={(event) => setAltitude(event.target.value)} />
                            <InputGroup.Text>meters</InputGroup.Text>
                            <Form.Control.Feedback>Valid altitude!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">Please insert the altitude. It must be a positive integer.</Form.Control.Feedback>
                        </InputGroup>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Col sm={2}>
                        <Form.Label>Number of beds:</Form.Label>
                    </Col>
                    <Col >
                        <Form.Control className='beds-input' required type='number' value={bedsNumber} defaultValue={undefined} min={0} onChange={(event) => setBedsNumber(event.target.value)} />
                        <Form.Control.Feedback>Valid number of beds!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">Please insert the number of beds. It must be a positive integer.</Form.Control.Feedback>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Col sm={2}>
                        <Form.Label>Country:</Form.Label>
                    </Col>
                    <Col >
                        <Form.Select className='country-input' style={{ cursor: "pointer" }} value={countryCode} required onChange={(event) => {
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
                        <Form.Select className='region-input' style={countryCode ? { cursor: "pointer" } : {}} disabled={countryCode ? false : true} value={regionCode} required onChange={(event) => {
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
                        <Form.Select className='city-input' style={regionCode ? { cursor: "pointer" } : {}} disabled={regionCode ? false : true} value={city} required onChange={(event) => {
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
                    <Form.Group className="mb-3">
                        <Row>
                            <Col>
                                <MapContainer center={cityMap} zoom={13} scrollWheelZoom={false}>
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <LocationMarker position={position} setPosition={setPosition} />
                                    {hutPoint.length !== 0 ? <Marker position={hutPoint}>
                                        <Popup>
                                            Hut point
                                        </Popup>
                                    </Marker> : ''}
                                </MapContainer>
                            </Col>
                        </Row>
                        {validated && hutPoint.length === 0 &&
                            <Row style={{ marginTop: 5 }}><p style={{ color: "red", fontSize: 14 }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                    <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
                                </svg>{' '}
                                Please select a position on the map!
                            </p></Row>
                        }
                        <Row>
                            <Col align="right" style={{ marginTop: 10 }}>
                                <Button variant='primary' onClick={() => {
                                    //add into db
                                    setHutPoint(position);
                                    console.log('hut', hutPoint);
                                }}>Save position
                                </Button>
                            </Col>
                        </Row>
                        <Table hover id="point-table" style={{ borderColor: "grey", paddingTop: 10 }}>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Latitude</th>
                                    <th>Longitude</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Hut position</td>
                                    <td>{hutPoint[0]}</td>
                                    <td>{hutPoint[1]}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Form.Group>
                }
                <Form.Group className="mb-3">
                    <Form.Label>Description:</Form.Label>
                    <Form.Control className='description-input' required as='textarea' value={description} rows={3} defaultValue={undefined} onChange={(event) => setDescription(event.target.value)} />
                    <Form.Control.Feedback>Valid description!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">Please insert a description.</Form.Control.Feedback>
                </Form.Group>
                <Row>
                    <div>
                        <Button variant='success' type="submit" >Submit form</Button>
                        <Button variant='danger' style={{ marginLeft: 5 }} onClick={() => navigate(`/`)}>Exit without saving</Button>
                    </div>
                </Row>
            </Form>
        </Container>
    </>)
}

export { HutForm }
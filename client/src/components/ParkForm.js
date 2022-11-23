import { City, Country, State } from "country-state-city";
import { useEffect, useState } from "react";
import { Button, Col, Form, InputGroup, Row, Table } from "react-bootstrap";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useNavigate } from "react-router";
import { LocationMarker } from "./LocationMarker";
import L from 'leaflet'

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
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
            return;
        }
        
        await props.addNewParkingLot(name, lotsNumber, description, costPerDay, openingHour, openingMinute, closingHour, closingMinute, parkPoint, country, region, city);
        setLotsNumber('');
        setDescription('');
        setCostPerDay('');
        setOpeningHour('');
        setOpeningMinute('');
        setClosingHour('');
        setClosingMinute('');
        setCountry('');
        setRegion('');
        setCity('');
    };
    
    useEffect(() => {
        delete L.Icon.Default.prototype._getIconUrl;

        L.Icon.Default.mergeOptions({
            iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
            iconUrl: require("leaflet/dist/images/marker-icon.png"),
            shadowUrl: require("leaflet/dist/images/marker-shadow.png")
        });
    }, []);

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit} className="mt-3">
            <Form.Group as={Row} className="mb-3">
                <Col sm={2}>
                    <Form.Label>Name:</Form.Label>
                </Col>
                <Col>
                    <Form.Control className='title-input' required type='text' onChange={(event) => setName(event.target.value)} />
                    <Form.Control.Feedback>Valid name!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">Please insert a name.</Form.Control.Feedback>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Col sm={2}>
                    <Form.Label>Number of lots:</Form.Label>
                </Col>
                <Col >
                    <Form.Control className='length-input' required type='number' defaultValue={undefined} min={0} onChange={(event) => setLotsNumber(event.target.value)} />
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
                        <Form.Control className='length-input' required type='number' defaultValue={undefined} min={0} onChange={(event) => setCostPerDay(event.target.value)} />
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
                        <Form.Control className='length-input' required type='number' defaultValue={undefined} min={0} max={23} onChange={(event) => setClosingHour(event.target.value)} />
                        <InputGroup.Text>hour</InputGroup.Text>
                        <Form.Control.Feedback>Valid hour!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">Please insert the hour. It must be a positive integer between 0 and 23.</Form.Control.Feedback>
                    </InputGroup>
                </Col>
                <Col >
                    <InputGroup>
                        <Form.Control className='length-input' required type='number' defaultValue={undefined} min={0} max={59} onChange={(event) => setClosingMinute(event.target.value)} />
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
                        <Form.Control className='length-input' required type='number' defaultValue={undefined} min={0} max={23} onChange={(event) => setClosingHour(event.target.value)} />
                        <InputGroup.Text>hour</InputGroup.Text>
                        <Form.Control.Feedback>Valid hour!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">Please insert the hour. It must be a positive integer between 0 and 23.</Form.Control.Feedback>
                    </InputGroup>
                </Col>
                <Col >
                    <InputGroup>
                        <Form.Control className='length-input' required type='number' defaultValue={undefined} min={0} max={59} onChange={(event) => setClosingMinute(event.target.value)} />
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
                    <Form.Select className='country-input' required onChange={(event) => {
                        setCountryCode(event.target.value);
                        setCountry(Country.getAllCountries().filter(c => c.isoCode === event.target.value)[0].name)
                    }}>
                        {Country.getAllCountries().map((c, i) => <option key={i} value={c.isoCode}>{c.name}</option>)}
                    </Form.Select>
                </Col>
                <Col sm={2}>
                    <Form.Label>Region:</Form.Label>
                </Col>
                <Col >
                    <Form.Select className='region-input' required onChange={(event) => {
                        setRegionCode(event.target.value);
                        setRegion(State.getStatesOfCountry(countryCode).filter(r => r.isoCode === event.target.value)[0].name);
                    }}>
                        {State.getStatesOfCountry(countryCode).map((r, j) => <option key={j} value={r.isoCode}>{r.name}</option>)}
                    </Form.Select>
                </Col>
                <Col sm={2}>
                    <Form.Label>City:</Form.Label>
                </Col>
                <Col >
                    <Form.Select className='city-input' required onChange={(event) => {
                        setCity(event.target.value);
                        setCityMap([City.getAllCities().filter(c => c.name === event.target.value)[0].latitude, City.getAllCities().filter(c => c.name === event.target.value)[0].longitude])
                    }}>
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
                        <Col>
                            <Button variant='primary' onClick={() => {
                                //add into db
                                setParkPoint(position);
                                console.log('hut', parkPoint);
                            } }>Save point
                            </Button>
                        </Col>
                    </Row>

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
                </Form.Group>
            }
            <Form.Group className="mb-3">
                <Form.Label>Description:</Form.Label>
                <Form.Control className='description-input' required as='textarea' rows={3} defaultValue={undefined} onChange={(event) => setDescription(event.target.value)} />
                <Form.Control.Feedback>Valid description!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">Please insert a description.</Form.Control.Feedback>
            </Form.Group>
            <Button variant='success' type="submit" >Submit form</Button>
            <Button variant='danger' onClick={() => navigate(`/`)}>Exit without saving</Button>
        </Form>
    );
}

export {ParkForm}
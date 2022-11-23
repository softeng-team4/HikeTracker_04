import { City, Country, State } from "country-state-city";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useNavigate } from "react-router";
import { LocationMarker } from "./LocationMarker";
import L from 'leaflet'

function HutForm(props) {
    const [name, setName] = useState('');
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
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
            return;
        }
        
        await props.addNewHut(name, bedsNumber, description, hutPoint, country, region, city);
        setBedsNumber('');
        setDescription('');
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
                    <Form.Label>Number of beds:</Form.Label>
                </Col>
                <Col >
                    <Form.Control className='length-input' required type='number' defaultValue={undefined} min={0} onChange={(event) => setBedsNumber(event.target.value)} />
                    <Form.Control.Feedback>Valid number of beds!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">Please insert the number of beds. It must be a positive integer.</Form.Control.Feedback>
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
                                {hutPoint.length !== 0 ? <Marker position={hutPoint}>
                                    <Popup>
                                        Hut point
                                    </Popup>
                                </Marker> : ''}
                            </MapContainer>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button variant='primary' onClick={() => {
                                //add into db
                                setHutPoint(position);
                                console.log('hut', hutPoint);
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
                                <td>{hutPoint[0]}</td>
                                <td>{hutPoint[1]}</td>
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
    )
}

export {HutForm}
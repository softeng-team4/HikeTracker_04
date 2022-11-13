
import markerIconPng from "leaflet/dist/images/marker-icon.png"

import { useEffect, useRef, useState } from "react"
import { Form, Row, Col, Table, Button, ToggleButtonGroup, ToggleButton } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { MapContainer, TileLayer, useMap, Marker, Popup, useMapEvents } from 'react-leaflet'
import { GeoPoint } from '../model/GeoPoint'
import L, { gridLayer } from 'leaflet'
import { Country, State, City } from 'country-state-city';
import Hike from "../model/Hike"


function HikeForm(props) {

    let navigate = useNavigate()
    const [pointIndex, setPointIndex] = useState('1');
    const [title, setTitle] = useState(undefined);
    const [length, setLength] = useState(undefined);
    const [expectedTime, setExpectedTime] = useState(undefined);
    const [ascent, setAscent] = useState(undefined);
    const [difficulty, setDifficulty] = useState(undefined);
    const [description, setDescription] = useState(undefined);
    const [validated, setValidated] = useState(false);
    //const [positionData, setPositionData] = useState({ lat: 45.06294822296754, lng: 7.662272990156818 })
    const [startPoint, setStartPoint] = useState([])
    const [endPoint, setEndPoint] = useState([])
    const [referencePoint, setReferencePoint] = useState([])
    const [position, setPosition] = useState([45.06294822296754, 7.662272990156818])
    const [countryCode, setCountryCode] = useState('')
    const [country, setCountry] = useState('')
    const [region, setRegion] = useState('')
    const [regionCode, setRegionCode] = useState('')
    const [city, setCity] = useState('')
    const [cityMap, setCityMap] = useState([])


    // getPoint();

    useEffect(() => {
        delete L.Icon.Default.prototype._getIconUrl;

        L.Icon.Default.mergeOptions({
            iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
            iconUrl: require("leaflet/dist/images/marker-icon.png"),
            shadowUrl: require("leaflet/dist/images/marker-shadow.png")
        });
        console.log("New point index:" + pointIndex)
    }, [pointIndex])

    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        console.log("Title:" + title)
        console.log("Length:" + length)
        console.log("Expected Time:" + expectedTime)
        console.log("Ascent:" + ascent)
        console.log("Difficulty:" + difficulty)
        console.log("Country:" + country)
        console.log("Region:" + region)
        console.log("City:" + city)
        console.log("Description:" + description)
        console.log("Start point:" + startPoint)
        console.log("End point:" + endPoint)
        console.log("Reference points:" + referencePoint)
        const newHike = {
            ascent: ascent, city: city, country: country, description: description, difficulty: difficulty, endPoint: endPoint, expectedTime: expectedTime,
            length: length, referencePoint: referencePoint, region: region, title: title, startPoint: startPoint
        }
        await props.addNewHike(newHike);
        setValidated(true);
    };

    //const pointRef = useRef('1')
    const handlePoint = (e) => {
        setPointIndex(e.target.value);
    }
    /*
    Data format for a hike:
        • Title/label
        • Length (kms)
        • Expected time
        • Ascent (meters)
        • Difficulty (Tourist, Hiker, Professional hiker)
        • Start point *
        • End point *
        • Reference points *
        • Description
        • Point can be: address, name of location, GPS coordinates, hut, parking lot
    */


    function LocationMarker(props) {
        const map = useMapEvents({
            async click(e) {
                setPosition([e.latlng.lat,e.latlng.lng]);
                //await props.getPosition(position);
                console.log('-----------',position,e.latlng.lat)
            },
            locationfound(e) {
                // setPosition(e.latlng)
                map.flyTo(e.latlng, map.getZoom())
            },
        })

        return position === null ? null : (

            <Marker position={position}>
            </Marker>

        )
    }

    // function getPosition(data) {
    //     setPosition(data);
    //     console.log('parent', position)
    // }

    // setTimeout((e) => { setPoint(e); console.log('value', e, point) }, 0);

    /* This method will add a new row */
    function addNewRow() {
        var table = document.getElementById("point-table");
        var rowCount = table.rows.length;
        var row = table.insertRow(rowCount);
        var cell = row.insertCell(0)
        cell = row.insertCell(1)
        cell.innerHTML = position.lat
        cell = row.insertCell(2)
        cell.innerHTML = position.lng
        /*for (var i = 0; i < cellCount; i++) {
              var cell = row.insertCell(i);
              if (i === 0 ) {
                  cell.innerHTML = '';
              } else if (i===1 ){
                  cell.innerHTML = referencePoint[referencePoint.length-1].lat;
              } else {
                  cell.innerHTML = referencePoint[referencePoint.length-1].lng;
              }
          }*/
    }

    /* This method will delete a row */
    function deleteRow(ele) {
        var table = document.getElementById('point-table');
        var rowCount = table.rows.length;
        if (rowCount <= 1) {
            alert("There is no row available to delete!");
            return;
        }
        if (ele) {
            //delete specific row
            ele.parentNode.parentNode.remove();
        } else {
            //delete last row
            table.deleteRow(rowCount - 1);
        }
    }

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit} className="mt-3">
            <Form.Group as={Row} className="mb-3">
                <Col sm={2}>
                    <Form.Label>Title:</Form.Label>
                </Col>
                <Col>
                    <Form.Control required type='text' onChange={(event) => setTitle(event.target.value)} />
                    <Form.Control.Feedback>Valid title!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">Please insert a title.</Form.Control.Feedback>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Col sm={2}>
                    <Form.Label>Length:</Form.Label>
                </Col>
                <Col >
                    <Form.Control required type='number' defaultValue={undefined} min={0} onChange={(event) => setLength(event.target.value)} />
                    <Form.Control.Feedback>Valid length!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">Please insert the length. It must be a positive integer.</Form.Control.Feedback>
                </Col>
                <Col sm={1}>Km</Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Col sm={2}>
                    <Form.Label>Expected time:</Form.Label>
                </Col>
                <Col >
                    <Form.Control required type='number' defaultValue={undefined} min={0} onChange={(event) => setExpectedTime(event.target.value)} />
                    <Form.Control.Feedback>Valid time!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">Please insert the expected time. It must be a positive integer.</Form.Control.Feedback>
                </Col>
                <Col sm={1}>minutes</Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Col sm={2}>
                    <Form.Label>Ascent:</Form.Label>
                </Col>
                <Col >
                    <Form.Control required type='number' defaultValue={undefined} min={0} onChange={(event) => setAscent(event.target.value)} />
                    <Form.Control.Feedback>Valid ascent!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">Please insert the ascent. It must be a positive integer.</Form.Control.Feedback>
                </Col>
                <Col sm={1}>m</Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Col sm={2}>
                    <Form.Label>Difficulty:</Form.Label>
                </Col>
                <Col >
                    <Form.Select required defaultValue={1} onChange={(event) => setDifficulty(event.target.value)}>
                        <option value={1}>Tourist (Easy)</option>
                        <option value={2}>Hiker (Medium)</option>
                        <option value={3}>Professional Hiker (Hard)</option>
                    </Form.Select>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Col sm={2}>
                    <Form.Label>Coutry:</Form.Label>
                </Col>
                <Col >
                    <Form.Select required onChange={(event) => {
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
                    <Form.Select required onChange={(event) => {
                        setRegionCode(event.target.value);
                        setRegion(State.getAllStates().filter(r => r.isoCode === event.target.value)[0].name);
                    }}>
                        {State.getStatesOfCountry(countryCode).map((r, j) => <option key={j} value={r.isoCode}>{r.name}</option>)}
                    </Form.Select>
                </Col>
                <Col sm={2}>
                    <Form.Label>City:</Form.Label>
                </Col>
                <Col >
                    <Form.Select required onChange={(event) => {
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
                        <Col sm={2}>Choose Hike Points:</Col>
                        <Col>
                            <ToggleButtonGroup type="radio" name="options" defaultValue={'1'} >
                                <ToggleButton variant='outline-primary' id="tbg-radio-1" value={'1'} onChange={handlePoint}>
                                    Start Point
                                </ToggleButton>
                                <ToggleButton variant='outline-primary' id="tbg-radio-2" value={'2'} onChange={handlePoint}>
                                    End Point
                                </ToggleButton>
                                <ToggleButton variant='outline-primary' id="tbg-radio-3" value={'3'} onChange={handlePoint}>
                                    Reference Points
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col >

                            <MapContainer center={cityMap} zoom={13} scrollWheelZoom={false}>
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <LocationMarker />
                                {startPoint.length !== 0 ? <Marker position={startPoint}>
                                    <Popup>
                                        Start point
                                    </Popup>
                                </Marker> : ''}
                                {endPoint.length !== 0 ? <Marker position={endPoint}>
                                    <Popup>
                                        End Point
                                    </Popup>
                                </Marker> : ''}
                                {referencePoint.length === 0 ? '' : referencePoint.map((rPoint, i) => <Marker key={i} position={rPoint}>
                                    <Popup>
                                        Reference Point {i + 1}
                                    </Popup>
                                </Marker>)}
                            </MapContainer>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button variant='primary'
                                onClick={() => {
                                    //add into db
                                    //if ponit=1, add into start point
                                    if (pointIndex === '1') {
                                        setStartPoint(position)
                                    }
                                    if (pointIndex === '2') {
                                        setEndPoint(position)
                                    }
                                    if (pointIndex === '3') {
                                        setReferencePoint([...referencePoint, position])
                                        addNewRow();
                                    }
                                    console.log('start',startPoint)
                                    console.log('end',endPoint)
                                    console.log('ref',referencePoint)
                                }
                                }
                            >Save point
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
                                <td>Start point</td>
                                <td>{startPoint.lat}</td>
                                <td>{startPoint.lng}</td>
                            </tr>
                            <tr>
                                <td>End point</td>
                                <td>{endPoint.lat}</td>
                                <td>{endPoint.lng}</td>
                            </tr>
                            <tr>
                                <td>Reference points</td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </Table>
                </Form.Group>
            }
            <Form.Group className="mb-3">
                <Form.Label>Description:</Form.Label>
                <Form.Control required as='textarea' rows={3} defaultValue={undefined} onChange={(event) => setDescription(event.target.value)} />
                <Form.Control.Feedback>Valid description!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">Please insert a description.</Form.Control.Feedback>
            </Form.Group>
            <Button variant='success' type="submit">Submit form</Button>
            <Button variant='danger' onClick={() => navigate(`/`)}>Exit without saving</Button>
        </Form>
    )
}

export { HikeForm }
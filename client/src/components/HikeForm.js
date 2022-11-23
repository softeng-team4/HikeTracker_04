
import { useEffect, useState } from "react"
import { Form, Row, Col, Table, Button, ToggleButtonGroup, ToggleButton } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import { Country, State, City } from 'country-state-city';
import { LocationMarker } from "./LocationMarker"
let gpxParser = require('gpxparser');
var gpx = new gpxParser();



function HikeForm(props) {

    let navigate = useNavigate()
    const [creationMethod, setCreationMethod] = useState(0);
    const [validFile, setValidFile] = useState(false)
    const [pointIndex, setPointIndex] = useState('1');
    const [title, setTitle] = useState('');
    const [length, setLength] = useState('');
    const [expectedTime, setExpectedTime] = useState('');
    const [ascent, setAscent] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [description, setDescription] = useState('');
    const [validated, setValidated] = useState(false);
    //const [positionData, setPositionData] = useState({ lat: 45.06294822296754, lng: 7.662272990156818 })
    const [startPoint, setStartPoint] = useState([])
    const [endPoint, setEndPoint] = useState([])
    const [referencePoint, setReferencePoint] = useState('')
    const [position, setPosition] = useState([45.06294822296754, 7.662272990156818])
    const [countryCode, setCountryCode] = useState('')
    const [country, setCountry] = useState('')
    const [region, setRegion] = useState('')
    const [regionCode, setRegionCode] = useState('')
    const [city, setCity] = useState('')
    const [cityMap, setCityMap] = useState([])

    useEffect(() => {
        delete L.Icon.Default.prototype._getIconUrl;

        L.Icon.Default.mergeOptions({
            iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
            iconUrl: require("leaflet/dist/images/marker-icon.png"),
            shadowUrl: require("leaflet/dist/images/marker-shadow.png")
        });
        console.log("New point index:" + pointIndex)
    }, [pointIndex])

    function checkFile() {
        var fileElement = document.getElementById("formFile");
        var fileExtension = "";
        if (fileElement.value.lastIndexOf(".") > 0) {
            fileExtension = fileElement.value.substring(fileElement.value.lastIndexOf(".") + 1, fileElement.value.length);
        }
        console.log(fileExtension)
        if (fileExtension.toLowerCase() == "gpx") {
            setValidFile(true);
        }
        else {
            setValidFile(false);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false || (creationMethod===1 && checkFile() === false)) {
            event.stopPropagation();
        }
        /*console.log("Title:" + title)
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
        console.log("Reference points:" + referencePoint)*/
        // const newHike = {
        //     ascent: ascent, city: city, country: country, description: description, difficulty: difficulty, endPoint: endPoint, expectedTime: expectedTime,
        //     length: length, referencePoint: referencePoint, region: region, title: title, startPoint: startPoint
        // }
        await props.addNewHike(ascent, city, country, description, difficulty, endPoint, expectedTime,
            length, referencePoint, region, title, startPoint);
        setValidated(true);
        setAscent('');
        setCity('');
        setCountry('');
        setDescription('');
        setDifficulty('');
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

    /* This method will add a new row */
    function addNewRow() {
        var table = document.getElementById("point-table");
        var rowCount = table.rows.length;
        var row = table.insertRow(rowCount);
        var cell = row.insertCell(0)
        cell = row.insertCell(1)
        cell.innerHTML = position[0]
        cell = row.insertCell(2)
        cell.innerHTML = position[1]
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
                    <Form.Control className='title-input' required type='text' onChange={(event) => setTitle(event.target.value)} />
                    <Form.Control.Feedback>Valid title!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">Please insert a title.</Form.Control.Feedback>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Col sm={2}>
                    <Form.Label>Length:</Form.Label>
                </Col>
                <Col >
                    <Form.Control className='length-input' required type='number' defaultValue={undefined} min={0} onChange={(event) => setLength(event.target.value)} />
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
                    <Form.Control className='expTime-input' required type='number' defaultValue={undefined} min={0} onChange={(event) => setExpectedTime(event.target.value)} />
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
                    <Form.Control className='ascent-input' required type='number' defaultValue={undefined} min={0} onChange={(event) => setAscent(event.target.value)} />
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
                    <Form.Select className='difficulty-input' required defaultValue={1} onChange={(event) => setDifficulty(event.target.value)}>
                        <option value={1}>Tourist (Easy)</option>
                        <option value={2}>Hiker (Medium)</option>
                        <option value={3}>Professional Hiker (Hard)</option>
                    </Form.Select>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Col sm={2}>
                    <Form.Label>Select creation method:</Form.Label>
                </Col>
                <Col >
                    <ToggleButtonGroup type="radio" name="options" >
                        <ToggleButton variant='outline-primary' id="tbg-radio-1" value={'1'} onChange={() => setCreationMethod(1)}>
                            Upload GPX file
                        </ToggleButton>
                        <ToggleButton variant='outline-primary' id="tbg-radio-2" value={'2'} onChange={() => setCreationMethod(2)}>
                            Select points in map
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Col>
            </Form.Group>
            {creationMethod !== 1 ? '' :
                <Form.Group as={Row} controlId="formFile" className="mb-3">
                    <Form.Label>GPX File</Form.Label>
                    <Form.Control type="file" accept=".gpx" required onChange={()=>checkFile()} isValid={validFile} isInvalid={!validFile}/>
                    {console.log("vf:" + validFile)}
                    <Form.Control.Feedback type="invalid">Please insert a .GPX file.</Form.Control.Feedback>
                </Form.Group>
            }
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
            {cityMap[0] === undefined || creationMethod !== 2 ? '' :
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
                                <LocationMarker position={position} setPosition={setPosition} />
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
                                    console.log('start', startPoint)
                                    console.log('end', endPoint)
                                    console.log('ref', referencePoint)
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
                                <td>{startPoint[0]}</td>
                                <td>{startPoint[1]}</td>
                            </tr>
                            <tr>
                                <td>End point</td>
                                <td>{endPoint[0]}</td>
                                <td>{endPoint[1]}</td>
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
                <Form.Control className='description-input' required as='textarea' rows={3} defaultValue={undefined} onChange={(event) => setDescription(event.target.value)} />
                <Form.Control.Feedback>Valid description!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">Please insert a description.</Form.Control.Feedback>
            </Form.Group>
            <Button variant='success' type="submit" >Submit form</Button>
            <Button variant='danger' onClick={() => navigate(`/`)}>Exit without saving</Button>
        </Form>
    )
}

export { HikeForm }
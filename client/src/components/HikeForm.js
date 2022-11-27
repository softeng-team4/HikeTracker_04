
import { useEffect, useState } from "react"
import { Form, Row, Col, Table, Button, ToggleButtonGroup, ToggleButton, Alert, Modal, InputGroup } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Polyline } from 'react-leaflet'
import L from 'leaflet-gpx'
import { Country, State, City } from 'country-state-city';
import AuthenticationContext from "./AuthenticationContext"
import { Map } from "./Map"
let gpxParser = require('gpxparser');

function HikeForm(props) {

    let navigate = useNavigate()
    var gpx = new gpxParser();
    const reader = new FileReader();
    const [GPX, setGPX] = useState("");
    const [fileGPX, setFileGPX] = useState(null)
    const [showMap, setShowMap] = useState(false)
    const [validFile, setValidFile] = useState(false)
    const [pointIndex, setPointIndex] = useState('1');
    const [title, setTitle] = useState('');
    const [length, setLength] = useState('');
    const [expectedTime, setExpectedTime] = useState('');
    const [ascent, setAscent] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [description, setDescription] = useState('');
    const [validated, setValidated] = useState(false);
    const [positions, setPositions] = useState('')
    const [startPoint, setStartPoint] = useState([])
    const [endPoint, setEndPoint] = useState([])
    const [referencePoint, setReferencePoint] = useState('')
    const [position, setPosition] = useState([45.06294822296754, 7.662272990156818])
    const [countryCode, setCountryCode] = useState('')
    const [country, setCountry] = useState('')
    const [region, setRegion] = useState('')
    const [regionCode, setRegionCode] = useState('')
    const [city, setCity] = useState('')
    const [email, setEmail] = useState('')
    const [cityMap, setCityMap] = useState([])
    const [show, setShow] = useState(false);




    useEffect(() => {
        delete L.Icon.Default.prototype._getIconUrl;

        L.Icon.Default.mergeOptions({
            iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
            iconUrl: require("leaflet/dist/images/marker-icon.png"),
            shadowUrl: require("leaflet/dist/images/marker-shadow.png")
        });
        console.log("New point index:" + pointIndex)
        if (fileGPX) {
            getValuesFromGPX(fileGPX);
            gpx.parse(fileGPX);

        }
    }, [fileGPX])



    function checkFile() {
        var fileElement = document.getElementById("formFile");
        var fileExtension = "";
        if (fileElement.value.lastIndexOf(".") > 0) {
            fileExtension = fileElement.value.substring(fileElement.value.lastIndexOf(".") + 1, fileElement.value.length);
        }
        console.log(fileExtension)
        if (fileExtension.toLowerCase() === "gpx") {
            setValidFile(true);
        }
        else {
            setValidFile(false);
        }
    }

    const loadGPXContent = (file) => {
        reader.readAsText(file[0]);
        reader.onloadend = () => {
            setFileGPX(reader.result);
        }
    }

    const getValuesFromGPX = (fileGPX) => {
        gpx.parse(fileGPX);
        const l = parseFloat(gpx.tracks[0].distance.total).toFixed(2);
        const a = parseFloat(gpx.tracks[0].elevation.max - gpx.tracks[0].elevation.min).toFixed(2);


        setLength(l);
        setAscent(a);
        setPositions(gpx.tracks[0].points.map(p => ({ lat: p.lat, lng: p.lon })).filter(p => p.lat && p.lng));

        let point1 = gpx.tracks[0].points[0];
        let point2 = gpx.tracks[0].points[gpx.tracks[0].points.length - 1];

        setStartPoint({
            latitude: point1.lat,
            longitude: point1.lon,
            altitude: point1.ele,
            time: point1.time,
            id:null,
            name:null
        });

        setEndPoint({
            latitude: point2.lat,
            longitude: point2.lon,
            altitude: point2.ele,
            time: point2.time,
            id:null,
            name:null
        });

        setReferencePoint(
            gpx.tracks[0].points.map(p => ({ lat: p.lat, lng: p.lon })).filter(p => p.lat && p.lng)
            // gpx.tracks[0].points.map(element => {
            //     return { latitude: element.lat, longitude: element.lon, altitude: element.ele, time: element.time }
            // }).slice(1, 10)  //The gpx tracks are too long, so I cut them and stroe only the first 10 points
        )

        console.log("Start and end points:" + startPoint.latitude + endPoint.latitude)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        console.log("Difficulty:" + difficulty)
        if (form.checkValidity() === false || validFile === false || difficulty === '') {
            event.stopPropagation();
            setValidated(true)
            setShow(true)
            return
        } else {
            /*console.log("Title:" + title)
            console.log("Length:" + length)
            console.log("Expected Time:" + expectedTime)
            console.log("Ascent:" + ascent)
            console.log("Difficulty:" + difficulty)
            console.log("Country:" + country)
            console.log("Region:" + region)
            console.log("City:" + city)
            console.log("Description:" + description)
            console.log("Start point:" + JSON.stringify(startPoint))
            console.log("End point:" + endPoint)
            console.log("Reference points:" + referencePoint)*/

            await props.addNewHike(ascent, city, country, description, difficulty, endPoint, expectedTime,
                length, referencePoint, region, title, startPoint, email);
            setAscent('');
            setCity('');
            setCountry('');
            setDescription('');
            setDifficulty('');
            setStartPoint('');
            setEndPoint('');
            setExpectedTime('');
            setLength('');
            setReferencePoint('');
            setRegion('');
            setTitle('');
            setEmail('');
            setGPX('')
            setShowMap(false);
            setValidated(false)
            setShow(true)
        }
    };

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
                setPosition([e.latlng.lat, e.latlng.lng]);
                //await props.getPosition(position);
                console.log('-----------', position, e.latlng.lat)
            },
            locationfound(e) {
                setPosition(e.latlng)
                map.flyTo(e.latlng, map.getZoom())
            },
        })

        return position === null ? null : (

            <Marker position={position}>
            </Marker>

        )
    }

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

    return (
        <AuthenticationContext.Consumer>
            {(authObject) => (<>
                <Modal show={show} onHide={() => setShow(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>New hike</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{validated? "The hike hasn't been saved. Check out empty fields or wrong insertions!": "The new hike has been saved successfully!"}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => setShow(false)}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
                <h2>Add A New Hike</h2>
                <Form noValidate validated={validated} onSubmit={handleSubmit} className="mt-3">
                    <Form.Group as={Row} className="mb-3">
                        <Col sm={2}>
                            <Form.Label>Title:</Form.Label>
                        </Col>
                        <Col>
                            <Form.Control className='title-input' value={title} required type='text' onChange={(event) => setTitle(event.target.value)} />
                            <Form.Control.Feedback>Valid title!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">Please insert a title.</Form.Control.Feedback>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Col sm={2}>
                            <Form.Label>Expected time:</Form.Label>
                        </Col>
                        <Col >
                            <InputGroup>
                                <Form.Control className='expTime-input' required type='number' value={expectedTime} defaultValue={undefined} min={0} onChange={(event) => setExpectedTime(event.target.value)} />
                                <InputGroup.Text>minutes</InputGroup.Text>
                                <Form.Control.Feedback>Valid time!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">Please insert the expected time. It must be a positive integer.</Form.Control.Feedback>
                            </InputGroup>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Col sm={2}>
                            <Form.Label>Length:</Form.Label>
                        </Col>
                        <Col >
                            <InputGroup>
                                <Form.Control className='length-input' required disabled type='number' value={length} min={0} />
                                <InputGroup.Text>meters</InputGroup.Text>
                                <Form.Control.Feedback>Valid length!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">Please upload gpx file to get the length.</Form.Control.Feedback>
                            </InputGroup>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Col sm={2}>
                            <Form.Label>Ascent:</Form.Label>
                        </Col>
                        <Col >
                            <InputGroup>
                                <Form.Control className='ascent-input' required disabled type='number' value={ascent} defaultValue={ascent} min={0} />
                                <InputGroup.Text>meters</InputGroup.Text>
                                <Form.Control.Feedback>Valid ascent!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">Please upload gpx file to get the ascent. </Form.Control.Feedback>
                            </InputGroup>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Col sm={2}>
                            <Form.Label>Difficulty:</Form.Label>
                        </Col>
                        <Col >
                            <Form.Select className='difficulty-input' style={{cursor:"pointer"}} required value={difficulty} defaultValue='' onChange={(event) => setDifficulty(event.target.value)}>
                                <option value={''}>Select difficulty</option>
                                <option value={'Tourist'}>Tourist (Easy)</option>
                                <option value={'Hiker'}>Hiker (Medium)</option>
                                <option value={'Professional Hiker'}>Professional Hiker (Hard)</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">Please select a difficulty. </Form.Control.Feedback>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Col sm={2}>
                            <Form.Label>Country:</Form.Label>
                        </Col>
                        <Col >
                            <Form.Select className='country-input' style={{cursor:"pointer"}} required defaultValue={undefined} onChange={(event) => {
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
                            <Form.Select className='region-input' style={countryCode ? {cursor:"pointer"} : {}}  disabled={countryCode ? false : true} required defaultValue={undefined} onChange={(event) => {
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
                            <Form.Select className='city-input' style={regionCode ? {cursor:"pointer"} : {}} disabled={regionCode ? false : true} required defaultValue={undefined} onChange={(event) => {
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
                    <Form.Group as={Row} controlId="formFile" className="mb-3">
                        <Form.Label>GPX File</Form.Label>
                        <Form.Control type="file" accept=".gpx" value={GPX} required onChange={(event) => {
                            checkFile();
                            setGPX(event.target.value);
                            loadGPXContent(event.target.files);
                            setShowMap(true);
                            setEmail(authObject.authUser.email);
                        }} />

                        <Form.Control.Feedback type="invalid">Please insert a .GPX file.</Form.Control.Feedback>
                    </Form.Group>

                    {(!fileGPX || positions === '' || !showMap) ? '' :
                        // <MapContainer center={[positions[0].lat, positions[0].lng]} zoom={13} scrollWheelZoom={false}>
                        //     <TileLayer
                        //         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        //         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        //     />
                        //     <LocationMarker />
                        //     <Polyline
                        //         pathOptions={{ fillColor: 'red', color: 'blue' }}
                        //         positions={positions}
                        //     />
                        //     {startPoint.length !== 0 ? <Marker position={[startPoint.latitude, startPoint.longitude]}>
                        //         <Popup>
                        //             Start point
                        //         </Popup>
                        //     </Marker> : ''}
                        //     {endPoint.length !== 0 ? <Marker position={[endPoint.latitude, endPoint.longitude]}>
                        //         <Popup>
                        //             End Point
                        //         </Popup>
                        //     </Marker> : ''}
                        // </MapContainer>
                        <Map positions={positions} startPoint={startPoint} endPoint={endPoint} />
                    }
                    {
                        !showMap ? '' :
                            <Table id="point-table">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>latitude</th>
                                        <th>longitude</th>
                                        <th>altitude</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Start point</td>
                                        <td>{startPoint.latitude}</td>
                                        <td>{startPoint.longitude}</td>
                                        <td>{startPoint.altitude}</td>
                                    </tr>
                                    <tr>
                                        <td>End point</td>
                                        <td>{endPoint.latitude}</td>
                                        <td>{endPoint.longitude}</td>
                                        <td>{endPoint.altitude}</td>
                                    </tr>
                                </tbody>
                            </Table>
                    }
                    {/* <Form.Group as={Row} className="mb-3">
                        <Col sm={2}>
                            <Form.Label>referencePoint:</Form.Label>
                        </Col>
                        <Col >
                            <Form.Select className='ref-input' onChange={(e) => { setReferencePoint(e.target.value) }}>
                                {positions.map((p, i) => <option key={i} value={[p.latitude, p.longitude]}>{[p.latitude, p.longitude]}</option>)}
                            </Form.Select>
                        </Col>
                    </Form.Group> */}



                    {/* {
                cityMap[0] === undefined || creationMethod !== 2 ? '' :
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
            } */}
                    <Form.Group className="mb-3">
                        <Form.Label>Description:</Form.Label>
                        <Form.Control className='description-input' required as='textarea' rows={3} value={description} defaultValue={undefined} onChange={(event) => setDescription(event.target.value)} />
                        <Form.Control.Feedback>Valid description!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">Please insert a description.</Form.Control.Feedback>
                    </Form.Group>
                    <Button variant='success' type="submit" >Submit form</Button>
                    <Button variant='danger' style={{marginLeft: 5}} onClick={() => navigate(`/`)}>Exit without saving</Button>
                </Form >
            </>
            )}
        </AuthenticationContext.Consumer>
    )
}

export { HikeForm }
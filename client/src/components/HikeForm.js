
import markerIconPng from "leaflet/dist/images/marker-icon.png"

import { useEffect, useRef, useState } from "react"
import { Form, Row, Col, Container, Button, ToggleButtonGroup, ToggleButton } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { MapContainer, TileLayer, useMap, Marker, Popup, useMapEvents } from 'react-leaflet'
import L from 'leaflet'

function HikeForm(props) {

    let navigate = useNavigate()
    const [point, setPoint] = useState('1');
    const [num, setNum] = useState('0')
    const [selection, setSelection] = useState(undefined)
    const [title, setTitle] = useState(undefined);
    const [length, setLength] = useState(undefined);
    const [expectedTime, setExpectedTime] = useState(undefined);
    const [ascent, setAscent] = useState(undefined);
    const [difficulty, setDifficulty] = useState(undefined);
    const [description, setDescription] = useState(undefined);
    const [validated, setValidated] = useState(false);
    const [positionData, setPositionData] = useState([45.06294822296754, 7.662272990156818])
    const [startPoint, setStartPoint] = useState([null, null])
    const [endPoint, setEndPoint] = useState([null, null])
    const [referencePoint, setReferencePoint] = useState('')

    // getPoint();

    useEffect(() => {

        console.log(point)
    }, [point])

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
        console.log("Description:" + description)
        setValidated(true);
    };

    const pointRef = useRef('1')
    const handlePoint = (e) => {
        setPoint(e.target.value);
        pointRef.current = e.target.value;
        console.log(e.target.value, point, pointRef.current)
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
    async function getPosition(data) {
        setPositionData(data);
        console.log('parent', positionData)
    }
    // setTimeout((e) => { setPoint(e); console.log('value', e, point) }, 0);

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
                    <Form.Select required defaultValue={undefined} min={0} onChange={(event) => setDifficulty(event.target.value)}>
                        <option value={1}>Tourist (Easy)</option>
                        <option value={2}>Hiker (Medium)</option>
                        <option value={3}>Professional Hiker (Hard)</option>
                    </Form.Select>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                {/* <Col sm={2}>
                    <Form.Label>Start Point:</Form.Label>
                </Col> */}
                <Row>
                    <Col sm={2}>Choose Hike Points:</Col>
                    <Col>
                        <ToggleButtonGroup type="radio" name="options" defaultValue={1} >
                            <ToggleButton variant='outline-primary' id="tbg-radio-1" value={1} onChange={handlePoint}>
                                Start Point
                            </ToggleButton>
                            <ToggleButton variant='outline-primary' id="tbg-radio-2" value={2} onChange={handlePoint}>
                                End Point
                            </ToggleButton>
                            <ToggleButton variant='outline-primary' id="tbg-radio-3" value={3} onChange={handlePoint}>
                                Preference Points
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Col>
                </Row>
                <Row>
                    <Col >
                        <MapContainer center={[45.06294822296754, 7.662272990156818]} zoom={13} scrollWheelZoom={false}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <LocationMarker getPosition={getPosition} />
                            {/* if start point? show marker
                            if end point? show marker
                            if preference point? show marker */}
                            {/* {startPoint === [null, null] ? '':<Marker position={startPoint}></Marker> } */}
                        </MapContainer>
                    </Col>
                </Row>
                <Row>
                    <Col><Button variant='primary'
                        onClick={() => {
                            //add into db
                            //if ponit=1, add into start point
                            console.log('before', pointRef.current, '>>>', startPoint);

                            pointRef.current === '1' ? setStartPoint(positionData) : setStartPoint(startPoint);
                            console.log(pointRef.current, '>>>start', startPoint);
                            //if ponit=2, add into end point
                            pointRef.current === '2' ? setEndPoint(positionData) : setEndPoint(endPoint);
                            console.log(pointRef.current, '>>>end', endPoint);

                            //if ponit=3, add into preference point
                            pointRef.current === '3' ? setReferencePoint(positionData) : setReferencePoint(referencePoint);
                            console.log(pointRef.current, '>>>pre', referencePoint);



                        }}
                    >save
                    </Button></Col>
                </Row>
            </Form.Group>
            {/* <Form.Group as={Row} className="mb-3">
                <Col sm={2}>
                    <Form.Label>End Point:</Form.Label>
                </Col>
                <Col >
                    TBD
                </Col>
            </Form.Group> */}
            {/* <Form.Group as={Row} className="mb-3">
                <Col sm={2}>
                    <Form.Label>Reference Point:</Form.Label>
                </Col>
                <Col >
                    TBD
                </Col>
            </Form.Group> */}
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

function LocationMarker(props) {
    const [position, setPosition] = useState([45.06294822296754, 7.662272990156818])
    const map = useMapEvents({
        async click(e) {
            setPosition(e.latlng);
            await props.getPosition(position);
            // console.log(position)
        },
        locationfound(e) {
            // setPosition(e.latlng)
            map.flyTo(e.latlng, map.getZoom())
        },
    })

    return position === null ? null : (

        <Marker position={position}>
            <Popup>Start point</Popup>
        </Marker>

    )
}


export { HikeForm }
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Card, Row } from 'react-bootstrap';

function HutCard(props) {
    return <>
        <Card key={`card_${props.hut.id}`}>
            <Card.Header key={`card_header_${props.hut.id}`}>
                <Row md={10} className='row d-flex justify-content-between'>
                    {props.hut.author ? <Col lg={4}><b>Local guide:</b>&nbsp;{props.hut.author}</Col> : false}
                    <Col lg={4}><b>Name:</b>&nbsp;{props.hut.name}</Col>
                    <Col lg={4}><b>Phone:</b>&nbsp;{props.hut.phone}</Col>
                    <Col lg={4}><b>Email:</b>&nbsp;{props.hut.email}</Col>
                    <Col lg={4}><b>Latitude:</b>&nbsp;{parseFloat(props.hut.position.latitude).toFixed(6)}</Col>
                    <Col lg={4}><b>Longitude:</b>&nbsp;{parseFloat(props.hut.position.longitude).toFixed(6)}</Col>
                    <Col lg={4}><b>Altitude:</b>&nbsp;{props.hut.altitude}&nbsp;m</Col>
                    <Col lg={4}><b>Country:</b>&nbsp;{props.hut.country}</Col>
                    <Col lg={4}><b>Region:</b>&nbsp;{props.hut.region}</Col>
                    <Col lg={4}><b>City:</b>&nbsp;{props.hut.city}</Col>
                    {props.hut.website !== '' && <Col lg={12}><b>Website:</b>&nbsp;{props.hut.website}</Col>}
                </Row>
            </Card.Header>
            <Card.Body key={`card_body_${props.hut.id}`}>
                <Col><b>Description:</b>&nbsp;<Col className='hut-desc'>{props.hut.description}</Col></Col>
            </Card.Body>
            <Card.Footer key={`card_footer_${props.hut.id}`}>
                <Row md={10} className='row d-flex justify-content-between'>
                    {props.hut.bedsNumber ? <Col lg={3} key={`hut_beds_${props.hut.id}`}><b>Number of beds:</b>&nbsp;{props.hut.bedsNumber}</Col> : false}
                    {props.hut.costPerNight ? <Col lg={3} key={`hut_cost_${props.hut.id}`}><b>Cost per night:</b>&nbsp;{props.hut.costPerNight}&nbsp;€</Col> : false}
                    {props.hut.openingHour && props.hut.openingMinute ? <Col lg={3} key={`hut_opn_${props.hut.id}`}><b>Opening time:</b>&nbsp;{props.hut.openingHour}&nbsp;:&nbsp;{props.hut.openingMinute}</Col> : false}
                    {props.hut.closingHour && props.hut.closingMinute ? <Col lg={3} key={`hut_cls_${props.hut.id}`}><b>Closing Time:</b>&nbsp;{props.hut.closingHour}&nbsp;:&nbsp;{props.hut.closingMinute}</Col> : false}
                </Row>
            </Card.Footer>
        </Card>
    </>
}

export {HutCard}
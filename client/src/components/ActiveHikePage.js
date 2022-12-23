import AuthenticationContext from './AuthenticationContext';
import { Container, Card, Col, Row } from 'react-bootstrap';
import Spacer from './BrowserHikeComponents/Spacer';
import API from '../API'

function ActiveHikePage(props) {
    const hike = props.hike
    return (
        <AuthenticationContext.Consumer>
            {(authObject) => (
                <>
                    <Container fluid style={{ marginBottom: 20 }}>
                        <Spacer height='2rem' />
                        <h2>Active Hike</h2>
                        <Card key={`card`}>
                                    <Card.Header key={`card_header`}>
                                        <Row>
                                            <Col md={8}>
                                                <Row>
                                                    <Col lg={6}><b>Title:</b>&nbsp;{hike.title}</Col>
                                                    <Col lg={6}><b>Location:</b>&nbsp;{hike.country},&nbsp;{hike.region},&nbsp;{hike.city}</Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Card.Header>
                                    <Card.Body className='d-flex justify-content-start' key={`card_body`}>
                                        <Col><b>Description:</b>&nbsp;<Col className='hike-desc'>{hike.description}</Col></Col>
                                    </Card.Body>
                                    <Card.Footer key={`card_footer`}>
                                        <Row md={12}>
                                            <Col md={6} lg={3} key={`hike_diff`}><b>Difficulty:</b>&nbsp;{hike.difficulty}</Col>
                                            <Col md={6} lg={3} key={`hike_len`}><b>Length:</b>&nbsp;{(parseFloat(hike.length) / 1000.).toFixed(1)}&nbsp;km</Col>
                                            <Col md={6} lg={3} key={`hike_asc`}><b>Ascent:</b>&nbsp;{parseInt(hike.ascent)}&nbsp;m</Col>
                                            <Col md={6} lg={3} key={`hike_time`}><b>Estimated Time:</b>&nbsp;{hike.expectedTime}&nbsp;min</Col>
                                        </Row>
                                    </Card.Footer>
                                </Card>
                    </Container>
                </>
            )}
        </AuthenticationContext.Consumer>

    )
}

export { ActiveHikePage }
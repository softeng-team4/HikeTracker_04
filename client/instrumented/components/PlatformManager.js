import { useEffect, useState } from 'react';
import { Button, ButtonGroup, Card, Col, Modal, Row, Container, Form } from 'react-bootstrap';
import { AiOutlineCheck, AiOutlineStop } from 'react-icons/ai'
import API from '../API';
import AuthenticationContext from './AuthenticationContext';
import Spacer from './BrowserHikeComponents/Spacer';

function PlatformManager(props) {
    const roleList = ["Local guide", "Hut worker"]
    const [requestedRole, setRequestedRole] = useState('Local guide')
    const [requestingUsers, setRequestingUsers] = useState([]);
    const [reload, setReload] = useState(false);
    const [showAccepted, setShowAccepted] = useState(false);
    const [showRejected, setShowRejected] = useState(false);
    const [selectedButton, setSelectedButton] = useState('Local guide')

    useEffect(() => {
        API.getRequestingUsers().then(r => setRequestingUsers(r))
    }, [reload])

    const handleRequest = async (user, status) => {
        await API.handleRoleRequest(user, status);
        status === 'accepted' ? setShowAccepted(true) : setShowRejected(true)
        setReload(!reload);
    }


    const handleButtonClick = (key) => {
        if (selectedButton === key) {
            setSelectedButton('');
            key = '';
        } else
            setSelectedButton(key);
        setRequestedRole(key);
    };

    const filterRole = (elem) => {
        if (requestedRole === '') {
            return true
        }
        else if (elem.reqRole.toLowerCase() === requestedRole.toLowerCase()) {
            return true
        }
        else {
            return false
        }
    }

    return (

        <AuthenticationContext.Consumer>
            {(authObject) => (
                <>
                    <Modal show={showAccepted} onHide={() => setShowAccepted(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Accepted !</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            You have accepted this request!
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={() => setShowAccepted(false)}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <Modal show={showRejected} onHide={() => setShowRejected(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Rejected !</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            You have rejected this request!
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="danger" onClick={() => setShowRejected(false)}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <Container fluid className='BrowserHutssContainer'>
                        <Spacer height='2rem' />
                        <Form className='row col-md d-flex justify-content-between'>
                            <Form.Group as={Row} className='row col-md p-2'>
                                <Col sm={2}>
                                    <Form.Label htmlFor='RoleSelection'>Filter requests by role: &nbsp;</Form.Label>
                                </Col>
                                <Col>
                                    <Form.Text>
                                        <ButtonGroup className='RoleSelection'>
                                            {roleList.map((d) =>
                                                <Button key={d} active={d === selectedButton ? true : false} variant='light' onClick={(ev) => (handleButtonClick(d))}>{d}</Button>
                                            )}
                                        </ButtonGroup>
                                    </Form.Text>
                                </Col>
                            </Form.Group>
                        </Form>

                        {requestingUsers.filter(filterRole).map((r, i) =>
                            <div key={`div_${i}`} >
                                <Card key={`card_${i}`}>
                                    <Card.Header key={`card_header_${i}`}>
                                        <Row md={10}>
                                            <Col lg={5}><b>User:</b>&nbsp;{r.firstName}&nbsp;{r.lastName}</Col>
                                            <Col lg={5}><b>Actual role:</b>&nbsp;{r.role}</Col>
                                            <Col className='d-flex justify-content-md-end'>
                                                <ButtonGroup size='sm'>
                                                    <Button variant='success' onClick={() => { handleRequest(r, 'accepted') }}>
                                                        <AiOutlineCheck />
                                                    </Button>
                                                    <Button variant='danger' onClick={() => { handleRequest(r, 'rejected') }}>
                                                        <AiOutlineStop />
                                                    </Button>
                                                </ButtonGroup>
                                            </Col>
                                        </Row>
                                    </Card.Header>
                                    <Card.Body className='d-flex justify-content-start' key={`card_body_${i}`}>

                                        <Row md={12}>
                                            <Col lg key={`user_email_${i}`}><b>Email:</b>&nbsp;{r.email}</Col>
                                        </Row>
                                    </Card.Body>
                                    <Card.Footer key={`card_footer_${i}`}>
                                        <Row md={12}>

                                            <Col><b>Requested Role:</b>&nbsp;{r.reqRole}
                                                {r.reqRole.toLowerCase() === "hut worker" ? ` at ${r.hutName} (${r.hutId})` : ''}
                                            </Col>

                                        </Row>

                                    </Card.Footer>
                                </Card>
                                <Spacer height='1rem' key={`card_spacer_${i}`} />
                            </div>
                        )}
                        {requestingUsers.filter(filterRole).length === 0 && <div className='emty-hikeList'><Spacer height='2rem' /><Card><h5>No request found!</h5></Card><Spacer height='2rem' /></div>}
                    </Container>
                </>
            )}
        </AuthenticationContext.Consumer>

    )
}
export { PlatformManager }
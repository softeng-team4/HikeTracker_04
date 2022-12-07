import { useEffect, useState } from 'react';
import { Button, ButtonGroup, Card, Col, ListGroup, Row } from 'react-bootstrap';
import { AiOutlineCheck, AiOutlineStop } from 'react-icons/ai'
import API from '../API';
import AuthenticationContext from './AuthenticationContext';
import Spacer from './BrowserHikeComponents/Spacer';

function PlatformManager(props) {
    const [requestingUsers, setRequestingUsers] = useState([]);
    const [user, setUser] = useState('');
    useEffect(() => {

        API.getRequestingUsers().then(r => setRequestingUsers(r))

    }, [requestingUsers.length])
    console.log(requestingUsers)
    const handleRequest = async (user, status) => {
        await API.handleRoleRequest(user, status)

    }
    return (

        <AuthenticationContext.Consumer>
            {(authObject) => (
                <>

                    {requestingUsers.map((r, i) => <div key={`div_${i}`} >
                        <Card key={`card_${i}`}>
                            <Card.Header key={`card_header_${i}`}>
                                <Row md={10}>
                                    <Col md={5}><b>User:</b>&nbsp;{r.firstName}&nbsp;{r.lastName}</Col>
                                    <Col md={5}><b>Request Role:</b>&nbsp;{r.reqRole}</Col>
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
                                    <Col md key={`user_email_${i}`}><b>Email:</b>&nbsp;{r.email}</Col>
                                </Row>
                            </Card.Body>
                            <Card.Footer key={`card_footer_${i}`}>
                                <Row md={12}>
                                    <Col md key={`user_role_${i}`}><b>Role:</b>&nbsp;{r.role}</Col>
                                </Row>

                            </Card.Footer>
                        </Card>
                        <Spacer height='1rem' key={`card_spacer_${i}`} />
                    </div>
                    )}

                </>
            )}
        </AuthenticationContext.Consumer>

    )
}
export { PlatformManager }
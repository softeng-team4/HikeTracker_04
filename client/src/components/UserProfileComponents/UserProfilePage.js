import { Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import AuthenticationContext from "../AuthenticationContext";
import Spacer from "../BrowserHikeComponents/Spacer";
import PreferencesSliderForm from "./PreferencesSliderForm";
import { IconContext } from 'react-icons'
import { FaUserCircle } from 'react-icons/fa'


const UserProfilePage = (props) => {

    return (
        <AuthenticationContext.Consumer>
            {(authObject) =>
                <>
                    <Container fluid className='UserProfileContainer'>
                        <Spacer height='2rem' />
                        <Col lg={{ span: 6, offset: 3 }} className='d-flex justify-content-center'>
                            <IconContext.Provider value={{ size: '6em',  }}>
                                <div>
                                    <FaUserCircle />
                                </div>
                            </IconContext.Provider>
                        </Col>
                        <Spacer height='1rem' />
                        <Col lg={{ span: 6, offset: 3 }}>
                            <Form>
                                <Form.Group as={Row} className="p-3">
                                    <Col sm={2}>
                                        <Form.Label className='mt-2'>Name:</Form.Label>
                                    </Col>
                                    <Col sm={4}>
                                        <Form.Control className='name-input' value={authObject.authUser.firstName} disabled type='text' />
                                    </Col>
                                    <Col sm={2}>
                                        <Form.Label className='mt-2'>Surname:</Form.Label>
                                    </Col>
                                    <Col sm={4}>
                                        <Form.Control className='surname-input' value={authObject.authUser.lastName} disabled type='text' />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="p-3">
                                    <Col sm={2}>
                                        <Form.Label className='mt-2'>Email:</Form.Label>
                                    </Col>
                                    <Col sm={10}>
                                        <Form.Control className='email-input' value={authObject.authUser.email} disabled type='text' />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="p-3">
                                    <Col sm={2}>
                                        <Form.Label className='mt-2'>Role:</Form.Label>
                                    </Col>
                                    <Col sm={10}>
                                        <Form.Control className='role-input' value={authObject.authUser.role} disabled type='text' />
                                    </Col>
                                </Form.Group>
                            </Form>
                        </Col>
                        <Spacer height='2rem' />
                        <Col lg={{ span: 6, offset: 3 }} className='d-flex justify-content-center'>
                            <h2>Preferences</h2>
                        </Col>
                        <Col lg={{ span: 6, offset: 3 }}>
                            <PreferencesSliderForm />
                        </Col>
                    </Container>
                </>
            }
        </AuthenticationContext.Consumer>
    );
};

export default UserProfilePage;
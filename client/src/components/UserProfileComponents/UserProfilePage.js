import { Col, Container, Form, Row } from "react-bootstrap";
import AuthenticationContext from "../AuthenticationContext";
import Spacer from "../BrowserHikeComponents/Spacer";
import PreferencesSliderForm from "./PreferencesSliderForm";
import { IconContext } from 'react-icons'
import { FaUserCircle } from 'react-icons/fa'
import { getHutById } from "../../API";
import { useEffect, useState, useContext } from "react";
import PerformanceStats from "./PerformanceStats";


const UserProfilePage = (props) => {
    const [hutName, setHutName] = useState('')
    const authObject = useContext(AuthenticationContext);
    const hutId = authObject.authUser.hutId;

    useEffect(() => {
        hutId && getHutById(hutId).then((res) => setHutName(res.name));
    }, [hutId])

    return (
        <AuthenticationContext.Consumer>
            {(authObject) =>
                <>
                    <Container fluid className='UserProfileContainer'>
                        <Spacer height='2rem' />
                        <Col lg={{ span: 6, offset: 3 }} className='d-flex justify-content-center'>
                            <IconContext.Provider value={{ size: '6em', }}>
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
                                        <Form.Control className='role-input' value={authObject.authUser.role} disabled type='text' isInvalid={authObject.authUser.reqStatus === "pending"} />
                                        <Form.Control.Feedback type="invalid">Pending request for role {authObject.authUser.reqRole}</Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                                {authObject.authUser.role.toLowerCase() === "hut worker" &&
                                    <Form.Group as={Row} className="p-3">
                                        <Col sm={2}>
                                            <Form.Label className='mt-2'>Hut:</Form.Label>
                                        </Col>
                                        <Col sm={10}>
                                            <Form.Control className='role-input' value={hutName} disabled type='text' isInvalid={authObject.authUser.reqStatus === "pending"} />
                                        </Col>
                                    </Form.Group>}
                            </Form>
                        </Col>
                        {authObject.authUser.role.toLowerCase() === 'hiker' &&
                            <>
                                <Spacer height='2rem' />
                                <Col lg={{ span: 6, offset: 3 }} className='d-flex justify-content-center'>
                                    <h2>Preferences</h2>
                                </Col>
                                <Col lg={{ span: 6, offset: 3 }}>
                                    <PreferencesSliderForm />
                                </Col>
                                {authObject.authUser.performances &&
                                    <>
                                        <Spacer height='2rem' />
                                        <Col lg={{ span: 6, offset: 3 }} className='d-flex justify-content-center'>
                                            <h2>Performances</h2>
                                        </Col>
                                        <Col lg={{ span: 6, offset: 3 }}>
                                            <PerformanceStats />
                                        </Col>
                                    </>
                                }
                            </>
                        }
                    </Container>
                </>
            }
        </AuthenticationContext.Consumer>
    );
};

export default UserProfilePage;
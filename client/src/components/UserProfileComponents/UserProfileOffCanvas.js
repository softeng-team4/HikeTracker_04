import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Offcanvas, Col, Row } from 'react-bootstrap';
import AuthenticationContext from '../AuthenticationContext';
import Spacer from '../BrowserHikeComponents/Spacer';
import PreferencesSliderForm from './PreferencesSliderForm';
import { FaChevronRight } from 'react-icons/fa'
import { useNavigate } from 'react-router';


const ProfileOffCanvas = (props) => {


    const navigate = useNavigate();


    return (
        <AuthenticationContext.Consumer>
            {(authObject) =>
                <Offcanvas {...props} placement='end' scroll={true} backdrop={false}>
                    <Offcanvas.Header className='justify-content-end' closeButton />
                    <Offcanvas.Body>
                        <Spacer height='3rem' />
                        <Card>
                            <Card.Header>
                                <Card.Title className='d-flex justify-content-center'>
                                    {authObject.authUser.firstName}&nbsp;{authObject.authUser.lastName}
                                </Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Col className='d-flex justify-content-center'><strong>email:</strong>&nbsp;{authObject.authUser.email}</Col>
                                <Col className='d-flex justify-content-center'><strong>role:</strong>&nbsp;{authObject.authUser.role}</Col>
                            </Card.Body>
                            <Card.Footer>
                                <Row className='redirect-to-profile d-flex justify-content-between'
                                    onClick={() => {navigate(`/profile/${authObject.authUser.firstName.toLowerCase().replace(' ', '_')}_${authObject.authUser.lastName.toLowerCase().replace(' ', '_')}`); props.onHide()}}
                                >
                                    <Col xs={8} className='redirect-text'>Explore your profile</Col>
                                    <Col xs={4} className='d-flex justify-content-end'><FaChevronRight className='redirect-icon mt-1' /></Col>
                                </Row>
                            </Card.Footer>
                        </Card>
                        <Spacer height='3rem' />
                        <Card>
                            <Card.Header>
                                <Card.Title className='d-flex justify-content-center'>
                                    Preferences
                                </Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <PreferencesSliderForm />
                            </Card.Body>
                        </Card>
                    </Offcanvas.Body>
                </Offcanvas>
            }
        </AuthenticationContext.Consumer>
    );
};

export default ProfileOffCanvas;
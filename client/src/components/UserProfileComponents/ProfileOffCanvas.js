import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Offcanvas } from 'react-bootstrap';
import AuthenticationContext from '../AuthenticationContext';
import Spacer from '../BrowserHikeComponents/Spacer';


const ProfileOffCanvas = (props) => {

    return (
        <AuthenticationContext.Consumer>
            {(authObject) =>
                <Offcanvas backdropClassName='col-xxl-2' {...props} placement='end' scroll={true} backdrop={false}>
                    <Offcanvas.Header className='justify-content-end' closeButton closeLabel='closeButton-Offcanvas' />
                    <Offcanvas.Body>
                        <Card>
                            <Card.Header>
                                <Card.Title className='d-flex justify-content-center'>
                                    {authObject.authUser.firstName}&nbsp;{authObject.authUser.lastName}
                                </Card.Title>
                            </Card.Header>
                            <Card.Body>

                            </Card.Body>
                        </Card>
                        <Spacer height='3rem' />
                        <Card>
                            <Card.Header>
                                <Card.Title className='d-flex justify-content-center'>
                                    Preferences
                                </Card.Title>
                            </Card.Header>
                            <Card.Body>

                            </Card.Body>
                        </Card>
                    </Offcanvas.Body>
                </Offcanvas>
            }
        </AuthenticationContext.Consumer>
    );
};

export default ProfileOffCanvas;
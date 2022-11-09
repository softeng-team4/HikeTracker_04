import { Navbar, DropdownButton, Dropdown, Button, Container, Row, Col } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom';
import { FaRegUserCircle, FaHiking } from 'react-icons/fa'
import AuthenticationContext from './AuthenticationContext';

const NavBar = (props) => {

    const location = useLocation();
    const path = location ? location.pathname : undefined;

    return (
        <AuthenticationContext.Consumer>
            {(authObject) => (
                <>
                    <Container fluid>
                        <Row>
                            <Col lg={2} />
                            <Col>
                            <Navbar expand="sm">
                                <Navbar.Brand>
                                    <FaHiking className='react-icon' />
                                    Hike Tracker
                                </Navbar.Brand>
                                <Navbar.Toggle aria-controls="nav-toggle" />
                                <Navbar.Collapse className='justify-content-end' id="nav-toggle">
                                    {authObject.authUser &&
                                        <>
                                            <DropdownButton className='d-flex align-items-center' title={<><FaRegUserCircle className='react-icon align-self-center'/>{'   '}{authObject.authUser.firstName.toUpperCase()}</>} variant='outline-dark' align={{ sm: 'end' }} menuVariant='dark'>
                                                <Dropdown.Item ><NavLink className='profile-link' to={`/${authObject.authUser.firstName.toLowerCase()}`} variant='dark'>Your profile</NavLink></Dropdown.Item>
                                                <Dropdown.Divider />
                                                <Dropdown.Item onClick={() => authObject.onLogout()}>Sign out</Dropdown.Item>
                                            </DropdownButton>
                                        </>
                                    }
                                    {!authObject.authUser &&
                                        <>
                                            <NavLink to='/login'><Button variant='link-dark'>Sign In</Button></NavLink>
                                            <NavLink to='/signup'><Button variant='outline-dark'>Sign Up</Button></NavLink>
                                        </>
                                    }
                                </Navbar.Collapse>
                            </Navbar>
                            </Col>
                            <Col lg={2}/>
                        </Row>
                    </Container>
                </>
            )}
        </AuthenticationContext.Consumer>
    );
};

export default NavBar;
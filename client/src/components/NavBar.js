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
                    <Container fluid className='NavBarContainer'>
                        <Row>
                            <Col xxl={2} />
                            <Col>
                            <Navbar expand="sm">
                                <Navbar.Brand className='d-flex'>
                                    <h3><FaHiking className='nav-icon'/>Hike Tracker</h3>
                                </Navbar.Brand>
                                <Navbar.Toggle aria-controls="nav-toggle" />
                                <Navbar.Collapse className='justify-content-end' id="nav-toggle">
                                    {authObject.authUser &&
                                        <>
                                            <DropdownButton className='d-flex align-items-center' title={<><FaRegUserCircle className='react-icon align-self-center'/>{'   '}{authObject.authUser.firstName.toUpperCase()}</>} variant='outline-dark' align={{ sm: 'end' }} menuVariant='dark'>
                                                <Dropdown.Item ><NavLink className='profile-link' to={`/${authObject.authUser.firstName.toLowerCase()}`} variant='dark'>Your profile</NavLink></Dropdown.Item>
                                                <Dropdown.Divider /> 
                                                    {
                                                    authObject.authUser.role==='Local guide' &&
                                                    <><Dropdown.Item ><NavLink className='hike-form' to="/hikeform" variant='dark'>New Hike</NavLink> </Dropdown.Item>
                                                    <Dropdown.Divider /></>
                                                    }
                                                <Dropdown.Item onClick={() => authObject.onLogout()}><NavLink className='nav-dropdown-link' to='/' variant='dark'>Sign out</NavLink></Dropdown.Item>
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
                            <Col xxl={2}/>
                        </Row>
                    </Container>
                </>
            )}
        </AuthenticationContext.Consumer>
    );
};

export default NavBar;
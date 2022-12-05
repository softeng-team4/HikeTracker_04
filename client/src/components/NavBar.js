import { Navbar, DropdownButton, Dropdown, Button, Container, Row, Col, Nav } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaRegUserCircle, FaHiking } from 'react-icons/fa'
import AuthenticationContext from './AuthenticationContext';
import { useState } from 'react';
import ProfileOffCanvas from './UserProfileComponents/ProfileOffCanvas';

const NavBar = (props) => {


    const navigate = useNavigate();
    // state to show the offcanvas of user profile
    const [showProfileOffCanvas, setShowProfileOffCanvas] = useState(false);

    return (
        <AuthenticationContext.Consumer>
            {(authObject) => (
                <>
                    <Container fluid className='NavBarContainer'>
                        <Row>
                            <Col xxl={2} />
                            <Col>
                                <Navbar expand="sm">
                                    <Navbar.Brand className='d-flex' style={{ cursor: "pointer" }} onClick={() => navigate('/')}>
                                        <h3><FaHiking className='nav-icon' />Hike Tracker</h3>
                                    </Navbar.Brand>
                                    <Navbar.Toggle aria-controls="nav-toggle" />
                                    <Nav className="justify-content-end flex-grow-1 pe-3">

                                        <Navbar.Collapse className='justify-content-end' id="nav-toggle">
                                            {/* all user could see with login */}
                                            <Nav.Link onClick={() => navigate('/')}>Hike List</Nav.Link>

                                            {/* local guide navbar */}

                                            {authObject.authUser &&
                                                <>
                                                    <Nav.Link onClick={() => navigate('/huts')}>Explore huts</Nav.Link>
                                                    {authObject.authUser.role.toLowerCase() === 'local guide' &&
                                                        <>
                                                            <Nav.Link onClick={() => navigate('/hikeform')}>New Hike</Nav.Link>
                                                            <Nav.Link onClick={() => navigate('/newPark')}>New Park</Nav.Link>
                                                            <Nav.Link onClick={() => navigate('/newHut')}>New Hut</Nav.Link>
                                                            {/* <Nav.Link href='/parks'>Park List</Nav.Link> */}


                                                        </>}
                                                </>
                                            }


                                            {/* hiker navbar */}
                                            {authObject.authUser &&
                                                <div>
                                                    <DropdownButton className='d-flex align-items-center' title={<><FaRegUserCircle className='react-icon align-self-center' />{'   '}{authObject.authUser.firstName.toUpperCase()}</>} variant='outline-dark' align={{ sm: 'end' }} menuVariant='dark'>
                                                        <Dropdown.Item
                                                            className='nav-profile-link'
                                                            variant='link'
                                                            onClick={() => setShowProfileOffCanvas(!showProfileOffCanvas)}
                                                        >
                                                            Your profile
                                                        </Dropdown.Item>
                                                        <Dropdown.Divider />
                                                        {/* {
                                                        authObject.authUser.role.toLowerCase() === 'local guide' &&
                                                        <div><Dropdown.Item ><NavLink className='hike-form' to="/hikeform" variant='dark'>New Hike</NavLink> </Dropdown.Item>
                                                            <Dropdown.Divider /></div>
                                                    } */}
                                                        <Dropdown.Item onClick={() => authObject.onLogout()}><NavLink to='/' className='nav-dropdown-link' variant='dark'>Sign out</NavLink></Dropdown.Item>
                                                    </DropdownButton>
                                                </div>
                                            }
                                            {!authObject.authUser &&
                                                <>
                                                    <NavLink to='/login'><Button variant='link-dark'>Sign In</Button></NavLink>
                                                    <NavLink to='/signup'><Button variant='outline-dark'>Sign Up</Button></NavLink>
                                                </>
                                            }
                                        </Navbar.Collapse>
                                    </Nav>
                                </Navbar>
                            </Col>
                            <Col xxl={2} />
                        </Row>
                    </Container>
                    {authObject.authUser && <ProfileOffCanvas show={showProfileOffCanvas} onHide={() => setShowProfileOffCanvas(false)} />}
                </>
            )}
        </AuthenticationContext.Consumer>
    );
};

export default NavBar;
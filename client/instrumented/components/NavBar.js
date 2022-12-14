import { Navbar, DropdownButton, Dropdown, Button, Container, Row, Col, Nav } from 'react-bootstrap';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FaRegUserCircle, FaHiking } from 'react-icons/fa'
import AuthenticationContext from './AuthenticationContext';
import { useState } from 'react';
import UserProfileOffCanvas from './UserProfileComponents/UserProfileOffCanvas';

const NavBar = (props) => {
    const navigate = useNavigate();
    const path = useLocation().pathname;
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
                                    <Navbar.Brand style={{ cursor: "pointer" }} onClick={() => navigate('/')}>
                                        <h3><FaHiking className='nav-icon' />Hike Tracker</h3>
                                    </Navbar.Brand>
                                    <Navbar.Toggle aria-controls="nav-toggle" />
                                    <Nav className="justify-content-end flex-grow-1 pe-3">

                                        <Navbar.Collapse className='row justify-content-sm-end' id="nav-toggle">
                                            <Col sm={9} className='d-sm-flex justify-content-sm-start'>
                                                {/* all user could see with login */}
                                                <Nav.Link className='d-flex justify-content-center' onClick={() => navigate('/')}>Hike List</Nav.Link>

                                                {authObject.authUser &&
                                                    <>
                                                        <Nav.Link className='d-flex justify-content-center' onClick={() => navigate('/huts')}>Explore huts</Nav.Link>
                                                        {authObject.authUser.role.toLowerCase() === 'local guide' &&
                                                            <>
                                                                <Nav.Link className='d-flex justify-content-center' onClick={() => navigate('/hikeform')}>New Hike</Nav.Link>
                                                                <Nav.Link className='d-flex justify-content-center' onClick={() => navigate('/newHut')}>New Hut</Nav.Link>
                                                                <Nav.Link className='d-flex justify-content-center' onClick={() => navigate('/newPark')}>New Park</Nav.Link>
                                                                {/* <Nav.Link href='/parks'>Park List</Nav.Link> */}
                                                            </>}
                                                        {authObject.authUser.role.toLowerCase() === 'manager' &&
                                                            <>
                                                                <Nav.Link className='d-flex justify-content-center' onClick={() => navigate('/manager')}>Manage Users</Nav.Link>
                                                            </>}
                                                        {authObject.authUser.role.toLowerCase() === 'hiker' &&
                                                            <>
                                                                <Nav.Link className='d-flex justify-content-center' onClick={() => navigate('/active')}>Active hike</Nav.Link>
                                                            </>}
                                                    </>
                                                }
                                            </Col>
                                            <hr className='d-sm-none' style={{ width: '95%', margin: 'auto' }} />
                                            {/* hiker navbar */}
                                            {/* show on display larger than sm */}
                                            <Col sm={3} className='d-none d-sm-flex justify-content-sm-end'>
                                                {authObject.authUser &&
                                                    <DropdownButton
                                                        className='userDropdownButton'
                                                        variant='outline-dark'
                                                        drop='down'
                                                        align='end'
                                                        menuVariant='dark'
                                                        title={<><FaRegUserCircle className='mb-1' />{'   '}{authObject.authUser.firstName.toUpperCase()}</>}
                                                    >
                                                        {!path.startsWith('/profile/') &&
                                                            <>
                                                                <Dropdown.Item
                                                                    className='nav-profile-link'
                                                                    variant='link'
                                                                    onClick={() => setShowProfileOffCanvas(!showProfileOffCanvas)}
                                                                >
                                                                    My Profile
                                                                </Dropdown.Item>
                                                                {authObject.authUser.role.toLowerCase() === 'hut worker' && <Dropdown.Item className='condition-link' onClick={() => { navigate('/hikeCondition'); }} >Hike Condition</Dropdown.Item>}
                                                                {authObject.authUser.role.toLowerCase() === 'local guide' && <Dropdown.Item className='modify-page' onClick={() => { navigate('/myHikeList'); }} >My Hikes</Dropdown.Item>}
                                                                {authObject.authUser.role.toLowerCase() === 'hiker' && <Dropdown.Item className='completed-hikes' onClick={ () => {navigate('/completedHikes')}}>Completed hikes</Dropdown.Item>}
                                                                <Dropdown.Divider />
                                                            </>
                                                        }
                                                        <Dropdown.Item className='logOutBtn' onClick={() => { authObject.onLogout(); navigate('/'); }}>Sign out</Dropdown.Item>
                                                    </DropdownButton>
                                                }
                                                {!authObject.authUser &&
                                                    <>
                                                        {path !== '/login' && <NavLink to='/login'><Button variant='link-dark'>Sign In</Button></NavLink>}
                                                        {path !== '/signup' && <NavLink to='/signup'><Button variant='outline-dark'>Sign Up</Button></NavLink>}
                                                    </>
                                                }
                                            </Col>
                                            {/* show on small display */}
                                            <Col className='d-sm-none'>
                                                {authObject.authUser &&
                                                    <>
                                                        {!path.startsWith('/profile/') &&
                                                            <Nav.Link className='d-flex justify-content-center' onClick={() => setShowProfileOffCanvas(!showProfileOffCanvas)}>My profile</Nav.Link>}
                                                        {authObject.authUser.role.toLowerCase() === 'hut worker' &&
                                                            <Nav.Link className='condition-link d-flex justify-content-center' onClick={() => { navigate('/hikeCondition'); }} >Hike Condition</Nav.Link>}
                                                        {authObject.authUser.role.toLowerCase() === 'hiker' &&
                                                            <Nav.Link className='d-flex justify-content-center' onClick={ () => {navigate('/completedHikes')}}>Completed hikes</Nav.Link>}
                                                        {authObject.authUser.role.toLowerCase() === 'local guide' &&
                                                            <Nav.Link className='modify-page d-flex justify-content-center' onClick={() => { navigate('/myHikeList'); }} >My Hikes</Nav.Link>}
                                                        <Nav.Link className='d-flex justify-content-center' onClick={() => authObject.onLogout()}>Sign Out</Nav.Link>
                                                    </>
                                                }
                                                {!authObject.authUser &&
                                                    <>
                                                        {path !== '/login' && <Nav.Link className='d-flex justify-content-center' onClick={() => navigate('/login')}>Sign In</Nav.Link>}
                                                        {path !== '/signup' && <Nav.Link className='d-flex justify-content-center' onClick={() => navigate('/signup')}>Sign Up</Nav.Link>}
                                                    </>
                                                }
                                            </Col>
                                            <hr className='d-sm-none' style={{ width: '95%', margin: 'auto' }} />
                                        </Navbar.Collapse>
                                    </Nav>
                                </Navbar>
                            </Col>
                            <Col xxl={2} />
                        </Row>
                    </Container>
                    {authObject.authUser && <UserProfileOffCanvas show={showProfileOffCanvas} onHide={() => setShowProfileOffCanvas(false)} />}
                </>
            )}
        </AuthenticationContext.Consumer>
    );
};

export default NavBar;
import { Navbar, DropdownButton, Dropdown, Button, Container } from 'react-bootstrap';
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
                    <Navbar expand="sm">
                        <Container>
                            <Navbar.Brand>
                                <FaHiking className='react-icon' />
                                Hike Tracker
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="nav-toggle" />
                            <Navbar.Collapse className='justify-content-end' id="nav-toggle">
                                {authObject.authUser &&
                                    <>
                                        <DropdownButton className='d-flex align-items-center' title={<><FaRegUserCircle className='react-icon align-self-center' />{'   '}{authObject.authUser.name.toUpperCase()}</>} variant='outline-dark' menuAlign={{ sm: 'right' }}>
                                            <Dropdown.Item onClick={() => authObject.onLogout()}>Logout</Dropdown.Item>
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
                        </Container>
                    </Navbar>
                </>
            )}
        </AuthenticationContext.Consumer>
    );
};

export default NavBar;
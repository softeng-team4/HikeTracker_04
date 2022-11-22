import { Container, Row, Col, Button } from 'react-bootstrap';
import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';
import AuthenticationContext from './AuthenticationContext';
import HikeTable from './BrowserHikeComponents/HikeTable'
import { HikeForm } from './HikeForm';
import { HutForm } from './HutForm';
import NavBar from './NavBar';
import { ParkForm } from './ParkForm';


function DefaultRoute() {
    return (
        <>
            <h1>Nothing here...</h1>
            <p>This is not the route you are looking for!</p>
        </>
    );
}



function AppLayout() {
    return (
        <>
            <Container fluid className='PageContainer'>
                <Row>
                    <NavBar />

                </Row>
                <Row>
                    <Col xxl={2} />
                    <Col>
                        <Outlet />
                    </Col>
                    <Col xxl={2} />

                </Row>
            </Container>
        </>
    )
}

function BrowserHikes(props) {
    return (
        <>
            <HikeTable />

        </>
    );
}

function AddNewHike(props) {
    return (
        <>
            <HikeForm addNewHike={props.addNewHike} />
        </>
    );
}

function AddNewPark(props) {
    return (
        <>
            <ParkForm />
        </>
    );
}

function AddNewHut(props) {
    return (
        <>
            <HutForm />
        </>
    );
}

export { DefaultRoute, BrowserHikes, AppLayout, AddNewHike, AddNewPark, AddNewHut };

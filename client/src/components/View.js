import { Container, Row, Col } from 'react-bootstrap';
import { Outlet } from 'react-router';
import HikeTable from './BrowserHikeComponents/HikeTable'
import HandleModifyPage from './HandleModifyPage';
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
            <ParkForm addNewParkingLot={props.addNewParkingLot} />
        </>
    );
}

function AddNewHut(props) {
    return (
        <>
            <HutForm addNewHut={props.addNewHut} />
        </>
    );
}

function ModifyHikeByAuthor(props) {
    return (
        <>
            <HandleModifyPage />
        </>
    );
}



export { DefaultRoute, BrowserHikes, AppLayout, AddNewHike, AddNewPark, AddNewHut, ModifyHikeByAuthor };

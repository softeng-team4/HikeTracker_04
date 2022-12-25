import { Container, Row, Col } from 'react-bootstrap';
import { Navigate, Outlet, useParams } from 'react-router';
import HikeTable from './BrowserHikeComponents/HikeTable'
import HandleModifyPage from './ModifyHikeComponents/HandleModifyPage';
import { HikeForm } from './HikeFormComponents/HikeForm';
import { HutForm } from './HutParkFormComponents/HutForm';
import NavBar from './NavBar';
import { ParkForm } from './HutParkFormComponents/ParkForm';
import UserProfilePage from './UserProfileComponents/UserProfilePage';
import { PlatformManager } from './PlatformManager';
import { MyHikeList } from './ModifyHikeComponents/MyHikeList';
import { ActiveHikePage } from './ActiveHikePage';


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
            <MyHikeList />
        </>
    );
}

function UserProfile(props) {
    return (
        <>
            <UserProfilePage />
        </>
    );
}

function ManagerPage(props) {
    return (
        <>
            <PlatformManager />
        </>
    );
}

function HikePage(props) {
    let params = useParams()
    return (
        <>
            <ActiveHikePage hikeId = {params.id}/>
        </>
    )
}

export { DefaultRoute, BrowserHikes, AppLayout, AddNewHike, AddNewPark, AddNewHut, ModifyHikeByAuthor, UserProfile, ManagerPage, HikePage };

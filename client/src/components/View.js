import { Container, Row, Col } from 'react-bootstrap';
import { Outlet } from 'react-router';
import HikeTable from './BrowserHikeComponents/HikeTable'
import NavBar from './NavBar';


function DefaultRoute() {
    return (
        <>
            <h1>Nothing here...</h1>
            <p>This is not the route you are looking for!</p>
        </>
    );
}

function BrowserHikes(props) {
    return (
        <>
            <HikeTable />
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


export { DefaultRoute, BrowserHikes, AppLayout };

import { Row, Col, Container, Button, Navbar } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';


function DefaultRoute() {
    return (
        <>
            <Row>
                <Col>
                    <h1>Nothing here...</h1>
                    <p>This is not the route you are looking for!</p>
                </Col>
            </Row>
        </>
    );
}

function AppLayout(props) {
    return (
        <Container fluid>
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand >
                        Hike Tracker
                    </Navbar.Brand>
                </Container>
            </Navbar>

            <Outlet />
        </Container>
    );
}



export { DefaultRoute, AppLayout };

import { Row, Col, Container } from 'react-bootstrap';
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
        <>
            Hi there!
            <Outlet />
        </>
    );
}



export { DefaultRoute, AppLayout };

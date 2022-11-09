import { Row, Col, Container } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';
import HikeTable from './BrowserHikeComponents/HikeTable'


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



export { DefaultRoute, BrowserHikes };

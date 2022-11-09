import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner, Col, Row, Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import API from '../../API';
import Spacer from './Spacer';
import FilterForm from './FilterForm';


const HikeTable = () => {

    //state to wait server response
    const [isLoading, setIsLoading] = useState(true);


    return (
        <Container fluid className='BrowserHikesContainer'>
            <Spacer height='2rem'/>
            <h2>Explore Hike</h2>
            <FilterForm/>
        </Container>
    );
};

export default HikeTable;
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Row, Col, Button, OverlayTrigger, Tooltip, Dropdown, Form } from 'react-bootstrap';
import { FaSearchLocation } from 'react-icons/fa';

const FilterForm = (props) => {


    var testCountry = ['Italy', 'Germany', 'Spain', 'Brasil', 'Korea']
    var testRegion = ['Piedmont', 'Lombardy', 'Sicily']
    var testCity = ['Asti', 'Biella', 'Cuneo', 'Turin', 'Novara']
    const [country, setCountry] = useState('...')
    const [region, setRegion] = useState('...')
    const [city, setCity] = useState('...')
    const [countryList, setCountryList] = useState(testCountry)
    const [regionList, setRegionList] = useState(undefined)
    const [cityList, setCityList] = useState(undefined)

    const [countryIsSelected, setCountryIsSelected] = useState(false);
    const [regionIsSelected, setRegionIsSelected] = useState(false);

    const retrieveRegions = (ev) => {
        ev.preventDefault();
        // API retrieve regions for event.target.value
        setCountry(ev.target.value)
        console.log(country);
        setRegionList(testRegion);
        setCountryIsSelected(true);
    };

    const retrieveCities = (ev) => {
        ev.preventDefault();
        // API retrieve cities for event.target.value
        setCity(ev.target.value)
        console.log(city);
        setCityList(testCity);
        setRegionIsSelected(true);
    };


    return (
        <Row className='FilterForm'>
            <Col xl={6} className='geoAreaFilter'>
                <Form className='d-flex justify-content-between'>
                    <Form.Group className='col-md-3 p-2'>
                        <Form.Label htmlFor='CountrySelection'>Select a Country</Form.Label>
                        <Form.Select className='CountrySelection' value={country} onChange={(ev) => { retrieveRegions(ev) }}>
                            {countryList ? countryList.map(c =>
                                <option key={`c-${c}`}>{c}</option>
                            ) : null}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className='col-md-3 p-2'>
                        <Form.Label htmlFor='RegionSelection'>Select a Region</Form.Label>
                        <Form.Select className='RegionSelection' value={region} {...countryIsSelected ? null : {disabled: true}} onChange={(ev) => { retrieveCities(ev) }}>
                            {regionList ? regionList.map(r =>
                                <option key={`c-${r}`}>{r}</option>
                            ) : null}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className='col-md-3 p-2'>
                        <Form.Label htmlFor='CitySelection'>Select a City</Form.Label>
                        <Form.Select className='CitySelection' value={city} {...regionIsSelected ? null : {disabled: true}} onChange={(ev) => { setCity(ev.target.value) }}>
                            {cityList ? cityList.map(c =>
                                <option key={`c-${c}`}>{c}</option>
                            ) : null}
                        </Form.Select>
                    </Form.Group>
                    <Button className='col-sm-1' variant="dark" type="submit" size='sm' form='geoAreaFilter'><FaSearchLocation/></Button>
                </Form>
            </Col>
        </Row>
    );
};

export default FilterForm;
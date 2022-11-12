import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { FaSearchLocation } from 'react-icons/fa';


const GeoAreaForm = (props) => {

    // test variables
    var testCountry = ['None', 'Italy', 'Germany', 'Spain', 'Brasil', 'Korea']
    var testRegion = ['Piedmont', 'Lombardy', 'Sicily']
    var testCity = ['Asti', 'Biella', 'Cuneo', 'Turin', 'Novara']
    // states to hold the list of geoAreas recieved from the server
    const [countryList, setCountryList] = useState(testCountry)
    const [regionList, setRegionList] = useState(undefined)
    const [cityList, setCityList] = useState(undefined)
    // states to disable region and city
    const [countryIsSelected, setCountryIsSelected] = useState(false);
    const [regionIsSelected, setRegionIsSelected] = useState(false);


    const retrieveRegions = (ev) => {
        ev.preventDefault();
        const c = ev.target.value;
        var ga = props.geoArea;
        // API retrieve regions for event.target.value
        if (c === 'None') {
            ga.country = ga.region = ga.city = c
            setCountryIsSelected(false);
            setRegionList(undefined);
            setCityList(undefined);
        } else {
            ga.country = c
            setRegionList(['None', ...testRegion]);
            setCountryIsSelected(true);
        }
        props.setGeoArea(ga);
    };


    const retrieveCities = (ev) => {
        ev.preventDefault();
        const r = ev.target.value;
        var ga = props.geoArea;
        // API retrieve cities for event.target.value
        if (r === 'None') {
            ga.region = ga.city = r
            setRegionIsSelected(false);
            setCityList(undefined)
        } else {
            ga.region = r
            setCityList(['None', ...testCity]);
            setRegionIsSelected(true);
        }
        props.setGeoArea(ga);
    };


    const setCity = (ev) => {
        ev.preventDefault();
        const c = ev.target.value;
        var ga = props.geoArea;
        ga.city = c
        props.setGeoArea(ga);
    };


    return (
        <Form className='row d-flex justify-content-between'>
            <Form.Group className='col-md-4 p-2'>
                <Form.Label htmlFor='CountrySelection'>Select a Country</Form.Label>
                <Form.Select className='CountrySelection' value={props.geoArea.country} onChange={(ev) => { retrieveRegions(ev) }}>
                    {countryList ? countryList.map(c =>
                        <option key={`co-${c}`} value={c}>{c}</option>
                    ) : null}
                </Form.Select>
            </Form.Group>
            <Form.Group className='col-md-4 p-2'>
                <Form.Label htmlFor='RegionSelection'>Select a Region</Form.Label>
                <Form.Select className='RegionSelection' value={props.geoArea.region} {...countryIsSelected ? null : { disabled: true }} onChange={(ev) => { retrieveCities(ev) }}>
                    {regionList ? regionList.map(r =>
                        <option key={`r-${r}`} value={r}>{r}</option>
                    ) : null}
                </Form.Select>
            </Form.Group>
            <Form.Group className='col-md-4 p-2'>
                <Form.Label htmlFor='CitySelection'>Select a City</Form.Label>
                <InputGroup>
                    <Form.Select className='CitySelection' value={props.geoArea.city} {...regionIsSelected ? null : { disabled: true }} onChange={(ev) => { setCity(ev) }}>
                        {cityList ? cityList.map(c =>
                            <option key={`ci-${c}`} value={c}>{c}</option>
                        ) : null}
                    </Form.Select>
                    <InputGroup.Text className='button-geoArea' onClick={props.handleGeoAreaSubmit}>
                        <FaSearchLocation/>
                    </InputGroup.Text>
                </InputGroup>
            </Form.Group>
        </Form>
    );
};

export default GeoAreaForm;
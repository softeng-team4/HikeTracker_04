import 'bootstrap/dist/css/bootstrap.min.css';
import { useRef, useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { FaSearchLocation } from 'react-icons/fa';
import { Country, State, City } from 'country-state-city'


const GeoAreaForm = (props) => {


    // states to hold the list of geoAreas recieved from the server
    const [countryList, setCountryList] = useState([<option key={'None'} value={'None'}>{'None'}</option>, ...Country.getAllCountries().map((c, i) => <option key={i} value={c.isoCode}>{c.name}</option>)]);
    const [regionList, setRegionList] = useState([<option key={'None'} value={'None'}>{'None'}</option>]);
    const [cityList, setCityList] = useState([<option key={'None'} value={'None'}>{'None'}</option>]);
    // states to disable region and city
    const [countryIsSelected, setCountryIsSelected] = useState(false);
    const [regionIsSelected, setRegionIsSelected] = useState(false);
    const [localGeoArea, setLocalGeoArea] = useState({ country: { countryCode: 'None', name: 'None' }, region: { countryCode: 'None', stateCode: 'None', name: 'None' }, city: { name: 'None' } });
    // references of select
    const regionSelect = useRef();
    const citySelect = useRef();

    const retrieveRegions = (ev) => {
        ev.preventDefault();
        const cc = ev.target.value;
        setLocalGeoArea({
            country: { countryCode: cc, name: cc === 'None' ? 'None' : Country.getAllCountries().filter(c => c.isoCode === cc)[0].name },
            region: { countryCode: 'None', stateCode: 'None', name: 'None' },
            city: { name: 'None' }
        });
        if (cc === 'None') { setCountryIsSelected(false); setRegionIsSelected(false); }
        else if (cc !== localGeoArea.country.countryCode) { setCountryIsSelected(true); setRegionIsSelected(false) }
        else setCountryIsSelected(true);
        setRegionList([<option key={'None'} value={'None'}>{'None'}</option>, ...State.getStatesOfCountry(cc).map((r, j) => <option key={j} value={r.isoCode}>{r.name}</option>)]);
        regionSelect.current.value = 'None';
        citySelect.current.value = 'None';
    };


    const retrieveCities = (ev) => {
        ev.preventDefault();
        const sc = ev.target.value;
        setLocalGeoArea({
            country: localGeoArea.country,
            region: { stateCode: sc, name: sc === 'None' ? 'None' : State.getStatesOfCountry(localGeoArea.country.countryCode).filter(r => r.isoCode === sc)[0].name },
            city: { name: 'None' }
        });
        sc === 'None' ? setRegionIsSelected(false) : setRegionIsSelected(true);
        setCityList([<option key={'None'} value={'None'}>{'None'}</option>, ...City.getCitiesOfState(localGeoArea.country.countryCode, sc).map((ci, k) => <option key={k} value={ci.name}>{ci.name}</option>)]);
        citySelect.current.value = 'None';
    };


    const setCity = (ev) => {
        ev.preventDefault();
        const c = ev.target.value;
        setLocalGeoArea({ country: localGeoArea.country, region: localGeoArea.region, city: { name: c } });
    };


    const handleSubmit = () => {
        if (props.geoArea !== localGeoArea) {
            props.setGeoArea(localGeoArea);
        }
    };


    return (
        <Form className='row d-flex justify-content-between'>
            <Form.Group className='col-md-4 p-2'>
                <Form.Label htmlFor='CountrySelection'>Select a Country</Form.Label>
                <Form.Select className='CountrySelection' onChange={(event) => (retrieveRegions(event))}>
                    {countryList}
                </Form.Select>
            </Form.Group>
            <Form.Group className='col-md-4 p-2'>
                <Form.Label htmlFor='RegionSelection'>Select a Region</Form.Label>
                <Form.Select className='RegionSelection' ref={regionSelect} onChange={(event) => (retrieveCities(event))} {...countryIsSelected ? { disabled: false } : { disabled: true }}>
                    {regionList}
                </Form.Select>
            </Form.Group>
            <Form.Group className='col-md-4 p-2'>
                <Form.Label htmlFor='CitySelection'>Select a City</Form.Label>
                <InputGroup>
                    <Form.Select className='CitySelection' ref={citySelect} onChange={(event) => (setCity(event))} {...regionIsSelected ? { disabled: false } : { disabled: true }}>
                        {cityList}
                    </Form.Select>
                    <InputGroup.Text className='button-geoArea' onClick={handleSubmit}>
                        <FaSearchLocation />
                    </InputGroup.Text>
                </InputGroup>
            </Form.Group>
        </Form>
    );
};

export default GeoAreaForm;
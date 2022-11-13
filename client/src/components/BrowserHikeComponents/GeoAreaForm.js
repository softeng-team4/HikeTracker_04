import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { FaSearchLocation } from 'react-icons/fa';
import { Country, State, City } from 'country-state-city'


const GeoAreaForm = (props) => {


    // states to hold the list of geoAreas recieved from the server
    const countryList = [{ countryCode: "None", name: 'None' }, ...Country.getAllCountries().map((c, _) => ({ countryCode: c.isoCode, name: c.name }))];
    const [regionList, setRegionList] = useState(undefined);
    const [cityList, setCityList] = useState(undefined);
    // states to disable region and city
    const [countryIsSelected, setCountryIsSelected] = useState(false);
    const [regionIsSelected, setRegionIsSelected] = useState(false);
    const [localGeoArea, setLocalGeoArea] = useState({ country: {countryCode: 'None', name: 'None'}, region: {countryCode: 'None', stateCode: 'None', name: 'None'}, city: {name: 'None'}});


    const retrieveRegions = (ev) => {
        ev.preventDefault();
        const cc_cn = ev.target.id.split('_');
        const c = { countryCode: cc_cn[0], name: cc_cn[1] };
        if (c.name === 'None') {
            localGeoArea.country = c;
            localGeoArea.region = { countryCode: 'None', stateCode: 'None', name: 'None' }
            localGeoArea.city.name = 'None';
            setCountryIsSelected(false);
            setRegionIsSelected(false);
            setRegionList(undefined);
            setCityList(undefined);
        } else {
            if (localGeoArea.country.name !== c.name) {
                localGeoArea.region = { countryCode: 'None', stateCode: 'None', name: 'None' }
                localGeoArea.city.name = 'None';
                setCityList(undefined)
                setRegionIsSelected(false);
            }
            localGeoArea.country = c
            setRegionList([{ countryCode: 'None', stateCode: 'None', name: 'None' }, ...State.getStatesOfCountry(c.countryCode).map((r, _) => ({ countryCode: c.countryCode, stateCode: r.isoCode, name: r.name }))]);
            setCountryIsSelected(true);
        }
    };


    const retrieveCities = (ev) => {
        ev.preventDefault();
        const cc_sc_sn = ev.target.id.split('_');
        const r = { countryCode: cc_sc_sn[0], stateCode: cc_sc_sn[1], name: cc_sc_sn[2] };
        if (r.name === 'None') {
            localGeoArea.region = r;
            localGeoArea.city.name = 'None';
            setRegionIsSelected(false);
            setCityList(undefined)
        } else {
            if (localGeoArea.region.name !== r.name)
                localGeoArea.city.name = 'None';
            localGeoArea.region = r
            setCityList([{ name: 'None' }, ...City.getCitiesOfState(r.countryCode, r.stateCode).map((c, _) => ({ name: c.name }))]);
            setRegionIsSelected(true);
        }
    };


    const setCity = (ev) => {
        ev.preventDefault();
        const c = ev.target.value;
        localGeoArea.city.name = c;
    };


    const handleSubmit = () => {
        if(props.geoArea !== localGeoArea) {
            var ga = localGeoArea;
            ga.country.name = ga.country.name ? ga.country.name : undefined;
            ga.region.name = ga.region.name ? ga.region.name : undefined;
            ga.city.name = ga.city.name ? ga.city.name : undefined;
            props.setGeoArea(ga);
        }
    };


    return (
        <Form className='row d-flex justify-content-between'>
            <Form.Group className='col-md-4 p-2'>
                <Form.Label htmlFor='CountrySelection'>Select a Country</Form.Label>
                <Form.Select className='CountrySelection' key={'countrySel'}>
                    {countryList ? countryList.map(c =>
                        <option key={`co-${c.countryCode}`} value={c.name} id={c.countryCode + '_' + c.name} onClick={(ev) => { retrieveRegions(ev) }}>{c.name}</option>
                    ) : null}
                </Form.Select>
            </Form.Group>
            <Form.Group className='col-md-4 p-2'>
                <Form.Label htmlFor='RegionSelection'>Select a Region</Form.Label>
                <Form.Select className='RegionSelection' key={'regionSel'} {...countryIsSelected ? null : { disabled: true }}>
                    {regionList ? regionList.map(r =>
                        <option key={`r-${r.countryCode + '_' + r.stateCode}`} value={r.name} id={r.countryCode + '_' + r.stateCode + '_' + r.name} onClick={(ev) => { retrieveCities(ev) }}>{r.name}</option>
                    ) : null}
                </Form.Select>
            </Form.Group>
            <Form.Group className='col-md-4 p-2'>
                <Form.Label htmlFor='CitySelection'>Select a City</Form.Label>
                <InputGroup>
                    <Form.Select className='CitySelection' key={'citySel'} {...regionIsSelected ? null : { disabled: true }} onChange={(ev) => { setCity(ev) }}>
                        {cityList ? cityList.map(c =>
                            <option key={`ci-${c.name}`} value={c.name}>{c.name}</option>
                        ) : null}
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
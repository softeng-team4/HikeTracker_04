import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect, useContext } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import AuthenticationContext from '../AuthenticationContext';
import DifficultyForm from './DifficultyForm';
import GeoAreaForm from './GeoAreaForm';
import SliderForm from './SliderForm';
import API from '../../API';
import PointRadiusForm from './PointRadiusForm';

const FilterForm = (props) => {

    // initial state of filters
    const geoArea = { country: { countryCode: 'None', name: 'None' }, region: { countryCode: 'None', stateCode: 'None', name: 'None' }, city: { name: 'None' } };
    const difficulty  = 'None';
    const lengthRange = { min: 0, max: Number.MAX_VALUE };
    const ascentRange = { min: 0, max: Number.MAX_VALUE };
    const expTimeRange = { min: 0, max: Number.MAX_VALUE };
    const pointRadius = { coordinates: undefined, radius: undefined };
    // initial state of center map
    const milan_coord = { coordinates: [45.46427, 9.18951] };

    // user data
    const userData = useContext(AuthenticationContext).authUser;
    const [centerMap, setcenterMap] = useState(milan_coord);
    // state to hold the entire list of filters
    const [filters, setFilters] = useState({ geoArea: geoArea, pointRadius: pointRadius, difficulty: difficulty, lengthRange: lengthRange, ascentRange: ascentRange, expTimeRange: expTimeRange });
    // state to hold which geoAreaFilter display to the user
    const [geoAreaFilterType, setGeoAreaFilterType] = useState(true);
    // state to hold custom preferences on ranges
    const [customPreferences, setCustomPreferences] = useState(undefined);
    const setHikeList = props.setHikeList;
    const setIsLoading = props.setIsLoading;


    useEffect(() => {
        const success = (pos) => {
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;
            const cM = {coordinates: [lat, lon]};
            setcenterMap(cM);
        };

        const error = (error) => {
            console.log(error);
        };
        //navigator.geolocation.getCurrentPosition(success, error);
    }, [centerMap]);


    useEffect(() => {
        setIsLoading(true);
        API.hikesList({
            country: filters.geoArea.country.name === 'None' ? undefined : filters.geoArea.country.name,
            region: filters.geoArea.region.name === 'None' ? undefined : filters.geoArea.region.name,
            city: filters.geoArea.city.name === 'None' ? undefined : filters.geoArea.city.name,
            pointRadius: filters.pointRadius,
            difficulty: filters.difficulty === 'None' ? undefined : filters.difficulty,
            length: filters.lengthRange,
            ascent: filters.ascentRange,
            expectedTime: filters.expTimeRange
        }, 'hike').then(r => setHikeList(r));
    }, [filters, setHikeList, setIsLoading]);


    const handleGeoAreaSwitch = () => {
        if (geoAreaFilterType)
            setFilters({...filters, geoArea: geoArea});
        else
            setFilters({...filters, pointRadius: pointRadius});
        setGeoAreaFilterType(!geoAreaFilterType);
    };


    const handleCustomFilters = (event) => {
        const isChecked = event.target.checked;
        if(isChecked)
            setCustomPreferences(userData.preferences);
        else
            setCustomPreferences(undefined);
    };


    return (
        <AuthenticationContext.Consumer>
            {(authObject) => (
                <>
                    <Row className='FilterForm'>
                        <Row>
                            {geoAreaFilterType ?
                                <>
                                    <Col lg={7} className='geoAreaFilter'>
                                        <GeoAreaForm geoArea={filters.geoArea} setGeoArea={setFilters} />
                                    </Col>
                                    <Col lg={2} className='btn-geoArea p-3'>
                                        <Button size='sm' variant='success' onClick={handleGeoAreaSwitch}>switch to radius</Button>
                                    </Col>
                                </>
                                :
                                <PointRadiusForm centerMap={centerMap} pointRadius={filters.pointRadius} setPointRadius={setFilters} handleGeoAreaSwitch={handleGeoAreaSwitch} />
                            }
                            <DifficultyForm difficulty={filters.difficulty} setDifficulty={setFilters} />
                        </Row>
                        <Row>
                            <SliderForm customPreferences={customPreferences} setRanges={setFilters} />
                        </Row>
                            <Row>
                                <Col sm={6}>
                                {authObject.authUser && authObject.authUser.preferences && 
                                    <Form.Check type='checkbox' label='apply custom filters' onChange={(ev) => handleCustomFilters(ev)} />  
                                }
                                </Col>
                                <Col sm={6} className='d-flex justify-content-start justify-content-sm-end'>
                                {authObject.authUser && authObject.authUser.role.toLowerCase() === 'local guide' &&
                                    <Form.Check type='switch' label='modify created hikes' reverse={window.innerWidth > 576 ? true : false} onChange={() => props.handleEmailFilter()} />  
                                }
                                </Col>
                            </Row>
                    </Row>
                </>
            )}
        </AuthenticationContext.Consumer>
    );
};

export default FilterForm;
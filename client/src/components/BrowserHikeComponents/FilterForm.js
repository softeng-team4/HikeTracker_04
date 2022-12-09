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


    // user data
    const userData = useContext(AuthenticationContext).authUser;
    // state to hold geoArea filter
    const [geoArea, setGeoArea] = useState({ country: { countryCode: 'None', name: 'None' }, region: { countryCode: 'None', stateCode: 'None', name: 'None' }, city: { name: 'None' } });
    // state to hold selected difficulty
    const [difficulty, setDifficulty] = useState('None')
    // state to hold lenght data range
    const [lenghtRange, setLenghtRange] = useState({ min: 0, max: Number.MAX_VALUE })
    // state to hold ascent data range
    const [ascentRange, setAscentRange] = useState({ min: 0, max: Number.MAX_VALUE })
    // state to hold expected time data range
    const [expTimeRange, setExpTimeRange] = useState({ min: 0, max: Number.MAX_VALUE })
    // state to hold initial map location
    const [centerMap, setcenterMap] = useState({ coordinates: [45.46427, 9.18951] });
    // state to hold point and radius of map filter
    const [pointRadius, setPointRadius] = useState({ coordinates: undefined, radius: undefined });
    // state to hold the entire list of filters
    const [filters, setFilters] = useState({ geoArea: geoArea, pointRadius: pointRadius, difficulty: difficulty, lenghtRange: lenghtRange, ascentRange: ascentRange, expTimeRange: expTimeRange });
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
            const cM = centerMap;
            cM.coordinates = [lat, lon];
            setcenterMap(cM);
        };

        const error = (error) => {
            console.log(error);
            const cM = centerMap;
            cM.coordinates = [45.46427, 9.18951]; // coord of Milan city
            setcenterMap(cM);
        };
        //navigator.geolocation.getCurrentPosition(success, error);
    }, [centerMap]);


    useEffect(() => {
        setIsLoading(true);
        //API.deleteInvalidHikes().then(console.log("deleted!"))
        API.hikesList({
            country: filters.geoArea.country.name === 'None' ? undefined : filters.geoArea.country.name,
            region: filters.geoArea.region.name === 'None' ? undefined : filters.geoArea.region.name,
            city: filters.geoArea.city.name === 'None' ? undefined : filters.geoArea.city.name,
            pointRadius: filters.pointRadius,
            difficulty: filters.difficulty === 'None' ? undefined : filters.difficulty,
            length: filters.lenghtRange,
            ascent: filters.ascentRange,
            expectedTime: filters.expTimeRange
        }, 'hike').then(r => setHikeList(r));
    }, [filters, setHikeList, setIsLoading]);


    useEffect(() => {
        setFilters({ geoArea: geoArea, pointRadius: pointRadius, difficulty: difficulty, lenghtRange: lenghtRange, ascentRange: ascentRange, expTimeRange: expTimeRange });
    }, [geoArea, pointRadius, difficulty, lenghtRange, ascentRange, expTimeRange]);


    const handleSliderSubmit = (sliderObj) => {
        if (sliderObj.slider === 0)
            setLenghtRange(sliderObj.range)
        else if (sliderObj.slider === 1)
            setAscentRange(sliderObj.range)
        else
            setExpTimeRange(sliderObj.range)
    };


    const handleGeoAreaSwitch = () => {
        if (geoAreaFilterType)
            setGeoArea({ country: { countryCode: 'None', name: 'None' }, region: { countryCode: 'None', stateCode: 'None', name: 'None' }, city: { name: 'None' } });
        else
            setPointRadius({ coordinates: undefined, radius: undefined });
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
                                        <GeoAreaForm geoArea={geoArea} setGeoArea={setGeoArea} />
                                    </Col>
                                    <Col lg={2} className='btn-geoArea p-3'>
                                        <Button size='sm' variant='success' onClick={handleGeoAreaSwitch}>switch to radius</Button>
                                    </Col>
                                </>
                                :
                                <PointRadiusForm isLoading={props.isLoading} centerMap={centerMap} pointRadius={pointRadius} setPointRadius={setPointRadius} handleGeoAreaSwitch={handleGeoAreaSwitch} />
                            }
                            <DifficultyForm difficulty={difficulty} setDifficulty={setDifficulty} />
                        </Row>
                        <Row>
                            <SliderForm customPreferences={customPreferences} handleSliderSubmit={handleSliderSubmit} />
                        </Row>
                            <Row>
                                <Col className={authObject.authUser && authObject.authUser.preferences ? 'd-flex justify-content-sm-between' : 'd-flex justify-content-sm-end'}>
                                {authObject.authUser && authObject.authUser.preferences && 
                                    <Form.Check type='checkbox' label='apply custom filters' onChange={(ev) => handleCustomFilters(ev)} />  
                                }
                                {authObject.authUser && authObject.authUser.role.toLowerCase() === 'local guide' &&
                                    <Form.Check type='switch' label='modify created hikes' reverse onChange={() => props.handleEmailFilter()} />  
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
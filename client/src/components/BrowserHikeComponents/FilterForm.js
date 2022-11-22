import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import DifficultyForm from './DifficultyForm';
import GeoAreaForm from './GeoAreaForm';
import SliderForm from './SliderForm';
import API from '../../API';

const FilterForm = (props) => {


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
    // state to hold the entire list of filters
    const [filters, setFilters] = useState({ geoArea: geoArea, difficulty: difficulty, lenghtRange: lenghtRange, ascentRange: ascentRange, expTimeRange: expTimeRange });


    useEffect(() => {
        console.log('I am here!');
        //API.deleteInvalidHikes().then(console.log("deleted!"))
        API.hikesList({
            country: filters.geoArea.country.name === 'None' ? undefined : filters.geoArea.country.name,
            region: filters.geoArea.region.name === 'None' ? undefined : filters.geoArea.region.name,
            city: filters.geoArea.city.name === 'None' ? undefined : filters.geoArea.city.name,
            difficulty: filters.difficulty === 'None' ? undefined : filters.difficulty,
            length: filters.lenghtRange,
            ascent: filters.ascentRange,
            expectedTime: filters.expTimeRange
        }, 'hike').then(r => props.setHikeList(r));
    }, [filters]);


    useEffect(() => {
        setFilters({ geoArea: geoArea, difficulty: difficulty, lenghtRange: lenghtRange, ascentRange: ascentRange, expTimeRange: expTimeRange });
    }, [geoArea, difficulty, lenghtRange, ascentRange, expTimeRange]);


    const handleSliderSubmit = (sliderObj) => {
        if (sliderObj.slider === 0)
            setLenghtRange(sliderObj.range)
        else if (sliderObj.slider === 1)
            setAscentRange(sliderObj.range)
        else
            setExpTimeRange(sliderObj.range)
        console.log(sliderObj)
    }


    return (
        <>
            <Row className='FilterForm'>
                <Row>
                    <Col lg={8} className='geoAreaFilter'>
                        <GeoAreaForm geoArea={geoArea} setGeoArea={setGeoArea} />
                    </Col>
                    <DifficultyForm difficulty={difficulty} setDifficulty={setDifficulty} />
                </Row>
                <Row>
                    <SliderForm handleSliderSubmit={handleSliderSubmit} />
                </Row>
            </Row>
        </>
    );
};

export default FilterForm;
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { Row, Col} from 'react-bootstrap';
import DifficultyForm from './DifficultyForm';
import GeoAreaForm from './GeoAreaForm';
import SliderForm from './SliderForm';
import API from '../../API';

const FilterForm = (props) => {


    // state to hold geoArea filter
    const [geoArea, setGeoArea] = useState({ country: {countryCode: undefined, name: undefined}, region: {countryCode: undefined, stateCode: undefined, name: undefined}, city: {name: undefined}});
    // state to hold selected difficulty
    const [difficulty, setDifficulty] = useState(undefined)
    // state to hold lenght data range
    const [lenghtRange, setLenghtRange] = useState({ min: 0, max: Number.MAX_VALUE })
    // state to hold ascent data range
    const [ascentRange, setAscentRange] = useState({ min: 0, max: Number.MAX_VALUE })
    // state to hold expected time data range
    const [expTimeRange, setExpTimeRange] = useState({ min: 0, max: Number.MAX_VALUE })
    // state to hold the entire list of filters
    const [filters, setFilters] = useState({geoArea: geoArea, difficulty: difficulty, lenghtRange: lenghtRange, ascentRange: ascentRange, expTimeRange: expTimeRange});


    const setHikeList = props.setHikeList;


    useEffect(() => {
        console.log('I am here!');
        setHikeList(
            API.hikeList({  country: filters.geoArea.country.name, 
                            region: filters.geoArea.region.name,
                            city: filters.geoArea.city.name,
                            difficulty: filters.difficulty,
                            lenght: filters.lenghtRange,
                            ascent: filters.ascentRange,
                            expectedTime: filters.expTimeRange
                        })
        []);
    }, [filters, setHikeList]);


    useEffect(() => {
        setFilters({geoArea: geoArea, difficulty: difficulty, lenghtRange: lenghtRange, ascentRange: ascentRange, expTimeRange: expTimeRange});
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
                        <GeoAreaForm geoArea={geoArea} setGeoArea={setGeoArea}/>
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
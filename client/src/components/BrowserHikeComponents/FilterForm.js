import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { Row, Col, Button, OverlayTrigger, Tooltip, Dropdown, Form } from 'react-bootstrap';
import DifficultyForm from './DifficultyForm';
import GeoAreaForm from './GeoAreaForm';
import SliderForm from './SliderForm';

const FilterForm = (props) => {


    // state to hold geoArea filter
    const [geoArea, setGeoArea] = useState({ country: 'None', region: 'None', city: 'None' });
    // state to hold selected difficulty
    const [difficulty, setDifficulty] = useState('None')
    // state to hold lenght data range
    const [lenghtRange, setLenghtRange] = useState({ min: 0, max: 'inf' })
    // state to hold ascent data range
    const [ascentRange, setAscentRange] = useState({ min: 0, max: 'inf' })
    // state to hold expected time data range
    const [expTimeRange, setExpTimeRange] = useState({ min: 0, max: 'inf' })


    const handleGeoAreaSubmit = () => {
        //TODO API call
        console.log(geoArea)
    };


    const handleDifficultySubmit = (d) => {
        //TODO API call
        setDifficulty(d);
        console.log(d);
    };


    const handleSliderSubmit = (sliderObj) => {
        //TODO API call
        if (sliderObj.slider === 0)
            setLenghtRange(sliderObj.range)
        else if (sliderObj.slider === 1)
            setAscentRange(sliderObj.range)
        else
            setExpTimeRange(sliderObj.range)
        console.log(sliderObj);
    }


    return (
        <>
            <Row className='FilterForm'>
                <Col xl={6} className='geoAreaFilter'>
                    <GeoAreaForm geoArea={geoArea} setGeoArea={setGeoArea} handleGeoAreaSubmit={handleGeoAreaSubmit} />
                </Col>
                <Col xl={2}>
                    <DifficultyForm difficulty={difficulty} handleDifficultySubmit={handleDifficultySubmit} />
                </Col>
            </Row>
            <Row>
                <SliderForm handleSliderSubmit={handleSliderSubmit}/>
            </Row>
        </>
    );
};

export default FilterForm;
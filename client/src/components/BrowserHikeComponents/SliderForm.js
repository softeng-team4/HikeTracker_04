import 'bootstrap/dist/css/bootstrap.min.css';
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';
import { Form, Col } from 'react-bootstrap';
import Spacer from './Spacer';
import { useState, useEffect } from 'react';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

const SliderForm = (props) => {


    // labels of range sliders points
    const lengthMarks = { 0: '0km', 5000: '5km', 10000: '10km', 15000: '15km', 20000: '20km', 25000: '25+km' };
    const ascentMarks = { 0: '0m', 200: '200m', 400: '400m', 600: '600m', 800: '800m', 1000: '1000+m' };
    const timeMarks = { 0: '0h', 120: '2h', 240: '4h', 360: '6h', 480: '8h', 600: '10+h' };
    // default Ranges for Sliders defaultValues
    const dR = { 0: { min: 0, max: 25000, step: 5000 }, 1: { min: 0, max: 1000, step: 200 }, 2: { min: 0, max: 600, step: 120 } };
    // state to hold current ranges defaultValues
    const [localRanges, setLocalRanges] = useState({ lengthRange: [dR[0].min, dR[0].max], ascentRange: [dR[1].min, dR[1].max], timeRange: [dR[2].min, dR[2].max] })
    // reference to set filters
    const setRanges = props.setRanges;

    useEffect(() => {
        const p = props.customPreferences;
        if (p) {
            setLocalRanges({ lengthRange: [p.lengthRange.min, p.lengthRange.max], ascentRange: [p.ascentRange.min, p.ascentRange.max], timeRange: [p.timeRange.min, p.timeRange.max] });

        } else {
            setLocalRanges({ lengthRange: [0, 25000], ascentRange: [0, 1000], timeRange: [0, 600] });
        }
    }, [props.customPreferences]);


    useEffect(() => {
        setRanges((s) => ({
            ...s,
            lengthRange: { min: localRanges.lengthRange[0], max: (localRanges.lengthRange[1] === 25000) ? Number.MAX_VALUE : localRanges.lengthRange[1] },
            ascentRange: { min: localRanges.ascentRange[0], max: (localRanges.ascentRange[1] === 1000) ? Number.MAX_VALUE : localRanges.ascentRange[1] },
            expTimeRange: { min: localRanges.timeRange[0], max: (localRanges.timeRange[1] === 600) ? Number.MAX_VALUE : localRanges.timeRange[1] }
        }));
    }, [localRanges, setRanges]);


    return (
        <Form className='row d-md-flex justify-content-between'>
            <Form.Group className='d-md-flex'>
                <Col className='col-md-4 p-4'>
                    <Form.Label htmlFor='LengthRange'>Select lenght range</Form.Label>
                    <Range
                        className='LengthRange'
                        min={dR[0].min}
                        max={dR[0].max}
                        step={dR[0].step}
                        marks={lengthMarks}
                        allowCross={false}
                        defaultValue={[dR[0].min, dR[0].max]}
                        value={localRanges.lengthRange}
                        onChange={(range) => setLocalRanges((r) => ({ ...r, lengthRange: range }))}
                    />
                </Col>
                <Col className='col-md-4 p-4'>
                    <Form.Label htmlFor='AscentRange'>Select ascent range</Form.Label>
                    <Range
                        className='AscentRange'
                        min={dR[1].min}
                        max={dR[1].max}
                        step={dR[1].step}
                        marks={ascentMarks}
                        allowCross={false}
                        defaultValue={[dR[1].min, dR[1].max]}
                        value={localRanges.ascentRange}
                        onChange={(range) => setLocalRanges((r) => ({ ...r, ascentRange: range }))}
                    />
                </Col>
                <Col className='col-md-4 p-4'>
                    <Form.Label htmlFor='ExpTimeRange'>Select estimated time range</Form.Label>
                    <Range
                        className='ExpTimeRange'
                        min={dR[2].min}
                        max={dR[2].max}
                        step={dR[2].step}
                        marks={timeMarks}
                        allowCross={false}
                        defaultValue={[dR[2].min, dR[2].max]}
                        value={localRanges.timeRange}
                        onChange={(range) => setLocalRanges((r) => ({ ...r, timeRange: range }))}
                    />
                </Col>
            </Form.Group>
            <Spacer height='1.5rem' />
        </Form>
    );
};

export default SliderForm;
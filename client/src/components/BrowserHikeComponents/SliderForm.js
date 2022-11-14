import 'bootstrap/dist/css/bootstrap.min.css';
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';
import { Form, Col } from 'react-bootstrap';
import Spacer from './Spacer';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

const SliderForm = (props) => {

    // labels of range sliders points
    const lenghtMarks = { 0: '0km', 5: '5km', 10: '10km', 15: '15km', 20: '20km', 25: '25+km' };
    const ascentMarks = { 0: '0m', 200: '200m', 400: '400m', 600: '600m', 800: '800m', 1000: '1000+m' };
    const timeMarks = { 0: '0h', 120: '2h', 240: '4h', 360: '6h', 480: '8h', 600: '10+h' };
    // default Ranges for Sliders values
    const dR = {0: {min: 0, max: 25, step: 5}, 1: {min: 0, max: 1000, step: 200}, 2: {min: 0, max: 600, step: 120}}


    const handleRange = (slider_num, range) => {
        props.handleSliderSubmit({slider: slider_num, range:{min: range[0], max: (range[1] === dR[slider_num].max) ? Number.MAX_VALUE : range[1]}})
    };


    return (
        <Form className='row d-md-flex justify-content-between'>
            <Form.Group className='d-md-flex'>
                <Col className='col-md-4 p-4'>
                    <Form.Label htmlFor='LenghtRange'>Select lenght range</Form.Label>
                    <Range className='LenghtRange' min={dR[0].min} max={dR[0].max} step={dR[0].step} marks={lenghtMarks} allowCross={false} defaultValue={[dR[0].min,dR[0].max]} onAfterChange={(range) => handleRange(0, range)}/>
                </Col>
                <Col className='col-md-4 p-4'>
                    <Form.Label htmlFor='AscentRange'>Select ascent range</Form.Label>
                    <Range className='AscentRange' min={dR[1].min} max={dR[1].max} step={dR[1].step} marks={ascentMarks} allowCross={false} defaultValue={[dR[1].min,dR[1].max]} onAfterChange={(range) => handleRange(1, range)}/>
                </Col>
                <Col className='col-md-4 p-4'>
                    <Form.Label htmlFor='ExpTimeRange'>Select estimated time range</Form.Label>
                    <Range className='ExpTimeRange' min={dR[2].min} max={dR[2].max} step={dR[2].step} marks={timeMarks} allowCross={false} defaultValue={[dR[2].min,dR[2].max]} onAfterChange={(range) => handleRange(2, range)}/>
                </Col>
            </Form.Group>
            <Spacer height='1.5rem'/>
        </Form>
    );
};

export default SliderForm;
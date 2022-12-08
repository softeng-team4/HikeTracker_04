import 'rc-slider/assets/index.css';
import Slider from 'rc-slider'; import { Col, Form, InputGroup, Row } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import GeoAreaForm from '../BrowserHikeComponents/GeoAreaForm';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

const HutSearchBar = (props) => {
    // default Range for Slider values
    const dR = { min: 0, max: 750, step: 150 };
    // labels of range slider points
    const altitudeMarks = { 0: '0m', 150: '150m', 300: '300m', 450: '450m', 600: '600m', 750: '750+m' };

    const [searchParams, setSearchParams] = useSearchParams();

    const onSubmit = e => {
        e.preventDefault()
        searchParams.set('s', props.searchQuery);
        setSearchParams(searchParams);
    }

    const handleRange = (range) => {
        props.setRange({min: range[0], max: (range[1] === dR.max) ? Number.MAX_VALUE : range[1]});
    }

    return (<>
        <Col xl={12}><GeoAreaForm geoArea={props.geoArea} setGeoArea={props.setGeoArea} /></Col>
        <Col xl={4} className='col-md-4 p-2'>
            <Form action="/" method="get" autoComplete='off' onSubmit={onSubmit}>
                <Row>
                    <Form.Label htmlFor="header-search">
                        Search by name
                    </Form.Label>
                </Row>
                <Row>
                    <InputGroup className="mb-3">
                        <Form.Control
                            value={props.searchQuery ? props.searchQuery : ''}
                            onInput={e => props.setSearchQuery(e.target.value.toLowerCase())}
                            type="text"
                            id="header-search"
                            placeholder="Search huts"
                            name="s"
                        />
                        <InputGroup.Text style={{ cursor: "pointer" }} onClick={onSubmit}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                            </svg>
                        </InputGroup.Text>
                    </InputGroup>
                </Row>
            </Form>
        </Col>
        <Col xl={8}>
            <Form style={{ margin: 10 }}>
                <Form.Label htmlFor='AltitudeRange'>Select an altitude range</Form.Label>
                <Range className='AltitudeRange' min={dR.min} max={dR.max} step={dR.step} marks={altitudeMarks} allowCross={false} defaultValue={[dR.min, dR.max]} onAfterChange={(range) => handleRange(range)} />
            </Form>
        </Col>
    </>)
}
export { HutSearchBar }

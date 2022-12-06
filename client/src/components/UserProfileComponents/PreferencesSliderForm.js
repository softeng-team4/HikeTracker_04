import 'bootstrap/dist/css/bootstrap.min.css';
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';
import { Form, Toast, Row, Col, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useState, useContext } from 'react';
import AuthenticationContext from '../AuthenticationContext';
import Spacer from '../BrowserHikeComponents/Spacer';
import API from '../../API';


const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);


const PreferencesSliderForm = (props) => {

    // labels of range sliders points
    const lenghtMarks = { 0: '0km', 5: '5km', 10: '10km', 15: '15km', 20: '20km', 25: '25+km' };
    const ascentMarks = { 0: '0m', 200: '200m', 400: '400m', 600: '600m', 800: '800m', 1000: '1000+m' };
    const timeMarks = { 0: '0h', 120: '2h', 240: '4h', 360: '6h', 480: '8h', 600: '10+h' };
    // default Ranges for Sliders values
    const dR = { 0: { min: 0, max: 25, step: 5 }, 1: { min: 0, max: 1000, step: 200 }, 2: { min: 0, max: 600, step: 120 } }
    // user data
    const authObject = useContext(AuthenticationContext);
    const user = authObject.authUser;
    user.preferences = user.preferences ? { ascentRange: user.preferences.ascentRange, lengthRange: user.preferences.lengthRange, timeRange: user.preferences.timeRange } : undefined;
    // state to hold value of lenght range
    const [lengthRange, setLengthRange] = useState(
        user && user.preferences ? user.preferences.lengthRange : { min: dR[0].min, max: dR[0].max }
    );
    // state to hold value of ascent range
    const [ascentRange, setAscentRange] = useState(
        user && user.preferences ? user.preferences.ascentRange : { min: dR[1].min, max: dR[1].max }
    );
    // state to hold value of time range
    const [timeRange, setTimeRange] = useState(
        user && user.preferences ? user.preferences.timeRange : { min: dR[2].min, max: dR[2].max }
    );
    // current preferences
    const preferences = { ascentRange: ascentRange, lengthRange: lengthRange, timeRange: timeRange };
    // state to show submit alert
    const [showSubmitAlert, setShowSubmitAlert] = useState(false);


    const handleSubmit = () => {
        if (preferences !== user.preferences) {
            API.modifyUserPreferences(user.email, preferences).then(() => {
                setShowSubmitAlert(true);
                authObject.onUpdateUserData();
            });
        }
    };


    return (
        <AuthenticationContext.Consumer>
            {(authObject) =>
                <>
                    <Form className='p-2'>
                        <Toast bg='success' show={showSubmitAlert} onClose={() => setShowSubmitAlert(false)} delay={3000} autohide>
                            <Toast.Body>Preferences updated successfully!</Toast.Body>
                        </Toast>
                        <Form.Group>
                            <Row className='pt-0 p-4'>
                                <Form.Label className='d-flex justify-content-center' htmlFor='LenghtRange'>Select lenght range</Form.Label>
                                <Range className='LenghtRange'
                                    min={dR[0].min}
                                    max={dR[0].max}
                                    step={dR[0].step}
                                    marks={lenghtMarks}
                                    allowCross={false}
                                    defaultValue={[lengthRange.min, lengthRange.max]}
                                    onAfterChange={(r) => setLengthRange({ min: r[0], max: r[1] })}
                                />
                            </Row>
                            <Row className='p-4'>
                                <Form.Label className='d-flex justify-content-center' htmlFor='AscentRange'>Select ascent range</Form.Label>
                                <Range
                                    className='AscentRange'
                                    min={dR[1].min}
                                    max={dR[1].max}
                                    step={dR[1].step}
                                    marks={ascentMarks}
                                    allowCross={false}
                                    defaultValue={[ascentRange.min, ascentRange.max]}
                                    onAfterChange={(r) => setAscentRange({ min: r[0], max: r[1] })}
                                />
                            </Row>
                            <Row className='p-4'>
                                <Form.Label className='d-flex justify-content-center' htmlFor='ExpTimeRange'>Select time range</Form.Label>
                                <Range
                                    className='ExpTimeRange'
                                    min={dR[2].min}
                                    max={dR[2].max}
                                    step={dR[2].step}
                                    marks={timeMarks}
                                    allowCross={false}
                                    defaultValue={[timeRange.min, timeRange.max]}
                                    onAfterChange={(r) => setTimeRange({ min: r[0], max: r[1] })}
                                />
                            </Row>
                        </Form.Group>
                        <Spacer height='1rem' />
                        <Row>
                            <Col className='d-flex justify-content-center'>
                                <OverlayTrigger
                                    placement='top'
                                    overlay={
                                        authObject.authUser && JSON.stringify(user.preferences) === JSON.stringify(preferences) ?
                                            <Tooltip>
                                                Change preferences to submit
                                            </Tooltip>
                                            : <></>
                                    }
                                >
                                    <span>
                                        <Button size='sm' variant='success' disabled={authObject.authUser && JSON.stringify(user.preferences) === JSON.stringify(preferences) ? true : false} onClick={() => handleSubmit()}>
                                            Submit
                                        </Button>
                                    </span>
                                </OverlayTrigger>
                            </Col>
                        </Row>
                    </Form>
                </>
            }
        </AuthenticationContext.Consumer>
    );
};

export default PreferencesSliderForm;
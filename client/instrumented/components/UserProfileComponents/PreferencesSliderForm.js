import 'bootstrap/dist/css/bootstrap.min.css';
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';
import { Form, Toast, Row, Col, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useState, useContext, useEffect } from 'react';
import AuthenticationContext from '../AuthenticationContext';
import Spacer from '../BrowserHikeComponents/Spacer';
import API from '../../API';


const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);


const PreferencesSliderForm = (props) => {

    // labels of range sliders points
    const lengthMarks = { 0: '0km', 5000: '5km', 10000: '10km', 15000: '15km', 20000: '20km', 25000: '25+km' };
    const ascentMarks = { 0: '0m', 200: '200m', 400: '400m', 600: '600m', 800: '800m', 1000: '1000+m' };
    const timeMarks = { 0: '0h', 120: '2h', 240: '4h', 360: '6h', 480: '8h', 600: '10+h' };
    // default Ranges for Sliders values
    const dR = { 0: { min: 0, max: 25000, step: 5000 }, 1: { min: 0, max: 1000, step: 200 }, 2: { min: 0, max: 600, step: 120 } }
    // user data
    const authObject = useContext(AuthenticationContext);
    const [user, setUser] = useState(authObject.authUser);
    // state to hold value of lenght range init with user ones if are saved
    const [lengthRange, setLengthRange] = useState(
        user && user.preferences ? user.preferences.lengthRange : { min: dR[0].min, max: dR[0].max }
    );
    // state to hold value of ascent range init with user ones if are saved
    const [ascentRange, setAscentRange] = useState(
        user && user.preferences ? user.preferences.ascentRange : { min: dR[1].min, max: dR[1].max }
    );
    // state to hold value of time range init with user ones if are saved
    const [timeRange, setTimeRange] = useState(
        user && user.preferences ? user.preferences.timeRange : { min: dR[2].min, max: dR[2].max }
    );
    // state to hold current preferences init with user ones if are saved
    const [preferences, setPreferences] = useState(user.preferences ? user.preferences : {});
    // state to show submit alert
    const [showSubmitAlert, setShowSubmitAlert] = useState(false);

    
    // function to update displayed preferences when a range change
    useEffect(() => {
        setPreferences({lengthRange: lengthRange, ascentRange: ascentRange, timeRange: timeRange});
    }, [lengthRange, ascentRange, timeRange]);


    // function to compare user saved preferances and displayed ones
    const comparePreferences = (p1, p2) => {
        if(!p1)
            return false;
        if (p1.lengthRange.min !== p2.lengthRange.min || p1.lengthRange.max !== p2.lengthRange.max ||
            p1.ascentRange.min !== p2.ascentRange.min || p1.ascentRange.max !== p2.ascentRange.max ||
            p1.timeRange.min !== p2.timeRange.min || p1.timeRange.max !== p2.timeRange.max)
            return false;
        return true;
    };


    // function to submit the updated preferences and update the ones saved into component
    const handleSubmit = () => {
        if (preferences !== user.preferences) {
            API.modifyUserPreferences(user.email, preferences).then(() => {
                setShowSubmitAlert(true);
                authObject.onUpdateUserData().then((userData) => {
                    setUser(userData);
                });
            });
        }
    };


    return (
        <AuthenticationContext.Consumer>
            {(authObject) =>
                authObject.authUser.role.toLowerCase() === 'hiker' &&
                <>
                    <Form className='p-2'>
                        <Toast bg='success' show={showSubmitAlert} onClose={() => setShowSubmitAlert(false)} delay={3000} autohide>
                            <Toast.Body style={{color: "white"}}>Preferences updated successfully!</Toast.Body>
                        </Toast>
                        <Form.Group>
                            <Row className='pt-0 p-4'>
                                <Form.Label className='d-flex justify-content-center' htmlFor='prefLengthRange'>Select lenght range</Form.Label>
                                <Range className='prefLengthRange'
                                    min={dR[0].min}
                                    max={dR[0].max}
                                    step={dR[0].step}
                                    marks={lengthMarks}
                                    allowCross={false}
                                    defaultValue={[lengthRange.min, lengthRange.max]}
                                    onAfterChange={(r) => { setLengthRange({min: r[0], max: r[1]}) }}
                                />
                            </Row>
                            <Row className='p-4'>
                                <Form.Label className='d-flex justify-content-center' htmlFor='prefAscentRange'>Select ascent range</Form.Label>
                                <Range
                                    className='prefAscentRange'
                                    min={dR[1].min}
                                    max={dR[1].max}
                                    step={dR[1].step}
                                    marks={ascentMarks}
                                    allowCross={false}
                                    defaultValue={[ascentRange.min, ascentRange.max]}
                                    onAfterChange={(r) => setAscentRange({min: r[0], max: r[1]})}
                                />
                            </Row>
                            <Row className='p-4'>
                                <Form.Label className='d-flex justify-content-center' htmlFor='prefExpTimeRange'>Select time range</Form.Label>
                                <Range
                                    className='prefExpTimeRange'
                                    min={dR[2].min}
                                    max={dR[2].max}
                                    step={dR[2].step}
                                    marks={timeMarks}
                                    allowCross={false}
                                    defaultValue={[timeRange.min, timeRange.max]}
                                    onAfterChange={(r) => setTimeRange({min: r[0], max: r[1]})}
                                />
                            </Row>
                        </Form.Group>
                        <Spacer height='1rem' />
                        <Row>
                            <Col className='d-flex justify-content-center'>
                                <OverlayTrigger
                                    placement='top'
                                    overlay={
                                        authObject.authUser && comparePreferences(user.preferences, preferences) ?
                                            <Tooltip>
                                                Change preferences to submit
                                            </Tooltip>
                                            :
                                            <></>
                                    }
                                >
                                    <span>
                                        <Button size='sm' variant='success' disabled={authObject.authUser && comparePreferences(user.preferences, preferences) ? true : false} onClick={() => handleSubmit()}>
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
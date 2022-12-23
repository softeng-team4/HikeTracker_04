import 'bootstrap/dist/css/bootstrap.min.css';
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';
import { Form, Row, Col, Tooltip } from 'react-bootstrap';
import { useState, useContext, useEffect } from 'react';
import AuthenticationContext from '../AuthenticationContext';
import Spacer from '../BrowserHikeComponents/Spacer';
import API from '../../API';


const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);


const PerformanceStats = (props) => {

    return (<></>);
};

export default PerformanceStats;
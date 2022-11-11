import 'bootstrap/dist/css/bootstrap.min.css';
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';
import { Form } from 'react-bootstrap';



const LenghtSliderForm = () => {


    return (
        <Form className='d-flex justify-content-between'>
            <Form.Group className='col-md-12 p-2'>
                <Form.Label htmlFor='LenghtRange'>Select lenght range</Form.Label>
                <Slider range className='LenghtRange'/>
                <Form.Label htmlFor='AscentRange'>Select ascent range</Form.Label>
                <Slider range className='AscentRange'/>
                <Form.Label htmlFor='ExpTimeRange'>Select estimated time range</Form.Label>
                <Slider range className='ExpTimeRange'/>
            </Form.Group>
        </Form>
    );
};

export default LenghtSliderForm;
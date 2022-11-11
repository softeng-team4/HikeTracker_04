import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Form, ButtonGroup, Button } from 'react-bootstrap';


const DifficultyForm = (props) => {


    //list for display difficulties on component
    const difficultyList = ['easy', 'medium', 'hard'];
    // state to highlight selected button
    const [selectedButton, setSelectedButton] = useState(undefined)


    const handleButtonClick = (key) => {
        if(selectedButton === key) {
            setSelectedButton(undefined);
            key = 'None';
        } else
            setSelectedButton(key);
        props.handleDifficultySubmit(key);
    };


    return (
        <Form className='d-flex justify-content-between'>
            <Form.Group className='col-md-12 p-2'>
                <Form.Label htmlFor='CountrySelection'>Select a difficulty&nbsp;</Form.Label>
                <ButtonGroup>
                    {difficultyList.map((d) =>
                        <Button key={d} active={d === selectedButton ? true : false} variant='light' onClick={(ev) => (handleButtonClick(d))}>{d}</Button>
                    )}
                </ButtonGroup>
            </Form.Group>
        </Form>
    );
};

export default DifficultyForm;
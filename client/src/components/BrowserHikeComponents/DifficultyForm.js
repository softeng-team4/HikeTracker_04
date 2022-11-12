import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Form, ButtonGroup, Button } from 'react-bootstrap';


const DifficultyForm = (props) => {


    //list for display difficulties on component
    const difficultyList = ['Tourist', 'Hiker', 'Pro Hiker'];
    // state to highlight selected button
    const [selectedButton, setSelectedButton] = useState(undefined)


    const handleButtonClick = (key) => {
        if (selectedButton === key) {
            setSelectedButton(undefined);
            key = 'None';
        } else
            setSelectedButton(key);
        if (key === 'Pro Hiker')
            key = 'Professional Hiker'
        props.handleDifficultySubmit(key);
    };


    return (
        <Form className='row col-md d-flex justify-content-between'>
            <Form.Group className='row col-md p-2'>
                <Form.Label className='' htmlFor='DifficultySelection'>Select a difficulty&nbsp;</Form.Label>
                <Form.Text>
                    <ButtonGroup className='DifficultySelection '>
                        {difficultyList.map((d) =>
                            <Button key={d} active={d === selectedButton ? true : false} variant='light' onClick={(ev) => (handleButtonClick(d))}>{d}</Button>
                        )}
                    </ButtonGroup>
                </Form.Text>
            </Form.Group>
        </Form>
    );
};

export default DifficultyForm;
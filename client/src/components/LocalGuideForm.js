import { Form, Button, Alert, Container, Row } from 'react-bootstrap';
import { useState } from 'react';



function LocalGuideForm(props) {
    const [validated, setValidated] = useState(false);
    const [idDoc, setIdDoc] = useState();
    const [otherDoc, setOtherDoc] = useState();
    const [validFile, setValidFile] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    function checkFile() {
        var fileElement = document.getElementById("formFile");
        var fileExtension = "";
        if (fileElement.value.lastIndexOf(".") > 0) {
            fileExtension = fileElement.value.substring(fileElement.value.lastIndexOf(".") + 1, fileElement.value.length);
        }
        console.log(fileExtension)
        if (fileExtension.toLowerCase() === "pdf") {
            setValidFile(true);
        }
        else {
            setValidFile(false);
        }
    }

    return (
        <>
            <Form noValidate validated={validated} onSubmit={handleSubmit} className="mt-3" style={{marginBottom:10}}>
            <Form.Group as={Row} controlId="formFile" className="mb-3">
            <Form.Label>Insert ID document</Form.Label>
            <div style={{paddingRight:10, paddingLeft: 10}}>
                <Form.Control type="file" accept=".pdf" required onChange={(event) => {
                    checkFile();
                    setIdDoc(event.target.value);
                }} />
            <Form.Control.Feedback type="invalid">Please ID file.</Form.Control.Feedback>
            </div>
            </Form.Group>
            <Form.Group as={Row} controlId="formFile" className="mb-3">
            <Form.Label>Insert other document that demostrate you are a local guide</Form.Label>
            <div style={{paddingRight:10, paddingLeft: 10}}>
                <Form.Control type="file" accept=".pdf" required onChange={(event) => {
                    checkFile();
                    setOtherDoc(event.target.value);
                }} />

                <Form.Control.Feedback type="invalid">Please insert a file.</Form.Control.Feedback>
            </div>
            </Form.Group>
            </Form>
    </>
)}

export default LocalGuideForm;
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Row } from "react-bootstrap";

const ConfirmModal = (props) => {
    return (
        <Modal show={props.show} backdrop='static' centered='true'>
            <Modal.Header className='addInfo d-flex justify-content-center p-2'>
                <Modal.Title>Are u sure to continue?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row className='d-flex justify-content-center'>This operation is not reversible!</Row>
            </Modal.Body>
            <Modal.Footer className='addInfo d-flex justify-content-center py-2'>
                <Button className='mx-4 px-2' size='md' variant='success' onClick={() => { props.onSubmit() }}>Yes</Button>
                <Button className='mx-4 px-2' size='md' variant='secondary' onClick={() => { props.onAbort() }}>No</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmModal;
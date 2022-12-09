import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from "react-bootstrap";

const ConfirmModal = (props) => {
    return (
        <Modal show={props.show} backdrop='static' centered='true'>
            <Modal.Body className='d-flex justify-content-center align-items-center'>
                <p>Are u sure to continue?<br/><span className='text-mute small'>This operation is not reversible!</span></p>
            </Modal.Body>
            <Modal.Footer>
                <Button className='float-right' variant='secondary' onClick={() => {props.onAbort()}}>No</Button>
                <Button className='float-right' variant='success' onClick={() => {props.onSubmit()}}>Yes</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmModal;
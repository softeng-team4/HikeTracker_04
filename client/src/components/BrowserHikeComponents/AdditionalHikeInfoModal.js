import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Col } from 'react-bootstrap';
import { Map } from '../Map';


const AdditionalHikeInfoModal = (props) => {


    const points = JSON.parse(props.hike.referencePoint);


    return (
        <Modal {...props} size='lg' aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header className='m-0'>
                <Col>
                    <Modal.Title>Hike:&nbsp;{props.hike.title}</Modal.Title>
                    <Map positions={points} startPoint={props.hike.startPoint} endPoint={props.hike.endPoint} huts={props.hike.linkedHuts ? props.hike.linkedHuts : []} isDisplay={true} />
                </Col>
            </Modal.Header>
            <Modal.Body>
                <Col><strong>Description:</strong>&nbsp;{props.hike.description}</Col>
                <Col><strong>Difficulty:</strong>&nbsp;{props.hike.difficulty}</Col>
                <Col><strong>Length:</strong>&nbsp;{(parseFloat(props.hike.length) / 1000.).toFixed(1)}&nbsp;km</Col>
                <Col><strong>Ascent:</strong>&nbsp;{parseInt(props.hike.ascent)}&nbsp;m</Col>
                <Col><strong>Estimated Time:</strong>&nbsp;{props.hike.expectedTime}&nbsp;min</Col>
                {props.hike.startPoint.name && <Col><strong>Start Point:</strong>&nbsp;{props.hike.startPoint.name}</Col>}
                {props.hike.endPoint.name && <Col><strong>End Point:</strong>&nbsp;{props.hike.endPoint.name}</Col>}
            </Modal.Body>
            <Modal.Footer>
                <Button size='sm' onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AdditionalHikeInfoModal;
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Modal, Button, Col } from 'react-bootstrap';
import { Map } from '../Map';
import API from '../../API.js'
import HutOrParkLotModal from './HutOrParkLotModal';


const AdditionalHikeInfoModal = (props) => {


    const points = JSON.parse(props.hike.referencePoint);
    // state to hold the hut or parking lot to show in the info modal
    const [hutOrParkLot, setHutOrParkLot] = useState(undefined);
    // state to indicate if the info to show in the modal are for hut or park lot
    const [isHut, setIsHut] = useState(undefined);
    // state to show the modal
    const [showHutOrParkLotModal, setShowHutOrParkLotModal] = useState(false);


    const handleHutClickOnMap = (hutId) => {
        API.getHutById(hutId).then((h) => {
            setHutOrParkLot(h);
            setIsHut(true);
            setShowHutOrParkLotModal(true);
        });
    };


    const handleClickOnStartEndPoint = (p) => {
        const response = p.type === 'hut' ? API.getHutById(p.id) : API.getParkingLotById(p.id);
        response.then((hOrP) => {
            setHutOrParkLot(hOrP);
            setIsHut(p.type === 'hut' ? true : false);
            setShowHutOrParkLotModal(true);
        });
    };


    return (
        <>
            <Modal {...props} size='lg' aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header className='addInfo m-0'>
                    <Col>
                        <Modal.Title>Hike:&nbsp;{props.hike.title}</Modal.Title>
                        <Map positions={points} startPoint={props.hike.startPoint} endPoint={props.hike.endPoint} huts={props.hike.linkedHuts ? props.hike.linkedHuts : []} isDisplay={true} handleHutClickOnMap={handleHutClickOnMap} />
                    </Col>
                </Modal.Header>
                <Modal.Body>
                    <Col><strong>Description:</strong>&nbsp;{props.hike.description}</Col>
                    <Col><strong>Difficulty:</strong>&nbsp;{props.hike.difficulty}</Col>
                    <Col><strong>Length:</strong>&nbsp;{(parseFloat(props.hike.length) / 1000.).toFixed(1)}&nbsp;km</Col>
                    <Col><strong>Ascent:</strong>&nbsp;{parseInt(props.hike.ascent)}&nbsp;m</Col>
                    <Col><strong>Estimated Time:</strong>&nbsp;{props.hike.expectedTime}&nbsp;min</Col>
                    {props.hike.startPoint.name && <Col><strong>Start Point:</strong>&nbsp;<Button variant='link' onClick={() => {handleClickOnStartEndPoint(props.hike.startPoint)}}>{props.hike.startPoint.name}</Button></Col>}
                    {props.hike.endPoint.name && <Col><strong>End Point:</strong>&nbsp;<Button  variant='link' onClick={() => {handleClickOnStartEndPoint(props.hike.endPoint)}}>{props.hike.endPoint.name}</Button></Col>}
                </Modal.Body>
                <Modal.Footer className='addInfo'>
                    <Button size='sm' onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
            {hutOrParkLot ? <HutOrParkLotModal show={showHutOrParkLotModal} onHide={() => setShowHutOrParkLotModal(false)} hutOrParkLot={hutOrParkLot} isHut={isHut} /> : null}
        </>
    );
};

export default AdditionalHikeInfoModal;
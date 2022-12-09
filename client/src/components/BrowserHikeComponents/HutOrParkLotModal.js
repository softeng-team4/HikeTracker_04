import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Col } from 'react-bootstrap';
import { Map } from '../HikeFormComponents/Map';


const HutOrParkLotModal = (props) => {

    const hOrP = props.hutOrParkLot;

    return (
        <Modal {...props} size='lg' aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header className='addInfo m-0'>
                <Col>
                    <Modal.Title>{props.isHut ? 'Hut' : 'Parking Lot'}:&nbsp;{hOrP.name}</Modal.Title>
                    {props.isHut ? 
                        <Map positions={[{lat: hOrP.position._lat, lng: hOrP.position._long}]} huts={[hOrP]} isDisplay={true} handleHutClickOnMap={()=>{}} />
                        :
                        <Map positions={[{lat: hOrP.position._lat, lng: hOrP.position._long}]} parkLots={[hOrP]} />
                    }
                </Col>
            </Modal.Header>
            <Modal.Body>
                <Col><strong>Description:</strong>&nbsp;{hOrP.description}</Col>
                <Col><strong>Location:</strong>&nbsp;{hOrP.country},&nbsp;{hOrP.region},&nbsp;{hOrP.city}</Col>
                <Col><strong>Latitude:</strong>&nbsp;{parseFloat(hOrP.position._lat).toFixed(6)}</Col>
                <Col><strong>Longitude:</strong>&nbsp;{parseFloat(hOrP.position._long).toFixed(6)}</Col>
                {hOrP.openingHour && hOrP.openingMinute && hOrP.closingHour && hOrP.closingMinute &&
                    <Col><strong>Opening&nbsp;Hours:</strong>&nbsp;{hOrP.openingHour}:{hOrP.openingMinute}&nbsp;-&nbsp;{hOrP.closingHour}:{hOrP.closingMinute}</Col>    
                }
                {props.isHut ?
                    <>
                        {hOrP.bedsNumber && <Col><strong>Number&nbsp;of&nbsp;beds:</strong>&nbsp;{hOrP.bedsNumber}</Col>}
                        {hOrP.costPerNight && <Col><strong>Overnight&nbsp;Cost:</strong>&nbsp;{hOrP.costPerNight}</Col>}
                    </>
                    :
                    <>
                        {hOrP.lotsNumber && <Col><strong>Number&nbsp;of&nbsp;Lots:</strong>&nbsp;{hOrP.lotsNumber}</Col>}
                        {hOrP.costPerDay && <Col><strong>Daily&nbsp;Cost:</strong>&nbsp;{hOrP.costPerDay}&nbsp;€</Col>}
                    </>   
                }
            </Modal.Body>
            <Modal.Footer className='addInfo'>
                <Button size='sm' onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default HutOrParkLotModal;
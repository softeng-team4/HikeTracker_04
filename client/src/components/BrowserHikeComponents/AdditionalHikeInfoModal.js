import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Card, Button, Row, Col } from 'react-bootstrap';
import { useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';


const AdditionalHikeInfoModal = (props) => {


    return (
        <Modal {...props} size='lg' aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header className='m-0'>
                <Col>
                    <MapContainer center={[45.46427, 9.18951]} zoom={13} zoomControl={false}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                    </MapContainer>
                </Col>
            </Modal.Header>
            <Modal.Body>
                {'ADD INFO HERE'}
            </Modal.Body>
            <Modal.Footer>
                <Button size='sm' onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AdditionalHikeInfoModal;
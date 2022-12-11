import { useEffect, useState } from "react";
import { Alert, Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { FaRegTimesCircle } from 'react-icons/fa';
import { useNavigate } from "react-router";
import API, { linkHuts } from '../../API';
import Spacer from "../BrowserHikeComponents/Spacer";
import ConfirmModal from "./ConfirmModal";
import { Map } from "../HikeFormComponents/Map";

const LinkHuts = (props) => {

    // used to return to homepage
    const nav = useNavigate();
    // hike to be modified
    const hike = props.hike;
    // coordinates of the hike track
    const points = JSON.parse(hike.referencePoint);
    // state to hold list of huts
    const [hutList, setHutList] = useState([]);
    // selected hut list
    const [selectedHutList, setSelectedHutList] = useState([]);
    // state to hold initial list state
    const [initialState, setInitialState] = useState();
    // state to display that there are no huts close to the hike
    const [showNoCloseHuts, setShowNoCloseHuts] = useState(false);
    //state to show the modal to confirm hike changes
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    //state to show the modal to delete hike changes
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    // list to hold button colors
    const buttonColor = [
        'outline-primary',
        'outline-secondary',
        'outline-success',
        'outline-danger',
        'outline-warning',
        'outline-info',
    ]


    // use effect to retrieve hut list 
    useEffect(() => {
        const filters = {
            name: undefined,
            country: undefined,
            region: undefined,
            city: undefined
        };
        API.hutsList(filters).then(r => {
            let hutsTmp = r;
            let selectedHutsTmp = hike.linkedHuts ? r.filter(h => hike.linkedHuts.some(lh => lh.id === h.id)) : [];
            hutsTmp = hike.startPoint.id ? hutsTmp.filter(h => h.id !== hike.startPoint.id) : hutsTmp;
            hutsTmp = hike.endPoint.id ? hutsTmp.filter(h => h.id !== hike.endPoint.id) : hutsTmp;
            hutsTmp = hike.linkedHuts ? hutsTmp.filter(h => !hike.linkedHuts.some(lh => lh.id === h.id)) : hutsTmp;
            setHutList(hutsTmp);
            setSelectedHutList(selectedHutsTmp);
            setInitialState([hutsTmp, selectedHutsTmp])
        })
    }, [hike]);


    // function to link hut
    const handleLinkHut = (hutId) => {
        let tmp = hutList.find(h => h.id === hutId);
        setSelectedHutList([...selectedHutList, tmp]);
        setHutList(hutList.filter(h => h.id !== hutId));
    };


    // function to unlink hut
    const handleUnlinkHut = (ev) => {
        ev.preventDefault();
        const hutId = ev.currentTarget.id;
        let tmp = selectedHutList.find(h => h.id === hutId);
        setSelectedHutList(selectedHutList.filter(h => h.id !== hutId));
        setHutList([...hutList, tmp]);
        setShowNoCloseHuts(false);
    };


    // function to show alert of no huts close to the hike
    const handleNohutsCloseToHike = () => {
        setShowNoCloseHuts(true);
    }


    // function to send changes of the hike
    const submitChanges = async () => {
        await linkHuts(selectedHutList.map(h => ({ id: h.id, name: h.name, position: h.position })), props.hike.id);
        nav('/');
    }


    // function to delete changes of the hike
    const deleteChanges = () => {
        setHutList(initialState[0]);
        setSelectedHutList(initialState[1]);
        setShowDeleteModal(false);
    }


    return (
        <Container fluid style={{ marginBottom: 20 }}>
            <Form noValidate className="mt-3">
                {/* <StaticHikeInfo hike={hike} status={props.status} /> */}
                {!showNoCloseHuts && selectedHutList.length === 0 && <Alert variant='danger'>To link a hut to the hike select it on the map</Alert>}
                {showNoCloseHuts && <Alert variant='danger'>There are not available huts close to this hike to be linked</Alert>}
                {hike.referencePoint &&
                    <Row>
                        <Map positions={points} startPoint={hike.startPoint} endPoint={hike.endPoint} huts={hutList} handleHutClickOnMap={handleLinkHut} handleNohutsCloseToHike={handleNohutsCloseToHike} />
                    </Row>
                }
                {selectedHutList.length !== 0 && <>
                    <Spacer height='1rem' />
                    <h5>Linked huts:</h5>
                    <Row>
                        <Col>
                            <Card>
                                <Card.Body>
                                    {selectedHutList.map((h, idx) => <Button
                                        id={h.id}
                                        key={`btn_${h.id}`}
                                        className='m-1'
                                        size='sm'
                                        onClick={(ev) => handleUnlinkHut(ev)}
                                        variant={buttonColor[idx < buttonColor.length ? idx : idx % buttonColor.length]}>
                                        {h.name}{' '}<FaRegTimesCircle key={`times_${h.id}`} />
                                    </Button>)}
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </>}
                <Spacer height='1rem' />
                <Row>
                    <Col>
                        <Button variant='danger' onClick={() => setShowDeleteModal(!showDeleteModal)}>Delete changes</Button>{' '}
                        <Button variant='success' onClick={() => setShowConfirmModal(!showConfirmModal)} >Submit changes</Button>
                    </Col>
                </Row>
            </Form>
            <ConfirmModal show={showDeleteModal} onSubmit={deleteChanges} onAbort={() => setShowDeleteModal(!showDeleteModal)} />
            <ConfirmModal show={showConfirmModal} onSubmit={submitChanges} onAbort={() => setShowConfirmModal(!showConfirmModal)} />
        </Container>
    );
};

export default LinkHuts;
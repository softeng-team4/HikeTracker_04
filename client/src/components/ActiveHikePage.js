import AuthenticationContext from './AuthenticationContext';
import { Container, Card, Col, Row, Button } from 'react-bootstrap';
import Spacer from './BrowserHikeComponents/Spacer';
import API from '../API'
import HikeCard from './BrowserHikeComponents/HikeCard';
import { useEffect, useState } from 'react';
import ConfirmModal from './ModifyHikeComponents/ConfirmModal';
import { useNavigate } from 'react-router';
import { RecordPoint } from './RecordPoint';


function ActiveHikePage(props) {
    const [activeHike, setActiveHike] = useState(undefined)
    const [hike, setHike] = useState(undefined)
    const [showConfirm, setShowConfirm] = useState(false);
    const [showRecordPoint, setShowRecordPoint] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        const effectFunc = async () => {
            const activeHike = await (await API.getUserActiveHike())[0]
            const hike = await API.getHikeById(activeHike.hikeId)
            setActiveHike(activeHike)
            setHike(hike)
        }
        effectFunc().then()
    }, [])

    const confirmModalSubmit = async () => {
        console.log(activeHike.id)
        setShowConfirm(s => !s);
        await API.terminateHike(activeHike.id)
        navigate(`/`)
    }

    return (
        <AuthenticationContext.Consumer>
            {(authObject) => (
                <>
                    <Container fluid style={{ marginBottom: 20 }}>
                        <Spacer height='2rem' />
                        <h2>Active Hike</h2>
                        {hike ?
                            <>
                                <HikeCard hike={hike} activeHike={true} />
                                <Spacer height='2rem' />
                                {!showRecordPoint ? <Button onClick={() => setShowRecordPoint(true)}>
                                    Record point
                                </Button> : null}
                                <Button variant='danger' onClick={() => setShowConfirm(true)}>
                                    Terminate Hike
                                </Button>
                            </>
                            : <Container className='emty-hikeList'><Spacer height='2rem' /><Card><h5>There is no active hike!</h5></Card><Spacer height='2rem' /></Container>}
                    </Container>
                    {showRecordPoint ? <RecordPoint regHike={activeHike} hike={hike}></RecordPoint> : null}
                    <ConfirmModal show={showConfirm} onSubmit={confirmModalSubmit} onAbort={() => { setShowConfirm(false); }} />
                </>
            )}
        </AuthenticationContext.Consumer>

    )
}

export { ActiveHikePage }
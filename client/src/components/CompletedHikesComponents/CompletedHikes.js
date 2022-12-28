import AuthenticationContext from "../AuthenticationContext";
import API from '../../API';
import Spacer from '../BrowserHikeComponents/Spacer';
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Card, Row, Spinner } from 'react-bootstrap';
import HikePageHandler from '../BrowserHikeComponents/HickePageHendler';
import L from 'leaflet';
import { LocationMarker } from "../HutParkFormComponents/LocationMarker";
import MapIcons from '../MapComponents/MapIcons';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';

function CompletedHikes(props){

    const [hikeList,setHikeList] = useState([])
    const [pageHikeList, setPageHikeList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [touchStart, setTouchStart] = useState(0);
    const [index, setIndex] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    const hike4page = 4
    const computeIndex = () => parseInt(hikeList.length / hike4page) + (hikeList.length % hike4page ? 1 : 0)

    useEffect(() =>{
        setIsLoading(true)
        API.MyCompletedHikes().then(r => {
            r.forEach(h =>{
            })
            setHikeList(r)})

    },[])

    useEffect(() => {
        hikeList !== undefined &&
            setPageHikeList(() => {
                setIsLoading(false);
                return hikeList.slice(index * hike4page, index * hike4page + hike4page)
            })
    }, [hikeList, index])

    const handlePageChange = (idx) => {
        setIndex(idx);
        setPageHikeList(hikeList.slice(idx * hike4page, idx * hike4page + hike4page));
    };


    const handleTouchStart = (e) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (touchStart - touchEnd > 150) {
            // do your stuff here for left swipe
            handlePageChange(index !== computeIndex() - 1 ? index + 1 : 0);
        }

        if (touchStart - touchEnd < -150) {
            // do your stuff here for right swipe
            handlePageChange(index !== 0 ? index - 1 : computeIndex() - 1);

        }
    };

    return(
        <AuthenticationContext.Consumer>
            {(authObject) =>
                <>
                    {isLoading && <div className='loading-overlay'><Spinner className='spinner' animation="border" variant="light" /></div>}
                    <Container fluid className="CompletedHikesContainer">
                    <Spacer height='2rem' />
                    <h2>Completed hikes</h2>
                    <Row className="mt-3">
                        {!hikeList && !isLoading ? false : pageHikeList.map((hike,idx) =>
                         <div key={`div_${idx}`} onTouchStart={e => handleTouchStart(e)} onTouchMove={e => handleTouchMove(e)} onTouchEnd={handleTouchEnd}>
                            <Card key={`card_${idx}`}>
                                    <Card.Header key={`card_header_${idx}`}>
                                        <Row md={10} className='row d-flex justify-content-between'>
                                            <Col lg={4}><b>Start time:</b>&nbsp;{hike.startTime}</Col>
                                            <Col lg={4}><b>End time:</b>&nbsp;{hike.endTime}</Col>
                                            <Col lg={4}><b>Hike id:</b>&nbsp;{hike.hikeId}</Col>
                                        </Row>
                                    </Card.Header>
                                    <Card.Body key={`card_body_${idx}`}>
                                        {hike.passedRP && hike.passedRP.length? <RefPointsMap passedRP={hike.passedRP}></RefPointsMap> : false}
                                    </Card.Body>
                                    <Card.Footer key={`card_footer_${idx}`}>
                                        <Row md={10} className='row d-flex justify-content-between'>
                                        </Row>
                                    </Card.Footer>
                                </Card>
                                <Spacer height='1rem' key={`card_spacer_${idx}`} />
                         </div>
                         )}
                    </Row>
                    {(!isLoading && hikeList.length === 0) ? <Container className='empty-hikeList'><Spacer height='2rem' /><Card style={{ padding: 10 }}><div align='center'><h5>No hikes found!</h5></div></Card><Spacer height='2rem' /></Container> : null}
                    <HikePageHandler index={index} pageNum={computeIndex()} handlePageChange={handlePageChange} />
                    </Container>
                </>
            }
        
        </AuthenticationContext.Consumer>
        
    )
}

function RefPointsMap(props){


    const [minLat,setMinLat] = useState()
    const [minLng,setMinLng] = useState()
    const [maxLat,setMaxLat] = useState()
    const [maxLng,setMaxLng] = useState()
    const [points,setPoints] = useState([])
    const [center,setCenter] = useState()
    const [bounds,setBounds] = useState()

    useEffect(() =>{
        setPoints(() => JSON.parse(props.passedRP))
    },[props.passedRP])

    useEffect(()=>{
        if(points){
            setMinLat(() => Math.min(points.map(p => p.lat)) - 0.003)
            setMaxLat(() => Math.max(points.map(p => p.lat)) + 0.003)
            setMinLng(() => Math.min(points.map(p => p.lng)) - 0.003)
            setMaxLng(() => Math.max(points.map(p => p.lng)) + 0.003)

            const evaluateCenter = () => {
                return points.reduce((sum, point) => (
                    [point.lat + sum[0], point.lng + sum[1]]
                ), [0., 0.]).map(v => v / points.length);
            };

            setCenter(evaluateCenter)
            
        }
    },[points])

    useEffect(()=>{
        if(maxLat && maxLng && minLat && minLng)
            setBounds(() => L.latLngBounds(L.latLng(minLat, minLng), L.latLng(maxLat, maxLng)))
    },[maxLat,maxLng,minLat,minLng])

    return(
        <>
        {points && center && bounds?
        <MapContainer center={center} bounds={bounds}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Polyline
                        pathOptions={{ fillColor: 'red', color: 'blue' }}
                        positions={points}
                    />
            {points.map(rp =>
                        <Marker key={`mark_${rp.name}${rp.lat}${rp.lng}`} position={[rp.lat, rp.lng]} icon={MapIcons.refIcon}>
                            <Popup>
                                {rp.name}
                            </Popup>
                        </Marker>
                    )} 
        </MapContainer>
        : false}
        </>
    )
}
export {CompletedHikes}
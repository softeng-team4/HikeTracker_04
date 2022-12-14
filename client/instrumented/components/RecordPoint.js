import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Row, Table, Container, Alert } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import API from '../API';
import { FaRegTrashAlt, FaCheck } from 'react-icons/fa';
import MapIcons from './MapComponents/MapIcons';
import ConfirmModal from './ModifyHikeComponents/ConfirmModal';
const dayjs = require('dayjs')

function RecordPoint(props) {

    const [refPointList, setRefPointList] = useState([]);
    const [previousRFNotPassed, setPreviousRFNotPassed] = useState([]);
    const [passedRefPoint, setPasseRefPoint] = useState(props.regHike.passedRP !== undefined ? JSON.parse(props.regHike.passedRP) : []);
    const [availableRefPoint, setAvailableRefPoint] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false);

    const points = JSON.parse(props.hike.referencePoint);
    const definedRefPoints = points.filter(e => e.name !== undefined);
    const minLat = Math.min(...points.map(p => p.lat)) - 0.003;
    const minLng = Math.min(...points.map(p => p.lng)) - 0.003;
    const maxLat = Math.max(...points.map(p => p.lat)) + 0.003;
    const maxLng = Math.max(...points.map(p => p.lng)) + 0.003;

    useEffect(() => {
        const notAvailableRefPoint = passedRefPoint.concat(refPointList);
        let  index = -1;
        if(notAvailableRefPoint.length>0){
            definedRefPoints.forEach((rf, i) => {
                if (rf.name === notAvailableRefPoint[notAvailableRefPoint.length-1].name && rf.lat === notAvailableRefPoint[notAvailableRefPoint.length-1].lat && rf.lng === notAvailableRefPoint[notAvailableRefPoint.length-1].lng) {
                    index = i;
                }
            })
        }
        const arf = [];
        const prfnp = [];
        let cont = 0;
        definedRefPoints.forEach((rf, i) => {
            notAvailableRefPoint.forEach(narf => {
                if (rf.name === narf.name && rf.lat === narf.lat && rf.lng === narf.lng) {
                    cont++
                }
            }
            )
            if (cont === 0) {
                if(i > index ){
                    arf.push(rf);
                }else{
                    prfnp.push(rf);
                }
                
            }
            cont = 0;
        });
        setAvailableRefPoint(arf);
        setPreviousRFNotPassed(prfnp);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refPointList]);

    const evaluateCenter = () => {
        return points.reduce((sum, point) => (
            [point.lat + sum[0], point.lng + sum[1]]
        ), [0., 0.]).map(v => v / points.length);
    };

    const AddRefPoint = (i) => {
        const rp = {
            name: availableRefPoint[i].name,
            lat: availableRefPoint[i].lat,
            lng: availableRefPoint[i].lng,
            alt: availableRefPoint[i].alt,
            time: dayjs().format('DD/MM/YYYY hh:mm:ss')

        };
        setRefPointList(state => [...state, rp]);
    };

    const deleteRefPoint = (i) => {
        setRefPointList((oldRf) => oldRf.filter((o, index) => index !== i));
    }

    const confirmModalSubmit = async () => {
        setShowConfirm(s => !s);
        setPasseRefPoint(rf=>[...rf, ...refPointList]);
        await API.updateRP(props.regHike.id, passedRefPoint.concat(refPointList));
        setRefPointList([]);
    }

    return (<>
        {definedRefPoints.length > 0 ?
            <Container fluid style={{ marginBottom: 20 }}>
                <Row style={{ marginBottom: 10 }}>
                    <MapContainer center={evaluateCenter()} bounds={L.latLngBounds(L.latLng(minLat, minLng), L.latLng(maxLat, maxLng))}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Polyline
                            pathOptions={{ fillColor: 'red', color: 'blue' }}
                            positions={points}
                        />
                        <Marker position={[props.hike.startPoint.latitude, props.hike.startPoint.longitude]} icon={MapIcons.startIcon}>
                            <Popup>
                                Start point
                            </Popup>
                        </Marker>
                        <Marker position={[props.hike.endPoint.latitude, props.hike.endPoint.longitude]} icon={MapIcons.endIcon}>
                            <Popup>
                                End Point
                            </Popup>
                        </Marker>
                        {passedRefPoint.map(rp =>
                            <Marker key={`mark_${rp.name}${rp.lat}${rp.lng}`} position={[rp.lat, rp.lng]} icon={MapIcons.refIcon}>
                                <Popup>
                                    {rp.name}
                                </Popup>
                            </Marker>
                        )}
                        {availableRefPoint.map(rp =>
                            <Marker key={`mark_${rp.name}${rp.lat}${rp.lng}`} position={[rp.lat, rp.lng]} icon={MapIcons.refIconToConfirm}>
                                <Popup>
                                    {rp.name}
                                </Popup>
                            </Marker>
                        )}
                        {previousRFNotPassed.map(rp =>
                            <Marker key={`mark_${rp.name}${rp.lat}${rp.lng}`} position={[rp.lat, rp.lng]} icon={MapIcons.refIconToConfirm}>
                                <Popup>
                                    {rp.name}
                                </Popup>
                            </Marker>
                        )}
                        {refPointList.map(rp =>
                            <Marker key={`mark_${rp.name}${rp.lat}${rp.lng}`} position={[rp.lat, rp.lng]} icon={MapIcons.newRefIcon}>
                                <Popup>
                                    {rp.name}
                                </Popup>
                            </Marker>
                        )}
                    </MapContainer>
                </Row>
                <Table id="ref_point-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Latitude</th>
                            <th>Longitude</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {passedRefPoint.map((rp) =>
                            <tr key={`${rp.name}${rp.lat}${rp.lng}`}>
                                <td>{rp.name}</td>
                                <td>{rp.lat}</td>
                                <td>{rp.lng}</td>
                            </tr>
                        )}
                        {refPointList.map((rp, i) =>
                            <tr key={`${rp.name}${rp.lat}${rp.lng}`}>
                                <td>{rp.name}</td>
                                <td>{rp.lat}</td>
                                <td>{rp.lng}</td>
                                {i === refPointList.length-1 ? <td><Button className={`removePoint_${i}`} variant='danger' onClick={() => deleteRefPoint(i)}><FaRegTrashAlt /></Button></td> : null}
                            </tr>
                        )}
                        {availableRefPoint.map((rp, i) =>
                            <tr key={`${rp.name}${rp.lat}${rp.lng}`}>
                                <td>{rp.name}</td>
                                <td>{rp.lat}</td>
                                <td>{rp.lng}</td>
                                <td><Button className={`addPoint_${i}`} variant='success' onClick={() => AddRefPoint(i)}><FaCheck /></Button></td>
                            </tr>
                        )}

                    </tbody>
                </Table>
                <Button variant='success' onClick={() => setShowConfirm(true)}>
                    Record points
                </Button>
                <ConfirmModal show={showConfirm} onSubmit={confirmModalSubmit} onAbort={() => { setShowConfirm(false); }} />
            </Container>
            : <Alert>There are no reference points for the selected hike.</Alert>}
    </>
    );
}


export { RecordPoint }
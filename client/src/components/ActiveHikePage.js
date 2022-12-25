import AuthenticationContext from './AuthenticationContext';
import { Container, Card, Col, Row } from 'react-bootstrap';
import Spacer from './BrowserHikeComponents/Spacer';
import API from '../API'
import HikeCard from './BrowserHikeComponents/HikeCard';

function ActiveHikePage(props) {
    const hikeId = props.hikeId
    //const hike = API.getHikeById(hikeId)
    const hike = {
        ascent:"764.57",
        author:"aleganino@gmail.com",
        city:"Stroppiana",
        country:"Italy",
        description: "Partenza da Le Combe",
        difficulty:"Tourist",
        endPoint: {
            altitude: 1648.35,
            latitude: 45.1797556,
            longitude: 7.164966
        },
        expectedTime: "360",
        length: "9875.04",
        region: "Piedmont",
        startPoint:{
            altitude: 1641.59,
            latitude: 45.179357,
            longitude: 7.1644689
        },
        title: hikeId==='1ougz4pxvyWg7AZOKnIA',
        referencePoint: '[{"lat":45.179357,"lng":7.1644689},{"lat":45.1793465,"lng":7.1644876},{"lat":45.1793246,"lng":7.1645212},{"lat":45.1793012,"lng":7.1645587},{"lat":45.1792856,"lng":7.1645948},{"lat":45.1792792,"lng":7.1646235}]',
    }
    return (
        <AuthenticationContext.Consumer>
            {(authObject) => (
                <>
                    <Container fluid style={{ marginBottom: 20 }}>
                        <Spacer height='2rem' />
                        <h2>Active Hike</h2>
                        <HikeCard hike={hike}/>
                    </Container>
                </>
            )}
        </AuthenticationContext.Consumer>

    )
}

export { ActiveHikePage }
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card, Row, Spinner } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Spacer from '../BrowserHikeComponents/Spacer';
import AuthenticationContext from '../AuthenticationContext';
import HikePageHandler from '../BrowserHikeComponents/HickePageHendler';
import API from '../../API';
import { HutSearchBar } from './HutSearchBar';
import {HutCard} from './HutCard';

const BrowserHuts = (props) => {

    const [range, setRange] = useState(undefined);

    const [isLoading, setIsLoading] = useState(true);
    const [geoArea, setGeoArea] = useState({ country: { countryCode: 'None', name: 'None' }, region: { countryCode: 'None', stateCode: 'None', name: 'None' }, city: { name: 'None' } });

    // state to hold list of huts
    const [hutList, setHutList] = useState(undefined)
    // state to hold current page index
    const [index, setIndex] = useState(0);
    // number of hikes visulaized for page
    const hut4page = 4
    // state to hold touch swipe
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    // state to hold list of hikes of current page
    const [subHutList, setSubHutList] = useState([]);
    const [pageHutList, setPageHutList] = useState([]);
    const { search } = window.location;
    const query = new URLSearchParams(search).get('s');
    const [searchQuery, setSearchQuery] = useState(query || '');
    // function to retrieve page index
    const computeIndex = () => parseInt(subHutList.length / hut4page) + (subHutList.length % hut4page ? 1 : 0)

    useEffect(() => {
        setIsLoading(true);
        let filters;
        if (geoArea.geoArea !== undefined) {
            filters = {
                name: undefined,
                country: geoArea.geoArea.country.name !== 'None' ? geoArea.geoArea.country.name : undefined,
                region: geoArea.geoArea.region.name !== 'None' ? geoArea.geoArea.region.name : undefined,
                city: geoArea.geoArea.city.name !== 'None' ? geoArea.geoArea.city.name : undefined
            };
        } else {
            filters = {
                name: undefined,
                country: undefined,
                region: undefined,
                city: undefined
            };
        }
        API.hutsList(filters).then(r => setHutList(r))
    }, [geoArea])

    useEffect(() => {
        hutList !== undefined &&
            setPageHutList(() => {
                setIsLoading(false);
                return subHutList.slice(index * hut4page, index * hut4page + hut4page)
            })
    }, [subHutList, index, hutList])

    useEffect(() => {
        hutList !== undefined &&
            setSubHutList(() => {
                if (hutList && (searchQuery || range !== undefined))
                    return hutList.filter((hut) => {
                        const hutName = hut.name.toLowerCase();
                        return (hutName.includes(searchQuery) && (
                            range === undefined ? true :
                                (hut.altitude <= range.max && hut.altitude >= range.min)
                        ));
                    })
                return hutList
            })
    }, [searchQuery, hutList, range])


    const handlePageChange = (idx) => {
        setIndex(idx);
        setPageHutList(subHutList.slice(idx * hut4page, idx * hut4page + hut4page));
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


    return (
        <AuthenticationContext.Consumer>
            {(authObject) => (<>
                {isLoading && <div className='loading-overlay'><Spinner className='spinner' animation="border" variant="light" /></div>}
                <Container fluid className='BrowserHutssContainer'>
                    <Spacer height='2rem' />
                    <h2>Explore Huts</h2>
                    <Row className='mt-3'>
                        <HutSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} geoArea={geoArea} setGeoArea={setGeoArea} setRange={setRange} />
                    </Row>
                    <Row className='mt-3'>
                        {!hutList && !isLoading ? false : pageHutList.map((hut, idx) =>
                            <div key={`div_${idx}`} onTouchStart={e => handleTouchStart(e)} onTouchMove={e => handleTouchMove(e)} onTouchEnd={handleTouchEnd}>
                                <HutCard hut={hut}></HutCard>
                                <Spacer height='1rem' key={`card_spacer_${idx}`} />
                            </div>
                        )}
                    </Row>
                    {(!isLoading && (hutList.length === 0 || subHutList.length === 0)) ? <Container className='emty-hutList'><Spacer height='2rem' /><Card style={{ padding: 10 }}><div align='center'><h5>No huts found!</h5></div></Card><Spacer height='2rem' /></Container> : null}
                    <HikePageHandler index={index} pageNum={computeIndex()} handlePageChange={handlePageChange} />
                </Container>
            </>)}
        </AuthenticationContext.Consumer>
    )
}
export { BrowserHuts }
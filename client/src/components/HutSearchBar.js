import { Col, Form, InputGroup, Row } from 'react-bootstrap';
import { useSearchParams} from 'react-router-dom';
import GeoAreaForm from './BrowserHikeComponents/GeoAreaForm';

const HutSearchBar = (props) => {

    const [searchParams, setSearchParams] = useSearchParams()

    const onSubmit = e => {
        e.preventDefault()
        searchParams.set('s',props.searchQuery);
        setSearchParams(searchParams);
    }

    return(<Row>
        <Col><GeoAreaForm geoArea={props.geoArea} setGeoArea={props.setGeoArea}/></Col>
        <Col className='col-md-4 p-2'>
            <Form action="/" method="get" autoComplete='off' onSubmit={onSubmit}>
                <Row>
                    <Form.Label htmlFor="header-search">
                        Search by name
                    </Form.Label>
                </Row>
                <Row>
                    <InputGroup className="mb-3">
                        <Form.Control
                            value={props.searchQuery? props.searchQuery : ''}
                            onInput={e => props.setSearchQuery(e.target.value.toLowerCase())}
                            type="text"
                            id="header-search"
                            placeholder="Search huts"
                            name="s"
                        />
                        <InputGroup.Text style={{cursor:"pointer"}} onClick={onSubmit}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                            </svg>
                        </InputGroup.Text>
                    </InputGroup>
                </Row>
            </Form>
        </Col>
    </Row>)
}
export {HutSearchBar}

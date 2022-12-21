import { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import LinkHuts from "./LinkHuts";
import { ModifyHike } from "./ModifyHike";
import ReferencePointForm from './ReferencePointForm';

const HandleModifyPage = (props) => {

    // const { state } = useLocation();
    const [key, setKey] = useState('LinkStartEndpoints');

    return (
        <>
            <Tabs
                id='modify-tab-handler'
                activeKey={key}
                onSelect={(k) => setKey(k)}
                mountOnEnter={true}
                className='mb-3'
                fill
                justify
                variant="pills"
            >
                <Tab eventKey='LinkStartEndpoints' title='Link start/arrival'>
                    <ModifyHike hike={props.hike} />
                </Tab>
                <Tab eventKey='LinkHuts' title='Link huts'>
                    <LinkHuts hike={props.hike} />
                </Tab>
                <Tab eventKey='refPoints' title='Define reference points'>
                    <ReferencePointForm hike={props.hike} />
                </Tab>
            </Tabs>
        </>
    );
};

export default HandleModifyPage;
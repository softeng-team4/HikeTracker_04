import { useState } from "react";
import { Button, Tab, Tabs } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import LinkHuts from "./LinkHuts";
import { ModifyHike } from "./ModifyHike";
import ModifyHikeInfo from "./ModifyHikeInfo";
import ReferencePointForm from './ReferencePointForm';
import { FaAppStoreIos, FaRegEdit } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';

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
                {/* <Tab eventKey='modify' title='Modify Hike Description'>
                <ModifyHikeInfo hike={props.hike} status='modify' />
            </Tab> */}
            </Tabs>
        </>
    );
};

export default HandleModifyPage;
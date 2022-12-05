import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import API from '../API';
import { Map } from "./Map";
import StaticHikeInfo from "./StaticHikeInfo";

function ModifyHikeInfo(props) {



    return (
        <>
            <StaticHikeInfo hike={props.hike} status={props.status} />
            

        </>
    )
}

export default ModifyHikeInfo;
import StaticHikeInfo from "./StaticHikeInfo";

function ModifyHikeInfo(props) {

    return (
        <>
            <StaticHikeInfo hike={props.hike} status={props.status}/>
            
        </>
    )
}

export default ModifyHikeInfo;
import { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import API from '../API';
import { Map } from "./Map";
import StaticHikeInfo from "./StaticHikeInfo";

function ModifyHike(props) {

    const hike = props.hike;
    const points = JSON.parse(hike.referencePoint);


    return (
        <>
            <Form noValidate className="mt-3">
                <StaticHikeInfo hike={hike} />

                {hike.referencePoint !== '' ? <Map positions={points} startPoint={hike.startPoint} endPoint={hike.endPoint} /> : ''}

                {/* or show the parks and huts in the map, give a button in popup to select them as start or end or ref */}

                <Table id="point-table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>latitude</th>
                            <th>longitude</th>
                            <th>altitude</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Start point</td>
                            <td>{hike.startPoint.latitude}</td>
                            <td>{hike.startPoint.longitude}</td>
                            <td>{hike.startPoint.altitude}</td>
                            <td><Button>Link</Button></td>
                        </tr>
                        <tr>
                            <td>End point</td>
                            <td>{hike.endPoint.latitude}</td>
                            <td>{hike.endPoint.longitude}</td>
                            <td>{hike.endPoint.altitude}</td>
                            <td><Button>Link</Button></td>
                        </tr>
                    </tbody>
                </Table>
            </Form>
        </>
    );
}

export { ModifyHike }
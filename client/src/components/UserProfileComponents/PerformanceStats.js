import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert, Table } from 'react-bootstrap';
import AuthenticationContext from '../AuthenticationContext';
import API from '../../API';
import { useContext } from 'react';


const PerformanceStats = (props) => {

    const stats = useContext(AuthenticationContext).authUser.stats;
    // let stats = {
    //     completed_hikes: 0,
    //     distance: 0,
    //     time: 1,
    //     ascent: 0,
    //     ascending_time: 1,
    //     highest_altitude: 0,
    //     highest_altitude_range: 0,
    //     longest_hike_distance: 0,
    //     longest_hike_time: 0,
    //     shortest_hike_distance: 0,
    //     shortest_hike_time: 0,
    //     fastest_paced_hike: 0
    // }

    return (
        <>
            {stats.completed_hikes === 0 ?
                <Alert variant='info' className='d-flex justify-content-center'>Complete your first hike to display statistics!</Alert>
                :
                <Table striped='columns' responsive>
                    <thead>
                        <tr>
                            <th>All Time</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Completed hikes</td>
                            <td>{stats.completed_hikes}</td>
                        </tr>
                        <tr>
                            <td>Distance</td>
                            <td>{stats.distance} km</td>
                        </tr>
                        <tr>
                            <td>Highest elevation gain</td>
                            <td>{stats.highest_altitude} m</td>
                        </tr>
                        <tr>
                            <td>Biggest ascent</td>
                            <td>{stats.highest_altitude_range} m</td>
                        </tr>
                        <tr>
                            <td>Longest hike distance</td>
                            <td>{stats.longest_hike_distance} km</td>
                        </tr>
                        <tr>
                            <td>Longest hike time</td>
                            <td>{stats.longest_hike_time} {stats.longest_hike_time === 1 ? 'hour' : 'hours'}</td>
                        </tr>
                        <tr>
                            <td>Shortest hike distance</td>
                            <td>{stats.shortest_hike_distance} km</td>
                        </tr>
                        <tr>
                            <td>Shortest hike time</td>
                            <td>{stats.shortest_hike_time} {stats.shortest_hike_time === 1 ? 'hour' : 'hours'}</td>
                        </tr>
                        <tr>
                            <td>Average pace</td>
                            <td>{stats.distance / stats.time} min/km</td>
                        </tr>

                        <tr>
                            <td>Fastest paced hike</td>
                            <td>{stats.fastest_paced_hike} min/km</td>
                        </tr>
                        <tr>
                            <td>Average vertical ascent speed</td>
                            <td>{stats.ascent / stats.ascending_time} m/hour</td>
                        </tr>
                    </tbody>
                </Table>
            }
        </>
    );
};

export default PerformanceStats;
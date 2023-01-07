import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert, Table } from 'react-bootstrap';
import AuthenticationContext from '../AuthenticationContext';
import API from '../../API';
import { useContext } from 'react';


const PerformanceStats = (props) => {

    const stats = useContext(AuthenticationContext).authUser.stats;

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
                            <td>{parseFloat(stats.longest_hike_time).toFixed(2)} {stats.longest_hike_time === 1 ? 'hour' : 'hours'}</td>
                        </tr>
                        <tr>
                            <td>Shortest hike distance</td>
                            <td>{stats.shortest_hike_distance} km</td>
                        </tr>
                        <tr>
                            <td>Shortest hike time</td>
                            <td>{parseFloat(stats.shortest_hike_time).toFixed(2)} {stats.shortest_hike_time === 1 ? 'hour' : 'hours'}</td>
                        </tr>
                        <tr>
                            <td>Average pace</td>
                            <td>{parseFloat(stats.time*60 / stats.distance / 1000).toFixed(2)} min/km</td>
                        </tr>

                        <tr>
                            <td>Fastest paced hike</td>
                            <td>{parseFloat(stats.fastest_paced_hike).toFixed(2)} min/km</td>
                        </tr>
                        <tr>
                            <td>Average vertical ascent speed</td>
                            <td>{parseFloat(stats.ascent / stats.ascending_time).toFixed(2)} m/hour</td>
                        </tr>
                    </tbody>
                </Table>
            }
        </>
    );
};

export default PerformanceStats;
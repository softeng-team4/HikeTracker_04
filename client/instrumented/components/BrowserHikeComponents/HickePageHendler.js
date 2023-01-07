import 'bootstrap/dist/css/bootstrap.min.css';
import { Pagination } from 'react-bootstrap';

const HikePageHandler = (props) => {

    //render the page item based on respNum state
    const renderPaginationItems = (num) => {
        let i = 0;
        let PaginationItems = [];
        while (i < num) {
            PaginationItems.push(
                <Pagination.Item key={'page' + i} id={i} {...((props.index === i) ? { active: true } : null)} onClick={(ev) => { props.handlePageChange(parseInt(ev.target.id)) }} >{i + 1}</Pagination.Item>
            );
            i++;
        }
        return PaginationItems;
    };

    
    return (
        <>
            {(props.pageNum > 1) ?
                <Pagination className='d-flex justify-content-center' >
                    <Pagination.Prev onClick={(ev) => { props.handlePageChange((props.index + props.pageNum - 1) % props.pageNum) }} />
                    <>
                        {props.pageNum && renderPaginationItems(props.pageNum)}
                    </>
                    <Pagination.Next onClick={() => { props.handlePageChange((props.index + props.pageNum + 1) % props.pageNum) }} />
                </Pagination> : null
            }
        </>
    );
};

export default HikePageHandler;
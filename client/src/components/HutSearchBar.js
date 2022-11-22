import { useHistory } from 'react-router-dom';

const HutSearchBar = (props) => {

    const history = useHistory();
    const onSubmit = e => {
        history.push(`?s=${props.searchQuery}`)
        e.preventDefault()

    return(<form action="/" method="get" autoComplete='off' onSubmit={onSubmit}>
        <label htmlFor="header-search">
            <span className="visually-hidden">Search huts</span>
        </label>
        <input
            value={props.searchQuery}
            onInput={e => props.setSearchQuery(e.target.value)}
            type="text"
            id="header-search"
            placeholder="Search huts"
            name="s"
        />
        <button type="submit">Search</button>
    </form>
    )}
}
export default HutSearchBar

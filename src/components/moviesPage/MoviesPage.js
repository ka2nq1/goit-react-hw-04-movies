import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import getQueryParams from '../../utils/getQueryParams';
import styles from './MoviesPage.module.css';
import { fetchQuery } from '../../services/tvApi';

export default class MoviesPage extends Component {
    state = {
        value: '',
        movies: [],
    }

    handleChange = e => {
        this.setState({ value: e.target.value, })
    };

    componentDidMount() {
        const { query } = getQueryParams(this.props.location.search)
        if (query) {
            fetchQuery(query).then(movies => this.setState({movies}))
        }
    };
    

    componentDidUpdate(prevProps, prevState) {
        const {query: prevQuery} = getQueryParams(prevProps.location.search);
        const { query: nextQuery } = getQueryParams(this.props.location.search);
        if (prevQuery !== nextQuery) {
            fetchQuery(nextQuery).then(movies => this.setState({movies}))
        }
    }

    handleChangeQuery = query => {
        this.props.history.push({
            pathname: this.props.location.pathname,
            search: `?query=${query}`,
        })
    }

    handleSubmit = e => {
        e.preventDefault();

        this.handleChangeQuery(this.state.value)

        this.setState({ value: '' })
    };


    render() {
        const { movies } = this.state
        return (
            <>
                <form className={styles.form} onSubmit={this.handleSubmit}>
                    <input type='text' value={this.state.value} onChange={this.handleChange}/>
                    <button type='submit'>Search</button>
                </form>
                <ul>
                    {movies.map(movie => (
                        <li className={styles.item} key={movie.id}>
                            <Link className={styles.link} to={{pathname: `${this.props.match.url}/${movie.id}`, state: {from: this.props.location}}}>{movie.original_title}</Link>
                        </li>
                    ))}
                </ul>
            </>
        )
    }
}
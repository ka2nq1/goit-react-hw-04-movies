import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';
import { fetchTrending } from '../../services/tvApi';



export default class HomePage extends Component {
    state = {
        popularMovies: [],
    }

    componentDidMount() {
        fetchTrending().then(popularMovies => this.setState({ popularMovies }));  
    };
    
    render() {
        const { popularMovies } = this.state;
        const { match } = this.props;
        return (
            <div className={styles.home}>
                <h2>Trending today</h2>
                <ul>
                    {popularMovies.map(movie => (
                        <li key={movie.id}>
                            <Link to={{pathname: `${match.url}movies/${movie.id}`, state: {from: this.props.location}}}>{movie.original_title}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        )
    };
};
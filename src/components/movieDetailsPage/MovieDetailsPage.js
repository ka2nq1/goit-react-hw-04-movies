import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
// -----------------------------------------
import Cast from '../cast/Cast';
import Reviews from '../reviews/Reviews';
import {fetchMovieDetails} from '../../services/tvApi';
// -----------------------------------------
import styles from './MovieDetailsPage.module.css';
import routes from '../../routes';

export default class MovieDetailsPage extends Component {
    state = {
        details: '',
    }

    componentDidMount() {
        const { movieId } = this.props.match.params;
        fetchMovieDetails(movieId).then(details => this.setState({ details }));
    }
    
    handleGoBack = () => {
        const { state } = this.props.location;
        const { push } = this.props.history;
        if (state && state.from) {
            push(state.from);
        } else {
            push(routes.movies)
        };
    };

    render() {
        const {
            poster_path,
            title,
            release_date,
            vote_average,
            overview,
            genres,
        } = this.state.details

        return (
            <>
                <button className={styles.backBtn} type='button' onClick={this.handleGoBack }>Go back</button>
                <div className={styles.movieDetails}>
                    {poster_path && <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title} width='250px' />}
                    <ul className={styles.detailsList}>
                        <li className={styles.detailsItem}>
                            <h2 className={styles.movieTitle}>{title} ({release_date && release_date.slice(0, 4)})</h2>
                            <span className={styles.movieScore}>User score: {vote_average * 10}%</span>
                        </li>
                        <li className={styles.detailsItem}>
                            <h3 className={styles.overviewTitle}>Overview</h3>
                            <span className={styles.overviewText}>{overview}</span>
                        </li>
                        <li className={styles.detailsItem}>
                            <h3 className={styles.genresTytle}>Genres</h3>
                            <ul className={styles.genresList}>
                                {genres && genres.map(i =>
                                    <li className={styles.genresItem} key={i.id}>
                                        {i.name}
                                    </li>)}
                            </ul>
                        </li>
                    </ul>
                </ div>
                <div className={styles.addInform}>
                    <NavLink to={routes.cast}>Cast</NavLink>
                </div>
            </>
        )
    };
};


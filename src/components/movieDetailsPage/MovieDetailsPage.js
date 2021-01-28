import React, { Component } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
// -----------------------------------------
import Cast from '../cast/Cast';
import Reviews from '../reviews/Reviews';
// -----------------------------------------
import {fetchMovieDetails} from '../../services/tvApi';
import styles from './MovieDetailsPage.module.css';

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
        if (state) {
            push(state.from);
        } else {
            push("/")
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

        const { url, path } = this.props.match;

        return (
            <>
                <button className={styles.backBtn} type='button' onClick={this.handleGoBack}>Go back</button>
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
                <div className={styles.infoContainer}>
                    <h3 className={styles.infoTitle}>Additional information</h3>
                    <NavLink
                        to={{ pathname: `${url}/cast`, state: {...this.props.location.state}}}
                        className={styles.infoLink}
                        activeClassName={styles.infoLinkActive}
                    >
                        Cast
                    </NavLink>
                    <NavLink
                        to={{pathname: `${url}/reviews`, state: {...this.props.location.state}}}
                        className={styles.infoLink}
                        activeClassName={styles.infoLinkActive}
                    >
                        Reviews
                    </NavLink>
                </div>
                    <Switch>
                        <Route path={`${path}/cast`} component={Cast} />
                        <Route path={`${path}/reviews`} component={Reviews} />
                    </Switch>
            </>
        );
    };
};


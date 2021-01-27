import React, { Component    } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
// ----------------------------------------
import HomePage from '../homePage/HomePage';
import Navigation from '../navigation/Navigation';
import MoviesPage from '../moviesPage/MoviesPage';
import MovieDetailsPage from '../movieDetailsPage/MovieDetailsPage';
// ----------------------------------------
import routes from '../../routes/routes';
import styles from './App.module.css';

export default class App extends Component {

    render() {
        return (
            <div className={styles.container}>
                <Navigation/>
                <Switch>
                    <Route path={routes.home} exact component={HomePage} />
                    <Route path={routes.movies} exact component={MoviesPage} />
                    <Route path={routes.movieDetails} component={MovieDetailsPage} />
                    {/* <Route path={routes.cast} component={Cast} />
                    <Route path={routes.reviews} exact component={Reviews} /> */}
                    <Redirect to='/' />
                </Switch>
            </div>
        );
    }
};  
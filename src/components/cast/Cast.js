import React, { Component } from 'react';
import styles from './Cast.module.css';
import defaultImg from '../../img/defaultImg.png';
import { fetchCast } from '../../services/tvApi';

export default class Cast extends Component {
    state = {
        actors: [],
    }

    componentDidMount() {
        const { movieId } = this.props.match.params;
        fetchCast(movieId).then(actors => this.setState({actors}))
    }
    

    render() {
        const { cast } = this.state.actors;

        return (
            <div className={styles.castContainer}>
                {cast &&
                    <ul className={styles.castList}>
                        {cast.map(actor =>
                            <li key={actor.cast_id} className={styles.castItem}>
                                    {actor.profile_path ? (
                                        <img
                                            src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                                            alt={actor.name}
                                            width='150px'
                                        />
                                    ) : (
                                        <img src={defaultImg} alt={actor.name} width='150px'/>      
                                    )}
                                <h4 className={styles.castName}>{actor.name}</h4>
                                <p className={styles.castCharacter}>Character: {actor.character}</p>
                            </li>
                        )}
                    </ul>
                }
          </div>
        )
    }
};
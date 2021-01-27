import React, { Component } from 'react';
import styles from './Reviews.module.css';
import { fetchReviews } from '../../services/tvApi';

export default class Reviews extends Component {
    state = {
        reviews: [],
    }

    componentDidMount() {
        const { movieId } = this.props.match.params;
        fetchReviews(movieId).then(reviews => this.setState({reviews}))
    }
    

    render() {
        const { results } = this.state.reviews;
        return (
            <div className={styles.reviews}>
                {results !== undefined && results.length === 0 &&
                    <p>We don't have any information about reviews for this movie</p>
                }
                <ul className={styles.revList}>
                    {results &&
                        results.map(item => 
                        <li className={styles.revItem} key={item.id}>
                            <h4 className={styles.revAuthor}>Author: {item.author}</h4>
                            <p className={styles.revContent}>{item.content}</p>
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}
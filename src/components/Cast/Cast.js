import React, { Component } from 'react';
import ImageLoader from '../Loader/Loader';

import baseHttpService from '../../services/moviesApi';
import styles from './Cast.module.css';

class Cast extends Component {
  state = {
    cast: [],
    loading: false,
  };

  componentDidMount() {
    const { match } = this.props;
    const { movieId } = match.params;
    this.setState({ loading: true });
    baseHttpService.fetchMovieCast(movieId).then(({ cast }) => {
      this.setState({ cast, loading: false });
    });
  }

  componentWillUnmount() {
    this.setState({ loading: false });
  }
  render() {
    const { cast, loading } = this.state;
    if (cast) {
      const items = cast.map(cast => {
        let img;
        cast.profile_path
          ? (img = `https://image.tmdb.org/t/p/w300/${cast.profile_path}`)
          : (img =
              'https://rimatour.com/wp-content/uploads/2017/09/No-image-found.jpg');
        return (
          <li className={styles.listItem} key={cast.id}>
            <img src={img} alt={cast.name} className={styles.img} />
            <h3 className={styles.title}>{cast.name}</h3>
            <p>Character: {cast.character}</p>
          </li>
        );
      });
      return (
        <>
          {loading && <ImageLoader />}
          <ul className={styles.list}>{items}</ul>;
        </>
      );
    }
  }
}
export default Cast;

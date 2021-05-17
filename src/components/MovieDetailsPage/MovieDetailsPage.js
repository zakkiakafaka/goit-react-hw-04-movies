import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import ImageLoader from '../Loader/Loader.js';
import routes from '../../routes';
import Header from '../../components/Header/Header';

import baseHttpService from '../../services/moviesApi';
import styles from './MovieDetailsPage.module.css';

class MovieDetailsPage extends Component {
  state = {
    movie: '',
    path: '',
    search: '',
  };

  componentDidMount() {
    const { match } = this.props;
    const { movieId } = match.params;
    baseHttpService.fetchMovieDetails(movieId).then(movie => {
      this.setState({
        movie,
        path: this.props.location.state.from.pathname,
        search: this.props.location.state.from.search,
      });
    });
    // .catch(error => (error ? this.props.history.push('/') : ''));
  }

  handleGoBack = () => {
    const { history, location } = this.props;

    if (location.state) {
      location.state.from.search = this.state.search;
      location.state.from.pathname = this.state.path;
      history.push(location.state.from);
      return;
    }
    this.props.history.push(routes.home);
  };

  render() {
    const { movie } = this.state;
    const date = Number.parseInt(movie.release_date);
    let genres;
    let overview;
    let img;
    if (movie.genres) {
      genres = movie.genres.map(genre => genre.name).join(' ');
    }
    movie.overview
      ? (overview = movie.overview)
      : (overview = 'No overview found for this movie');

    movie.poster_path
      ? (img = `https://image.tmdb.org/t/p/w300/${movie.poster_path}`)
      : (img =
          'https://rimatour.com/wp-content/uploads/2017/09/No-image-found.jpg');
    return movie ? (
      <>
        <Header />
        <div className="container">
          <button
            type="button"
            onClick={this.handleGoBack}
            className={styles.btn}
          >
            Go Back
          </button>
          <div className={styles.movieDetails}>
            <img src={img} className={styles.poster} alt={movie.title} />
            <div>
              <h2 className={styles.name}>
                {movie.title}({date})
              </h2>
              <p>User score: {movie.vote_average * 10}%</p>
              <h3>Overview</h3>
              <p>{overview}</p>
              <h3>Genres</h3>
              <p>{genres}</p>
            </div>
          </div>
          <div className={styles.container}>
            <h2 className={styles.title}>Additional information</h2>
            <ul className={styles.linkBox}>
              <li>
                <NavLink
                  exact
                  to={{
                    pathname: `/movies/${movie.id}/cast`,
                    state: { from: this.props.location },
                  }}
                  className={styles.link}
                  activeClassName={styles.activeLink}
                >
                  Cast
                </NavLink>
              </li>
              <li>
                <NavLink
                  exact
                  to={{
                    pathname: `/movies/${movie.id}/reviews`,
                    state: { from: this.props.location },
                  }}
                  className={styles.link}
                  activeClassName={styles.activeLink}
                >
                  Reviews
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </>
    ) : (
      <ImageLoader />
    );
  }
}

export default MovieDetailsPage;

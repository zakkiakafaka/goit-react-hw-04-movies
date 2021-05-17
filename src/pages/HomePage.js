import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ImageLoader from '../components/Loader/Loader';
import '../index.css';
import baseHttpService from '../services/moviesApi';
import Header from '../components/Header/Header';

class HomePage extends Component {
  state = {
    movies: [],
    loading: false,
    error: '',
  };

  componentDidMount() {
    this.setState({ loading: true });
    baseHttpService
      .fetchPopularMovies()
      .then(({ results }) => {
        this.setState({ movies: results });
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  }

  render() {
    const { movies, loading, error } = this.state;
    const items = movies.map(movie => {
      let name = movie.title || movie.name;
      return (
        <li className="list-item" key={movie.id}>
          <Link
            to={{
              pathname: `/movies/${movie.id}`,
              state: { from: this.props.location },
            }}
          >
            {name}
          </Link>
        </li>
      );
    });
    return (
      <>
        <Header />
        <div className="container">
          <h2 className="title">Trending today</h2>
          {loading && <ImageLoader />}
          {error && <h3>Oops, something went wrong. Try again! </h3>}
          <ul className="list">{items}</ul>
        </div>
      </>
    );
  }
}

export default HomePage;

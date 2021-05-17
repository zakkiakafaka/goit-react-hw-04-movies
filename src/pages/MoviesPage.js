import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import ImageLoader from '../components/Loader/Loader';
import baseHttpService from '../services/moviesApi';
import Header from '../components/Header/Header';
import '../index.css';

class MoviesPage extends Component {
  state = {
    movies: [],
    query: '',
    page: 1,
    loading: false,
    error: '',
    total_pages: 0,
  };

  componentDidMount() {
    const { query } = queryString.parse(this.props.location.search);
    if (query) {
      this.fetchMovies(query);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { query: prevQuery } = queryString.parse(prevProps.location.search);
    const { query: nextQuery } = queryString.parse(this.props.location.search);
    if (prevQuery !== nextQuery) {
      this.setState({
        movies: [],
        page: 1,
      });
      this.fetchMovies(nextQuery);
    }
  }

  fetchMovies = query => {
    const { page } = this.state;
    baseHttpService
      .fetchMoviesWithQuery(query, page)
      .then(({ results, total_pages }) => {
        this.setState(prevState => ({
          movies: [...prevState.movies, ...results],
          page: prevState.page + 1,
          total_pages: total_pages,
        }));
        window.scrollTo({
          top:
            document.documentElement.scrollTop +
            document.documentElement.clientHeight -
            800,
          behavior: 'smooth',
        });
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true });
    this.props.history.push({
      ...this.props.location,
      search: `query=${this.state.query}`,
    });
  };

  render() {
    const { query, movies, loading, error, total_pages, page } = this.state;
    const items = movies.map(movie => {
      let name = movie.title || movie.name;
      return (
        <li className="list-item" key={movie.id}>
          <Link
            to={{
              pathname: `/movies/${movie.id}`,
              state: { from: this.props.location, query: query },
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
        <div>
          <form onSubmit={this.handleSubmit} className="form">
            <label className="label">
              <input
                type="text"
                value={query}
                name="query"
                onChange={this.handleChange}
                placeholder="Enter the movie"
                className="input"
                required
              />
            </label>
            <input type="submit" value="Search" className="button" />
          </form>
        </div>
        {loading && <ImageLoader />}
        {error && (
          <h3 styles={{ marginLeft: '20px' }}>
            Oops, something went wrong. Try again!
          </h3>
        )}
        <ul className="list">{items}</ul>
        {movies.length > 0 &&
          total_pages > 1 &&
          page <= total_pages &&
          !loading && (
            <button
              className="more-btn"
              onClick={() => this.fetchMovies(query)}
            >
              Show more
            </button>
          )}
      </>
    );
  }
}

export default MoviesPage;

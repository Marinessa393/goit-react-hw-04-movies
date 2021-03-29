import React, { Component } from 'react';
import f from '../services/apiService';
import Gallery from '../components/Gallery/Gallery';
import s from './MoviesPage.module.css';
const { searchMovies } = f;

export class MoviesPage extends Component {
  state = {
    query: '',
    result: [],
    error: '',
  };

  handleChange = e => {
    this.setState({ query: e.currentTarget.value });
  };

  componentDidMount() {
    const { location } = this.props;
    if (location.search) {
      searchMovies(location.search).then(r => {
        this.setState({ result: r.results });
      });
    }
  }
  handleSubmit = e => {
    e.preventDefault();
    const { query } = this.state;
    if (query === '') return;
    searchMovies(query).then(r => {
      if (r.results.length === 0) {
        this.setState({ error: `Oops, I can't find ${query}!` });
      }
      this.setState({ result: r.results });
    });
    this.props.history.push({
      pathname: this.props.history.location.pathname,
      search: query,
      key: this.props.history.location.key,
    });
    this.setState({ query: '' });
  };

  render() {
    const { query, result, error } = this.state;
    const { handleChange, handleSubmit } = this;
    return (
      <>
        <div className={s.Searchbar}>
          <form className={s.SearchForm} onSubmit={handleSubmit}>
            <input
              className={s.SearchFormInput}
              type="text"
              autoComplete="off"
              autoFocus
              value={query}
              onChange={handleChange}
            />
            <button type="submit" className={s.SearchFormButton}>
              Find
            </button>
          </form>
        </div>
        {result.length === 0 && <p className={s.error}>{error}</p>}
        <Gallery movies={result} />
      </>
    );
  }
}

export default MoviesPage;

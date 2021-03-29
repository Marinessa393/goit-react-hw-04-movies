import React, { Suspense, Component, lazy } from 'react';
import { Route, NavLink } from 'react-router-dom';
import MovieCard from '../components/MovieCard/MovieCard';
import routes from '../routes';
import f from '../services/apiService';
import arrow from '../assets/arrow.png';

const { getMovieDetails } = f;
const CastPage = lazy(() => import('../components/CastPage/CastPage'));

const ReviewsPage = lazy(() =>
  import('../components/ReviewsPage/ReviewsPage.js'),
);

export class DetailsView extends Component {
  state = {
    movieDetails: {},
    movieGenres: [],
  };

  async componentDidMount() {
    const { movieID } = this.props.match.params;
    return getMovieDetails(movieID).then(d => {
      this.setState({ movieDetails: d, movieGenres: d.genres });
    });
  }

  handleGoBack = () => {
    const { location, history } = this.props;

    history.push(location.state.from || routes.home);
  };

  render() {
    const { movieDetails, movieGenres } = this.state;
    return (
      <>
        <div className="detailsCard">
          <button
            type="button"
            className="goBackButton"
            onClick={this.handleGoBack}
          >
            <img src={arrow} alt="back" className="goBackImg" />
          </button>
          <MovieCard details={movieDetails} genres={movieGenres} />
        </div>
        <ul className="detailsBtns">
          <li>
            <NavLink
              to={{
                pathname: `${this.props.match.url}/cast`,
                state: { ...this.props.location.state },
              }}
              className="btn"
              activeClassName="activeBtn"
            >
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink
              to={{
                pathname: `${this.props.match.url}/reviews`,
                state: { ...this.props.location.state },
              }}
              className="btn"
              activeClassName="activeBtn"
            >
              Reviews
            </NavLink>
          </li>
        </ul>

        <Suspense>
          <Route path={`${this.props.match.path}/cast`}>
            <CastPage movieID={movieDetails.id} />
          </Route>
          <Route path={`${this.props.match.path}/reviews`}>
            <ReviewsPage movieID={movieDetails.id} />
          </Route>
        </Suspense>
      </>
    );
  }
}

export default DetailsView;

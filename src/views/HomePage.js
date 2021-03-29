import { Component } from 'react';
import f from '../services/apiService';
import Gallery from '../components/Gallery/Gallery';
const { getTrending } = f;

class HomePageView extends Component {
  state = {
    movies: [],
  };

  componentDidMount() {
    getTrending().then(data => {
      this.setState({
        movies: data.results,
      });
    });
  }

  render() {
    return (
      <>
        <Gallery movies={this.state.movies} />
      </>
    );
  }
}

export default HomePageView;

import { Component } from 'react';
import PropTypes from 'prop-types';
import f from '../../services/apiService';
import s from './CastPage.module.css';
import noImage from '../../assets/noImage.jpg';

const { getMovieCredits } = f;
const baseImgUrl = `https://image.tmdb.org/t/p/w500/`;

class CastPage extends Component {
  state = {
    persons: [],
  };

  async componentDidMount() {
    const { movieID } = this.props;
    return await getMovieCredits(movieID).then(d => {
      this.setState({ persons: d.cast });
    });
  }

  render() {
    const { persons } = this.state;
    return (
      <>
        {persons.length === 0 ? (
          <div className={s.box}>
            <p className={s.empty}>No Actors</p>
          </div>
        ) : (
          <ul className={s.list}>
            {persons.map(el => (
              <li key={el.id} className={s.item}>
                <img
                  src={
                    el.profile_path === null
                      ? noImage
                      : `${baseImgUrl}${el.profile_path}`
                  }
                  alt={el.name}
                  width="60"
                  className={s.image}
                />
                <p className={s.name}>{el.original_name}</p>
                <p className={s.character}>{el.character}</p>
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }
}

CastPage.propTypes = {
  persons: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      profile_path: PropTypes.string,
      name: PropTypes.string,
      character: PropTypes.string.isRequired,
      original_name: PropTypes.string,
    }),
  ),
};

export default CastPage;

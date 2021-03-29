import { Component } from 'react';
import s from './ReviewsPage.module.css';
import f from '../../services/apiService';
import square from '../../assets/square.jpg';

const { getMovieReviews } = f;
const baseImgUrl = `https://image.tmdb.org/t/p/w500/`;

export class ReviewsPage extends Component {
  state = {
    reviews: [],
    image: square,
  };

  async componentDidMount() {
    const { movieID } = this.props;
    return await getMovieReviews(movieID).then(d => {
      this.setState({ reviews: d.results });
    });
  }
  render() {
    return (
      <>
        {this.state.reviews.length === 0 ? (
          <div className={s.list}>
            <p className={s.empty}>No reviews</p>
          </div>
        ) : (
          <ul className={s.list}>
            {this.state.reviews.map(el => (
              <li key={el.id} className={s.reviewItem}>
                <div className={s.reviewItemTitle}>
                  <img
                    src={
                      el.author_details.avatar_path === null
                        ? square
                        : `${baseImgUrl}${el.author_details.avatar_path}`
                    }
                    alt={el.author_details.username}
                    width="50"
                    height="50"
                    className={s.img}
                  />
                  <div className={s.info}>
                    <span className={s.author}>
                      @ {el.author || el.author_details.username}
                    </span>
                    <span className={s.date}>
                      {' '}
                      {el.created_at.slice(0, 10)}
                    </span>
                    <span className={s.time}>
                      at {el.created_at.slice(11, 16)}
                    </span>
                  </div>
                </div>
                <p className={s.text}>{el.content}</p>
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }
}

export default ReviewsPage;

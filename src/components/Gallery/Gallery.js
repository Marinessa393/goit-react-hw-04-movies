import { Link, withRouter } from 'react-router-dom';
import s from './Gallery.module.css';
const baseImgUrl = `https://image.tmdb.org/t/p/w500/`;

function Gallery({ movies, location }) {
  return (
    <>
      <ul className={s.Gallery}>
        {movies.map(({ id, poster_path, original_name, original_title }) => (
          <li key={id} className={s.GalleryItem}>
            <Link
              to={{
                pathname: `movies/${id}`,
                state: { from: location },
              }}
              style={{ textDecoration: 'none' }}
            >
              <img
                src={`${baseImgUrl}${poster_path}`}
                alt={original_title}
                className={s.GalleryPoster}
                loading="lazy"
              />
              <p className={s.GalleryTitle}>
                {original_title ? original_title : original_name}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default withRouter(Gallery);

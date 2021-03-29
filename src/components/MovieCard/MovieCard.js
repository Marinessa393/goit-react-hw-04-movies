import React from 'react';
import s from './MovieCard.module.css';
import errorImg from '../../assets/errorImg.jpg';

const baseImgUrl = `https://image.tmdb.org/t/p/w500/`;

function MovieCard({ details, genres }) {
  return (
    <>
      <div className={s.card}>
        <img
          src={
            details.poster_path === undefined
              ? errorImg
              : `${baseImgUrl}${details.poster_path}`
          }
          alt={details.title}
          className={s.image}
          loading="lazy"
        />
        <span className={s.vote}>&#9733; {details.vote_average}</span>
      </div>
      <div className={s.description}>
        <h2>
          {details.original_title
            ? details.original_title
            : details.original_name}
        </h2>
        <ul>
          <li className={s.descItem}>
            <p className={s.itemTitle}>Release date:</p>
            <p className={s.descEl}>
              {details.release_date ? details.release_date : '-'}
            </p>
          </li>
          <li className={s.descItem}>
            <p className={s.itemTitle}>Genres:</p>
            <ul className={s.descList}>
              {genres.map(el => (
                <li key={el.id} className={s.genres}>
                  {el.name}
                </li>
              ))}
            </ul>
          </li>
          <li className={s.descItem}>
            <p className={s.itemTitle}>Overview:</p>
            <p className={s.descEl}>{details.overview}</p>
          </li>
        </ul>
      </div>
    </>
  );
}

export default MovieCard;

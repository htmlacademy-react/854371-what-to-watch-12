import {useNavigate} from 'react-router-dom';
import classNames from 'classnames';
import {useEffect, useState} from 'react';
import {TIME_OUT_ACTIVE_VIDEO} from '../../common-const';

type FilmCardProps = {
  name: string;
  previewImage: string;
  id: number;
  isActiveFilm: boolean;
  videoLink: string;
  previewVideoLink: string;
  handleMouseEnter: (id: number | null) => void;
  handleMouseLeave: (id: number | null) => void;
}

function FilmCard({
  name,
  previewImage,
  id,
  isActiveFilm,
  videoLink,
  previewVideoLink,
  handleMouseEnter,
  handleMouseLeave
}: FilmCardProps): JSX.Element {
  const [isPlaying, setIsPlaying] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let timeOut: NodeJS.Timeout;
    if (isActiveFilm) {
      timeOut = setTimeout(() => setIsPlaying(true), TIME_OUT_ACTIVE_VIDEO);
    } else {
      setIsPlaying(false);
    }

    return () => {
      clearTimeout(timeOut);
    };
  }, [isActiveFilm]);

  const handleFilmCardClick = () => {
    navigate(`/films/${id}/`);
  };

  return (
    <article
      className={classNames('small-film-card', 'catalog__films-card', {'active-film-card': isActiveFilm})}
      onMouseEnter={() => handleMouseEnter(id)}
      onMouseLeave={() => handleMouseLeave(null)}
      onClick={handleFilmCardClick}
      style={{cursor: 'pointer'}}
    >
      <div className="small-film-card__image">
        {
          isPlaying ?
            <video
              src={videoLink}
              width="280"
              height="175"
              poster={previewVideoLink}
              autoPlay
              muted
              loop
            >
            </video> :
            <img
              src={previewImage}
              alt={name}
              width="280"
              height="175"
            />
        }
      </div>
      <h3 className="small-film-card__title">
        {name}
      </h3>
    </article>
  );
}

export default FilmCard;

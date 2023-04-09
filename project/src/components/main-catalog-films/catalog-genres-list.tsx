import {genres} from '../../store/reducer';
import {Link} from 'react-router-dom';
import classNames from 'classnames';
import {convertGenreToRoute} from '../../utils';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {changeGenre} from '../../store/action';

function CatalogGenresList(): JSX.Element {
  const chosenGenre = useAppSelector((state) => state.genre);
  const dispatch = useAppDispatch();
  const handleGenreLink = (genre: string) => {
    dispatch(changeGenre(genre));
  };

  return (
    <ul className="catalog__genres-list">
      {
        genres.map((genre) =>
          (
            <li className={classNames('catalog__genres-item', {'catalog__genres-item--active': chosenGenre === genre})} key={genre}>
              <Link
                to={convertGenreToRoute(genre)}
                className="catalog__genres-link"
                onClick={() => handleGenreLink(genre)}
              >
                {genre}
              </Link>
            </li>
          )
        )
      }
    </ul>
  );
}

export default CatalogGenresList;
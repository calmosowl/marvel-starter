import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './comicsList.scss';

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]);
    const [offset, setOffset] = useState(0);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [comicsEnded, setComicsEnded] = useState(false);

    const  {loading, error, getAllComicses} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true)
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);

        getAllComicses(offset)
            .then(onComicsListLoaded)
    }

    const onComicsListLoaded = (newComicsList) => {
        let ended = false;
        if (newComicsList.length < 8) {
            ended = true;
        }

        setComicsList(comicsList => [...comicsList, ...newComicsList]);
        setOffset(offset => offset + 8);
        setNewItemLoading(newItemLoading => false);
        setComicsEnded(comicsEnded => ended);
    }

    function renderItems(arr) {
        const items = arr.map((item, i) => {
            return (
                <li key={i} className="comics__item">
                    <a href={item.resourceURI}>
                        <img src={item.thumbnail}
                             alt={item.title}
                             className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}$</div>
                    </a>
                </li>
            )
        })

        return (
            <ul className="comics__grid">
               {items}
            </ul>
        )
    }

    const comicsListItems = renderItems(comicsList);
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;

    return (
        <div className="comics__list">
            {comicsListItems}
            {spinner}
            {errorMessage}
            <button className="button button__main button__long"
                    onClick={() => onRequest(offset)}
                    style={{'display': comicsEnded ? 'none' : 'block'}}
                    disabled={newItemLoading}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;
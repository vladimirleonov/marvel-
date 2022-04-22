import './comicsList.scss';
import uw from '../../resources/img/UW.png';
import React, {useEffect, useState} from "react";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import {Link} from "react-router-dom";
import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';

const setContent = (process, Component, data,  newItemLoading) => {
    console.log(newItemLoading);
    switch (process) {
        case 'waiting':
            return <Spinner/>
            break;
        case 'loading':
            return newItemLoading ? <Spinner/> : <Component {...data}/>
            break;
        case 'confirmed':
            return <Component {...data}/>
            break;
        case 'error':
            return <ErrorMessage/>
            break;
        default:
            throw new Error('Unexpected process state');
    }
}

const ComicsList = () => {

    const[comics, setComics] = useState([]);
    const[offset, setOffset] = useState(120);
    const[newItemLoading, setNewItemLoading] = useState(false);
    const[comicsEnded, setComicsEnded] = useState(false);

    const {loading, error, getComics, process, setProcess} = useMarvelService();

    useEffect(() => {
        requestComics(offset, true)
    }, []);

    const requestComics = async (offset, initial) => {
        !initial ? setNewItemLoading(false) : setNewItemLoading(true)
        const comicz = await getComics(offset);
        await onComicsLoaded(comicz);
        setProcess('confirmed');
        setNewItemLoading(true);
    }

    const onComicsLoaded = (newComics) => {
        let ended = false;
        if(newComics.length < 8) {
            debugger;
            ended = true;
        }
        setOffset((offset) => offset + 8);
        setComics((comics) => [...comics, ...newComics]);
        setComicsEnded(ended);
    }

    const onUploadChars = async () => {
        requestComics(offset, false);
    }

    /*const spinner = loading && newItemLoading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    const content = comics.length > 0
        && !errorMessage
        && !spinner &&
        <View comics={comics}
              comicsEnded={comicsEnded}
              onUploadChars={onUploadChars}
              isActiveLoadMoreBtn={newItemLoading}
        />*/

    return (
        <>
            {setContent(
                process,
                View,
                {comics, comicsEnded, onUploadChars, newItemLoading},
                newItemLoading
            )}
        </>
    )
}

const View = ({comics, comicsEnded, onUploadChars, newItemLoading}) => {

    const renderItems = (comics) => {
        console.log('render comics');
        const items = comics.map((comic, index) =>
                <CSSTransition
                    key={index}
                    timeout={500}
                    classNames="comics__item"
                    mountOnEnter
                    unmountOnExit
                >
                    <li className="comics__item">
                        <Link to={`/comics/${comic.id}`}>
                            <img src={comic.image ? comic.image : uw}
                                 alt={comic.title}
                                 className="comics__item-img"
                            />
                            <div className="comics__item-name">{comic.title}</div>
                            <div className="comics__item-price">{comic.price}</div>
                        </Link>
                    </li>
                </CSSTransition>
        )

        return (
            <ul className="comics__grid">
                <TransitionGroup component={null}>
                    {items}
                </TransitionGroup>
            </ul>
        )
    }

    const items = renderItems(comics);

    return (
        <div className="comics__list">
            {items}
            <button
                className="button button__main button__long"
                style={{'display': comicsEnded ? 'none' : 'block'}}
                onClick={onUploadChars}
                disabled={!newItemLoading}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;
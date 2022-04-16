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

const ComicsList = () => {

    const[comics, setComics] = useState([]);
    const[offset, setOffset] = useState(120);
    const[isActiveLoadMoreBtn, setIsActiveLoadMoreBtn] = useState(true);
    const[comicsEnded, setComicsEnded] = useState(false);

    const {loading, error, getComics} = useMarvelService();

    useEffect(() => {
        requestComics(offset, true)
    }, []);

    const requestComics = async (offset, initial) => {
        !initial ? setIsActiveLoadMoreBtn(false) : setIsActiveLoadMoreBtn(true)
        const comicz = await getComics(offset);
        onComicsLoaded(comicz);
        setIsActiveLoadMoreBtn(true);
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

    const spinner = loading && isActiveLoadMoreBtn ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    const content = comics.length > 0
        && !errorMessage
        && !spinner &&
        <View comics={comics}
              comicsEnded={comicsEnded}
              onUploadChars={onUploadChars}
              isActiveLoadMoreBtn={isActiveLoadMoreBtn}
        />

    return (
        <>
            {spinner}
            {errorMessage}
            {content}
        </>
    )
}

const View = ({comics, comicsEnded, onUploadChars, isActiveLoadMoreBtn}) => {

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
            {/*<ul className="comics__grid">
                <TransitionGroup component={null}>
                    {
                        comics.map((comic, index) => {
                            return (
                                <CSSTransition
                                    key={index}
                                    timeout={500}
                                    classNames="comics__item"
                                >
                                    <li className="comics__item">
                                        <Link to={`/comics/${comic.id}`}>
                                            <img src={comic.image ? comic.image : uw} alt={comic.title}
                                                 className="comics__item-img"/>
                                            <div className="comics__item-name">{comic.title}</div>
                                            <div className="comics__item-price">{comic.price}</div>
                                        </Link>
                                    </li>
                                </CSSTransition>
                            )
                        })
                    }
                </TransitionGroup>
            </ul>*/}
            <button
                className="button button__main button__long"
                style={{'display': comicsEnded ? 'none' : 'block'}}
                onClick={onUploadChars}
                disabled={!isActiveLoadMoreBtn}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;
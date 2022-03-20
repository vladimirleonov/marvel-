import './comicsList.scss';
import uw from '../../resources/img/UW.png';
import xMen from '../../resources/img/x-men.png';
import React, {useEffect, useState} from "react";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import {Link} from "react-router-dom";

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
    const content = comics.length > 0 && !errorMessage && !spinner &&
        <View comics={comics}
              comicsEnded={comicsEnded}
              onUploadChars={onUploadChars}
              isActiveLoadMoreBtn={isActiveLoadMoreBtn}/>

    return (
        <>
            {spinner}
            {errorMessage}
            {content}
        </>
    )
}

const View = ({comics, comicsEnded, onUploadChars, isActiveLoadMoreBtn}) => {
    return (
        <div className="comics__list">
            <ul className="comics__grid">
                {
                    comics.map((comic, index) =>
                        <Link  key={index} to={`/comics/${comic.id}`}>
                            <img src={comic.image ? comic.image : uw} alt="ultimate war" className="comics__item-img"/>
                            <div className="comics__item-name">{comic.title}</div>
                            <div className="comics__item-price">{comic.price}</div>
                        </Link>
                    )
                }
            </ul>
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
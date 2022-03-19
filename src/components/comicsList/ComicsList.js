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

    console.log(offset);


    useEffect(() => {
        requestComics(offset, true)
    }, []);

    const requestComics = async (offset, initial) => {
        !initial ? setIsActiveLoadMoreBtn(false) : setIsActiveLoadMoreBtn(true)
        const comicz = await getComics(offset);
        console.log(comicz);
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

    /*console.log(comics);
    console.log(comicsEnded);
    debugger;*/

    return (
        <div className="comics__list">
            {spinner}
            {errorMessage}
            <ul className="comics__grid">
                {comics.length > 0 && !errorMessage && !spinner &&
                    comics.map((comic, index) =>
                        <Link  key={index} to={`/comics/${comic.id}`}>
                            <img src={comic.image ? comic.image : uw} alt="ultimate war" className="comics__item-img"/>
                            <div className="comics__item-name">{comic.title}</div>
                            <div className="comics__item-price">{comic.price}</div>
                        </Link>
                    )
                }
                {/*<li className="comics__item">
                    <a href="#">
                        <img src={uw} alt="ultimate war" className="comics__item-img"/>
                        <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
                        <div className="comics__item-price">9.99$</div>
                    </a>
                </li>*/}
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
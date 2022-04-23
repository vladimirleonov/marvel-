import './singleComicPage.scss';
import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../../components/spinner/Spinner";
import ErrorMessage from "../../components/errorMessage/ErrorMessage";

const SingleComicPage = () => {

    let {comicId} = useParams();
    const [comic, setComic] = useState();

    const {loading, error, getComic} = useMarvelService();

    useEffect(() => {
        requestComic(parseInt(comicId));
    },[comicId]) //can change manually staying on this page, so use[comicId]

    const requestComic = async (comicId) => {
        const comic = await getComic(comicId);
        onComicLoaded(comic);
    }

    const onComicLoaded = (comic) => {
        setComic(comic);
    }

    const spinner = loading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    return (
        <>
            {spinner}
            {errorMessage}
            {
                !spinner && ! errorMessage && comic &&
                <View comic={comic}/>
            }
        </>
    )
}

const View = ({comic}) => {
    const{title, description, pageCount, image, language, price} = comic;
    return (
        <div className="single-comic">
            <img src={image} alt="x-men" alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount} page(s)</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComicPage;
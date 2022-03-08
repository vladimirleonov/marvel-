import './comicsList.scss';
import uw from '../../resources/img/UW.png';
import xMen from '../../resources/img/x-men.png';
import {useEffect, useState} from "react";
import useMarvelService from "../../services/MarvelService";

const ComicsList = () => {

    const[comics, setComics] = useState();
    const[offset, setOffset] = useState(45);
    const[isActiveLoadMoreBtn, setIsActiveLoadMoreBtn] = useState(true);

    const {loading, error, getComics} = useMarvelService();

    console.log(offset);

    useEffect(() => {
        requestComics(offset, true)
    }, []);

    const requestComics = async (offset, initial) => {
        !initial ? setIsActiveLoadMoreBtn(false) : setIsActiveLoadMoreBtn(true)
        const comicz = await getComics();
        console.log(comicz);
        setOffset((offset) => offset + 8);
        setComics((comics) => {comics, ...comicz});
        setIsActiveLoadMoreBtn(true);
    }

    const onUploadChars = async () => {
        requestComics(offset, false);
    }

    const onToggleIsActiveLoadMoreBtn = () => {

    }

    return (
        <div className="comics__list">
            <ul className="comics__grid">
                {comics && !error && !loading &&
                    comics.map(comics =>
                        <a  key={comics.id} href={comics.homepage}>
                            <img src={comics.image ? comics.image : uw} alt="ultimate war" className="comics__item-img"/>
                            <div className="comics__item-name">{comics.title}</div>
                            <div className="comics__item-price">{comics.price}</div>
                        </a>
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
                onClick={onUploadChars}
                disabled={!isActiveLoadMoreBtn}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;
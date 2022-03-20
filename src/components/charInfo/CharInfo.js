import React, {useEffect, useState} from "react";
import './charInfo.scss';
import Skeleton from "../skeleton/Skeleton";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import PropTypes from "prop-types";
import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";

const CharInfo = ({activeChar}) => {
    const [char, setChar] = useState(null);
    const {loading, error, getCharacter} = useMarvelService();

    useEffect(() => {
        getChar();
    }, [activeChar]);

    const getChar = async () => {
        if(!activeChar) {
            return
        }
        const char = await getCharacter(activeChar);
        setChar({...char})
    }

    const spinner = loading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    const skeleton = !char && !loading && !error ? <Skeleton/> : null;
    const content = !loading && char && !error ? <View char={char}/> : null;

    return (
        <div className="char__info">
            {skeleton}
            {spinner}
            {errorMessage}
            {content}
        </div>
    )
}

const View = ({char}) =>  {
    const {name, thumbnail, description, homepage, wiki, comics} = char;

    let imgStyle = {'objectFit': 'cover'};
    if(thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit': 'contain'};
    }

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description ? description : 'There is no description for this character'}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {
                    comics.length != 0 ?
                        comics.map((item, i) => {
                            if(i > 9) return;
                            return (
                                <li key={i} className="char__comics-item">
                                    <a href={item.resourceURI} alt={item.name}>
                                        {item.name}
                                    </a>
                                </li>)
                        })
                        :
                        'There is no comicsPage'
                }
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    activeChar: PropTypes.number
}

export default CharInfo;
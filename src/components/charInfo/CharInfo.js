import React, {useEffect, useState} from "react";
import './charInfo.scss';
import Skeleton from "../skeleton/Skeleton";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import PropTypes from "prop-types";

const CharInfo = ({activeChar}) => {
    const [char, setChar] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const marvelService = new MarvelService();

    useEffect(() => {
        getChar();
    }, [activeChar]);

    const getChar = async () => {
        try {
            toggleIsLoading(true);
            const char = await marvelService.getCharacter(activeChar);
            setChar({...char})
            toggleIsLoading(false);
        }
        catch(err) {
            console.log(err);
            onError();
        }
    }

    const onError = () => {
        setIsLoading(false);
        setIsError(true);
    }

    const toggleIsLoading = (value) => {
        setIsLoading(value);
    }

    const skeleton = !char && !isLoading ? <Skeleton/> : null;
    const loading = isLoading ? <Spinner/> : null;
    const view = !isLoading && char ? <View char={char}/> : null;

    return (
        <div className="char__info">
            {skeleton}
            {loading}
            {view}
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
                        'There is no comics'
                }
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    activeChar: PropTypes.number
}

export default CharInfo;
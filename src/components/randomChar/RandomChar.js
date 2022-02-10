import React, {useEffect, useState} from "react";
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";

const RandomChar = () => {

    const [char, setChar] = useState({
        name: null,
        description: null,
        thumbnail: null,
        homepage: null,
        wiki: null
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const marvelService = new MarvelService();

    useEffect(() => {
        updateCharacter();
    }, []);

    const toggleIsLoading = (value) => {
        setIsLoading(value);
    }

    const onError = () => {
        setIsLoading(false);
        setIsError(true);
    }

    const updateCharacter = async () => {
        try {
            toggleIsLoading(true);
            let id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
            const char = await marvelService.getCharacter(id);
            setChar({...char});
            toggleIsLoading(false);
        }
        catch(err) {
            onError();
        }
    }

    const getTotalWordsCount = (str) => {
        let count = 0;
        let words = str.split(" ");
        for (let i = 0; i < words.length; i++) {
            // inner loop -- do the count
            if (words[i] != "") {
                count += 1;
            }
        }

        return (count);
    }

    const getCroppedString = (str, n) => {
        let wordsArr = str.split(" ");
        /*console.log(wordsArr);*/

        let croppedWordsArr = [];

        wordsArr.forEach((item, i) => {
            if(i <= n) {
                croppedWordsArr.push(item);
            }
        })
        /*console.log(croppedWordsArr);*/
        const strNew =  croppedWordsArr.join(' ');
        return strNew;
    }

    let descriptionLength;
    if(char.description) {
        descriptionLength = getTotalWordsCount(char.description);
    } else {
        descriptionLength = 0
    }

    let description;
    if(char.description && descriptionLength > 20) {
        description = getCroppedString(char.description, 20) + '...'
    } else if(!char.description) {
        description = 'There is no description'
    } else {
        description = char.description
    }

    return (
        <div className="randomchar">
            {
                isLoading ?
                    <Spinner/> :
                    <View char={char} description={description}/>
            }
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main" onClick={updateCharacter}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

const View = ({char, description}) => {
    const {thumbnail, name, homepage, wiki} = char;

    let imgStyle = {'objectFit': 'cover'};
    if(thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit': 'contain'};
    }

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img" style={imgStyle}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;
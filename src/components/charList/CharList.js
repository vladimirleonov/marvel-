import React, {useEffect, useRef, useState} from "react";
import PropTypes from 'prop-types';

import MarvelService from "../../services/MarvelService";

import './charList.scss';
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

const CharList = ({setActiveChar}) => {
    const [chars, setChars] = useState([]);
    const [offset, setOffset] = useState(210);
    const [isActiveLoadMoreBtn, setIsActiveLoadMoreBtn] = useState(true);
    const [charsEnded, setCharsEnded] = useState(false);

    const {loading, error, clearError, getCharacters} = useMarvelService();

    useEffect(() => {
        requestChars(offset, true);
    }, [])


    const requestChars = async (offset, initial) => {
        initial ? onToggleIsActiveLoadMoreBtn(true) : onToggleIsActiveLoadMoreBtn(false);
        const chars = await getCharacters(offset);
        console.log(chars);
        onCharsLoaded(chars);
        onToggleIsActiveLoadMoreBtn(true);
    }

    const onCharsLoaded = (newChars) => {
        let ended = false;
        if(newChars.length < 9) {
            debugger;
            ended = true;
        }
        setChars([...chars, ...newChars]);
        setOffset(offset + 9);
        setCharsEnded(ended);
    }

    const onUploadChars = () => {
        console.log('upload');
        requestChars(offset, false);
    }

    const onToggleIsActiveLoadMoreBtn = (value) => {
        setIsActiveLoadMoreBtn(value);
    }

    const onSetActiveChar = (id) => {
        clearError();
        console.log(id);
        setActiveChar(id);
    }

    const itemRef = useRef([]);
    console.log(itemRef);

    const focusOnItem = (id) => {
        itemRef.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRef.current[id].classList.add('char__item_selected');
        itemRef.current[id].focus();
    }

    const spinner = loading && isActiveLoadMoreBtn ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;

    // console.log('render charList');
    console.log(charsEnded);
    console.log(chars.length);
    debugger;
    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {
                !errorMessage && !spinner &&
                <ul className="char__grid">
                    {chars.map((item, i) =>
                        <li key={item.id}
                            className="char__item"
                            ref={el => itemRef.current[i] = el}
                            onClick={() => {
                                onSetActiveChar(item.id)
                                focusOnItem(i)
                            }}
                        >
                            <img src={item.thumbnail} alt="abyss"/>
                            <div className="char__name">{item.name}</div>
                        </li>
                    )}
                    {/*className="char__item char__item_selected*/}
                </ul>
            }
                <button
                    className="button button__main button__long"
                    style={{'display': charsEnded ? 'none' : 'block'}}
                    disabled={!isActiveLoadMoreBtn}
                    onClick={onUploadChars}
                >
                <div className="inner">load more</div>
                </button>
        </div>
    )
}

CharList.propTypes = {
    setActiveChar: PropTypes.func
}

export default CharList;
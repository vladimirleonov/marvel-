import React, {useEffect, useRef, useState} from "react";
import PropTypes from 'prop-types';

import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';

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
        requestChars(offset, false);
    }

    const onToggleIsActiveLoadMoreBtn = (value) => {
        setIsActiveLoadMoreBtn(value);
    }

    const onSetActiveChar = (id) => {
        clearError();
        setActiveChar(id);
    }

    const itemRef = useRef([]);

    const focusOnItem = (id) => {
        itemRef.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRef.current[id].classList.add('char__item_selected');
        itemRef.current[id].focus();
    }

    const spinner = loading && isActiveLoadMoreBtn ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {
                !errorMessage && !spinner &&
                    <ul className="char__grid">
                        <TransitionGroup component={null}>
                        {chars.map((item, i) =>
                            <CSSTransition
                                key={item.id}
                                timeout={500}
                                className="char__item"
                            >
                                <li
                                    className="char__item"
                                    tabIndex={0}
                                    ref={el => itemRef.current[i] = el}
                                    onClick={() => {
                                        onSetActiveChar(item.id)
                                        focusOnItem(i)
                                    }}
                                    onKeyPress={(e) => {
                                        if (e.key === ' ' || e.key === "Enter") {
                                            onSetActiveChar(item.id)
                                            focusOnItem(i)
                                        }
                                    }}>
                                >
                                    <img
                                        src={item.thumbnail}
                                        alt="abyss"
                                        style={item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? {'objectFit' : 'unset'} : null}
                                    />
                                    <div className="char__name">{item.name}</div>
                                </li>
                            </CSSTransition>
                        )}
                        </TransitionGroup>
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
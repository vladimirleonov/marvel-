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

const setContent = (process, Component, newItemLoading) => {
    console.log(newItemLoading);
    switch (process) {
        case 'waiting':
            return <Spinner/>
            break;
        case 'loading':
            return newItemLoading ? <Spinner/> : <Component/>
            break;
        case 'confirmed':
            return <Component/>
            break;
        case 'error':
            return <ErrorMessage/>
            break;
        default:
            throw new Error('Unexpected process state');
    }
}

const CharList = ({setActiveChar}) => {
    const [chars, setChars] = useState([]);
    const [offset, setOffset] = useState(210);
    /*const [isActiveLoadMoreBtn, setIsActiveLoadMoreBtn] = useState(true);*/
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [charsEnded, setCharsEnded] = useState(false);

    const {clearError, getCharacters, process, setProcess} = useMarvelService();

    useEffect(() => {
        requestChars(offset, true);
    }, [])


    const requestChars = async (offset, initial) => {
        initial ? onToggleLoading(true) : onToggleLoading(false);
        const chars = await getCharacters(offset);
        await onCharsLoaded(chars);
        setProcess('confirmed');
        onToggleLoading(true);
    }

    const onCharsLoaded = (newChars) => {
        let ended = false;
        if(newChars.length < 9) {
            debugger;
            ended = true;
        }
        setOffset(offset + 9);
        setChars([...chars, ...newChars]);
        setCharsEnded(ended);
    }

    const onUploadChars = () => {
        requestChars(offset, false);
    }

    const onToggleLoading = (value) => {
        setNewItemLoading(value);
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

    const renderItems = (chars) => {
        console.log('render chars');
        const items = chars.map((item, i) =>
            <CSSTransition
                key={item.id}
                timeout={500}
                classNames="char__item"
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
                        alt={item.name}
                        style={item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? {'objectFit' : 'unset'} : null}
                    />
                    <div className="char__name">{item.name}</div>
                </li>
            </CSSTransition>
        )
        return (
            <ul className="char__grid">
                <TransitionGroup component={null}>
                    {items}
                </TransitionGroup>
            </ul>
        )
    }

    /*const spinner = loading && isActiveLoadMoreBtn ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;*/

    return (
        <div className="char__list">
            {setContent(process, () => renderItems(chars), newItemLoading)}
            <button
                className="button button__main button__long"
                style={{'display': charsEnded ? 'none' : 'block'}}
                disabled={!newItemLoading}
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
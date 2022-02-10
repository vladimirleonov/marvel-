import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';

import MarvelService from "../../services/MarvelService";

import './charList.scss';

const CharList = ({setActiveChar}) => {
    const [chars, setChars] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [offset, setOffset] = useState(210);
    const [isActiveLoadMoreBtn, setIsActiveLoadMoreBtn] = useState(true);
    const [charsEnded, setCharsEnded] = useState(false);
    /*constructor(props) {
        super(props);
        /!*this.foo.info = 0;*!/
        this.state = ({
            chars: [],
            isLoading: false,
            isError: false,
            offset: 210,
            isActiveLoadMoreBtn: true,
            charsEnded: false
        })
        console.log('constructor');
    }*/

    const marvelService = new MarvelService();

    useEffect(() => {
        onUpdateChars();
    }, [])

    /*const componentDidMount = () => {
        onUpdateChars();
    }*/

    const onUpdateChars = async (offset) => {
        try {
            onToggleIsLoading(true);
            onToggleIsActiveLoadMoreBtn(false);
            const chars = await marvelService.getCharacters(offset);
            console.log(chars);
            onCharsLoaded(chars)
            onToggleIsLoading(false);
            onToggleIsActiveLoadMoreBtn(true);
        }
        catch(err) {
            console.log(err);
            onError();
        }
    }

    const onCharsLoaded = (newChars) => {
        let ended = false;
        if(chars.length < 9) {
            ended = true;
        }
        setChars([...chars, ...newChars]);
        setOffset(offset + 9);
        setCharsEnded(ended);
        /*this.setState({
            ...this.state,
            chars: [
                ...this.state.chars,
                ...chars,
            ],
            offset: this.state.offset + 9,
            charsEnded: ended
        });*/
    }

    const onUploadChars = () => {
        console.log('upload');
        onUpdateChars(offset);
    }

    const onError = () => {
        setIsLoading(false);
        setIsError(true);
        /*this.setState({
            ...this.state,
            isLoading: false,
            isError: true
        })*/
    }

    const onToggleIsActiveLoadMoreBtn = (value) => {
        setIsActiveLoadMoreBtn(value);
        /*this.setState({
            ...this.state,
            isActiveLoadMoreBtn: value
        })*/
    }

    const onToggleIsLoading = (value) => {
        setIsLoading(value);
        /*this.setState({
            ...this.state,
            isLoading: value
        })*/
    }

    const onSetActiveChar = (id) => {
        console.log(id);
        setActiveChar(id);
    }

    const itemRefs = [];

    const setCharItemRef = ref => {
        itemRefs.push(ref);
    }

    const focusOnItem = (id) => {
        itemRefs.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs[id].classList.add('char__item_selected');
        itemRefs[id].focus();
    }

    console.log('render charList');
    console.log(chars)
    debugger;
    return (
        <div className="char__list">
            <ul className="char__grid">
                {chars.map((item, i) =>
                <li key={item.id}
                    className="char__item"
                    onClick={() => {
                        onSetActiveChar(item.id)
                        focusOnItem(i)
                    }}
                    ref={setCharItemRef}
                >
                    <img src={item.thumbnail} alt="abyss"/>
                    <div className="char__name">{item.name}</div>
                </li>
                )}
                {/*className="char__item char__item_selected*/}
            </ul>
            <button
                className="button button__main button__long"
                style={{'display': charsEnded ? 'none' : 'block' }}
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
import React from "react";
import PropTypes from 'prop-types';

import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";

import './charList.scss';

class CharList extends React.Component{
    constructor(props) {
        super(props);
        /*this.foo.info = 0;*/
        this.state = ({
            chars: [],
            isLoading: false,
            isError: false,
            offset: 1541,
            isActiveLoadMoreBtn: true,
            charsEnded: false
        })
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.onUpdateChars();
    }

    onUpdateChars = async (offset) => {
        try {
            this.onToggleIsLoading(true);
            this.onToggleIsActiveLoadMoreBtn(false);
            const chars = await this.marvelService.getCharacters(offset);
            console.log(chars);
            this.onCharsLoaded(chars)
            this.onToggleIsLoading(false);
            this.onToggleIsActiveLoadMoreBtn(true);
        }
        catch(err) {
            console.log(err);
            this.onError();
        }
    }

    onCharsLoaded = (chars) => {
        let ended = false;
        if(chars.length < 9) {
            ended = true;
        }
        this.setState({
            ...this.state,
            chars: [
                ...this.state.chars,
                ...chars,
            ],
            offset: this.state.offset + 9,
            charsEnded: ended
        });
    }

    onUploadChars = () => {
        console.log('upload');
        this.onUpdateChars(this.state.offset);
    }

    onError = () => {
        this.setState({
            ...this.state,
            isLoading: false,
            isError: true
        })
    }

    onToggleIsActiveLoadMoreBtn = (value) => {
        this.setState({
            ...this.state,
            isActiveLoadMoreBtn: value
        })
    }

    onToggleIsLoading(value) {
        this.setState({
            ...this.state,
            isLoading: value
        })
    }

    onSetActiveChar(id) {
        console.log(id);
        this.props.setActiveChar(id);
    }

    render () {

        const {chars, charsEnded, isActiveLoadMoreBtn} = this.state;

        return (
            <div className="char__list">
                <ul className="char__grid">
                    {chars.map(item =>
                    <li key={item.id} className="char__item" onClick={() => this.onSetActiveChar(item.id)}>
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
                    onClick={this.onUploadChars}
                >
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

CharList.propTypes = {
    setActiveChar: PropTypes.func
}

export default CharList;
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
            isError: false
        })
    }

    marvelService = new MarvelService();

    async componentDidMount() {
        try {
            this.toggleIsLoading(true);
            const chars = await this.marvelService.getCharacters();
            console.log(chars);
            this.setState({
                ...this.state,
                chars: [
                    ...chars
                ]
            });
            this.toggleIsLoading(false);
        }
        catch(err) {
            console.log(err);
            this.onError();
        }
    }

    onError = () => {
        this.setState({
            ...this.state,
            isLoading: false,
            isError: true
        })
    }

    toggleIsLoading(value) {
        this.setState({
            ...this.state,
            isLoading: value
        })
    }

    setActiveChar(id) {
        console.log(id);
        this.props.setActiveChar(id);
    }

    render () {
        return (
            <div className="char__list">
                <ul className="char__grid">
                    {this.state.chars.map(item =>
                    <li key={item.id} className="char__item" onClick={() => this.setActiveChar(item.id)}>
                        <img src={item.thumbnail} alt="abyss"/>
                        <div className="char__name">{item.name}</div>
                    </li>
                    )}
                    {/*className="char__item char__item_selected*/}
                </ul>
                <button className="button button__main button__long">
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
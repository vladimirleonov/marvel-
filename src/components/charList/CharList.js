import React from "react";

import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";

import './charList.scss';

class CharList extends React.Component{
    constructor(props) {
        super(props);
        this.state = ({
            chars: [],
            isLoading: false
        })
    }

    marvelService = new MarvelService();

    async componentDidMount() {
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

    toggleIsLoading(value) {
        this.setState({
            ...this.state,
            isLoading: value
        })
    }

    setActiveChar(id) {

    }

    render () {

        let chars = this.state.chars ?
            this.state.chars.map(item =>
                <li className="char__item" onClick={() => this.setActiveChar(item.id)}>
                    <img src={item.thumbnail} alt="abyss"/>
                    <div className="char__name">{item.name}</div>
                </li>
            )
            :
            <Spinner/>

        return (
            <div className="char__list">
                <ul className="char__grid">
                    {chars}
                    {/*className="char__item char__item_selected*/}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;
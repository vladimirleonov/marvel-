import React from "react";
import './randomChar.scss';
import thor from '../../resources/img/thor.jpeg';
import mjolnir from '../../resources/img/mjolnir.png';
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";

class RandomChar extends React.Component {
    constructor(props) {
        super(props);
        this.state=({
            character: {
                name: null,
                description: null,
                thumbnail: null,
                homepage: null,
                wiki: null
            },
            loading: false
        })
    }

    marvelService = new MarvelService();

    async componentDidMount() {
        this.setState({
            ...this.state,
            loading: true
        })
        const character = await this.marvelService.getCharacter();
        this.setState({
            ...this.state,
            character: {
                ...character
            },
            loading: false
        })
    }

    getTotalWordsCount(str) {
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

    getCroppedString(str, n) {
        let wordsArr = str.split(" ");
        console.log(wordsArr);

        let croppedWordsArr = [];

        wordsArr.forEach((item, i) => {
            if(i <= n) {
                croppedWordsArr.push(item);
            }
        })
        console.log(croppedWordsArr);
        const strNew =  croppedWordsArr.join(' ');
        return strNew;
    }

    render() {
        let descriptionLength;
        if(this.state.character.description) {
            descriptionLength = this.getTotalWordsCount(this.state.character.description);
        } else {
            descriptionLength = 0
        }

        let description;
        if(this.state.character.description && descriptionLength > 20) {
            description = this.getCroppedString(this.state.character.description, 20) + '...'
        } else {
            description = this.state.character.description
        }

        return (
            <div className="randomchar">
                {
                    this.state.loading ?
                        <Spinner/>
                        :
                        <div className="randomchar__block">
                            <img src={this.state.character.thumbnail} alt="Random character" className="randomchar__img"/>
                            <div className="randomchar__info">
                                <p className="randomchar__name">{this.state.character.name}</p>
                                <p className="randomchar__descr">
                                    {description}
                                </p>
                                <div className="randomchar__btns">
                                    <a href={this.state.character.homepage} className="button button__main">
                                        <div className="inner">homepage</div>
                                    </a>
                                    <a href={this.state.character.wiki} className="button button__secondary">
                                        <div className="inner">Wiki</div>
                                    </a>
                                </div>
                            </div>
                        </div>
                }
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

export default RandomChar;
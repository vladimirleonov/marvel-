import React from "react";
import './charInfo.scss';
import Skeleton from "../skeleton/Skeleton";
import thor from '../../resources/img/thor.jpeg';
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";

class CharInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            isLoading: false,
            char: null
        })
    }

    marvelService = new MarvelService();

    async componentDidUpdate(prevProps, prevState) {
        if(this.props.activeChar != prevProps.activeChar) {
            this.toggleIsLoading(true);
            const char = await this.marvelService.getCharacter(this.props.activeChar);
            console.log(char);
            this.setState({
                ...this.state,
                char: {...char}
            })
            this.toggleIsLoading(false);
        }
    }

    toggleIsLoading(value) {
        this.setState({
            ...this.state,
            isLoading: value
        })
    }

    render () {
        const {char, isLoading} = this.state;

        console.log(this.props.activeChar);
        console.log(this.state.char);
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
                {/*<li className="char__comics-item">
                    All-Winners Squad: Band of Heroes (2011) #3
                </li>
                <li className="char__comics-item">
                    Alpha Flight (1983) #50
                </li>
                <li className="char__comics-item">
                    Amazing Spider-Man (1999) #503
                </li>
                <li className="char__comics-item">
                    Amazing Spider-Man (1999) #504
                </li>
                <li className="char__comics-item">
                    AMAZING SPIDER-MAN VOL. 7: BOOK OF EZEKIEL TPB (Trade Paperback)
                </li>
                <li className="char__comics-item">
                    Amazing-Spider-Man: Worldwide Vol. 8 (Trade Paperback)
                </li>
                <li className="char__comics-item">
                    Asgardians Of The Galaxy Vol. 2: War Of The Realms (Trade Paperback)
                </li>
                <li className="char__comics-item">
                    Vengeance (2011) #4
                </li>
                <li className="char__comics-item">
                    Avengers (1963) #1
                </li>
                <li className="char__comics-item">
                    Avengers (1996) #1
                </li>*/}
            </ul>
        </>
    )
}

export default CharInfo;
import React from "react";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from '../../resources/img/vision.png';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            activeChar: null
        })
    }

    setActiveChar = (id) => {
        this.setState({
            activeChar: id
        })
    }

    render () {
        console.log(this.state.activeChar);
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <RandomChar/>
                    <div className="char__content">
                        <CharList setActiveChar={this.setActiveChar}/>
                        <CharInfo activeChar={this.state.activeChar}/>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }
}

export default App;
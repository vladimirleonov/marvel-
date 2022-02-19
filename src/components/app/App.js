import React, {useState} from "react";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from '../../resources/img/vision.png';
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

const App = () => {

    const [activeChar, setActiveChar] = useState(null);

    const onSetActiveChar = (id) => {
        setActiveChar(id)
    }

    console.log(activeChar);
    return (
        <div className="app">
            <AppHeader/>
            <main>
                <ErrorBoundary>
                    <RandomChar/>
                </ErrorBoundary>
                <div className="char__content">
                    <ErrorBoundary>
                        <CharList setActiveChar={onSetActiveChar}/>
                    </ErrorBoundary>
                    {/*<ErrorBoundary>
                        <CharInfo activeChar={activeChar}/>
                    </ErrorBoundary>*/}
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/>
            </main>
        </div>
    )
}

export default App;
import React, {useState} from "react";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from '../../resources/img/vision.png';
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import AppBanner from "../appBanner/AppBanner";
import ComicsList from "../comicsList/ComicsList";

const App = () => {

    return (
        <BrowserRouter>
            <div className="app">
                <AppHeader/>
                <main>
                    <Routes>
                        <Route path="/" element={<Characters/>}/>
                        <Route path="/characters" element={<Characters/>}/>
                        <Route path="/comics" element={<Comics/>}/>
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    )
}

const Characters = () => {

    const [activeChar, setActiveChar] = useState(null);

    const onSetActiveChar = (id) => {
        setActiveChar(id)
    }

    return (
        <>
            <ErrorBoundary>
                <RandomChar/>
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList setActiveChar={onSetActiveChar}/>
                </ErrorBoundary>
                <ErrorBoundary>
                    <CharInfo activeChar={activeChar}/>
                </ErrorBoundary>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}

const Comics = () => {
    return (
        <>
            <AppBanner/>
            <ComicsList/>
        </>
    )
}

export default App;
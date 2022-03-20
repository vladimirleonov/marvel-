import React, {useState} from "react";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from '../../resources/img/vision.png';
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import AppBanner from "../appBanner/AppBanner";
import ComicsList from "../comicsList/ComicsList";
import {MainPage, ComicsPage, Page404, SingleComicPage} from '../../pages/index'

const App = () => {

    return (
        <BrowserRouter>
            <div className="app">
                <AppHeader/>
                <main>
                    <Routes>
                        <Route path="/" element={<MainPage/>}/>
                        <Route path="comics" element={<ComicsPage/>}/>
                        <Route path="comics/:comicId" element={<SingleComicPage/>} />
                        <Route path="*" element={<Page404/>} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    )
}

export default App;
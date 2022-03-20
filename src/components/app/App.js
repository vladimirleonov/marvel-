import React, {useState, Suspense} from "react";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import Spinner from "../spinner/Spinner";
import AppHeader from "../appHeader/AppHeader";

const Page404 = React.lazy(() => import('../../pages/page404/Page404'));
const ComicsPage = React.lazy(() => import('../../pages/comicsPage/ComicsPage'));
const SingleComicPage = React.lazy(() => import('../../pages/singleComicPage/SingleComicPage'));
const MainPage = React.lazy(() => import('../../pages/mainPage/MainPage'));

const App = () => {

    return (
        <BrowserRouter>
            <div className="app">
                <AppHeader/>
                <main>
                    <Suspense fallback={<Spinner/>}>
                        <Routes>
                            <Route path="/" element={<MainPage/>}/>
                            <Route path="comics" element={<ComicsPage/>}/>
                            <Route path="comics/:comicId" element={<SingleComicPage/>} />
                            <Route path="*" element={<Page404/>}/>
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </BrowserRouter>
    )
}

export default App;
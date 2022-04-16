import ErrorBoundary from "../../components/errorBoundary/ErrorBoundary";
import RandomChar from "../../components/randomChar/RandomChar";
import CharList from "../../components/charList/CharList";
import CharInfo from "../../components/charInfo/CharInfo";
import decoration from "../../resources/img/vision.png";
import {useState} from "react";
import CharSearchForm from "../../components/charSearchForm/CharSearchForm";

const MainPage = () => {

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
                <div>
                    <ErrorBoundary>
                        <CharInfo activeChar={activeChar}/>
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharSearchForm/>
                    </ErrorBoundary>
                </div>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}

export default MainPage
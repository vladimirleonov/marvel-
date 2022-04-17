import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../../components/spinner/Spinner";
import ErrorMessage from "../../components/errorMessage/ErrorMessage";
import AppBanner from "../../components/appBanner/AppBanner";

const SinglePage = ({Component, dataType}) => {

    const {id} = useParams();

    const [data, setData] = useState(null);

    const {loading, error, clearError, getCharacter, getComic} = useMarvelService();

    useEffect(() => {
        requestData(parseInt(id));
    },[]);

    const requestData = async (id) => {
        switch (dataType) {
            case 'character': {
                debugger;
                const data = await getCharacter(id);
                onDataLoaded(data);
                break;
            }
            case 'comic': {
                debugger;
                const data = await getComic(id);
                onDataLoaded(data);
                break;
            }
        }
    }

    const onDataLoaded = (data) => {
        setData(data);
    }

    const spinner = loading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    const content = !spinner && ! errorMessage && data &&
        <Component data={data}/>

    return (
        <>
            <AppBanner/>
            {spinner}
            {errorMessage}
            {content}
        </>
    );
};

export default SinglePage;
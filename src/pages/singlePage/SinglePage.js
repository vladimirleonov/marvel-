import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import useMarvelService from "../../services/MarvelService";
import AppBanner from "../../components/appBanner/AppBanner";
import setContent from "../../utils/setContent";

const SinglePage = ({Component, dataType}) => {

    const {id} = useParams();

    const [data, setData] = useState(null);

    const {getCharacter, getComic, process, setProcess} = useMarvelService();

    useEffect(() => {
        requestData(parseInt(id));
    },[]);

    const requestData = async (id) => {
        switch (dataType) {
            case 'character': {
                debugger;
                const data = await getCharacter(id);
                await onDataLoaded(data);
                setProcess('confirmed');
                break;
            }
            case 'comic': {
                debugger;
                const data = await getComic(id);
                await onDataLoaded(data);
                setProcess('confirmed');
                break;
            }
        }
    }

    const onDataLoaded = (data) => {
        setData(data);
    }

    /*const spinner = loading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    const content = !spinner && ! errorMessage && data &&
        <Component data={data}/>*/

    return (
        <>
            <AppBanner/>
            {setContent(process, Component, {data})}
        </>
    );
};

export default SinglePage;
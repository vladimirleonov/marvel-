import React from 'react';
import {Link} from "react-router-dom";
import './singleCharacterLayout.scss';

const SingleCharacterLayout = ({data}) => {
    console.log(data);

    const{name, description, thumbnail} = data;

    return (
        <div className="single-character">
            <img src={thumbnail} alt="x-men" alt={name} className="single-character__img"/>
            <div className="single-character__info">
                <h2 className="single-character__name">{name}</h2>
                <p className="single-character__descr">{description}</p>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    )
};

export default SingleCharacterLayout;
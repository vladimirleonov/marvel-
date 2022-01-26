import React from "react";
import img from './error.gif';

class ErrorMessage extends React.Component{
    render() {
        return (
            <img style={{display: 'block', width: '250px', height: '250px',
                objectFit: 'contain', margin: '0 auto'}} src={img}/>
        )
    }
}

export default ErrorMessage;
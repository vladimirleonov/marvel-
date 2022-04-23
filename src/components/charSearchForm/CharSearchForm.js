import React, {useState} from 'react';
import {Form, Formik, Field, ErrorMessage as FormikErrorMessage} from "formik";
import * as Yup from 'yup';
import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import './charSearchForm.scss';
import {Link} from "react-router-dom";

const setContent = (process, Component, requestErrorComponent) => {
    switch (process) {
        case 'waiting':
            return
            break;
        case 'loading':
            return
            break;
        case 'confirmed':
            return <Component/>
            break;
        case 'error':
            return requestErrorComponent
            break;
        default:
            throw new Error('Unexpected process state');
    }
}

const CharSearchForm = () => {

    const [char, setChar] = useState(null);

    const {clearError, getCharacterByName, process, setProcess} = useMarvelService();

    const requestChar = async (charName) => {
        clearError();
        const char = await getCharacterByName(charName);
        await onCharLoaded(char);
        setProcess('confirmed');
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const requestOkComponent = () => {
        return (
            <>
                {
                    !char ? null : char.length > 0 ?
                        <div className="char__search-wrapper">
                            <div className="char__search-success">There is! Visit {char[0].name} page?</div>
                            <Link to={`/characters/${char[0].id}`} className="button button__secondary">
                                <div className="inner">To page</div>
                            </Link>
                        </div> :
                        <div className="char__search-error">
                            The character was not found. Check the name and try again
                        </div>
                }
            </>
        )
    }

    const requestErrorComponent = () => {
        return (
            <div className="char__search-critical-error">
                <ErrorMessage />
            </div>
        )
    }

    return (
        <div className="char__search-form">
            <Formik
                initialValues={{ charName: '' }}
                validationSchema={Yup.object({
                    charName: Yup.string()
                        .required('This field is required')
                })}
                onSubmit = { ({charName}) => {
                    requestChar(charName);
                }}
            >
                <Form>
                    <label className="char__search-label" htmlFor="charName">Or find a character by name:</label>
                    <div className="char__search-wrapper">
                        <Field
                            id="charName"
                            name='charName'
                            type='text'
                            placeholder="Enter name"/>
                        <button
                            type='submit'
                            className="button button__main"
                            /*disabled={loading}*/
                        >
                            <div className="inner">find</div>
                        </button>
                    </div>
                    <FormikErrorMessage component="div" className="char__search-error" name="charName" />
                </Form>
            </Formik>
            {setContent(process, requestOkComponent, requestErrorComponent)}
        </div>
    );
};

export default CharSearchForm;
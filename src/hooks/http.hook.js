import {useCallback, useState} from "react";
import * as url from "url";

const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [process, setProcess] = useState('waiting');

    const request = useCallback(async (
        url,
        method = 'GET',
        body = null,
        headers = {'Content-Type': 'application/json'}
    ) => {

        setLoading(true);
        setProcess('loading');

        try {
            const response = await fetch(url, {method, body, headers});

            //if error then move to catch
            if(!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            const data = await response.json();

            setLoading(false);
            // setProcess('confirmed');

            return data;
        } catch (e) {
            setLoading(false);
            setError(e.message);
            setProcess('error');

            throw e;
        }
    },[])

    const clearError = useCallback(() => setError(null), [])

    return {loading, request, error, clearError, process, setProcess}
}

export default useHttp;
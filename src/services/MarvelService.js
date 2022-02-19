import useHttp from "../components/hooks/http.hook";

const useMarvelService = () => {
    const {loading, request, error} = useHttp();

    const _baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';
    const _baseOffset = 210;

    const getCharacter = async (id) => {
        const response = await request(`${_baseUrl}/${id}?apikey=c8f1b9d4937ef1256f1d96898ca20f7e`);
        console.log(response);
        return _transformCharacter(response.data.results[0]);
    }
    const getCharacters = async (offset=_baseOffset) => {
        let response = await request(`${_baseUrl}?limit=9&offset=${offset}&apikey=c8f1b9d4937ef1256f1d96898ca20f7e`);
        /*console.log(response);*/
        return response.data.results.map(item => _transformCharacter(item));
    }
    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    return {loading, error, getCharacter, getCharacters}
}

export default useMarvelService;
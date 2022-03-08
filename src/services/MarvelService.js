import useHttp from "../hooks/http.hook";

const useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp();

    const _baseCharsUrl = 'https://gateway.marvel.com:443/v1/public/characters';
    const _baseComicsUrl = 'https://gateway.marvel.com:443/v1/public/comics'
    const _baseCharsOffset = 210;
    const _baseComicsOffset = 45;

    const getCharacter = async (id) => {
        const response = await request(`${_baseCharsUrl}/${id}?apikey=c8f1b9d4937ef1256f1d96898ca20f7e`);
        console.log(response);
        return _transformCharacter(response.data.results[0]);
    }
    const getCharacters = async (offset=_baseCharsOffset) => {
        let response = await request(`${_baseCharsUrl}?limit=9&offset=${offset}&apikey=c8f1b9d4937ef1256f1d96898ca20f7e`);
        /*console.log(response);*/
        return response.data.results.map(item => _transformCharacter(item));
    }
    const getComics = async (offset=_baseComicsOffset) => {
        let response = await request(`${_baseComicsUrl}?limit=8&offset=${offset}&apikey=c8f1b9d4937ef1256f1d96898ca20f7e`);
        return response.data.results.map(item => _transformComics(item));
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
    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            homepage: comics.resourceURI,
            image: comics.images[0] && comics.images[0].path + '.' + comics.images[0].extension,
            price: comics.prices[0].price
        }
    }

    return {loading, error, clearError, getCharacter, getCharacters, getComics}
}

export default useMarvelService;

//char 1011049 - error
import useHttp from "../hooks/http.hook";

const useMarvelService = () => {
    const {request, clearError, process, setProcess} = useHttp();

    const _baseUrl = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'c8f1b9d4937ef1256f1d96898ca20f7e';
    const _baseCharsOffset = 210;
    const _baseComicsOffset = 20;

    const getCharacter = async (id) => {
        const response = await request(`${_baseUrl}characters/${id}?apikey=${_apiKey}`);
        console.log(response);
        return _transformCharacter(response.data.results[0]);
    }
    const getCharacters = async (offset=_baseCharsOffset) => {
        let response = await request(`${_baseUrl}characters?limit=9&offset=${offset}&apikey=${_apiKey}`);
        /*console.log(response);*/
        return response.data.results.map(item => _transformCharacter(item));
    }
    const getComics = async (offset=_baseComicsOffset) => {
        let response = await request(`${_baseUrl}comics?limit=8&offset=${offset}&apikey=${_apiKey}`);
        return response.data.results.map(item => _transformComic(item));
    }
    const getComic = async (comicId) => {
        let response = await request(`${_baseUrl}comics/${comicId}?apikey=${_apiKey}`);
        return _transformComic(response.data.results[0]);
    }
    const getCharacterByName = async (name) => {
        const response = await request(`${_baseUrl}characters?name=${name}&apikey=${_apiKey}`);
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
    const _transformComic = (comic) => {
        return {
            id: comic.id,
            title: comic.title,
            description: comic.description || 'There is no description',
            pageCount: comic.pageCount ? comic.pageCount : 'No information about the number of pages',
            homepage: comic.resourceURI,
            language: comic.textObjects.language || 'en-us',
            image: comic.images[0] && comic.images[0].path + '.' + comic.images[0].extension,
            price: comic.prices[0].price ? `${comic.prices[0].price}$` : 'not available'
        }
    }

    return {
        clearError,
        process,
        setProcess,
        getCharacter,
        getCharacters,
        getComics,
        getComic,
        getCharacterByName
    }
}

export default useMarvelService;

//char 1011049 - error
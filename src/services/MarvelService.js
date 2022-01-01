export default class MarvelService {
    getResource = async (url) => {
        const response = await fetch(url);
        return await response.json();
    }
    getCharacters = async () => {
        let response = await fetch('https://gateway.marvel.com:443/v1/public/characters?limit=9&offset=300&apikey=c8f1b9d4937ef1256f1d96898ca20f7e')
        return response.json();
    }
    getCharacter = async () => {
        /*const response = await fetch('https://gateway.marvel.com:443/v1/public/characters/1011031?apikey=c8f1b9d4937ef1256f1d96898ca20f7e');*/
        const response = await this.getResource('https://gateway.marvel.com:443/v1/public/characters/1011031?apikey=c8f1b9d4937ef1256f1d96898ca20f7e');
        return {
            name: response.data.results[0].name,
            description: response.data.results[0].description,
            thumbnail: response.data.results[0].thumbnail.path + '.' + response.data.results[0].thumbnail.extension,
            homepage: response.data.results[0].urls[0].url,
            wiki: response.data.results[0].urls[1].url
        }
    }

}

//1011031
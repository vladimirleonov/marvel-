export default class MarvelService {
    _baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';
    _baseOffset = 210;
    getResource = async (url) => {
        const response = await fetch(this._baseUrl + url);
        return await response.json();
    }
    getCharacter = async (id) => {
        const response = await this.getResource(`/${id}?apikey=c8f1b9d4937ef1256f1d96898ca20f7e`);
        console.log(response);
        return this._transformCharacter(response.data.results[0]);
    }
    getCharacters = async (offset=this._baseOffset) => {
        let response = await this.getResource(`?limit=9&offset=${offset}&apikey=c8f1b9d4937ef1256f1d96898ca20f7e`);
        /*console.log(response);*/
        return response.data.results.map(item => this._transformCharacter(item));
    }
    _transformCharacter(char) {
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
}

//1011031
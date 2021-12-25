export default class MarvelService {
    async getCharacters () {
        let response = await fetch('https://gateway.marvel.com:443/v1/public/characters?apikey=c8f1b9d4937ef1256f1d96898ca20f7e')
        return await response.json();
    }
    async getCharacter () {
        let response = await fetch('https://gateway.marvel.com:443/v1/public/characters/1011031?apikey=c8f1b9d4937ef1256f1d96898ca20f7e')
        return await response.json();
    }
    //1011031
}
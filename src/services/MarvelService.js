import truncateString from "../utilities/truncateString";
import { useHttp  } from "../hooks/http.hook";

const useMarvelService = () => {
  const {loading, error, request, clearError} = useHttp();

  const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  const _apiKey = 'apikey=a9f206970a26f06a27806528ed4417fd';
  const _baseCharOffset = 210;
  const _baseComicsOffset = 0;

  const getAllCharacters = async (offset = _baseCharOffset) => {
    const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);

    return res.data.results.map(_transformCharacter);
  }

  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);

    return _transformCharacter(res.data.results[0]);
  }

  const _transformCharacter = (char) => {
    return {
        id: char.id,
        name: char.name,
        description: char.description ? truncateString(char.description, 180) : 'We have no data for this character',
        thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
        homepage: char.urls[0].url,
        wiki: char.urls[1].url,
        comics: char.comics.items
    }
  }

  const getAllComicses = async (offset = _baseComicsOffset) => {
    const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);

    return res.data.results.map(_transformComics);
  }

  const _transformComics = (comics) => {
    return {
        resourceURI: comics.resourceURI,
        title: comics.title,
        thumbnail: `${comics.thumbnail.path}.${comics.thumbnail.extension}`,
        price: comics.prices[0].price
    }
  }

  return {loading, error, getAllCharacters, getCharacter, clearError, getAllComicses}
}

export default useMarvelService;

export type Movie = {
    name: string;
    duration: number;
    poster: string;
    genreList: string[];
    languages: string[];
    releaseDate: Date;
    id: number
}

export enum Language {
  ENGLISH = "English",
  HINDI = "Hindi",
  TAMIL = "Tamil",
  TELUGU = "Telugu",
  KANNADA = "Kannada",
  MALAYALAM = "Malayalam",
  BENGALI = "Bengali",
  MARATHI = "Marathi",
  PUNJABI = "Punjabi",
  GUJARATI = "Gujarati",
  BHOJPURI = "Bhojpuri"
}

export enum Genre {
  ACTION = "Action",
  ADVENTURE = "Adventure",
  ANIMATION = "Animation",
  BIOGRAPHY = "Biography",
  COMEDY = "Comedy",
  CRIME = "Crime",
  DOCUMENTARY = "Documentary",
  DRAMA = "Drama",
  FAMILY = "Family",
  FANTASY = "Fantasy",
  FILM_NOIR = "Film-Noir",
  HISTORY = "History",
  HORROR = "Horror",
  MUSICAL = "Musical",
  MYSTERY = "Mystery",
  ROMANCE = "Romance",
  SCI_FI = "Sci-Fi",
  SHORT = "Short",
  SPORT = "Sport",
  THRILLER = "Thriller",
  WAR = "War",
  WESTERN = "Western"
}


export type movieFilters = {
  genre?: string[],
  language?: string[],
  releasedOnOrAfter?: string
}
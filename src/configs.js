// define movies configs
export const OMDB_CONFIGS = {
  apikey: "dce24c91",
  baseURL: "https://www.omdbapi.com",
  apiLimit: 10
}

// define weather configs
export const OPEN_WEATHER_CONFIGS = {
  apikey: "c2152ce33eec94f628bcb40cda3da446",
  baseURL: "https://api.openweathermap.org/data/2.5/weather",
  fallbackCity: "tel-aviv",
  iconBaseURL: "https://openweathermap.org/img/wn",
  defaultUnitTemp: "metric"
}

// define omdb random search props
export const OMDB_RANDOM_SEARCH = {
  year: "2021",
  series: "series",
  movie: "movie",
  searchWords: ["family", "man", "true", "friends", "women", "game"]
}

// no image url
export const NO_IMAGE_URL = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png"

// ip configs
export const IP_CONFIGS = {
  baseURL: "https://json.geoiplookup.io"
}
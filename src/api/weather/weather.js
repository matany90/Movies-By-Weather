import axios from "axios"

import { OPEN_WEATHER_CONFIGS } from "../../configs"

/**
 * WeatherAPI defines API class for geenrating
 * an weather api instance
 */
export default class WeatherAPI {
  /**
   * init class client instance
   */
  constructor() {
    // init weather client
    this.client = axios.create({
      baseURL: OPEN_WEATHER_CONFIGS.baseURL
    })

    // attach additional query params
    // for each request
    this.client.interceptors.request.use(config => {
      config.params.appid = OPEN_WEATHER_CONFIGS.apikey

      return config
    })
  }

  /**
   * queryByCity returns weather info
   * by city name
   *
   * @param {string} cityName - city name
   * @param {object} headers - additional headers
   */
  queryByCity(cityName, headers = {}) {
    try {
      // define request configs
      const configs = {
        headers,
        params: {
          q: cityName,
          units: OPEN_WEATHER_CONFIGS.defaultUnitTemp
        },
      }

      // pull weather element
      return this.client.get("/", configs)
    } catch (e) {
      console.error(e)
      throw new Error("unable to query city by name.")
    }
  }
}
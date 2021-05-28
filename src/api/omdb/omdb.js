
import axios from "axios"

import { OMDB_CONFIGS } from "../../configs"

/**
 * OmdbAPI defines API class for generating an
 * omdb api instance
 */
export default class OmdbAPI {
  /**
   * Init class client instance
   */
  constructor() {
    // init omdb client
    this.client = axios.create({
      baseURL: OMDB_CONFIGS.baseURL
    })

    // attach additional query params
    // for each request
    this.client.interceptors.request.use(config => {
      config.params.apikey = OMDB_CONFIGS.apikey

      return config
    })
  }

  /**
   * Search for OMDB elements
   *
   * @param {object} params - query params object
   * @param {object} headers - additional headers
   * @returns {Promise.<*>} returns promise of odmb elements
   */
  async search(params = {}, headers = {}) {
    try {
      // define request configs
      const configs = {
        params,
        headers
      }

      // pull omdb elements
      return this.client.get("/", configs)
    } catch (e) {
      console.error(e)
      throw new Error("unable to search movies/tv shows.")
    }
  }

  /**
   * Get OMDB element
   *
   * @param {string} id - omdb element id
   * @param {object} headers - additional headers
   * @returns {Promise.<object>} - promise for the relevant object
   */
  get(id, headers = {}) {
    try {
      // define request configs
      const configs = {
        headers,
        params: {
          i: id
        },
      }

      // pull omdb element
      return this.client.get("/", configs)
    } catch (e) {
      console.error(e)
      throw new Error("unable to get movie/tv-show.")
    }
  }
}

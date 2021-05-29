import axios from "axios"

import { IP_CONFIGS } from "../../configs"

/**
 * IpAPI defines API class for geenrating
 * an ip api instance
 */
export default class IpAPI {
  /**
   * init class client instance
   */
  constructor() {
    // init weather client
    this.client = axios.create({
      baseURL: IP_CONFIGS.baseURL
    })
  }

  /**
   * Get location response by id
   *
   * @returns {Promise.<*>}
   */
  get() {
    return this.client.get()
  }
}
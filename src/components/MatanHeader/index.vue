<template>
  <!-- Header container -->
  <header class="text-gray-100 bg-m-bg body-font shadow w-full">
      <div class="flex flex-wrap p-5 flex-col md:flex-row items-center">
        <!-- Header Left -->
        <div class="w-full flex flex-row">
          <div class="w-1/2">
            <img src="@/assets/images/matan-logo.png" class="w-14" />
          </div>
          <!-- Header Right -->
          <div class="w-1/2 flex justify-end">
            <!-- City and temperature -->
            <div class="text-gray-300 flex items-center text-sm mt-2">
              <span>{{ weatherInfo.city }}, {{ weatherInfo.temp }} °C</span>
            </div>

            <!-- Weather icon -->
            <img :src="weatherInfo.icon" class="w-14" />
          </div>
        </div>
      </div>
  </header>
</template>

<script>
import initWeatherAPI from "../../api/weather"
import initLocByIpAPI from "../../api/ip"

import { OPEN_WEATHER_CONFIGS } from "../../configs"

// init wheather api
const openWeatherAPI = initWeatherAPI()

export default {
  // set component name
  name: "MatanHeader",

  // local state
  data() {
    return {
      weather: {}
    }
  },

  // define props
  props: {
    // selected header id
    selectedHeader: {
      type: String,
      default: ""
    },

    // headers options
    headerOptions: {
      type: Array,
      default: () => ([])
    }
  },

  // mounted hook
  async mounted() {
    // pull weather by user's ip
    this.weather = await this.getWeatherByIp()
  },

  // computed properties
  computed: {
    /**
     * weatherInfo return the weather info
     */
    weatherInfo() {
      // pull weather element
      if (Object.keys(this.weather || {}).length) {
        const [weather = {}] = this.weather.weather

        // return info
        return {
          icon: `${OPEN_WEATHER_CONFIGS.iconBaseURL}/${weather.icon}.png`,
          description: weather.description,
          city: this.weather.name || "",
          temp: this.weather.main.temp
        }
      }

      return {}
    }
  },

  // local methods
  methods: {
    /**
     * headersClasses returns the
     * header classes
     */
    headersClasses(headerId) {
      // define base header classes
      const baseHeaderClass = {
        "ml-10": true,
        "cursor-pointer": true
      }

      // bold on select
      if (headerId === this.selectedHeader) {
        baseHeaderClass["font-black"] = true
      }

      // return classes
      return baseHeaderClass
    },

    /**
     * getWeatherByIp gets the user's
     * weather object by his id
     */
    async getWeatherByIp() {
      try {
        // get user's location from ip
        const loc = await this.getLocByIp()

        // pull city
        const city = (loc.data?.city || "").replace(" ", "-")

        // get weather by location
        const weatherRes = await openWeatherAPI.queryByCity(city)

        return weatherRes.data
      } catch (e) {
        console.error(e)
        return this.handleQueryCityError()
      }
    },

    /**
     * getLocByIp returns loc object
     * by user's ip
     */
    async getLocByIp() {
      const locByIpClient = initLocByIpAPI()

      return locByIpClient.get()
    },

    /**
     * handleQueryCityError return fallback data
     * in case of an error
     */
    async handleQueryCityError() {
      try {
        const weatherRes = await openWeatherAPI.queryByCity(OPEN_WEATHER_CONFIGS.fallbackCity)
        return weatherRes.data
      } catch (e) {
        console.error(e)
        throw new Error("unable to generate weather object.")
      }
    }
  }
}
</script>

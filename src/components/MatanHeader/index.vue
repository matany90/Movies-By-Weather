<template>
  <!-- Header container -->
  <header class="matan-header text-gray-100 bg-m-bg body-font shadow w-full relative">
      <div class="flex flex-wrap p-5 flex-col md:flex-row items-center">
        <div class="w-full flex flex-row">

          <!-- Header Left -->
          <div class="w-1/2 cursor-pointer flex flex-row" @click="$router.push('/')">
            <!-- App logo -->
            <img src="@/assets/images/matan-logo.png" style="width: 4rem; height: 4rem;" />
            <div class="matan-header--logo-title flex items-center ml-2 md:flex hidden">{{ $t("headers.logo.title") }}</div>
          </div>

          <!-- Header Right -->
          <div
            class="w-1/2 flex justify-end cursor-pointer"
            @click="isForecastVisible = true"
          >

            <div v-if="!weatherInfo.icon">
              <m-loading />
            </div>
            <!-- City and temperature -->
            <div v-else class="flex flex-row">
              <div class="text-gray-300 flex items-center text-sm mt-2">
                <span class="md:text-lg text-sm font-bold">{{ weatherInfo.city }}, {{ weatherInfo.temp }} °C</span>
              </div>

              <!-- Weather icon -->
              <img :src="weatherInfo.icon" style="width: 4rem; height: 4rem;" />
            </div>
          </div>
        </div>
      </div>

      <!-- Weather forecast -->
      <transition name="fade">
        <matan-forecast
          v-if="isForecastVisible"
          :currentWeather="weatherInfo"
          class="absolute"
          style="top: 80%; right: 0%;"
          @on-close-forecast="isForecastVisible = false"
        />
      </transition>
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
      // weather object
      weather: {},

      // isForecast visible
      isForecastVisible: false
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
        console.log("this.weather:", this.weather)
        return {
          icon: `${OPEN_WEATHER_CONFIGS.iconBaseURL}/${weather.icon}.png`,
          description: weather.description,
          city: this.weather.name || "",
          temp: Math.floor(this.weather.main.temp),
          realFeel: Math.floor(this.weather.main.feels_like)
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
    },

    /**
     * onTempHover toggle forecast visible
     */
    onTempHover() {
      this.isForecastVisible = true
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../style/_main.scss";

.matan-header {
  &--logo-title {
    font-family: $title-font-family;
    font-weight: $title-font-weight
  }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
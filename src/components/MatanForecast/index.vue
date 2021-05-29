<template>
  <!-- Weather forecast container -->
  <div class="bg-white bg-opacity-80 rounded-3xl flex flex-col space-x-12 items-center shadow-md">
    <div>
      <!-- Exit forcase -->
      <div class="cursor-pointer w-full rounded-3xl" @click="$emit('on-close-forecast')">
        <m-icon name="close" class="w-4 ml-3 mt-3" />
      </div>

      <!-- Current weather -->
      <div class="flex flex-row p-10">
        <div>
          <img :src="currentWeather.icon" class="w-20" />
          <p class="text-center text-gray-500 mt-2 text-sm capitalize">{{ currentWeather.description }}</p>
        </div>

        <!-- Forecast -->
        <div class="flex justify-center flex-col ml-5">
          <p class="text-7xl font-bold text-gray-900">{{ currentWeather.temp }}°</p>
          <div class="flex justify-center text-gray-500 text-sm text-center text-center h-full items-end">
            {{ currentWeather.city }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // props
  props: {
    // current weather
    currentWeather: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

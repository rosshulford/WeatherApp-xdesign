<template>
<div class="hourlyForecast">
 <div  class="hour" v-for="(hour, key, index) in filteredForecast" :key="index">
        <span class="time">{{ hour.time | ConvertTime }}</span>
        <span>{{ hour.summary }}</span>
        <span>{{ hour.temperature | roundTemperature }}&deg; C</span>
        <span :class="hour.icon" class="icon"></span>
  </div>
 <div v-if="filteredForecast && filteredForecast.length == 0" class="summary"> {{ summaryForecast }}</div>
  </div>
</template>

<script>
import WeatherMixins from '../mixins/WeatherMixins.js';
export default {
  name: 'HourlyForecast',
  mixins: [ WeatherMixins ],
  props: ['hourlyForecast', 'selectedDay', 'summaryForecast'],

  data () {
    return {
    };
  },
  mounted () {
    console.log(this.$props);
  },
  computed: {
    filteredForecast () {
      if (this.$props.hourlyForecast.length) {
        return this.$props.hourlyForecast.filter(
          element => element.dayOfTheWeek === this.$props.selectedDay
        );
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.hourlyForecast {
  margin-top: 0px;
  overflow: hidden;
}
.hour {
  box-sizing: border-box;
  float: left;
  height: 150px;
  width: calc(100% / 7);
  background: #fff;
  padding: 20px;
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}
.time {
  height: 10px;
  font-weight: bold;
}
span {
  width: 100%;
  display: inline-block;
  &.icon {
    height: 30px;
    margin: 0;
    background-size: 50px;
  }
}
.summary {
  background: #fff;
  font-size: 30px;
  padding: 50px;
}
</style>

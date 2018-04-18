<template>
  <div class="week">
   <div @click="changeDay(day.dayOfTheWeek)" class="day" v-for="(day, key, index) in $props.dailyForecast.slice(0, 7)" :key="index" :class="{ selected: day.dayOfTheWeek == $props.selectedDay}">
        <span class="title">{{ day.dayOfTheWeek }}</span>
        <span>Max {{ day.temperatureHigh | roundTemperature }}&deg;C</span>
        <span>Low {{ day.temperatureLow | roundTemperature }}&deg;C</span>
        <span :class="day.icon" class="icon icon-day"></span>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Day',
  props: ['dailyForecast', 'selectedDay'],
  methods: {
    changeDay (day) {
      this.$parent.selectedDay = day;
    }
  },
  filters: {
    roundTemperature (value) {
      return Math.round(value);
    }
  }
};
</script>

<style>
.week {
  display: flex;
  height: 150px;
  margin-top: 100px;
  width: 100%;
}
.title {
  font-size: 20px;
  font-weight: bold;
}
.day {
  width: 13%;
  float: left;
  padding: 20px;
  background: #ccc;
  border-right: 1px solid #eee;
  align-content: center;
}
span {
  width: 100%;
  display: inline-block;
}
.selected {
  background: #2f7a8f;
  color: #fff;
}
.icon-day {
  height: 60px;
  margin: 0;
}
</style>

<template>
  <div>
    <h1>The Weather</h1>
    <h2>Your 5 Day forecast for {{locationHeader}} </h2>
    <input v-model="location" type="text" class="locationInput" />
    <button class="" @click="updateLocation">Update</button>
     <div class="forecast">
     <DailyForecast :dailyForecast="this.dailyForecast" :selectedDay="this.selectedDay" />
     <HourlyForecast
        :hourlyForecast="this.hourlyForecast"
        :selectedDay="this.selectedDay"
        :summaryForecast="this.summaryForecast"
      />
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import axios from 'axios';
import DailyForecast from '@/components/DailyForecast';
import HourlyForecast from '@/components/HourlyForecast';
import { googleURL, key, proxy, apiLinkDS } from '../settings';

export default {
  name: 'FiveDayWeather',
  components: { DailyForecast, HourlyForecast },
  data () {
    return {
       coordinates: {
        lat: 55.953252,
        lng: -3.188267
      },
      dailyForecast: '',
      hourlyForecast: '',
      msg: 'Welcome to Your Vue.js App',
      days: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ],
      location: 'Edinburgh',
      locationHeader: 'Edinburgh',
      selectedDay: '',
      today: '',
      summaryForecast: ''
    };
  },
  mounted () {
   this.updateWeather();
  },
  methods: {
    tagDailyForecast () {
      this.dailyForecast.forEach(hour => {
        let day = new Date(hour.time * 1000).getDay();
        let hours = new Date(hour.time * 1000).getHours();
        hour.hours = hours;
        hour.dayOfTheWeek = this.days[day];
        hour.dayOfTheWeekInt = day;
      });
    },
     tagHourlyForecast () {
      this.hourlyForecast.forEach(hour => {
        let day = new Date(hour.time * 1000).getDay();
        let hours = new Date(hour.time * 1000).getHours();
        hour.hours = hours;
        hour.dayOfTheWeek = this.days[day];
        hour.dayOfTheWeekInt = day;
        hour.time = hours;
      });
    },
    getDay () {
     this.today = this.dailyForecast[0].dayOfTheWeek;
     this.selectedDay = this.today;
    },
    updateLocation() {
       axios
      .get(
       `${googleURL}${this.location}&key=AIzaSyDIQfV81G3Y0su1Qc_kiDKFD4z_L6c6K2I`
      )
      .then(response => {
        this.coordinates = response.data.results[0].geometry.location;
        this.updateWeather();
      });
      },

    updateWeather() {
       axios
      .get(
       `${proxy}${apiLinkDS}/${this.coordinates.lat},${this.coordinates.lng}?&units=uk2`
      )
      .then(response => {
        if(response.status == 200) {
          this.locationHeader =  this.location;
          this.dailyForecast = response.data.daily.data;
          this.hourlyForecast = response.data.hourly.data;
          this.summaryForecast = response.data.daily.summary;
          this.tagDailyForecast();
          this.tagHourlyForecast();
          this.getDay();
        }

      })
      .catch(function (error) {
        console.log(`The error is ${error}`);
      });
    },
    sortDays () {
      let currentDay = this.getDay();
      let days = this.days;
      let begining = days.splice(0, currentDay);
      this.days = days.concat(begining);
      this.selectedDay = this.days[currentDay - 1];
    },
    selectDay (e) {
      this.selectedDay = e.target.dataset.day;
    }
  },
};
</script>
<style lang="scss">
.icon {
  width: 100%;
  height: 100px;
  display: inline-block;
  margin: 20px 0;
  &.cloudy {
    background: url("../assets/icons/Cloud-sun.svg") no-repeat center center;
  }
  &.wind {
    background: url("../assets/icons/wind.svg") no-repeat center center;
  }
  &.rain {
    background: url("../assets/icons/Cloud-Rain.svg") no-repeat center center;
  }
  &.partly-cloudy-day {
    background: url("../assets/icons/Cloud-sun.svg") no-repeat center center;
  }
  &.partly-cloudy-night {
    background: url("../assets/icons/Cloud-moon.svg") no-repeat center center;
  }
  &.clear-day {
    background: url("../assets/icons/sun.svg") no-repeat center center;
  }
  &.clear-night {
    background: url("../assets/icons/moon.svg") no-repeat center center;
  }
}
.locationInput {
  font-size: 16px;
  padding: 2px 10px;
}
button {
  border: none;
  font-size: 16px;
  background: #124a5b;
  padding: 3px 17px;
  color: #fff;
  font-weight: bold;
  text-transform: uppercase;
}
</style>

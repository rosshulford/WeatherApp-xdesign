/* eslint-disable */
export default {
  computed: {
    filteredForecast() {
      if (this.$props.hourlyForecast.length) {
        return this.$props.hourlyForecast.filter(
          element => element.dayOfTheWeek === this.selectedDay
        );
      }
    },
  },
  filters: {
    roundTemperature(value) {
      return Math.round(value);
    },
    ConvertTime(hours) {
      const times = {
        0: 'Midnight',
        1: '1am',
        2: '2am',
        3: '3am',
        4: '4am',
        5: '5am',
        6: '6am',
        7: '7am',
        8: '8am',
        9: '9am',
        10: '10am',
        11: '11am',
        12: 'Midday',
        13: '1pm',
        14: '2pm',
        15: '3pm',
        16: '4pm',
        17: '5pm',
        18: '6pm',
        19: '7pm',
        20: '8pm',
        21: '9pm',
        22: '10pm',
        23: '11pm',
        24: 'Midnight'
      };
      return times[hours];
    }
  }
}
<template>
  <v-container>
    <v-sheet tile height="54" class="d-flex">
      <v-btn icon class="ma-2" @click="$refs.calendar.prev()">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-spacer />
      <v-select
        v-model="type"
        :items="types"
        dense
        outlined
        hide-details
        class="ma-2"
        label="Тип"
      ></v-select>
      <v-select
        v-model="mode"
        :items="modes"
        dense
        outlined
        hide-details
        label="Отображение пересечение"
        class="ma-2"
      ></v-select>
      <v-spacer></v-spacer>
      <v-btn icon class="ma-2" @click="$refs.calendar.next()">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-sheet>
    <v-sheet height="600">
      <v-calendar
        v-if="board"
        ref="calendar"
        v-model="value"
        :type="type"
        :events="events"
        :event-overlap-mode="mode"
        :event-overlap-threshold="30"
        :event-color="getEventColor"
        @change="getEvents"
      ></v-calendar>
    </v-sheet>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    type: 'month',
    types: ['Месяцы', 'Недели', 'Дни', 'Квартеты'],
    mode: 'stack',
    modes: ['Совмещение', 'Колонка'],
    weekday: [0, 1, 2, 3, 4, 5, 6],
    value: '',
    events: [],
    colors: [
      'blue',
      'indigo',
      'deep-purple',
      'cyan',
      'green',
      'orange',
      'grey darken-1',
    ],
    names: [
      'Meeting',
      'Holiday',
      'PTO',
      'Travel',
      'Event',
      'Birthday',
      'Conference',
      'Party',
    ],
    board: null,
  }),

  async fetch() {
    this.board = (
      await this.$axios.$get(
        'board/getboard/' + this.$route.params.projectId + '/'
      )
    ).columns
  },
  methods: {
    getEvents({ start, end }) {
      const events = []

      const min = new Date(`${start.date}T00:00:00`)
      const max = new Date(`${end.date}T23:59:59`)

      const tasks = this.board
        .reduce((acc, el) => [...acc, ...el.cards], [])
        .filter((el) => {
          return (
            (new Date(el.date_start * 1000).getTime() > min.getTime() &&
              new Date(el.date_start * 1000).getTime() < max.getTime()) ||
            (new Date(el.date_finish * 1000).getTime() > min.getTime() &&
              new Date(el.date_finish * 1000).getTime() < max.getTime())
          )
        })

      tasks.forEach((el) => {
        const firstTimestamp = el.date_start * 1000
        const first = new Date(firstTimestamp - (firstTimestamp % 900000))
        const second = new Date(el.date_finish * 1000)

        events.push({
          name: el.name,
          start: first,
          end: second,
          color: 'blue',
          timed: false,
        })
      })

      this.events = events
    },
    getEventColor(event) {
      return event.color
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    },
  },
}
</script>

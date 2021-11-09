<template>
  <div>
    <nuxt-child />

    <v-snackbar v-model="snackbar">
      {{ message }}

      <template #action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
          Закрыть
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import Pusher from 'pusher-js'
import { Subject } from 'rxjs'

const messageSubject = new Subject()

export default {
  name: 'Index',

  provide: {
    messageSubject,
  },

  data: () => ({
    channel: null,
    snackbar: false,
    message: '',
  }),

  mounted() {
    Pusher.logToConsole = true

    const pusher = new Pusher('8da04f0e1ecfefbeaecc', {
      cluster: 'eu',
    })

    this.channel = pusher.subscribe(
      'notification-project-' + this.$route.params.projectId
    )
    this.channel.bind('messages', (data) => {
      const p = JSON.parse(data.description)
      if (p.userId !== this.$store.state.UserModule.user.id) {
        messageSubject.next(p)
        this.message = data.title
        this.snackbar = true
      }
    })
  },

  beforeDestroy() {
    if (this.channel) this.channel.unsubscribe()
  },
}
</script>

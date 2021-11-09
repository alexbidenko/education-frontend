<template>
  <v-card v-if="events.length" class="py-0 mt-4 pr-2 mb-4">
    <v-timeline align-top dense>
      <v-timeline-item
        v-for="item in events"
        :key="item.id"
        color="teal lighten-3"
        small
      >
        <v-row class="pt-1">
          <v-col>
            <strong>{{ item.name }}</strong>
            <div class="caption mb-2">
              {{ item.user.name }} {{ item.user.last_name }} ({{
                getDate(item.date)
              }})
            </div>
          </v-col>
        </v-row>
      </v-timeline-item>
    </v-timeline>
  </v-card>
  <div v-else />
</template>

<script>
export default {
  name: 'TimeLine',

  inject: ['messageSubject'],

  props: {
    project: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    events: [],
  }),

  async fetch() {
    try {
      this.events = (
        await this.$axios.$get(
          `get_project_event/${this.$route.params.projectId}/`
        )
      ).events.map((el) => ({
        ...el,
        name: el.name.replace(`к проекту ${this.project.name} `, ''),
      }))
    } catch {
      this.$router.push('/')
    }
  },

  mounted() {
    this.messageSubject.subscribe(async () => {
      this.events = (
        await this.$axios.$get(
          `get_project_event/${this.$route.params.projectId}/`
        )
      ).events
    })
  },

  methods: {
    getDate(date) {
      return new Date(date * 1000).toLocaleString()
    },
  },
}
</script>

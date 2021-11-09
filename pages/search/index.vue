<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-text class="py-0">
            <v-text-field
              v-model="text"
              placeholder="Поиск"
              @keydown.enter="search"
            />
          </v-card-text>
        </v-card>
      </v-col>
      <PreviewProjects connect :projects="projects" />
    </v-row>
  </v-container>
</template>

<script>
import PreviewProjects from '~/components/PreviewProjects'
export default {
  name: 'Index',
  components: { PreviewProjects },
  data: () => ({
    projects: [],
    text: '',
  }),
  async fetch() {
    await this.search()
  },

  methods: {
    async search() {
      const data = await this.$axios.$get('projects/', {
        params: { name: this.text },
      })
      this.projects = data.result
    },
  },
}
</script>

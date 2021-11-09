<template>
  <v-container fluid>
    <v-row>
      <v-col class="mt-2" cols="12">
        <v-card>
          <v-card-text class="py-0">
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="text"
                  placeholder="Поиск"
                  @change="search"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-select
                  v-model="selectedTags"
                  :items="tags"
                  label="Теги"
                  multiple
                />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <PreviewProjects connect :projects="projects" full />
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
    selectedTags: [],
    tags: [],
  }),
  async fetch() {
    await this.search()
    this.tags = (await this.$axios.$get('tags/')).result.map((el) => el.name)
  },

  watch: {
    selectedTags() {
      this.search()
    },
    $route() {
      if (this.$route.query.tags)
        this.selectedTags = this.$route.query.tags.split(',')
      this.search()
    },
  },

  created() {
    if (this.$route.query.tags)
      this.selectedTags = this.$route.query.tags.split(',')
  },

  methods: {
    async search() {
      const data = await this.$axios.$get('projects/', {
        params: { name: this.text, tags: this.selectedTags.join(',') },
      })
      this.projects = data.result
    },
  },
}
</script>

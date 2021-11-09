<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8" class="mx-auto">
        <v-form @submit.prevent="create">
          <v-text-field v-model="name" placeholder="Название проекта" />
          <v-text-field v-model="description" placeholder="Описание проекта" />
          <v-select
            v-model="category"
            :items="categories"
            label="Выберите категорию"
          ></v-select>
          <div class="d-flex justify-space-between">
            <v-btn depressed color="secondary" to="/">Отмена</v-btn>
            <v-btn color="primary" depressed type="submit">Создать</v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { categories } from '~/assets/statuses'

export default {
  name: 'Index',
  data: () => ({
    name: '',
    description: '',
    category: '',
    categories,
  }),
  async fetch() {
    const project = await this.$axios.$get(
      `get_project/${this.$route.params.projectId}`
    )
    this.name = project.name
    this.description = project.description
    this.category = project.category
  },
  methods: {
    create() {
      this.$axios
        .$post('update_project/', {
          id: +this.$route.params.projectId,
          name: this.name,
          description: this.description,
          category: this.category,
        })
        .then(() =>
          this.$router.push('/projects/' + this.$route.params.projectId)
        )
    },
  },
}
</script>

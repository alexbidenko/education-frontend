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
          <v-combobox
            v-model="chips"
            :items="items"
            chips
            clearable
            label="Введите теги проекта"
            multiple
            prepend-icon="mdi-filter-variant"
            solo
          >
            <template #selection="{ attrs, item, select, selected }">
              <v-chip
                v-bind="attrs"
                :input-value="selected"
                close
                @click="select"
                @click:close="remove(item)"
              >
                {{ item }}
              </v-chip>
            </template>
          </v-combobox>
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
    chips: [],
    items: [],
    categories,
  }),
  async fetch() {
    this.items = (await this.$axios.$get('tags/')).result.map((el) => el.name)
  },
  methods: {
    create() {
      this.$axios
        .$post('write_project/', {
          name: this.name,
          description: this.description,
          category: this.category,
          creator: +this.$cookies.get('USER_ID'),
          tags: this.chips,
        })
        .then(() => this.$router.push('/'))
    },
    remove(item) {
      this.chips.splice(this.chips.indexOf(item), 1)
      this.chips = [...this.chips]
    },
  },
}
</script>

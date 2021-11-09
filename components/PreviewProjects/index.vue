<template>
  <v-col cols="12">
    <v-card v-if="!connect && +$route.params.userId === user.id || $route.fullPath === '/'">
      <div style="display: flex">
        <v-card-text class="py-2"
          >{{ contribute ? 'Доступные' : 'Созданные' }} проекты</v-card-text
        >
        <v-btn
          v-if="!contribute"
          color="primary"
          dark
          class="ml-auto d-flex"
          to="/projects/create"
        >
          Создать
        </v-btn>
        <v-btn v-else color="primary" dark class="ml-auto d-flex" to="/search">
          Присоединиться
        </v-btn>
      </div>
    </v-card>
    <v-card class="mt-4">
      <v-list v-if="projects.length">
        <div v-for="(item, index) in projects" :key="item.id">
          <v-divider v-if="index !== 0" inset></v-divider>

          <v-list-item>
            <v-list-item-avatar>
              <v-img
                :src="
                  item.image
                    ? `${baseURL}posts/media/proj_img/${item.image}`
                    : '/assets/substrate.jpg'
                "
              ></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-html="item.name"></v-list-item-title>
              <v-list-item-subtitle
                v-html="item.description"
              ></v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action
              v-if="connect && item.creator[0].id !== user.id"
            >
              <v-dialog max-width="600">
                <template #activator="{ on, attrs }">
                  <v-btn color="primary" icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-account-plus</v-icon>
                  </v-btn>
                </template>
                <template #default="dialog">
                  <v-card>
                    <v-toolbar color="primary" dark
                      >Присоединиться к проекту</v-toolbar
                    >
                    <v-card-text>
                      <v-select
                        v-model="role"
                        :items="items"
                        label="Выберите роль"
                      ></v-select>
                    </v-card-text>
                    <v-card-actions class="justify-end">
                      <v-btn text @click="dialog.value = false">Отменить</v-btn>
                      <v-btn text @click="contributeProject(item.id)"
                        >Присоединиться</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </template>
              </v-dialog>
            </v-list-item-action>

            <v-list-item-action>
              <v-btn color="primary" :to="`/projects/${item.id}`" icon
                ><v-icon>mdi-chevron-right</v-icon></v-btn
              >
            </v-list-item-action>
          </v-list-item>
        </div>
      </v-list>
      <v-card-text v-else>Пустой список проектов</v-card-text>
    </v-card>

    <v-btn
      v-if="preview"
      :to="
        contribute
          ? `/users/${userId}/contributed`
          : `/users/${userId}/projects`
      "
      color="primary"
      class="my-4"
      >Все проекты</v-btn
    >
  </v-col>
</template>

<script>
export default {
  name: 'PreviewProjects',
  props: {
    preview: {
      type: Boolean,
      default: false,
    },
    connect: {
      type: Boolean,
      default: false,
    },
    projects: {
      type: Array,
      default: () => [],
    },
    owner: {
      type: Boolean,
      default: false,
    },
    contribute: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    items: ['Участник', 'Ментор', 'Спонсор', 'Эксперт', 'Научный руководитель'],
    role: '',
    baseURL: process.env.BASE_URL,
  }),
  computed: {
    user() {
      return this.$store.state.UserModule.user
    },
    userId() {
      return this.$route.params.userId || this.user.id
    },
  },
  methods: {
    contributeProject(id) {
      this.$axios
        .$post('write_status/', {
          name: this.role,
          project: id,
          user: this.$store.state.UserModule.user.id,
        })
        .then(() => {
          this.$router.push(`/projects/${id}`)
        })
    },
  },
}
</script>

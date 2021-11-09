<template>
  <v-col cols="12">
    <v-card v-if="controllers">
      <div style="display: flex">
        <v-card-text class="py-2"
          >{{ contribute ? 'Доступные' : 'Созданные' }} проекты</v-card-text
        >
        <v-btn
          v-if="
            !contribute &&
            ((!connect && +$route.params.userId === user.id) ||
              $route.fullPath === '/')
          "
          color="primary"
          dark
          class="ml-auto d-flex"
          to="/projects/create"
        >
          Создать
        </v-btn>
        <v-btn
          v-else-if="
            (!connect && +$route.params.userId === user.id) ||
            $route.fullPath === '/'
          "
          color="primary"
          dark
          class="ml-auto d-flex"
          to="/search"
        >
          Присоединиться
        </v-btn>
      </div>
    </v-card>
    <v-card class="mt-4" style="overflow-y: auto">
      <v-list v-if="projects.length" min-width="600px">
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
              <v-list-item-title>{{ item.name }}</v-list-item-title>
              <v-list-item-subtitle>{{
                item.description
              }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-content v-if="full">
              <PreviewMenu :item="item" />
            </v-list-item-content>

            <v-list-item-content>
              <div style="text-align: right" class="mr-8">
                <v-chip
                  v-for="i in item.tags.slice(0, full ? 7 : 3)"
                  :key="i.id"
                  :to="`/search?tags=${i.name}`"
                  class="mr-2 mb-1"
                  >{{ i.name }}</v-chip
                >
              </div>
            </v-list-item-content>

            <v-list-item-action style="min-width: 40px">
              <v-dialog
                v-if="connect && item.creator[0].id !== user.id"
                max-width="600"
              >
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
                      <v-btn
                        text
                        :loading="isRequest"
                        @click="contributeProject(item.id, item)"
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
      v-if="preview && projects.length >= 5"
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
import PreviewMenu from './PreviewMenu'
export default {
  name: 'PreviewProjects',
  components: { PreviewMenu },
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
    full: {
      type: Boolean,
      default: false,
    },
    controllers: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({
    items: ['Участник', 'Ментор', 'Спонсор', 'Эксперт', 'Научный руководитель'],
    role: '',
    baseURL: process.env.BASE_URL,
    isRequest: false,
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
    contributeProject(id, project) {
      const article = `К проекту ${project.name} присоединился ${this.role} ${this.user.name} ${this.user.last_name}`
      this.isRequest = true

      const fd = new FormData()
      fd.set('title', article)
      fd.set(
        'description',
        JSON.stringify({
          userId: this.user.id,
          message: this.message,
        })
      )

      Promise.all([
        this.$axios
          .$post('write_status/', {
            name: this.role,
            project: id,
            user: this.$store.state.UserModule.user.id,
          })
          .then(() => {
            this.$router.push(`/projects/${id}`)
          })
          .finally(() => {
            this.isRequest = true
          }),
        this.$axios.$post('write_event/', {
          name: article,
          project: +id,
          user: project.creator[0].id,
        }),
        this.$axios.$post(
          'https://api-cyber-garden.admire.social/api/notification/user/' +
            project.creator[0].id,
          fd
        ),
      ])
    },
  },
}
</script>

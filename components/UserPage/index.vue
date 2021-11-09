<template>
  <v-container>
    <v-row class="py-6">
      <v-col v-if="user" cols="12" md="6" lg="4">
        <v-card class="mb-4">
          <img
            class="indexPage__avatar"
            :src="
              user.avatar_image
                ? `${baseURL}posts/media/avatars/${user.avatar_image}`
                : '/assets/substrate.jpg'
            "
          />
          <input
            ref="uploader"
            class="d-none"
            type="file"
            accept="image/*"
            @change="uploadAvatar"
          />
          <v-btn
            v-if="owner"
            style="top: 8px; right: 8px; position: absolute"
            color="primary"
            class="text-none"
            rounded
            depressed
            icon
            @click="$refs.uploader.click()"
          >
            <v-icon>mdi-cloud-upload</v-icon>
          </v-btn>
        </v-card>
        <v-card class="mx-auto">
          <v-list two-line>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{ user.name }}</v-list-item-title>
                <v-list-item-subtitle>Имя</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{ user.last_name }}</v-list-item-title>
                <v-list-item-subtitle>Фамилия</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{ user.patronimyc }}</v-list-item-title>
                <v-list-item-subtitle>Отчество</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{ user.email }}</v-list-item-title>
                <v-list-item-subtitle>Email</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{ user.organization }}</v-list-item-title>
                <v-list-item-subtitle>Организация</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item v-if="user.contacts">
              <v-list-item-content>
                <v-list-item-title>Контакты</v-list-item-title>
                <v-list-item-subtitle style="white-space: pre-wrap">{{
                  user.contacts
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <UserRedact v-if="owner" :user="user" @update="update" />
        </v-card>
      </v-col>
      <v-col cols="12" md="6" :lg="8">
        <v-row>
          <PreviewProject preview :projects="projects" :owner="owner" />
          <PreviewProject
            preview
            :projects="contributedProjects"
            :owner="owner"
            contribute
          />
          <template
            v-if="
              !projects.length &&
              !contributedProjects.length &&
              hintProjects.length &&
              owner
            "
          >
            <v-col class="pb-0">
              <v-card>
                <div>
                  <v-card-text class="py-2"
                    >Вас может заинтересовать</v-card-text
                  >
                </div>
              </v-card>
            </v-col>
            <PreviewProject
              class="pt-0"
              connect
              :projects="hintProjects"
              :controllers="false"
            />
          </template>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { Actions, Mutations } from '~/store/types'
import PreviewProject from '~/components/PreviewProjects/index.vue'
import UserRedact from '~/components/UserRedact'

export default {
  name: 'UserPage',
  components: {
    UserRedact,
    PreviewProject,
  },
  props: {
    owner: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Object,
      required: true,
    },
    userId: {
      type: Number,
      required: true,
    },
  },
  data: () => ({
    projects: [],
    contributedProjects: [],
    hintProjects: [],
    baseURL: process.env.BASE_URL,
  }),
  async fetch() {
    this.hintProjects = (await this.$axios.$get('projects/?count=5')).result
    const data = await this.$axios.$get(
      'projects/?creator=' + this.userId + '&count=5'
    )
    this.projects = data.result
    const contributedProjects = await this.$axios.$get(
      'get_user_status/' + this.userId + '/'
    )
    this.contributedProjects = contributedProjects.statuses.map((el) => ({
      ...el.project,
      statusName: el.name,
    }))
  },
  methods: {
    update() {
      this.$store.dispatch('UserModule/' + Actions.CHECK_USER)
    },
    uploadAvatar(event) {
      const image = event.target.files[0]
      if (image) {
        const fd = new FormData()
        fd.set('image', image)
        this.$axios
          .$post(`update_user_avatar/${this.user.id}/`, fd)
          .then(({ img_name }) => {
            this.$store.commit('UserModule/' + Mutations.SET_USER, {
              avatar_image: img_name,
            })
          })
      }
    },
  },
}
</script>

<style lang="scss">
.indexPage {
  &__avatar {
    width: 100%;
    display: block;
  }
}
</style>

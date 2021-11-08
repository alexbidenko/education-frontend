<template>
  <v-row class="py-6">
    <v-col cols="12" sm="6" md="4">
      <v-card class="mb-4">
        <img
          class="indexPage__avatar"
          src="https://static.independent.co.uk/s3fs-public/thumbnails/image/2020/05/01/08/avatar-sigourney-weaver.jpg?width=1200&auto=webp&quality=75"
        />
      </v-card>
      <v-card>
        <v-card-title class="headline">
          Личный кабинет пользователя
        </v-card-title>
        <v-card-text>
          <p>
            Vuetify is a progressive Material Design component framework for
            Vue.js. It was designed to empower developers to create amazing
            applications.
          </p>
          <p>
            For more information on Vuetify, check out the
            <a
              href="https://vuetifyjs.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              documentation </a
            >.
          </p>
          <p>
            If you have questions, please join the official
            <a
              href="https://chat.vuetifyjs.com/"
              target="_blank"
              rel="noopener noreferrer"
              title="chat"
            >
              discord </a
            >.
          </p>
          <p>
            Find a bug? Report it on the github
            <a
              href="https://github.com/vuetifyjs/vuetify/issues"
              target="_blank"
              rel="noopener noreferrer"
              title="contribute"
            >
              issue board </a
            >.
          </p>
          <p>
            Thank you for developing with Vuetify and I look forward to bringing
            more exciting features in the future.
          </p>
          <div class="text-xs-right">
            <em><small>&mdash; John Leider</small></em>
          </div>
          <hr class="my-3" />
          <a
            href="https://nuxtjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nuxt Documentation
          </a>
          <br />
          <a
            href="https://github.com/nuxt/nuxt.js"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nuxt GitHub
          </a>
        </v-card-text>
      </v-card>
    </v-col>
    <PreviewProject />
  </v-row>
</template>

<script>
import PreviewProject from '~/components/PreviewProjects/index.vue'

export default {
  components: {
    PreviewProject,
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

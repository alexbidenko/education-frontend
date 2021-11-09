<template>
  <v-app dark>
    <v-main>
      <nuxt />
    </v-main>

    <AnimatedLogo />

    <v-snackbar v-model="snackbar">
      {{ message }}

      <template #action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
          Закрыть
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import AnimatedLogo from '~/components/AnimatedLogo'

export default {
  components: {
    AnimatedLogo,
  },
}
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}
</style>

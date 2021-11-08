<template>
  <v-container class="d-flex justify-space-around ma-2">
    <v-btn to="/registration" depressed color="primary"
      >Зарегистрироваться</v-btn
    >
    <v-btn to="/login" depressed color="primary">Войти</v-btn>
  </v-container>
</template>

<script>
export default {
  name: 'Auth',
}
</script>
